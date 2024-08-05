import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormInputV1, IsPhoneNumberValid } from '../../components/common/Form';
import FormDropdownV1 from '../../components/common/Form/FormDropdownV1';
import FormPhoneInputV2 from '../../components/common/Form/FormPhoneInputV2';
import OTPTimer from '../../components/common/OTPTimer';
import { ArrowLeftIcon, ArrowRightIcon } from '../../components/icons';
import { AuthService } from '../../helpers/services';
import { SessionUtils } from '../../helpers/utilities';
import { PushDataToGTM } from '../../helpers/utilities/gtm';
import { useAppContext } from '../../provider/AppProvider';
import { GTMEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';
import { AuthTokenWithOtpResponse } from '../../types/models';

type Props = {
  cities: [];
  cars: [];
};

type IFormInput = {
  full_name: string;
  mobile_number: string;
  email: string;
  city: { label: string; value: string };
  car: { label: string; value: string };
  salary: { value: string; label_en: string; label_ar: string };
  employment_duration: { value: string; label_en: string; label_ar: string };
  marketing_consent_check: boolean;
  has_driving_license: boolean;
  otp_number: number;
};

const employmentDuration = [
  {
    value: 'Less than 3 months',
    label_en: 'Less than 3 months',
    label_ar: 'أقل من 3 أشهر',
  },
  {
    value: 'More than 3 months',
    label_en: 'More than 3 months',
    label_ar: 'أكثر من 3 أشهر',
  },
];

const salaryOptions = [
  {
    value: 'Below SR. 3,999',
    label_en: 'Below SR. 3,999',
    label_ar: 'أقل من 3,999 ريال سعودي',
  },
  {
    value: 'From SR. 4,000 to SR. 6,999',
    label_en: 'From SR. 4,000 to SR. 6,999',
    label_ar: 'من 4,000 إلى 6,999 ريال سعودي',
  },
  {
    value: 'From SR.7,000 to SR. 9,999',
    label_en: 'From SR.7,000 to SR. 9,999',
    label_ar: 'من 7,000 إلى 9,999 ريال سعودي',
  },
  {
    value: 'From SR. 10,000 and above',
    label_en: 'From SR. 10,000 and above',
    label_ar: 'من 10,000 ريال سعودي وأكثر',
  },
];

const RequestQuote = ({ cities, cars }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const schema = yup.object({
    full_name: yup.string().required(t(`${LabelConstants.REQUIRED_FIELD}`)),
    mobile_number: yup
      .string()
      .typeError(t(LabelConstants.INVALID_MOBILE_NUMBER))
      .required(t(LabelConstants.MOBILE_NUMBER_REQUIRED))
      .nullable(),
    email: yup
      .string()
      .email()
      .required(t(`${LabelConstants.REQUIRED_FIELD}`)),
    city: yup.object().required(t(`${LabelConstants.REQUIRED_FIELD}`)),
    car: yup.object().required(t(`${LabelConstants.REQUIRED_FIELD}`)),
    salary: yup.object().required(t(`${LabelConstants.REQUIRED_FIELD}`)),
    employment_duration: yup
      .object()
      .required(t(`${LabelConstants.REQUIRED_FIELD}`)),
    marketing_consent_check: yup.boolean().required(),
    has_driving_license: yup.boolean().required(),
  });
  const {
    control,
    watch,
    handleSubmit,
    trigger,
    setFocus,
    setError,
    setValue,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      mobile_number: '',
    },
  });

  const {
    marketing_consent_check,
    has_driving_license,
    mobile_number,
    otp_number,
  } = watch();
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [otpError, setOtpError] = useState<string>();
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [sessionKey, setSessionKey] = useState('');
  const { setIsLoggedIn } = useAppContext();

  useEffect(() => {
    const isAuthenticated = SessionUtils.isValidSession();
    if (isAuthenticated) {
      const userDetails = SessionUtils.getUserDetails();
      setValue('mobile_number', userDetails?.MobileNumber as string);
      setIsMobileVerified(true);
    }
  }, [setValue]);

  const handleSendOTP = async () => {
    const valid = IsPhoneNumberValid(mobile_number);
    if (valid) {
      trigger('mobile_number');
      setTimer(0);
      const mobileNumber = mobile_number;
      setLoading(true);
      const otpRes = await AuthService.sendLoginOTP({
        MobileNumber: mobileNumber,
      });
      setLoading(false);
      if (otpRes) {
        setTimer(90);
        setOtpError('');
        setSessionKey(otpRes.SessionKey);
      }
    } else {
      setError(
        'mobile_number',
        { message: t(LabelConstants.INVALID_MOBILE_NUMBER) },
        { shouldFocus: true }
      );
    }
  };

  const handleVerifyOtp = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (otp_number) {
      setLoading(true);
      const response = await AuthService.getAuthTokenWithOTP(
        mobile_number,
        sessionKey,
        String(otp_number)
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
        setLoading(false);
        setTimer(null);
        setIsMobileVerified(true);
      }
    } else {
      setOtpError(t(LabelConstants.PLEASE_ENTER_OTP));
    }
  };

  useEffect(() => {
    if (timer !== 0) {
      setFocus('otp_number');
    }
  }, [timer, setFocus]);

  const handleRequestSubmit = async (values: IFormInput) => {
    const queryParams = router.query;

    const utmSource = queryParams.utm_source;
    const utmMedium = queryParams.utm_medium;
    const utmContent = queryParams.utm_content;
    const utmCampaign = queryParams.utm_campaign;

    const bodyData = {
      first_name: values.full_name,
      last_name: '',
      mobile_number: values.mobile_number,
      email: values.email,
      salary: values.salary.value,
      employment_duration: values.employment_duration.value,
      city: values.city.value,
      car: values.car.value,
      utm_source: utmSource || '',
      utm_medium: utmMedium || '',
      utm_content: utmContent || '',
      utm_campaign: utmCampaign || '',
      has_driving_license: values.has_driving_license ? 'Yes' : 'No',
      marketing_consent: values.marketing_consent_check ? 'Yes' : 'No',
      language: router.locale === 'en' ? 'english' : 'arabic',
    };

    const url = process.env.NEXT_PUBLIC_LEAD_WEBHOOK as string;

    setLoading(true);
    await axios.post(url, bodyData);

    setLoading(false);
  };
  return (
    <section className="px-[20px] py-[40px] border-y border-y-[#c2c2c2] my-[60px]">
      <div className="max-w-[1152px] mx-auto">
        <div className="text-center mb-[30px]">
          <h2 className="text-primary text-[40px] font-bold">
            {t('CAMPAIGN_PAGE.QUOTE_TITLE')}
          </h2>
          <p className="text-[20px]">{t('CAMPAIGN_PAGE.QUOTE_SUB_TITLE')}</p>
        </div>

        <form>
          <h4 className="text-[14px] font-bold uppercase mb-[20px]">
            {t('CAMPAIGN_PAGE.PERSONAL_INFORMATION')}
          </h4>
          <div className="flex flex-col md:flex-row gap-2 flex-wrap items-stretch">
            <div className="mb-3 w-full md:w-[30%]">
              <FormInputV1
                control={control}
                name="full_name"
                label={t('ENTER_FULL_NAME')}
                placeholder={t(LabelConstants.NAME)}
                disabled={loading}
              />
            </div>

            <div className="mb-3 w-full md:w-[30%] flex flex-col">
              <FormPhoneInputV2
                control={control}
                label={t('MOBILE_NUMBER')}
                disabled={loading || isMobileVerified}
                name="mobile_number"
                onBlur={handleSendOTP}
                validated={isMobileVerified}
              />

              {timer !== null && (
                <div className="mt-5 flex items-center gap-2">
                  <div className="w-10/12">
                    <FormInputV1
                      control={control}
                      name="otp_number"
                      pattern={/[^0-9]+/}
                      autoComplete="off"
                      showError={!!otpError}
                      disabled={loading}
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
                          <a
                            onClick={handleSendOTP}
                            className="text-[14px] font-semibold text-primary cursor-pointer"
                          >
                            {t(LabelConstants.RESEND_OTP)}
                          </a>
                        )
                      }
                    />
                  </div>
                  <button
                    className="self-start bg-black text-white px-[34px] py-[14px] rounded-[40px] flex items-center text-[12px]"
                    onClick={handleVerifyOtp}
                  >
                    {t(LabelConstants.VERIFY)}
                  </button>
                </div>
              )}
            </div>
            <div className="mb-3 w-full md:w-[30%]">
              <FormInputV1
                control={control}
                name="email"
                label={t(LabelConstants.ENTER_EMAIL)}
                placeholder={t(LabelConstants.EMAIL)}
                disabled={loading}
              />
            </div>

            <div className="mb-3 w-full md:w-[30%]">
              <FormDropdownV1
                control={control}
                name="city"
                options={cities}
                labelAccessor="label"
                valueAccessor="value"
                placeHolderText={t(LabelConstants.SELECT_CITY)}
                disabled={loading}
              />
            </div>

            <div className="w-full md:w-[30%] mb-3">
              <FormDropdownV1
                control={control}
                name="car"
                options={cars}
                labelAccessor="label"
                valueAccessor="value"
                placeHolderText={t('CAMPAIGN_PAGE.CAR_TO_PURCHASE')}
                disabled={loading}
              />
            </div>

            <div className="w-full md:w-[30%] mb-3">
              <FormDropdownV1
                control={control}
                name="salary"
                options={salaryOptions}
                labelAccessor={router.locale === 'en' ? 'label_en' : 'label_ar'}
                valueAccessor="value"
                placeHolderText={t('CAMPAIGN_PAGE.MONTHLY_SALARY')}
                disabled={loading}
              />
            </div>

            <div className="w-full md:w-[30%] mb-3">
              <FormDropdownV1
                control={control}
                name="employment_duration"
                options={employmentDuration}
                labelAccessor={router.locale === 'en' ? 'label_en' : 'label_ar'}
                valueAccessor="value"
                placeHolderText={t('CAMPAIGN_PAGE.CURRENT_EMPLOYMENT_DURATION')}
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <Controller
                control={control}
                render={({ field }: { field: any }) => (
                  <input
                    className="!h-4 !w-4"
                    type="checkbox"
                    value="Yes"
                    name="has_driving_license"
                    id="drivingLicense"
                    disabled={loading}
                    {...field}
                  />
                )}
                name="has_driving_license"
              />
              <label htmlFor="drivingLicense">
                {t('CAMPAIGN_PAGE.DRIVING_LICENSE')}
              </label>
            </div>
            <div className="flex items-baseline gap-2">
              <Controller
                control={control}
                render={({ field }: { field: any }) => (
                  <input
                    className="!h-4 !w-4"
                    type="checkbox"
                    value="Yes"
                    name="marketing_consent_check"
                    id="terms"
                    disabled={loading}
                    {...field}
                  />
                )}
                name="marketing_consent_check"
              />
              <label htmlFor="terms">{t('CAMPAIGN_PAGE.QUOTE_CONSENT')}</label>
            </div>
          </div>

          <div className="flex justify-center text-[14px] font-semibold text-white uppercase mt-[5px]">
            <button
              onClick={handleSubmit(handleRequestSubmit)}
              className={`flex items-center bg-gradient px-8 py-6 md:px-6 md:py-4 rounded-md uppercase gap-2 ${
                marketing_consent_check &&
                has_driving_license &&
                !loading &&
                !otpError?.length
                  ? 'opacity-100'
                  : 'opacity-50'
              }`}
              disabled={
                !marketing_consent_check ||
                !has_driving_license ||
                loading ||
                !!otpError?.length
              }
            >
              {t('CAMPAIGN_PAGE.REQUEST_QUOTE')}{' '}
              {router.locale === 'en' ? (
                <ArrowRightIcon className="!h-3 !w-4 !text-white" />
              ) : (
                <ArrowLeftIcon className="!h-3 !w-4 !text-white" />
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RequestQuote;
