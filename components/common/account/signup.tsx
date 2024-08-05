import {
  FormCheckBox,
  FormDatePicker,
  FormDropdown,
  FormInput,
  FormRadio,
} from '../Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CityResponse,
  CountryResponse,
  CountryStateCItyResponse,
  CreateUserAccountPayload,
  GetUserDetailsResponse,
  StatesResponse,
  UserTitleResponse,
} from '../../../types/models';
import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import {
  AuthService,
  GlobalService,
  OtpService,
  ProfileService,
} from '../../../helpers/services';
import { LabelConstants } from '../../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import {
  CircleCloseIcon,
  HideEyeIcon,
  SelectedFemaleIcon,
  SelectedMaleIcon,
  ShowEyeIcon,
  ValidatedIcon,
} from '../../icons';
import { MaleIcon } from '../../icons/MaleIcon';
import { FemaleIcon } from '../../icons/FemaleIcon';
import { DateObject } from 'react-multi-date-picker';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../helpers/utilities';
import { GenderId, Locales } from '../../../types/enums';
import MessageBox, { MessageBoxResult, MessageBoxType } from '../MessageBox';
import { FormDropdownService } from '../Form/FormDropdown';
import moment from 'moment';
import { apiDateFormat } from '../../../types/constants';
import { useAppContext } from '../../../provider/AppProvider';

type SignUpPageProps = {
  registrationDetails: GetUserDetailsResponse | undefined;
  setLoader: (value: SetStateAction<boolean | undefined>) => void;
};
interface IFormInput {
  title: UserTitleResponse;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  profession: string;
  gender: string;
  addressLine1: string;
  addressLine2: string;
  city: CityResponse;
  country: CountryResponse;
  region: StatesResponse;
  postalCode: string;
  password: string;
  confirmPassword: string;
  preferredCommunication: {
    isPreferredWhatsapp: boolean;
    isPreferredSms: boolean;
    isPreferredEmail: boolean;
  };
  preferredLanguage: string;
  confirmPolicy: {
    isPolicyConfirm: boolean;
  };
}

const schema = yup
  .object({
    firstName: yup
      .string()
      .nullable()
      .required(LabelConstants.PLEASE_ENTER_FIRST_NAME_MSG)
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_100_CHAR,
        (number) => String(number).length <= 100
      )
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
    middleName: yup
      .string()
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_100_CHAR,
        (number) => String(number).length <= 100
      )
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, {
        message: LabelConstants.LETTERS_ALLOWED,
        excludeEmptyString: true,
      }),
    lastName: yup
      .string()
      .nullable()
      .required(LabelConstants.PLEASE_ENTER_LAST_NAME_MSG)
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_100_CHAR,
        (number) => String(number).length <= 100
      )
      .matches(/^[\u0621-\u064AaA-zZ\s]+$/, LabelConstants.LETTERS_ALLOWED),
    addressLine1: yup
      .string()
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.FRM_ERR_MSG_MAX250_LETTER,
        (number) => String(number).length <= 250
      ),
    addressLine2: yup
      .string()
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.FRM_ERR_MSG_MAX250_LETTER,
        (number) => String(number).length <= 250
      ),
    title: yup.object().required(LabelConstants.PLEASE_SELECT_TITLE),
    postalCode: yup
      .string()
      .nullable()
      .test(
        'maxDigit',
        LabelConstants.FRM_ERR_MSG_ZIP_NUMBER,
        (number) =>
          String(number).trim().length === 5 ||
          !number ||
          String(number).trim().length === 0
      ),
    profession: yup
      .string()
      .nullable()
      .test(
        'maxCharacter',
        LabelConstants.MAX_20_CHARCTERS_ALLOWED,
        (data) =>
          String(data).trim().length <= 20 ||
          !data ||
          String(data).trim().length === 0
      ),
    password: yup
      .string()
      .required(LabelConstants.PLEASE_ENTER_PASSWORD_MSG)
      .max(128, LabelConstants.PASSWORD_LIMITATION_ERROR),
    confirmPassword: yup
      .string()
      .required(LabelConstants.CONFIRM_PASSWORD_ERROR_MSG)
      .oneOf([yup.ref('password')], LabelConstants.PASSWORD_NOT_MATCHES),
    confirmPolicy: yup
      .object({
        isPolicyConfirm: yup.boolean(),
      })
      .test('confirmPolicy', 'null', (obj) => {
        if (obj.isPolicyConfirm) {
          return true;
        }
        return new yup.ValidationError(
          LabelConstants.CONFIRM_TERMS_CONDITION_MSG,
          null,
          'confirmPolicy'
        );
      }),
  })
  .required();

