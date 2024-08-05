import { useEffect, useState } from 'react';
import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  InferGetServerSidePropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import {
  FormDropdown,
  FormInput,
  FormPhoneInputV1,
  IsPhoneNumberValid,
  FormRadio,
} from '../../../components/common/Form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales, TypeOfPayment } from '../../../types/enums';
import { useRouter } from 'next/router';
import { LabelConstants } from '../../../types/i18n.labels';
import PrivatePageLayout from '../../../components/layout/PrivatePageLayout';
import {
  AuthTokenWithOtpResponse,
  Cities,
  CityResponse,
  CountryResponse,
  PostFeedbackResponse,
  ProductCatalogueData,
  ProfileData,
  PurchaseDurationResponse,
  StatesResponse,
  UserInterestPayload,
  VehicleListingData,
} from '../../../types/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  GlobalService,
  ProfileService,
  VehicleService,
  LeadService,
  AuthService,
} from '../../../helpers/services';
import { CommonUtils, SessionUtils } from '../../../helpers/utilities';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '../../../components/common/Modal';
import {
  BackIcon,
  CircleSuccessIcon,
  ValidatedIcon,
} from '../../../components/icons';
import { PaymentTypes, SellOldCar } from '../../../types/constants';
import OTPTimer from '../../../components/common/OTPTimer';
import MessageBox, {
  MessageBoxType,
} from '../../../components/common/MessageBox';
import Spinner from '../../../components/common/Spinner/spinner';
import { PushDataToGTM } from '../../../helpers/utilities/gtm';
import { GTMEvents } from '../../../types/gtm';
import { useAppContext } from '../../../provider/AppProvider';

type UsersInterestPageProps = {
  skewId: number;
};

interface IFormInput {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  city: CityResponse;
  country: CountryResponse;
  region: StatesResponse;
  zip: string;
  OTPNumber: number;
  paymentType: string;
  isSell: string;
  duration: PurchaseDurationResponse;
}

const schema = yup
  .object({
    firstName: yup
      .string()
      .required(LabelConstants.NAME_IS_REQUIRED)
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_100_CHAR,
        (number) => String(number).length <= 100
      )
      .matches(
        /^[\u0621-\u064Aa-zA-Z][\u0621-\u064A a-zA-Z]*$/,
        LabelConstants.LETTERS_ALLOWED
      )
      .matches(
        /^[^\s]+(\s+[^\s]+)*$/,
        LabelConstants.START_WITH_WHITE_SPACES_NOT_ALLOWED
      ),
    lastName: yup
      .string()
      .required(LabelConstants.NAME_IS_REQUIRED)
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_100_CHAR,
        (number) => String(number).length <= 100
      )
      .matches(
        /^[\u0621-\u064Aa-zA-Z][\u0621-\u064A a-zA-Z]*$/,
        LabelConstants.LETTERS_ALLOWED
      )
      .matches(
        /^[^\s]+(\s+[^\s]+)*$/,
        LabelConstants.START_WITH_WHITE_SPACES_NOT_ALLOWED
      ),
    mobileNumber: yup
      .string()
      .required(LabelConstants.MOBILE_NUMBER_REQUIRED)
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
    city: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    zip: yup
      .string()
      .nullable()
      .required(LabelConstants.REQUIRED_FIELD)
      .test(
        'notAllZeros',
        LabelConstants.ZIP_NOT_ALL_ZERO,
        (number) => String(number).trim() !== '00000'
      )
      .test(
        'maxDigit',
        LabelConstants.FRM_ERR_MSG_ZIP_NUMBER,
        (number) =>
          String(number).trim().length === 5 ||
          !number ||
          String(number).trim().length === 0
      ),
    duration: yup.object().nullable().required(LabelConstants.REQUIRED_FIELD),
    isSell: yup.string().nullable().required(LabelConstants.REQUIRED_FIELD),
    paymentType: yup
      .string()
      .nullable()
      .required(LabelConstants.REQUIRED_FIELD),
  })
  .required();

