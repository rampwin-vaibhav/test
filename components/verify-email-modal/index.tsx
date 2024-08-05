import { Modal, ModalHeader, ModalBody } from '../common/Modal';
import {
  SendVerificationCodePayload,
  VerifyEmailOTPPayload,
  SendVerificationCodeResponse,
} from '../../types/models';
import { SetStateAction, useEffect, useState } from 'react';
import { OtpService } from '../../helpers/services';
import OTPTimer from '../common/OTPTimer';
import { LabelConstants } from '../../types/i18n.labels';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { FormInput } from '../common/Form';
import { useTranslation } from 'next-i18next';
import MessageBox, { MessageBoxType } from '../common/MessageBox';
import Spinner from '../common/Spinner/spinner';

interface VerifyEmailFormInput {
  emailAddress: string;
  verificationCode: number;
}

type verifyModalProps = {
  setOpenEmailModal: (value: SetStateAction<boolean>) => void;
  openEmailModal: boolean;
  setUserDataReload: (value: SetStateAction<boolean>) => void;
};

const verifyEmailSchema = yup
  .object({
    emailAddress: yup
      .string()
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .test(
        'maxDigit',
        LabelConstants.ALLOWED_MAX_150_CHAR,
        (number) => String(number).length <= 150
      ),
  })
  .required();

const VerifyEmailModal = ({
  openEmailModal,
  setOpenEmailModal,
  setUserDataReload,
}: verifyModalProps) => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, reset, watch, getFieldState } =
    useForm<VerifyEmailFormInput>({
      resolver: yupResolver(verifyEmailSchema),
    });
  const { verificationCode, emailAddress } = watch();
  const [timer, setTimer] = useState<number>(0);
  const [otpError, setOtpError] = useState<string | undefined>();
  const [emailExistError, setEmailExistError] = useState<string | undefined>();
  const [otpResponse, setOtpResponse] =
    useState<SendVerificationCodeResponse>();
  const [loader, setLoader] = useState<boolean>();

  useEffect(() => {
    const otpField = getFieldState('verificationCode');
    const emailField = getFieldState('emailAddress');
    if (verificationCode || emailAddress) {
      if (otpField.isDirty || emailField.isDirty) {
        setOtpError(undefined);
      }
    }
  }, [verificationCode, getFieldState, setValue, emailAddress]);

  useEffect(() => {
    const emailField = getFieldState('emailAddress');
    if (emailAddress) {
      if (emailField.isDirty) {
        setEmailExistError(undefined);
        setTimer(0);
      }
    }
  }, [emailAddress, getFieldState]);

  useEffect(() => {
    if (openEmailModal) {
      reset();
      setOtpError(undefined);
      setTimer(0);
      setEmailExistError(undefined);
    }
  }, [openEmailModal, reset]);

  const handleSendOTP = async (data: VerifyEmailFormInput) => {
    setValue('verificationCode', 0);
    setTimer(0);
    setLoader(true);
    if (data) {
      const payload: SendVerificationCodePayload = {
        EmailAddress: data.emailAddress,
      };
      const response = await OtpService.sendVerificationCode(payload);
      if (response && response.SecretKey) {
        setOtpResponse(response);
        setTimer(90);
        setOtpError(undefined);
        toast.success(t(LabelConstants.MSG_OTP_SENT_SUCCESSFULLY));
      }
    }
    setLoader(false);
  };

  const handleVerifyOTP = async (data: VerifyEmailFormInput) => {
    if (data.verificationCode) {
      setOtpError(undefined);
      const payload: VerifyEmailOTPPayload = {
        Email: data.emailAddress,
        SecretKey: otpResponse?.SecretKey || '',
        VerificationCode: data.verificationCode,
      };

      const response = await OtpService.verifyEmailOTP(payload);
      if (
        response.IsSuccess &&
        response.MessageCode === 'EMAIL_UPDATED_SUCCESSFULLY'
      ) {
        setTimer(0);
        setOpenEmailModal(false);
        setUserDataReload(true);
        await MessageBox.open({
          content: `${t(LabelConstants.EMAIL_UPDATE_SUCCESS_MSG)}`,
          type: MessageBoxType.Message,
        });
      } else if (response.MessageCode === 'EMAIL_ALREADY_EXISTS') {
        setEmailExistError(t(LabelConstants.EMAIL_ALREADY_EXISTS));
      } else {
        setOtpError(t(LabelConstants.INVALID_OTP));
      }
    } else {
      setOtpError(t(LabelConstants.PLEASE_ENTER_OTP));
    }
  };

  return (
    <>
      <Modal
        show={openEmailModal}
        onClose={() => setOpenEmailModal(false)}
        containerClassName="min-w-md max-w-3xl"
      >
        <form id="email-form" className="sm:w-[38rem]">
          <ModalHeader>
            <label className="text-xl">
              {t(LabelConstants.VERIFY_EMAIL_LABEL)}
            </label>
          </ModalHeader>
          <ModalBody>
            <>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-4">
                    <FormInput
                      control={control}
                      name="emailAddress"
                      label={t(LabelConstants.ENTER_EMAIL_ADDRESS)}
                    />
                    {loader ? (
                      <div className="mt-9">
                        <Spinner className="!w-8 !h-8" />
                      </div>
                    ) : (
                      <div>
                        {timer > 0 ? (
                          <button
                            className="btn btn-link !min-w-[0] mt-7"
                            onClick={handleSubmit(handleSendOTP)}
                            type="submit"
                          >
                            {t(LabelConstants.RESEND_OTP)}
                          </button>
                        ) : (
                          <button
                            className="btn btn-link !min-w-[0] mt-7"
                            onClick={handleSubmit(handleSendOTP)}
                            type="submit"
                          >
                            {t(LabelConstants.SEND_OTP)}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  {emailExistError && (
                    <p className="error mt-1">{emailExistError}</p>
                  )}
                </div>
                <div className="relative">
                  {timer > 0 ? (
                    <div>
                      <FormInput
                        control={control}
                        name="verificationCode"
                        label={t(LabelConstants.OTP)}
                        maxLength={6}
                        autoComplete="off"
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                  {otpError && <p className="error mt-1">{otpError}</p>}
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
              {timer > 0 ? (
                <div className="flex justify-center gap-1 sm:gap-5">
                  <button
                    className="btn btn-primary btn-modal px-5 text-center uppercase"
                    type="button"
                    onClick={handleSubmit(handleVerifyOTP)}
                    disabled={timer === 0}
                  >
                    {t(LabelConstants.VERIFY)}
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          </ModalBody>
        </form>
      </Modal>
    </>
  );
};

export default VerifyEmailModal;