const SignUp = (props: SignUpPageProps | undefined) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [cities, setCities] = useState<Array<CityResponse>>([]);
  const [passwordInput, setPasswordInput] = useState('');
  const [type, setType] = useState('password');
  const [confirmType, setConfirmType] = useState('password');
  const [isComplex, setIsComplex] = useState(false);
  const [userTitle, setUserTitle] = useState<Array<UserTitleResponse>>([]);
  const [countries, setCountries] = useState<Array<CountryResponse>>([]);
  const [states, setStates] = useState<Array<StatesResponse>>([]);
  const [host, setHost] = useState<string>();
  const refTitle = useRef<FormDropdownService>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    getValues,
    trigger,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { country, region } = watch();
  const { dateFormat } = useAppContext();

  useEffect(() => {
    if (refTitle && refTitle.current && refTitle.current?.setFocus) {
      const isTitleError: any =
        Object.keys(errors).reduce((field: any, a: any) => {
          return !!(errors as any)[field] ? field : a;
        }, null) === 'title';

      if (isTitleError) {
        refTitle.current?.setFocus();
      }
    }
  }, [errors]);

  const fetchStateCitiesData = useCallback(
    async (countryId: number, stateId: number) => {
      const data: CountryStateCItyResponse =
        await GlobalService.getCountryStateCity(
          router.locale,
          countryId,
          stateId
        );
      if (data.Countries && data.Countries.length > 0) {
        setCountries(data.Countries);
      }
      if (data.States && data.States.length > 0) {
        setStates(data.States);
      }
      if (data.Cities && data.Cities.length > 0) {
        setCities(data.Cities);
      }
    },
    [router]
  );

  useEffect(() => {
    setHost(document.location.origin);
    setValue('preferredCommunication.isPreferredEmail', true);
    setValue('preferredLanguage', String(getDefaultLanguage()));
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      const userTitle: Array<UserTitleResponse> = await OtpService.getUserTitle(
        router.locale
      );
      setUserTitle(userTitle);

      if (country && country.CountryId) {
        if (region && region.StateId) {
          await fetchStateCitiesData(country.CountryId, region.StateId);
        } else {
          fetchStateCitiesData(country.CountryId, 0);
        }
      } else {
        await fetchStateCitiesData(0, 0);
      }
    };
    initialLoad();
  }, [router, country, region, fetchStateCitiesData]);

  const getDefaultLanguage = () => {
    const browserLanguage = navigator.language;
    if (
      (router.locale && router.locale.toLowerCase() === Locales.AR) ||
      browserLanguage.toLowerCase().includes(Locales.AR)
    ) {
      return CommonUtils.getLanguageId(Locales.AR);
    } else {
      return CommonUtils.getLanguageId(Locales.EN);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const payload: CreateUserAccountPayload = {
      EmailId: props?.registrationDetails?.EmailAddress,
      PhoneNumber: props?.registrationDetails?.PhoneNumber,
      TitleId: data.title.UserTitleId,
      FirstName: CommonUtils.getFieldValue(data.firstName),
      LastName: CommonUtils.getFieldValue(data.lastName),
      MiddleName: CommonUtils.getFieldValue(data.middleName),
      DOB: data.dateOfBirth
        ? moment(data.dateOfBirth, dateFormat).format(apiDateFormat)
        : null,
      Profession: CommonUtils.getFieldValue(data.profession),
      AddressLine1: CommonUtils.getFieldValue(data.addressLine1),
      AddressLine2: CommonUtils.getFieldValue(data.addressLine2),
      CountryId: data.country ? data.country.CountryId : null,
      RegionId: data.region ? data.region.StateId : null,
      CityId: data.city ? data.city.CityId : null,
      PostalCode: CommonUtils.getFieldValue(data.postalCode),
      IsWhatsAppPreferred: data.preferredCommunication.isPreferredWhatsapp
        ? true
        : false,
      IsEmailPreferred: data.preferredCommunication.isPreferredEmail
        ? true
        : false,
      IsSMSPreferred: data.preferredCommunication.isPreferredSms ? true : false,
      PreferredLanguage: data.preferredLanguage ? data.preferredLanguage : null,
      GenderId: data.gender ? data.gender : null,
      Password: data.password ? data.password : null,
      IsTermsAccepted: data.confirmPolicy.isPolicyConfirm,
      RegistrationId: props?.registrationDetails?.AppRegistrationId,
    };
    props?.setLoader(true);
    const response = await ProfileService.createCustomerAccount(payload);

    if (response.IsSuccess) {
      props?.setLoader(false);
      const result = await MessageBox.open({
        content: (
          <div className="flex flex-col text-center gap-y-2">
            <span>{t(LabelConstants.MSG_ACCOUNT_CREATED)}</span>
            <span>{t(LabelConstants.MSG_ACCOUNT_CREATED_SIGN_IN)}</span>
            <span>{t(LabelConstants.CLICK_BELOW_TO_CONTINUE_MSG)}</span>
          </div>
        ),
        type: MessageBoxType.Message,
        showClose: false,
        backdrop: 'static',
      });
      if (result === MessageBoxResult.OK) {
        // const response = await AuthService.fetchSignInUrl(
        //   CommonUtils.getLanguageId(router.locale!)
        // );
        // if (response) {
        //   window.location.href = response;
        // }
        router.push('/sign-in');
      }
    } else {
      props?.setLoader(false);
      if (response.MessageCode === 'USER_ALREADY_EXIST') {
        toast.warning(t(LabelConstants.MSG_USER_ALREADY_EXIST));
      } else {
        toast.error(t(LabelConstants.MSG_INVALID_REQUEST));
      }
    }
  };

  const handlePasswordChange = (event: any) => {
    setPasswordInput(event.target.value);
    if (event.target.value) {
      clearErrors('password');
      setValue('password', event.target.value);
    } else {
      setError('password', {
        type: 'string',
        message: LabelConstants.PLEASE_ENTER_PASSWORD_MSG,
      });
    }
  };
  const handleConfirmPassword = (event: any) => {
    if (event.target.value) {
      clearErrors('confirmPassword');
      setValue('confirmPassword', event.target.value);
    } else {
      setError('confirmPassword', {
        type: 'string',
        message: LabelConstants.PLEASE_ENTER_PASSWORD_MSG,
      });
    }
  };

  const show = () => {
    type === 'password' ? setType('text') : setType('password');
  };
  const showConfirm = () => {
    confirmType === 'password'
      ? setConfirmType('text')
      : setConfirmType('password');
  };

  const handleConfirmPolicy = (event: boolean) => {
    if (event) {
      clearErrors('confirmPolicy');
      setValue('confirmPolicy.isPolicyConfirm', event);
    } else {
      setError('confirmPolicy', {
        type: 'string',
        message: t(LabelConstants.CONFIRM_TERMS_CONDITION_MSG),
      });
    }
  };

  const handlePasswordInput = (passwordValue: string) => {
    passwordValue &&
      setIsComplex(
        /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]))([A-Za-z\d@#$%^&*\-_+=[\]{}|\\:',?\/`~"();!]|\.(?!@)){8,16}$/gm.test(
          passwordValue
        )
      );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-5">
          <div className="w-[30%]">
            <FormDropdown
              ref={refTitle}
              options={userTitle}
              labelAccessor="UserTitle"
              valueAccessor="UserTitleId"
              labelText={`${t(LabelConstants.TITLE)}*`}
              control={control}
              name={'title'}
              isSearchable={false}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormInput
                name="firstName"
                label={`${t(LabelConstants.FIRST_NAME)}*`}
                control={control}
              />
            </div>
            <div>
              <FormInput
                name="middleName"
                label={`${t(LabelConstants.MIDDLE_NAME)}`}
                control={control}
              />
            </div>
            <div>
              <FormInput
                name="lastName"
                label={`${t(LabelConstants.LAST_NAME)}*`}
                control={control}
              />
            </div>
          </div>
          <div>
            <FormInput
              control={control}
              name="profession"
              label={t(LabelConstants.PROFESSION)}
            />
          </div>
          <div>
            <FormDatePicker
              control={control}
              name="dateOfBirth"
              label={t(LabelConstants.DATE_OF_BIRTH)}
              placeholder={dateFormat}
              maxDate={new DateObject()}
              editable={false}
            />
          </div>
          <div>
            <FormInput
              name="addressLine1"
              label={t(LabelConstants.ENTER_ADDRESS_LINE_1)}
              control={control}
            />
          </div>
          <div>
            <FormInput
              name="addressLine2"
              label={t(LabelConstants.ENTER_ADDRESS_LINE_2)}
              control={control}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormDropdown
                options={countries}
                labelAccessor="Country"
                valueAccessor="CountryId"
                labelText={t(LabelConstants.COUNTRY)}
                placeHolderText={t(LabelConstants.SELECT_COUNTRY)}
                searchPlaceHolderText={t(LabelConstants.SEARCH)}
                control={control}
                name="country"
              />
            </div>
            <div>
              <FormDropdown
                options={states}
                labelAccessor="State"
                valueAccessor="StateId"
                labelText={`${t(LabelConstants.REGION)}`}
                placeHolderText={t(LabelConstants.SELECT_REGION)}
                searchPlaceHolderText={t(LabelConstants.SEARCH)}
                control={control}
                name="region"
              />
            </div>
            <div>
              <FormDropdown
                options={cities}
                labelAccessor="City"
                valueAccessor="CityId"
                labelText={`${t(LabelConstants.CITY)}`}
                placeHolderText={t(LabelConstants.SELECT_CITY)}
                searchPlaceHolderText={t(LabelConstants.SEARCH)}
                control={control}
                name="city"
              />
            </div>
            <div>
              <FormInput
                name="postalCode"
                label={t(LabelConstants.POSTAL_CODE)}
                control={control}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-[0.99rem]">
            <label>
              {`${t(LabelConstants.PREFERRED_MODE_OF_COMMUNICATION)}`}
            </label>
            <div className="flex gap-[2.938rem]">
              <div className="flex flex-col">
                <FormCheckBox
                  control={control}
                  name="preferredCommunication.isPreferredWhatsapp"
                  label={t(LabelConstants.WHATSAPP)}
                  reValidate={() => {
                    trigger('preferredCommunication');
                  }}
                />
              </div>
              <div className="flex flex-col">
                <FormCheckBox
                  control={control}
                  name="preferredCommunication.isPreferredEmail"
                  label={t(LabelConstants.EMAIL)}
                  reValidate={() => {
                    trigger('preferredCommunication');
                  }}
                />
              </div>
              <div className="flex flex-col">
                <FormCheckBox
                  control={control}
                  name="preferredCommunication.isPreferredSms"
                  label={t(LabelConstants.SMS)}
                  reValidate={() => {
                    trigger('preferredCommunication');
                  }}
                />
              </div>
            </div>
            {errors.preferredCommunication &&
              errors.preferredCommunication?.message && (
                <p className="error">
                  {t(errors.preferredCommunication?.message)}
                </p>
              )}
          </div>
          <div className="flex flex-col gap-y-[0.99rem]">
            <label>{`${t(LabelConstants.SELECT_PREFERRED_LANGUAGE)}`}</label>
            <div className="flex gap-[3.125rem]">
              <FormRadio
                control={control}
                name="preferredLanguage"
                value="1"
                label={t(LabelConstants.ENGLISH)}
              />
              <FormRadio
                control={control}
                name="preferredLanguage"
                value="2"
                label={t(LabelConstants.ARABIC)}
              />
            </div>
            {errors.preferredLanguage && errors.preferredLanguage?.message && (
              <p className="error">{t(errors.preferredLanguage?.message)}</p>
            )}
          </div>
          <div className="flex flex-col gap-2 w-full justify-center items-center">
            <span className="text-gray-700 text-[1rem] pb-[0.375rem] font-semibold">
              {t(LabelConstants.GENDER)}
            </span>
            <div className="flex gap-6">
              <div className="flex items-center gap-x-[0.625rem]">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value={GenderId.MALE}
                    onClick={() => setValue('gender', GenderId.MALE)}
                    hidden
                  />
                  {getValues('gender') === '1' ? (
                    <SelectedMaleIcon className="!w-[3.5rem] !h-[3.5rem]" />
                  ) : (
                    <MaleIcon className="!w-[3.5rem] !h-[3.5rem]" />
                  )}
                </label>
              </div>
              <div className="flex items-center gap-x-[0.625rem]">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value={GenderId.FEMALE}
                    onClick={() => setValue('gender', GenderId.FEMALE)}
                    hidden
                  />
                  {getValues('gender') === '2' ? (
                    <SelectedFemaleIcon className="!w-[3.5rem] !h-[3.5rem]" />
                  ) : (
                    <FemaleIcon className="!w-[3.5rem] !h-[3.5rem]" />
                  )}
                </label>
              </div>
            </div>
          </div>

          <hr className="border-gray-400 mt-2" />
          <div className="grid grid-rows-2 gap-5">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <label>{`${t(LabelConstants.PASSWORD)}*`}</label>
              </div>

              <div className="password-input flex items-center justify-center">
                <input
                  name="password"
                  type={type}
                  onChange={handlePasswordChange}
                  onInput={(e: any) => handlePasswordInput(e.target.value)}
                  value={passwordInput}
                  className="border-none"
                  maxLength={16}
                />

                <div
                  onClick={() => show()}
                  className=" flex gap-3 cursor-pointer items-center px-4"
                >
                  {passwordInput && (
                    <div>
                      {isComplex ? (
                        <ValidatedIcon fill="#29AC62" className="h-6 w-6" />
                      ) : (
                        <CircleCloseIcon className="h-6 w-6 bg-error rounded-full" />
                      )}
                    </div>
                  )}
                  {type === 'password' && (
                    <div>
                      <HideEyeIcon />
                    </div>
                  )}
                  {type === 'text' && (
                    <div>
                      <ShowEyeIcon />
                    </div>
                  )}
                </div>
              </div>
              {errors.password && errors.password?.message && (
                <p className="error">{t(errors.password?.message)}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label>{`${t(LabelConstants.CONFIRM_PASSWORD)}*`}</label>
              <div className="password-input flex items-center justify-center">
                <input
                  type={confirmType}
                  name="confirmPassword"
                  onChange={handleConfirmPassword}
                  className="border-none"
                  maxLength={16}
                />
                <div
                  onClick={() => showConfirm()}
                  className="cursor-pointer px-4"
                >
                  {confirmType === 'password' && (
                    <div>
                      <HideEyeIcon />
                    </div>
                  )}
                  {confirmType === 'text' && (
                    <div>
                      <ShowEyeIcon />
                    </div>
                  )}
                </div>
              </div>

              {errors.confirmPassword && errors.confirmPassword?.message && (
                <p className="error">{t(errors.confirmPassword?.message)}</p>
              )}
            </div>
            <div className="flex flex-col">
              <span>-{t(LabelConstants.PASSWORD_MIN_CHARACTER_MSG)} </span>
              <span>-{t(LabelConstants.PASSWORD_ATLEAST_NUMBER)} </span>
              <span>-{t(LabelConstants.PASSWORD_MSG_SPECIAL_CHARACTER)} </span>
              <span>-{t(LabelConstants.PASSWORD_MSG_UPPERCASE_LOWERCASE)}</span>
            </div>
          </div>
          <button
            className="btn btn-primary uppercase"
            type="submit"
            disabled={!isComplex}
          >
            {t(LabelConstants.CREATE_ACCOUNT)}
          </button>
          <div className="flex gap-[1.136rem]">
            <input
              type="checkbox"
              {...register('confirmPolicy.isPolicyConfirm')}
              onChange={(e) => handleConfirmPolicy(e.target.checked)}
            />
            <div className="flex flex-col">
              <span className="text-[1rem]">
                {t(LabelConstants.AGREE_GOGO_TEXT)}
              </span>
              <span className="flex items-center">
                <div
                  onClick={() =>
                    window.open(
                      `${host}/${router.locale}/info/terms-and-conditions`
                    )
                  }
                >
                  <button
                    className="btn btn-primary btn-auto btn-link ltr:!pl-[0px] !text-[1rem]"
                    type="button"
                  >
                    {t(LabelConstants.TERMS_CONDITIONS)}
                  </button>
                </div>
                {t(LabelConstants.AND)}
                <div
                  onClick={() =>
                    window.open(`${host}/${router.locale}/info/privacy-policy`)
                  }
                >
                  <button
                    className="btn btn-primary btn-auto btn-link !text-[1rem]"
                    type="button"
                  >
                    {t(LabelConstants.PRIVACY_POLICY)}
                  </button>
                </div>
              </span>
            </div>
          </div>
          {errors.confirmPolicy && errors.confirmPolicy?.message && (
            <p className="error">{t(errors.confirmPolicy?.message)}</p>
          )}
        </div>
      </form>
    </>
  );
};
export default SignUp;
