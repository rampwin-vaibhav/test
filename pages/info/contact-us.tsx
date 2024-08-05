import { useEffect, useMemo, useState } from 'react';
import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import {
  FormDropdown,
  FormInput,
  FormTextarea,
  FormPhoneInputV1,
  IsPhoneNumberValid,
} from '../../components/common/Form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { useRouter } from 'next/router';
import { LabelConstants } from '../../types/i18n.labels';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import {
  Cities,
  CitiesResponse,
  PostFeedbackPayload,
  PostFeedbackResponse,
  ProfileData,
  UpdateRefundResponse,
} from '../../types/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  GlobalService,
  PackageSubscription,
  ProfileService,
  SupportService,
} from '../../helpers/services';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '../../components/common/Modal';
import { CircleSuccessIcon } from '../../components/icons';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import MetaDataComponent from '../../components/PagesMetaData/MetaDataComponent';
import { RequestRefund } from '../../types/constants';

type ContactUsPageProps = {
  cities: Cities[];
  title?: string;
  description?: string;
};

interface IFormInput {
  firstName: string;
  city: Cities;
  email: string;
  mobile: string;
  cities: Array<Cities>;
  comments: string;
  captcha: string;
}

const schema = yup
  .object({
    firstName: yup
      .string()
      .required(LabelConstants.NAME_IS_REQUIRED)
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
    city: yup.object().required(LabelConstants.CITY_IS_REQUIRED),
    email: yup
      .string()
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .test(
        'maxDigit',
        LabelConstants.ALLOWED_MAX_150_CHAR,
        (number) => String(number).length <= 150
      ),
    comments: yup
      .string()
      .required(LabelConstants.FEEDBACK_IS_REQUIRED)
      .test(
        'maxCharacter',
        LabelConstants.ALLOWED_MAX_2000_CHAR,
        (number) => String(number).length <= 2000
      ),
    mobile: yup
      .string()
      .required(LabelConstants.MOBILE_NUMBER_REQUIRED)
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
    captcha: yup
      .string()
      .test('captchaRequired', LabelConstants.CAPTCHA_REQUIRED, (value) =>
        !SessionUtils.isValidSession() && !value ? false : true
      ),
  })
  .required();

const ContactUsPage: NextPage<ContactUsPageProps> = ({
  cities,
  title,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [successModal, setSuccessModal] = useState<boolean>(false);
  const [isValidSession, setIsValidSession] = useState<boolean>();
  const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;

  useEffect(() => {
    setIsValidSession(SessionUtils.isValidSession());
  }, []);

  useEffect(() => {
    const initialLoad = async () => {
      if (SessionUtils.isValidSession()) {
        const initialData: ProfileData = await ProfileService.fetchUserData(
          router.locale
        );
        const selectedCity = cities?.find(
          (city) => city.CityId === initialData.CityId
        );

        reset({
          firstName:
            initialData && initialData.FirstName
              ? `${initialData.FirstName} ${initialData.LastName || ''}`
              : '',
          email:
            initialData && initialData.EmailAddress
              ? initialData.EmailAddress
              : '',
          mobile:
            initialData && initialData.MobileNumber
              ? initialData.MobileNumber
              : '',
          city: initialData && initialData.CityId ? selectedCity : undefined,
        });
      }
    };
    initialLoad();
  }, [router, reset]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const payload: PostFeedbackPayload = {
      MobileNumber: data.mobile,
      EmailAddress: data.email,
      Name: data.firstName,
      CityId: data.city.CityId,
      FeedbackText: data.comments,
      RecaptchaToken: data.captcha,
      Language: CommonUtils.getLanguageId(router.locale!),
      B2COrderItemId: Number(router?.query?.orderItemId),
    };
    const response: PostFeedbackResponse = await SupportService.postFeedback(
      payload
    );
    if (router?.query?.orderItemId) {
      const RefundPayload = {
        B2COrderItemId: Number(router?.query?.orderItemId),
        RefundStatus: RequestRefund.RequestRefundKey,
      };
      const refundResponse: UpdateRefundResponse =
        await PackageSubscription.updateRefundStatus(RefundPayload);
    }
    if (response && response.IsSuccess) {
      setSuccessModal(true);
    }
  };
  const onChange = (recaptchaValue: string) => {
    setValue('captcha', recaptchaValue);
    trigger('captcha');
  };

  return (
    <>
      <MetaDataComponent title={title} description={description} />
      <PrivatePageLayout title={t(LabelConstants.CONTACT_US)}>
        <>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
                <FormInput
                  control={control}
                  name="firstName"
                  label={`${t(LabelConstants.NAME)}*`}
                />
                <FormInput
                  control={control}
                  name="email"
                  label={`${t(LabelConstants.ENTER_EMAIL)}*`}
                />
                <FormPhoneInputV1
                  control={control}
                  name="mobile"
                  label={`${t(LabelConstants.MOBILE_NUMBER)}*`}
                />
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
              </div>
              <div className="my-7">
                <FormTextarea
                  control={control}
                  name="comments"
                  label={`${t(LabelConstants.SHARE_YOUR_FEEDBACK)}*`}
                />
              </div>
              {!isValidSession && (
                <div className="mb-6">
                  {router.locale === Locales.EN ? (
                    <div>
                      <ReCAPTCHA
                        sitekey={CAPTCHA_SITE_KEY || ''}
                        onChange={(e) => onChange(e!)}
                        hl="en"
                      />
                    </div>
                  ) : (
                    <div>
                      <ReCAPTCHA
                        sitekey={CAPTCHA_SITE_KEY || ''}
                        onChange={(e) => onChange(e!)}
                        hl="ar"
                      />
                    </div>
                  )}
                  {errors.captcha && errors.captcha.message && (
                    <p className="error">{t(errors.captcha.message)}</p>
                  )}
                </div>
              )}
              <div className="flex justify-start w-full mt-4 gap-5">
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
          {/* Feedback Save Success Modal */}
          <Modal
            show={successModal}
            size={ModalSize.DEFAULT}
            onClose={() => {
              router.push('/');
              setSuccessModal(false);
            }}
          >
            <>
              <ModalBody>
                <div className="justify-center">
                  <CircleSuccessIcon className="h-12 w-12 mx-auto" />
                  <h1 className="mt-4 text-center text-base">
                    {t(LabelConstants.THANKS_FOR_SHARE_DETAILS)}
                  </h1>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="text-center">
                  <Link href="/">
                    <button className="btn btn-primary btn-modal">
                      {t(LabelConstants.OK)}
                    </button>
                  </Link>
                </div>
              </ModalFooter>
            </>
          </Modal>
        </>
      </PrivatePageLayout>
    </>
  );
};
export default ContactUsPage;

export const getStaticProps: GetStaticProps<ContactUsPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const res: CitiesResponse = await GlobalService.fetchCities(locale);
  const translations = await serverSideTranslations(locale || Locales.EN, [
    'common',
  ]);
  const title =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_TITLE_CONTACT_US;
  const description =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_DESCRIPTION_CONTACT_US;
  return {
    props: {
      cities: res.cities,
      ...translations,
      title,
      description,
    },
    revalidate: 86400, // Revalidate every 1 Day
  };
};
