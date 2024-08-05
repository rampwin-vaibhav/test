import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { LabelConstants } from '../../../types/i18n.labels';
import { FormInput, FormPhoneInputV1 } from '../Form';
import OTPTimer from '../OTPTimer';
import { SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProfileService } from '../../../helpers/services';
import {
  GetUserTrackingResponse,
  oldMobileOTPPayload,
  SendOTPResponse,
  VerifyOTPPayload,
} from '../../../types/models';
import { useRouter } from 'next/router';

interface IFormInput {
  oldMobileNumber: string;
  verificationCode: number;
}

type oldMobileProps = {
  userTrackingDetails: GetUserTrackingResponse;
  setIsNewNumberVerified: (value: SetStateAction<boolean>) => void;
};

const OldMobile = (props: oldMobileProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [timer, setTimer] = useState<number>(0);
  const trackingId: any = atob(router.query.changeMobile as string);
  const [otpResponse, setOtpResponse] = useState<SendOTPResponse>();
  const { control, handleSubmit, setValue } = useForm<IFormInput>({});
  const [otpError, setOtpError] = useState<string>();

  useEffect(() => {
    setValue('oldMobileNumber', props.userTrackingDetails?.OldPhoneNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userTrackingDetails]);

  const handleOldMobileSendOTP = async (data: IFormInput) => {
    const payload: oldMobileOTPPayload = {
      ChangePhoneNumberTrackingId: trackingId,
    };
    const response = await ProfileService.sendOldMobileVerificationCode(
      payload
    );
    if (
      response.IsSuccess &&
      response.MessageCode === 'OTP_SENT_SUCCESSFULLY'
    ) {
      toast.success(t(LabelConstants.MSG_OTP_SENT_SUCCESSFULLY));
      setTimer(90);
      setOtpResponse(response);
      setOtpError('');
    } else {
      if (response.MessageCode === 'OLD_MOBILE_NUMBER_ALREADY_UPDATED') {
        toast.warning(t(LabelConstants.MSG_OLD_MOBILE_NUMBER_ALREADY_UPDATED));
        router.push('/profile');
      } else {
        toast.error(t(LabelConstants.MSG_INVALID_REQUEST));
        router.push('/profile');
      }
    }
  };

  const handleValidateOldMobileOTP = async (data: IFormInput) => {
    if (data.verificationCode && String(data.verificationCode).length > 0) {
      setOtpError('');
      const payload: VerifyOTPPayload = {
        ChangePhoneNumberTrackingId: trackingId,
        SecretKey: otpResponse?.SecretKey,
        CustomKey: otpResponse?.CustomKey,
        OTP: data.verificationCode,
      };
      const response = await ProfileService.verifyOldMobileNumber(payload);
      if (response.IsSuccess && response.MessageCode === 'OTP_VERFIED') {
        setTimer(0);
        props.setIsNewNumberVerified(true);
        toast.success(t(LabelConstants.OTP_VERIFIED_MSG));
      } else {
        if (response.MessageCode === 'ALREADY_VERIFIED') {
          toast.warning(t(LabelConstants.MSG_ALREADY_VERIFIED));
        } else if (response.MessageCode === 'INVALID_OTP') {
          toast.error(t(LabelConstants.WRONG_OTP));
        } else {
          toast.error(t(LabelConstants.MSG_INVALID_REQUEST));
        }
      }
    } else {
      setOtpError(t(LabelConstants.PLEASE_ENTER_OTP));
    }
  };

  return (
    <div className="w-full">
      <form>
        <div className="w-full flex items-center justify-center">
          <section className="flex flex-col mt-[3.146rem] w-[26.938rem] h-[5.25rem] text-xl">
            <span className="text-center">
              {t(LabelConstants.OLD_MOBILE_MSG)}
            </span>
          </section>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full">
            <FormPhoneInputV1
              name="oldMobileNumber"
              label={`${t(LabelConstants.OLD_MOBILE_NUMBER)}*`}
              control={control}
              disabled={true}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-1">
            <div className="flex relative md:w-[60%]">
              <FormInput
                name="verificationCode"
                control={control}
                label={`${t(LabelConstants.VERIFICATION_CODE)}*`}
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
                className="btn btn-link !min-w-[0] !w-[30%] !mb-0 !text-lg mt-8"
                onClick={handleSubmit(handleOldMobileSendOTP)}
              >
                {t(LabelConstants.RESEND_VERIFICATION_CODE)}
              </button>
            ) : (
              <button
                className="btn btn-link !min-w-[0] !w-[30%] !mb-0 !text-lg mt-8"
                onClick={handleSubmit(handleOldMobileSendOTP)}
              >
                {t(LabelConstants.SEND_VERIFICATION_CODE)}
              </button>
            )}
          </div>
          {otpError && <p className="error">{otpError}</p>}
          <button
            className="btn btn-primary uppercase"
            onClick={handleSubmit(handleValidateOldMobileOTP)}
            disabled={timer === 0}
          >
            {t(LabelConstants.VERIFY_PHONE_NUMBER_LBL)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OldMobile;
