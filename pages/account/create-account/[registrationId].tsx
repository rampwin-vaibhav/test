import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FormInput,
  FormPhoneInputV1,
  IsPhoneNumberValid,
} from '../../../components/common/Form';
import { LabelConstants } from '../../../types/i18n.labels';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../../types/enums';
import {
  GenerateOTPPayload,
  GetUserDetailsResponse,
  ValidateOTPPayload,
} from '../../../types/models';
import { OtpService, ProfileService } from '../../../helpers/services';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OTPTimer from '../../../components/common/OTPTimer';
import SignUp from '../../../components/common/account/signup';
import { ValidatedIcon } from '../../../components/icons/ValidatedIcon';
import { CommonUtils } from '../../../helpers/utilities';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Spinner from '../../../components/common/Spinner/spinner';

interface IFormInput {
  emailId: string;
  mobileNumber: number;
  OTPNumber: number;
}
const schema = yup
  .object({
    mobileNumber: yup
      .string()
      .required(LabelConstants.ENTER_MOBILE_NUMBER)
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
  })
  .required();

const PhoneVerification = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const registrationId: any = router.query.registrationId;
  const [timer, setTimer] = useState<number>(0);
  const [otpResponse, setOtpResponse] = useState<any>();
  const [registrationDetails, setRegistrationDetails] = useState<
    GetUserDetailsResponse | undefined
  >();
  const [otpError, setOtpError] = useState<string>();
  const [loader, setLoader] = useState<boolean | undefined>();

  const { control, handleSubmit, setValue } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const initialLoad = async () => {
      const response = await ProfileService.getUserDetails(
        CommonUtils.decode<number>(registrationId!)
      );
      if (response) {
        setValue('emailId', response.EmailAddress);
        if (response.PhoneNumber) {
          setValue('mobileNumber', response.PhoneNumber);
        }
        setRegistrationDetails(response);
      }
    };
    initialLoad();
  }, [registrationId, setValue]);

  const handleSendOTP = async (data: IFormInput) => {
    if (registrationId) {
      const payload: GenerateOTPPayload = {
        RegistrationId: CommonUtils.decode<number>(registrationId!),
        Language: router.locale === Locales.EN ? 'English' : 'Arabic',
        Identifier: `${data.mobileNumber}`,
        Type: 'PhoneNumber',
      };
      const response = await OtpService.generateOTP(payload);
      if (response && response.MessageCode === 'OTP_SENT_SUCCESSFULLY') {
        setTimer(90);
        setOtpError('');
        setOtpResponse(response);
        toast.success(t(LabelConstants.MSG_OTP_SENT_SUCCESSFULLY));
      } else {
        if (response.MessageCode === 'MOBILE_ALREADY_EXISTS') {
          toast.warning(t(LabelConstants.MSG_MOBILE_ALREADY_EXISTS));
        } else if (response.MessageCode === 'ALREADY_VERIFIED') {
          toast.warning(t(LabelConstants.MSG_ALREADY_VERIFIED));
          await ProfileService.getUserDetails(
            CommonUtils.decode<number>(registrationId!)
          );
        } else if (response.MessageCode === 'INVALID_REQUEST') {
          toast.error(t(LabelConstants.MSG_INVALID_REQUEST));
        } else {
          toast.error(t(LabelConstants.MSG_EMAIL_NOT_VERIFIED));
        }
      }
    }
  };

  const handleValidateOTP = async (data: IFormInput) => {
    if (data.OTPNumber && String(data.OTPNumber).length > 0) {
      setOtpError('');
      const payload: ValidateOTPPayload = {
        RegistrationId: CommonUtils.decode<number>(registrationId!),
        Identifier: otpResponse.Identifier,
        Type: 'PhoneNumber',
        SecretKey: otpResponse.SecretKey,
        CustomKey: otpResponse.CustomKey,
        OTP: data.OTPNumber,
      };

      const response = await OtpService.validateOTP(payload);
      if (response && response.IsSuccess) {
        toast.success(t(LabelConstants.OTP_VERIFIED_MSG));
        const userDataResponse = await ProfileService.getUserDetails(
          CommonUtils.decode<number>(registrationId!)
        );
        if (userDataResponse) {
          setRegistrationDetails(userDataResponse);
          setValue('mobileNumber', userDataResponse.PhoneNumber);
        }
      } else {
        if (response.MessageCode === 'INVALID_OTP') {
          toast.error(t(LabelConstants.WRONG_OTP));
        } else if (response.MessageCode === 'ALREADY_VERIFIED') {
          toast.warning(t(LabelConstants.MSG_ALREADY_VERIFIED));
        } else {
          toast.error(t(LabelConstants.MSG_INVALID_REQUEST));
        }
      }
    } else {
      setOtpError(t(LabelConstants.PLEASE_ENTER_OTP));
    }
  };

  const onSignInClickHandler = async () => {
    // const response = await AuthService.fetchSignInUrl(
    //   CommonUtils.getLanguageId(router.locale!)
    // );
    // if (response) {
    //   window.location.href = response;
    // }
    router.push('/sign-in');
  };
  return (
    <>
      <div
        className={`w-full flex justify-center md:justify-between relative ${
          registrationDetails &&
          registrationDetails.IsEmailVerified &&
          registrationDetails.IsPhoneVerified
            ? 'h-full'
            : 'h-[100vh]'
        }`}
      >
        {loader && (
          <div className="fixed top-0 bg-lighter-gray opacity-50 account-container flex flex-col sm:items-center sm:justify-center">
            <Spinner />
          </div>
        )}
        <div className="w-1/2 hidden md:block ">
          <picture>
            <source
              src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
              type="image/webp"
            />
            <img
              src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
              alt="gogo motor"
              className="fixed w-1/2 h-hull object-fill"
            />
          </picture>
        </div>
        {registrationDetails && registrationDetails?.IsAccountCreated ? (
          <div className="flex flex-col justify-center w-1/2 h-[100vh]">
            <span className="text-4xl text-center text-primary">
              {t(LabelConstants.ACCOUNT_CREATED_SUCCESSFULLY_MSG)}
            </span>
            <div className="flex justify-center items-center gap-x-1 mt-[1.775rem] text-xl">
              <span>{t(LabelConstants.ALREADY_HAVE_ACCOUNT)} </span>
              <div
                className="text-primary underline cursor-pointer"
                onClick={onSignInClickHandler}
              >
                {t(LabelConstants.SIGN_IN)}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center md:w-1/2 w-full">
            <div className="w-full md:w-[550px] p-[1.5rem] md:p-0">
              <div className="md:mt-[4rem] img-container">
                <Link href="/">
                  <picture className="cursor-pointer flex w-full items-center justify-center">
                    <source
                      srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/gogo-motors.svg`}
                      type="image/svg"
                    />
                    <img
                      src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/gogo-motors.svg`}
                      alt="gogo motor"
                      className="w-[14rem] h-[5rem]"
                    />
                  </picture>
                </Link>
              </div>
              {registrationDetails && (
                <div className="md:px-[30px] md:py-[25px] py-10">
                  <form>
                    <div className="flex flex-col gap-y-5">
                      <span className="text-4xl font-semibold text-primary">
                        {t(LabelConstants.CREATE_ACCOUNT)}
                      </span>
                      <div className="flex flex-col gap-y-3">
                        <div className="relative">
                          <FormInput
                            control={control}
                            name="emailId"
                            label={t(LabelConstants.EMAIL_ID)}
                            className="!px-[12px] !py-[20px]"
                            disabled
                          />
                          {registrationDetails &&
                            registrationDetails.IsEmailVerified && (
                              <div className="absolute top-11 ltr:right-5 rtl:left-5">
                                <ValidatedIcon />
                              </div>
                            )}
                        </div>
                        <div className="relative">
                          <FormPhoneInputV1
                            name="mobileNumber"
                            label={`${t(LabelConstants.PHONE_NUMBER)}*`}
                            control={control}
                            disabled={registrationDetails?.IsPhoneVerified}
                            validated={
                              registrationDetails &&
                              registrationDetails.IsPhoneVerified
                            }
                          />
                        </div>
                      </div>
                      {registrationDetails &&
                        !registrationDetails.IsPhoneVerified && (
                          <>
                            <div className="flex gap-6">
                              <div className="flex relative w-[70%]">
                                <FormInput
                                  name="OTPNumber"
                                  control={control}
                                  label={t(LabelConstants.OTP)}
                                  className="!px-[12px] !py-[20px]"
                                  maxLength={6}
                                  disabled={timer === 0}
                                />

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

                              {timer > 0 ? (
                                <button
                                  className="btn btn-link !min-w-[0] mt-6"
                                  onClick={handleSubmit(handleSendOTP)}
                                >
                                  {t(LabelConstants.RESEND_OTP)}
                                </button>
                              ) : (
                                <button
                                  className="btn btn-link !min-w-[0] mt-6"
                                  onClick={handleSubmit(handleSendOTP)}
                                >
                                  {t(LabelConstants.SEND_OTP)}
                                </button>
                              )}
                            </div>
                            {otpError && <p className="error">{otpError}</p>}
                            <button
                              className="btn btn-primary uppercase"
                              type="button"
                              onClick={handleSubmit(handleValidateOTP)}
                              disabled={timer === 0}
                            >
                              {t(LabelConstants.VERIFY_MOBILE)}
                            </button>
                          </>
                        )}
                    </div>
                  </form>
                  {registrationDetails.IsEmailVerified &&
                    registrationDetails.IsPhoneVerified && (
                      <div className="mt-3">
                        <SignUp
                          registrationDetails={registrationDetails}
                          setLoader={setLoader}
                        />
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default PhoneVerification;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      hideLayout: true,
    },
  };
};
