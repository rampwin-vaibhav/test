import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import {
  FormInputV1,
  IsPhoneNumberValid,
} from '../../../components/common/Form';
import OTPTimer from '../../../components/common/OTPTimer';
import { AuthService } from '../../../helpers/services';
import { SessionUtils } from '../../../helpers/utilities';
import { PushDataToGTM } from '../../../helpers/utilities/gtm';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setLoader,
  updateWarrantyStep,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import { useAppContext } from '../../../provider/AppProvider';
import { GTMEvents } from '../../../types/gtm';
import { LabelConstants, WarrantyConstants } from '../../../types/i18n.labels';
import { AuthTokenWithOtpResponse } from '../../../types/models';
import FormPhoneInputV2 from '../../common/Form/FormPhoneInputV2';
import { ArrowRightIcon } from '../../icons';

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

const Auth = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [sessionKey, setSessionKey] = useState('');
  const [timer, setTimer] = useState<number>(0);
  const [otpError, setOtpError] = useState<string>();
  const { control, handleSubmit, getValues, watch, trigger } =
    useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  const { mobile } = watch();
  const { setIsLoggedIn } = useAppContext();

  const cleverTap = useAppSelector(({ global }) => global?.clevertap);
  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('Authentication Initiated.');
    }
  }, [cleverTap]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    if (data.OTPNumber) {
      dispatch(setLoader(true));
      const response = await AuthService.getAuthTokenWithOTP(
        data.mobile,
        sessionKey,
        String(data.OTPNumber)
      );

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
        if (cleverTap) {
          cleverTap.event?.push('User Authenticated');
        }
        dispatch(setLoader(false));
      }

      dispatch(updateWarrantyStep(WarrantyConstants.EnterKmDriven));
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
        if (cleverTap) {
          cleverTap.event?.push('OTP sent.');
        }
      }
    }
  };

  return (
    <div className="ml-[32px] mr-[20px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[20px]">
          <div>
            <FormPhoneInputV2
              showError={true}
              name="mobile"
              control={control}
              label={`${t(LabelConstants.MOBILE_NUMBER)}*`}
            />
          </div>
          {timer !== 0 && (
            <div className="relative w-full">
              <FormInputV1
                name="OTPNumber"
                control={control}
                label={t(LabelConstants.OTP)}
                maxLength={6}
                pattern={/[^0-9]+/}
                disabled={timer === 0}
                autoComplete="off"
                helperText={
                  timer > 0 ? (
                    <div className="flex items-center justify-between ">
                      <p>OTP is sent on your mobile no.</p>
                      <div>
                        <OTPTimer
                          timeInSecond={timer}
                          setTimeExpire={setTimer}
                          setOtpError={setOtpError}
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )
                }
              />
            </div>
          )}
          {timer !== 0 && (
            <div className="flex flex-col">
              {otpError && <p className="error mt-1">{otpError}</p>}
            </div>
          )}

          {timer === 0 ? (
            <button
              className=" self-start bg-black text-white px-[44px] py-[16px] rounded-[40px] flex items-center text-[13px]"
              onClick={handleSendOTP}
            >
              {t(LabelConstants.GET_OTP)}
              <ArrowRightIcon className="!text-white  h-[5px] ml-[12.5px]" />
            </button>
          ) : (
            <button
              className="self-start bg-black text-white px-[44px] py-[16px] rounded-[40px] flex items-center text-[13px]"
              onClick={handleSubmit(onSubmit)}
            >
              {t(LabelConstants.SIGN_IN)}
              <ArrowRightIcon className="!text-white  h-[5px] ml-[12.5px]" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default Auth;
