import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LabelConstants } from '../../types/i18n.labels';
import {
  FormInput,
  FormPhoneInputV1,
  IsPhoneNumberValid,
} from '../../components/common/Form';
import { useTranslation } from 'next-i18next';
import { AuthService } from '../../helpers/services';
import { useState } from 'react';
import { SessionUtils } from '../../helpers/utilities';
import { AuthTokenWithOtpResponse } from '../../types/models';
import { GTMEvents } from '../../types/gtm';
import { PushDataToGTM } from '../../helpers/utilities/gtm';
import MessageBox, { MessageBoxType } from '../../components/common/MessageBox';
import { RedirectURL } from '../../types/constants';
import { useRouter } from 'next/router';
import OTPTimer from '../../components/common/OTPTimer';
import Spinner from '../../components/common/Spinner/spinner';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import { useAppContext } from '../../provider/AppProvider';
import Link from 'next/link';

interface IFormInput {
  mobile: string;
  OTPNumber: number;
}

const schema = yup
  .object({
    mobile: yup
      .string()
      .required(LabelConstants.ENTER_MOBILE_NUMBER)
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
  })
  .required();

const SignIn: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [sessionKey, setSessionKey] = useState('');
  const [timer, setTimer] = useState<number>(0);
  const [otpError, setOtpError] = useState<string>();
  const [loader, setLoader] = useState<boolean>(false);
  const { control, handleSubmit, getValues, watch, trigger } =
    useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  const { mobile } = watch();
  const { setIsLoggedIn } = useAppContext();
  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (data.OTPNumber) {
      setLoader(true);
      const response = await AuthService.getAuthTokenWithOTP(
        data.mobile,
        sessionKey,
        String(data.OTPNumber)
      );
      setLoader(false);
      /**
       *  Handle Unauthorized request
       */
      if (!response) {
        return setOtpError(t(LabelConstants.INVALID_OTP));
      } else {
        setOtpError('');
        const tokenData = response as AuthTokenWithOtpResponse;
        SessionUtils.setUserDetails(tokenData);
        setIsLoggedIn(true);
        //Added GTM event for successful sign in
        PushDataToGTM(GTMEvents.SignIn, {
          userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + tokenData.UserId,
        });
      }

      const url = localStorage.getItem(RedirectURL) || '/';
      router.push(url);
    } else {
      setOtpError(t(LabelConstants.PLEASE_ENTER_OTP));
    }
  };

  const handleSendOTP = async () => {
    trigger('mobile');
    setTimer(0);
    const valid = IsPhoneNumberValid(mobile);
    if (valid) {
      const mobileNumber = getValues('mobile');
      setLoader(true);
      const otpRes = await AuthService.sendLoginOTP({
        MobileNumber: mobileNumber,
      });
      setLoader(false);
      if (otpRes) {
        setTimer(90);
        setOtpError('');
        setSessionKey(otpRes.SessionKey);
      }
    }
  };

  return (
    <div
      className={`w-full account-container flex justify-center lg:justify-between ${
        loader ? 'relative' : ''
      }`}
    >
      {loader && (
        <div className="absolute bg-lighter-gray opacity-50 top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <div className="w-1/2 h-full hidden lg:block">
        <picture>
          <source
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
            type="image/webp"
          />
          <img
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
            alt="gogo motor"
            className="w-full h-full object-fill"
          />
        </picture>
      </div>
      <div className="flex justify-center md:w-1/2 w-full h-full">
        <div className="md:w-[36.25rem] md:px-[1.25rem] w-full p-[1.5rem]">
          <div className="w-full flex flex-col items-center justify-center gap-y-5 md:mt-[4rem]">
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
            <span className="text-4xl font-semibold mt-2 text-primary">
              {t(LabelConstants.SIGN_IN)}
            </span>
          </div>
          <div className="mt-[2.125rem]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div>
                  <FormPhoneInputV1
                    showError={true}
                    name="mobile"
                    control={control}
                    label={`${t(LabelConstants.MOBILE_NUMBER)}*`}
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex w-full justify-between gap-2 items-center">
                    <div className="w-[70%] relative">
                      <FormInput
                        name="OTPNumber"
                        control={control}
                        label={t(LabelConstants.OTP)}
                        maxLength={6}
                        pattern={/[^0-9]+/}
                        disabled={timer === 0}
                        autoComplete="off"
                      />
                      {timer > 0 ? (
                        <div className="absolute top-0 ltr:right-0 rtl:left-0">
                          <OTPTimer
                            timeInSecond={timer}
                            setTimeExpire={setTimer}
                            setOtpError={setOtpError}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="mt-4">
                      <span
                        className="text-primary underline text-lg font-bold cursor-pointer"
                        onClick={() => handleSendOTP()}
                      >
                        {timer > 0
                          ? t(LabelConstants.RESEND_OTP)
                          : t(LabelConstants.SEND_OTP)}
                      </span>
                    </div>
                  </div>
                  {otpError && <p className="error mt-1">{otpError}</p>}
                </div>

                <div className="flex w-full">
                  <button
                    className="btn btn-primary w-full uppercase"
                    type="submit"
                  >
                    {t(LabelConstants.SIGN_IN)}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  req,
  res,
}: GetServerSidePropsContext) => {
  if (SessionUtils.isValidServerSession(req, res)) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      hideLayout: true,
    },
  };
};
