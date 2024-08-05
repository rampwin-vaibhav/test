import { useTranslation } from 'next-i18next';
import React, { useState, FC } from 'react';
import { AbsherMessageCode, ELMChoice } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { ProfileService } from '../../helpers/services';
import { useRouter } from 'next/router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../common/Form';
import { CommonUtils } from '../../helpers/utilities';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';

type AbsherProps = {
  userChoice: string;
  refreshUserData: Function;
  setUserId: Function;
  showTab2: boolean;
};

interface IFormInput {
  userNumber: string;
}

interface I2FormInput {
  verificationCode: string;
}

const AbsherVerification: FC<AbsherProps> = ({
  userChoice,
  refreshUserData,
  setUserId,
  showTab2,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isAbsherOTPGenerated, setIsAbsherOTPGenerated] = useState<
    boolean | null
  >(null);
  const schema = yup
    .object({
      userNumber: yup
        .string()
        .nullable()
        .test(
          'maxDigit',
          userChoice === ELMChoice.Iqama
            ? LabelConstants.INVALID_IQAMA_NUMBER
            : LabelConstants.INVALID_NATIONAL_ID,
          (data) => data?.trim().length === 10
        ),
    })
    .required();

  const { control, handleSubmit, watch } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const {
    control: controlVerification,
    handleSubmit: handleSubmit1,
    watch: watch1,
  } = useForm<I2FormInput>({});
  const { userNumber } = watch();
  const { verificationCode } = watch1();

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const payload = {
      CustomerId: data.userNumber,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
    };
    const generateData = await ProfileService.generateAbsherVerificationCode(
      payload
    );
    if (generateData.IsSuccess) {
      setIsAbsherOTPGenerated(generateData.IsSuccess);
    } else {
      await MessageBox.open({
        content: `${t(LabelConstants.ABSHER_VERIFICATION_FAILED)}`,
      });
    }
  };

  const onSubmit1: SubmitHandler<I2FormInput> = async (data: I2FormInput) => {
    const payload = {
      VerificationCode: data.verificationCode,
    };
    const verifyData = await ProfileService.verifyAbsherVerificationCode(
      payload
    );
    let errorMessageCode = '';
    let incorrectMessageCode = '';
    if (
      verifyData.MessageCode === AbsherMessageCode.ABSHER_VERIFICATION_SUCCESS
    ) {
      errorMessageCode = LabelConstants.ABSHER_VERIFICATION_SUCCESS_MSG;
      incorrectMessageCode = verifyData.MessageCode;
    } else if (
      verifyData.MessageCode ===
      AbsherMessageCode.ABSHER_VERIFICATION_CODE_NOT_FOUND
    ) {
      errorMessageCode = LabelConstants.ABSHER_VERIFICATION_CODE_NOT_FOUND;
    } else if (
      verifyData.MessageCode ===
      AbsherMessageCode.ABSHER_VERIFICATION_CODE_EXPIRED
    ) {
      errorMessageCode = LabelConstants.ABSHER_VERIFICATION_CODE_EXPIRED;
    } else if (
      verifyData.MessageCode === AbsherMessageCode.ABSHER_OTP_ATTEMPTS_EXCEEDED
    ) {
      errorMessageCode = LabelConstants.ABSHER_OTP_ATTEMPTS_EXCEEDED;
    } else if (
      verifyData.MessageCode ===
        AbsherMessageCode.INCORRECT_VERIFICATION_CODE ||
      verifyData.MessageCode === AbsherMessageCode.ABSHER_VERIFICATION_FAILED
    ) {
      incorrectMessageCode = verifyData.MessageCode;
      errorMessageCode = LabelConstants.ABSHER_VERIFICATION_FAILED;
    } else {
      errorMessageCode = LabelConstants.ABSHER_VERIFICATION_FAILED;
    }
    const result = await MessageBox.open({
      content: `${t(errorMessageCode)}`,
      type: MessageBoxType.Message,
    });

    if (result === MessageBoxResult.OK) {
      if (
        incorrectMessageCode !==
          AbsherMessageCode.INCORRECT_VERIFICATION_CODE &&
        incorrectMessageCode === AbsherMessageCode.ABSHER_VERIFICATION_SUCCESS
      ) {
        if (showTab2 === true) {
          if (router.query.tab !== 'Step2') {
            router.push(
              `/identity-verification?tab=Step2${
                router.query.redirectUrl
                  ? `&redirectUrl=${router.query.redirectUrl}`
                  : ``
              }`,
              undefined,
              {
                shallow: true,
              }
            );
          }
          refreshUserData();
          setUserId(userNumber);
        } else {
          const url: string = String(router?.query?.redirectUrl || '/profile');
          router.replace(url);
        }
      } else if (
        incorrectMessageCode !== AbsherMessageCode.INCORRECT_VERIFICATION_CODE
      ) {
        const url: string = String(router?.query?.redirectUrl || '/profile');
        router.replace(url);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-y-4">
        <form
          id="1"
          className="form-div mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-2">
            {userChoice === ELMChoice.Iqama ? (
              <>
                <FormInput
                  control={control}
                  name="userNumber"
                  label={t(LabelConstants.IQAMA_NUMBER)}
                  pattern={/[^0-9]+/}
                  maxLength={10}
                />
              </>
            ) : (
              <>
                <FormInput
                  control={control}
                  name="userNumber"
                  label={t(LabelConstants.NIN)}
                  pattern={/[^0-9]+/}
                  maxLength={10}
                />
              </>
            )}
          </div>
          {!isAbsherOTPGenerated && (
            <button
              className="btn btn-primary w-full mt-4 uppercase"
              type="submit"
              disabled={userNumber ? false : true}
            >
              {t(LabelConstants.GET_OTP)}
            </button>
          )}
        </form>
      </div>
      <form
        id="2"
        className="form-div mt-4"
        onSubmit={handleSubmit1(onSubmit1)}
      >
        {isAbsherOTPGenerated && (
          <div className="flex flex-col gap-y-2">
            <FormInput
              control={controlVerification}
              name="verificationCode"
              label={t(LabelConstants.VERIFICATION_CODE)}
              maxLength={6}
            />
          </div>
        )}
        <div className="mt-4">
          {isAbsherOTPGenerated && (
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={!verificationCode ? true : false}
            >
              {t(LabelConstants.VERIFY)}
            </button>
          )}
        </div>
      </form>
      {isAbsherOTPGenerated && (
        <>
          <div className="flex flex-col gap-y-1 mt-2">
            <div>{t(LabelConstants.NOTE)}</div>
            <div className="text-xs text-color mb-4">
              <ul className="list-disc">
                <li>{t(LabelConstants.OTP_VALIDATION_MESSAGE)}</li>
                <li>{t(LabelConstants.USER_ATTEMPT_MESSAGE)}</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AbsherVerification;
