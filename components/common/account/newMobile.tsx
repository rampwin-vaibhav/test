import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LabelConstants } from '../../../types/i18n.labels';
import { FormInput, FormPhoneInputV1, IsPhoneNumberValid } from '../Form';
import OTPTimer from '../OTPTimer';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ProfileService } from '../../../helpers/services';
import { SendOTPResponse, VerifyOTPPayload } from '../../../types/models';
import { useRouter } from 'next/router';
import MessageBox, { MessageBoxResult, MessageBoxType } from '../MessageBox';

interface IFormInput {
  newMobileNumber: string;
  verificationCode: number;
}
const schema = yup
  .object({
    newMobileNumber: yup
      .string()
      .required(LabelConstants.ENTER_MOBILE_NUMBER)
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
  })
  .required();

const NewMobile = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [timer, setTimer] = useState<number>(0);
  const trackingId: any = atob(router.query.changeMobile as string);
  const [otpResponse, setOtpResponse] = useState<SendOTPResponse>();
  const { control, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [otpError, setOtpError] = useState<string>();

  const handleNewMobileSendOTP = async (data: IFormInput) => {
    const payload = {
      ChangePhoneNumberTrackingId: trackingId,
      PhoneNumber: String(data.newMobileNumber),
    };
    if (trackingId) {
      const response = await ProfileService.sendNewMobileVerificationCode(
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
        if (response.MessageCode === 'MOBILE_ALREADY_EXISTS') {
          toast.warning(t(LabelConstants.MSG_MOBILE_ALREADY_EXISTS));
        } else {
          toast.error(t(LabelConstants.MSG_INVALID_REQUEST));
        }
      }
    }
  };

  const handleValidateNewMobileOTP = async (data: IFormInput) => {
    if (data.verificationCode && String(data.verificationCode).length > 0) {
      setOtpError('');
      const payload: VerifyOTPPayload = {
        ChangePhoneNumberTrackingId: trackingId,
        SecretKey: otpResponse?.SecretKey,
        CustomKey: otpResponse?.CustomKey,
        OTP: data.verificationCode,
      };
      const response = await ProfileService.verifyNewMobileNumber(payload);
      if (response.IsSuccess) {
        const result = await MessageBox.open({
          content: t(LabelConstants.MOBILE_CHANGED_SUCCESSFULLY_MSG),
          type: MessageBoxType.Message,
        });
        if (result === MessageBoxResult.OK) {
          router.push('/profile');
        }
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
              {t(LabelConstants.NEW_MOBILE_MSG)}
            </span>
          </section>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full">
            <FormPhoneInputV1
              name="newMobileNumber"
              label={`${t(LabelConstants.NEW_MOBILE_NUMBER)}*`}
              control={control}
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
                onClick={handleSubmit(handleNewMobileSendOTP)}
              >
                {t(LabelConstants.RESEND_VERIFICATION_CODE)}
              </button>
            ) : (
              <button
                className="btn btn-link !min-w-[0] !w-[30%] !mb-0 !text-lg mt-8"
                onClick={handleSubmit(handleNewMobileSendOTP)}
              >
                {t(LabelConstants.SEND_VERIFICATION_CODE)}
              </button>
            )}
          </div>
          {otpError && <p className="error">{otpError}</p>}
          <button
            className="btn btn-primary uppercase"
            onClick={handleSubmit(handleValidateNewMobileOTP)}
            disabled={timer === 0}
          >
            {t(LabelConstants.VERIFY_PHONE_NUMBER_LBL)}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewMobile;