const UserInterestPage: NextPage<UsersInterestPageProps> = ({
  skewId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger,
    getValues,
    getFieldState,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [cities, setCities] = useState<Array<Cities>>([]);
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [isValidSession, setIsValidSession] = useState<boolean>();
  const [showOtpDIv, setShowOtpDIv] = useState<boolean>(false);
  const [otpResponse, setOtpResponse] = useState<any>();
  const [timer, setTimer] = useState<number>(0);
  const [otpError, setOtpError] = useState<string>();
  const [oldMobile, setOldMobile] = useState<string>();
  const [sessionKey, setSessioKey] = useState('');

  const [purchaseDuration, setPurchaseDuration] = useState<
    Array<PurchaseDurationResponse> | undefined
  >();
  const [defaultDuration, setDefaultDuration] = useState<
    PurchaseDurationResponse | undefined
  >();
  const [productListingData, setProductListingData] = useState<
    ProductCatalogueData | undefined
  >();
  const { setIsLoggedIn } = useAppContext();

  const [vehicleListingData, setVehicleListingData] =
    useState<VehicleListingData>();
  const [profileData, setProfileData] = useState<
    ProfileData & {
      profileCountry?: CountryResponse;
      profileState?: StatesResponse;
      profileCity?: CityResponse;
    }
  >();
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    setIsValidSession(SessionUtils.isValidSession());
  }, []);

  useEffect(() => {
    reset({
      paymentType: TypeOfPayment.Finance,
      isSell: LabelConstants.YES,
      duration: defaultDuration!,
    });
  }, [reset, defaultDuration]);

  useEffect(() => {
    const initialLoad = async () => {
      if (router.query.v) {
        const vehicleListingData = await VehicleService.fetchVehicleListingData(
          skewId,
          router.locale,
          false
        );
        setVehicleListingData(vehicleListingData);
      } else {
        const productListingData =
          await VehicleService.fetchProductCatalogueData(skewId, router.locale);
        setProductListingData(productListingData);
      }
      const res = await LeadService.getPurchasePlanDuration(router.locale);
      setPurchaseDuration(res);
      setDefaultDuration(res[0]);
      const citiesData = await GlobalService.fetchCities(router.locale);
      setCities(citiesData.cities);
    };
    initialLoad();
  }, [router.locale, router.query.v, skewId, getValues]);

  useEffect(() => {
    const initialLoad = async () => {
      if (isValidSession) {
        const profile = await ProfileService.fetchUserData(router.locale);
        const selectedProfileCities = cities?.find(
          (city) => city.CityId === profile.CityId
        );

        setProfileData({ ...profile, profileCity: selectedProfileCities });
        resetForm({ ...profile, profileCity: selectedProfileCities });
      }
    };
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isValidSession, cities]);

  const resetForm = (
    profileData: ProfileData & {
      profileCountry?: CountryResponse;
      profileState?: StatesResponse;
      profileCity?: CityResponse;
    }
  ) => {
    if (profileData) {
      reset({
        firstName: profileData?.FirstName
          ? profileData?.FirstName
          : getValues('firstName'),
        lastName: profileData?.LastName
          ? profileData?.LastName
          : getValues('lastName'),
        mobileNumber: profileData?.MobileNumber
          ? profileData?.MobileNumber
          : getValues('mobileNumber'),
        country: profileData?.profileCountry,
        region: profileData?.profileState,
        city: profileData?.profileCity
          ? profileData?.profileCity
          : getValues('city'),
        zip: profileData?.Zipcode ? profileData?.Zipcode : getValues('zip'),
        paymentType: TypeOfPayment.Finance,
        isSell: LabelConstants.YES,
        duration: defaultDuration!,
      });
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (isValidSession) {
      const user = SessionUtils.getUserDetails();
      const payload: UserInterestPayload = {
        FirstName: data.firstName,
        LastName: data.lastName,
        MobileNumber: data.mobileNumber,
        CountryId: data.country?.CountryId,
        CityId: data.city?.CityId,
        RegionId: data.region?.StateId,
        ZipCode: data?.zip,
        ProductCatalogueId: productListingData?.ProductCatalogueId!,
        VehicleListingId: vehicleListingData?.Overview?.VehicleListingId!,
        IsFinance: data.paymentType === TypeOfPayment.Finance ? true : false,
        IsLookingForOld: data.isSell === LabelConstants.YES ? true : false,
        BuyerUserId: Number(user?.UserId!),
        PurchasePlanDurationKey: data?.duration?.PurchasePlanDurationKey,
      };
      setLoader(true);
      const response: PostFeedbackResponse =
        await LeadService.saveUserInterestApplication(payload);
      if (response) {
        setLoader(false);
        setSuccessModal(true);
      } else {
        setLoader(false);
        await MessageBox.open({
          content: t(LabelConstants.SOMETHING_WENT_WRONG_ERROR),
          type: MessageBoxType.Message,
        });
      }
    } else {
      await MessageBox.open({
        content: t(LabelConstants.PLEASE_VERIFY_NUMBER),
        type: MessageBoxType.Message,
      });
    }
  };

  const handleSendOtp = async () => {
    const valid = IsPhoneNumberValid(getValues('mobileNumber'));
    if (valid) {
      const mob = getValues('mobileNumber');
      setOldMobile(mob);
      const response = await AuthService.sendLoginOTP({
        MobileNumber: mob,
      });
      setOtpResponse(response);
      if (response) {
        setShowOtpDIv(true);
        setTimer(90);
        setOtpError('');
        setSessioKey(response.SessionKey);
      }
    }
  };

  const handleValidateOTP = async () => {
    const otp = getValues('OTPNumber');
    const mob = getValues('mobileNumber');

    if (otp && String(otp).length > 0) {
      setOtpError('');
      const response = await AuthService.getAuthTokenWithOTP(
        mob,
        sessionKey,
        String(otp)
      );
      if (response) {
        setShowOtpDIv(false);
        const tokenData = response as AuthTokenWithOtpResponse;
        SessionUtils.setUserDetails(tokenData);
        setIsValidSession(true);
        setIsLoggedIn(true);
        //Added GTM event for successful sign in
        PushDataToGTM(GTMEvents.SignIn, {
          userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + tokenData.UserId,
        });
      } else {
        setOtpError(t(LabelConstants.INVALID_OTP));
      }
    } else {
      setOtpError(t(LabelConstants.PLEASE_ENTER_OTP));
    }
  };

  return (
    <div className={`w-full ${loader ? 'relative' : ''}`}>
      {loader && (
        <div className="absolute bg-lighter-gray opacity-50 top-0 left-0 h-full w-full z-10 flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <PrivatePageLayout>
        <>
          <div onClick={() => router.back()}>
            <BackIcon className="h-10 w-10 cursor-pointer rtl:rotate-180" />
          </div>
          <header className="text-3xl pb-[30px] font-bold mt-7">
            {t(LabelConstants.PLEASE_FILL_FORM)}
          </header>
          {router.query.v ? (
            <>
              <div className="pt-5 text-2xl font-semibold leading-8 uppercase">
                {vehicleListingData?.Overview
                  ? `${vehicleListingData?.Overview?.Make} ${vehicleListingData?.Overview?.Model} ${vehicleListingData?.Overview?.Spec} ${vehicleListingData?.Overview?.ModelYear}`
                  : ''}
              </div>
              <div className="text-gray-400 py-5 pt-2">
                <ul className="flex list-inside gap-3 list-disc">
                  {vehicleListingData?.Overview?.FuelType ? (
                    <li className="list-disc first:list-none">
                      {vehicleListingData?.Overview?.FuelType || '-'}
                    </li>
                  ) : (
                    <></>
                  )}
                  {vehicleListingData?.Overview?.Transmission ? (
                    <li className="list-disc first:list-none">
                      {vehicleListingData?.Overview?.Transmission || '-'}
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="pt-5 text-2xl font-semibold leading-8 uppercase">
                {productListingData
                  ? `${productListingData?.Make} ${productListingData?.Model} ${productListingData?.Trim} ${productListingData?.Year}`
                  : ''}
              </div>
              <div className="text-gray-400 py-5 pt-2">
                <ul className="flex list-inside gap-3 list-disc">
                  {productListingData?.FuelType ? (
                    <li className="list-disc first:list-none">
                      {productListingData?.FuelType || '-'}
                    </li>
                  ) : (
                    <></>
                  )}
                  {productListingData?.Transmission ? (
                    <li className="list-disc first:list-none">
                      {productListingData?.Transmission || '-'}
                    </li>
                  ) : (
                    <></>
                  )}
                </ul>
              </div>
            </>
          )}
          <div className="mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
                  <FormInput
                    control={control}
                    name="firstName"
                    label={`${t(LabelConstants.FIRST_NAME)}*`}
                    disabled={
                      isValidSession && profileData?.FirstName ? true : false
                    }
                  />
                  <FormInput
                    control={control}
                    name="lastName"
                    label={`${t(LabelConstants.LAST_NAME)}*`}
                    disabled={
                      isValidSession && profileData?.LastName ? true : false
                    }
                  />
                  <div className="relative">
                    <FormPhoneInputV1
                      showError={true}
                      name="mobileNumber"
                      control={control}
                      label={`${t(LabelConstants.MOBILE_NUMBER)}*`}
                      disabled={isValidSession}
                    />
                    <div className="flex rtl:flex-row-reverse">
                      <div className="md:w-64"></div>
                      {isValidSession ? (
                        <div className="text-primary w-full">
                          {t(LabelConstants.YOUR_NUMBER_VERIFIED)}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    {isValidSession ? (
                      <div className="absolute top-10 right-5">
                        <ValidatedIcon />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {isValidSession ? (
                    <div></div>
                  ) : (
                    <div className="flex items-center">
                      {timer === 0 &&
                      otpResponse &&
                      oldMobile === getValues('mobileNumber') ? (
                        <button
                          className={`btn btn-primary !text-base  ${
                            !errors.mobileNumber ? 'mt-7' : 'mt-2'
                          } !min-h-[3.1rem] !min-w-[12rem]`}
                          disabled={isValidSession}
                          onClick={() => {
                            trigger('mobileNumber');
                            handleSendOtp();
                          }}
                          type="button"
                        >
                          {t(LabelConstants.RESEND_OTP)}
                        </button>
                      ) : (
                        <button
                          className={`${
                            timer > 0 && 'hidden'
                          } btn btn-primary !text-base  ${
                            !errors.mobileNumber ? 'mt-7' : 'mt-2'
                          } !min-h-[3.1rem] !min-w-[12rem]`}
                          disabled={isValidSession}
                          onClick={() => {
                            trigger('mobileNumber');
                            handleSendOtp();
                          }}
                          type="button"
                        >
                          {t(LabelConstants.SEND_OTP)}
                        </button>
                      )}
                    </div>
                  )}
                  {showOtpDIv && (
                    <>
                      <div>
                        <div className="flex rtl:flex-row-reverse">
                          <div className="md:w-64"></div>
                          <div className="relative w-full">
                            <FormInput
                              name="OTPNumber"
                              control={control}
                              label={t(LabelConstants.OTP)}
                              maxLength={6}
                              disabled={timer === 0}
                              autoComplete="off"
                            />
                            {otpError && <p className="error">{otpError}</p>}

                            {timer > 0 && (
                              <div className="absolute top-0 ltr:right-0 rtl:left-0">
                                <OTPTimer
                                  timeInSecond={timer}
                                  setTimeExpire={setTimer}
                                  setOtpError={setOtpError}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className={`btn btn-primary !text-base ${
                            otpError ? 'mt-2' : 'mt-7'
                          } !min-h-[3.1rem] !min-w-[12rem]`}
                          onClick={() => handleValidateOTP()}
                          disabled={timer === 0}
                        >
                          {t(LabelConstants.VERIFY)}
                        </button>
                      </div>
                    </>
                  )}
                  <FormDropdown
                    options={cities}
                    labelAccessor="City"
                    valueAccessor="CityId"
                    labelText={`${t(LabelConstants.CITY)}*`}
                    placeHolderText={t(LabelConstants.SELECT_CITY)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="city"
                  />
                  <FormInput
                    control={control}
                    maxLength={5}
                    name="zip"
                    pattern={/[^0-9]+/}
                    label={`${t(LabelConstants.ENTER_ZIP)}*`}
                  />
                  <FormDropdown
                    options={purchaseDuration!}
                    labelAccessor="PurchasePlanDuration"
                    valueAccessor="PurchasePlanDurationKey"
                    labelText={`${t(LabelConstants.PLAN_TO_BUY_CAR)}*`}
                    placeHolderText={t(LabelConstants.SELECT_DROPDOWN_LITERAL)}
                    searchPlaceHolderText={t(LabelConstants.SEARCH)}
                    control={control}
                    name="duration"
                  />
                </div>
                <div className="flex flex-col gap-7 mt-7">
                  <div className="flex gap-4 items-center">
                    <label className="">{`${t(
                      LabelConstants.ARE_YOU_LOOKING
                    )}*`}</label>
                    <div className="flex flex-row gap-3 mt-3">
                      {SellOldCar.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center cursor-pointer"
                        >
                          <FormRadio
                            control={control}
                            name="isSell"
                            value={item?.value}
                            label={t(item.label)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 items-center">
                    <label className="">{`${t(
                      LabelConstants.FINANCE_REQUIRED
                    )}*`}</label>
                    <div className="flex flex-row gap-3 mt-3">
                      {PaymentTypes.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center cursor-pointer"
                        >
                          <FormRadio
                            control={control}
                            name="paymentType"
                            value={item?.value}
                            label={t(item.label)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-start w-full mt-10 gap-5">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm !min-w-[13rem] sm:!min-w-[15rem] uppercase"
                  onClick={() => router.back()}
                >
                  {t(LabelConstants.CANCEL)}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm !min-w-[13rem] sm:!min-w-[15rem] uppercase"
                >
                  {t(LabelConstants.SUBMIT)}
                </button>
              </div>
            </form>
          </div>
          {/* User Interest Save Success Modal */}
          <Modal
            show={successModal}
            size={ModalSize.MEDIUM}
            onClose={() => {
              setSuccessModal(false);
            }}
          >
            <>
              <ModalBody>
                <div className="justify-center">
                  <CircleSuccessIcon className="h-12 w-12 mx-auto" />
                  <div className="text-xl font-bold text-center mt-5">
                    {t(LabelConstants.YOUR_REQUEST_SUCCESS)}
                  </div>
                  <h1 className="mt-4 text-center text-base">
                    {t(LabelConstants.SUBMIT_THANK_YOU_MESSAGE)}
                  </h1>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="text-center">
                  <div
                    onClick={() => {
                      router.back();
                    }}
                  >
                    <button className="btn btn-primary btn-modal uppercase">
                      {t(LabelConstants.OK)}
                    </button>
                  </div>
                </div>
              </ModalFooter>
            </>
          </Modal>
        </>
      </PrivatePageLayout>
    </div>
  );
};
export default UserInterestPage;

export const getServerSideProps: GetServerSideProps<
  UsersInterestPageProps
> = async ({ locale, query }: GetServerSidePropsContext) => {
  const id = query.v
    ? CommonUtils.decode<number>(String(query.v))
    : CommonUtils.decode<number>(String(query.p));
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      skewId: id,
    },
  };
};
