import { useEffect, useState } from 'react';
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
  FormFile,
  FormPhoneInputV1,
  IsPhoneNumberValid,
} from '../../components/common/Form';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { useRouter } from 'next/router';
import { LabelConstants } from '../../types/i18n.labels';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import {
  PostSupportQueryPayload,
  PostSupportQueryResponse,
  ProfileData,
  SupportQueryType,
  SupportQueryTypeResponse,
} from '../../types/models';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileService, SupportService } from '../../helpers/services';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import MessageBox from '../../components/common/MessageBox';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '../../components/common/Modal';

type SupportPageProps = {
  supportQueryTypeData: SupportQueryTypeResponse;
};

interface IFormInput {
  firstName: string;
  lastName: string;
  queryType: SupportQueryType;
  email: string;
  mobile: string;
  images: Array<File>;
  question: string;
  captcha: string;
}

const schema = yup
  .object({
    firstName: yup
      .string()
      .required(LabelConstants.FIRST_NAME_REQUIRED)
      .max(100, LabelConstants.ALLOWED_MAX_100_CHAR)
      .matches(
        /^[\u0621-\u064Aa-zA-Z][\u0621-\u064A a-zA-Z]*$/,
        LabelConstants.LETTERS_ALLOWED
      )
      .matches(
        /^[^\s]+(\s+[^\s]+)*$/,
        LabelConstants.START_WITH_WHITE_SPACES_NOT_ALLOWED
      ),
    lastName: yup
      .string()
      .required(LabelConstants.LAST_NAME_REQUIRED)
      .max(100, LabelConstants.ALLOWED_MAX_100_CHAR)
      .matches(
        /^[\u0621-\u064Aa-zA-Z][\u0621-\u064A a-zA-Z]*$/,
        LabelConstants.LETTERS_ALLOWED
      )
      .matches(
        /^[^\s]+(\s+[^\s]+)*$/,
        LabelConstants.START_WITH_WHITE_SPACES_NOT_ALLOWED
      ),
    email: yup
      .string()
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .max(150, LabelConstants.ALLOWED_MAX_150_CHAR),
    question: yup
      .string()
      .required(LabelConstants.ENTER_YOUR_QUERY)
      .max(200, LabelConstants.ALLOWED_MAX_200_CHAR),
    mobile: yup
      .string()
      .required(LabelConstants.MOBILE_NUMBER_REQUIRED)
      .test('validate', LabelConstants.INVALID_MOBILE_NUMBER, (number) =>
        IsPhoneNumberValid(number)
      ),
    captcha: yup
      .string()
      .typeError(LabelConstants.CAPTCHA_REQUIRED)
      .test('captchaRequired', LabelConstants.CAPTCHA_REQUIRED, (value) =>
        !SessionUtils.isValidSession() && !value ? false : true
      ),
  })
  .required();

const SupportPage: NextPage<SupportPageProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    trigger,
    watch,
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { images } = watch();

  const allowedImageFileSize = 5242880;
  const [supportQueryTypeData, setSupportQueryTypeData] =
    useState<SupportQueryTypeResponse>();
  const [isValidSession, setIsValidSession] = useState<boolean>();
  const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;
  const vehicleId = router.query.id;
  const [host, setHost] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    setIsValidSession(SessionUtils.isValidSession());
    setHost(document.location.origin);
  }, []);

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Raise Query Click
    PushDataToGTMWithSubEvents(
      GTMEvents.CustomerSupportRequest,
      GTMSubEvents.Initiated,
      {
        vehicleListingId:
          process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + vehicleId,
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
    const initialLoad = async () => {
      if (props.supportQueryTypeData)
        setSupportQueryTypeData(props.supportQueryTypeData);
      if (SessionUtils.isValidSession()) {
        const initialData: ProfileData = await ProfileService.fetchUserData(
          router.locale
        );
        reset({
          firstName:
            initialData && initialData.FirstName ? initialData.FirstName : '',
          lastName:
            initialData && initialData.LastName ? initialData.LastName : '',
          email:
            initialData && initialData.EmailAddress
              ? initialData.EmailAddress
              : '',
          mobile:
            initialData && initialData.MobileNumber
              ? initialData.MobileNumber
              : '',
          queryType:
            props.supportQueryTypeData &&
            props.supportQueryTypeData.SupportQueryTypes[0]
              ? props.supportQueryTypeData.SupportQueryTypes[0]
              : {},
        });
      } else {
        setValue(
          'queryType',
          props.supportQueryTypeData &&
            props.supportQueryTypeData.SupportQueryTypes[0] &&
            props.supportQueryTypeData.SupportQueryTypes[0]
        );
      }
    };
    initialLoad();
  }, [router, reset, vehicleId, setValue, props.supportQueryTypeData]);

  useEffect(() => {
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        if (images[i].size > allowedImageFileSize) {
          MessageBox.open({
            content: t(LabelConstants.FILE_SIZE_EXCEEDS_5_MB),
          });
          if (i === 0) setValue('images', []);
          else setValue('images', [images[0]]);
        } else if (
          images[i].type !== 'image/jpeg' &&
          images[i].type !== 'image/png' &&
          images[i].type !== 'image/jpg' &&
          images[i].type !== 'application/pdf'
        ) {
          MessageBox.open({
            content: t(LabelConstants.IMAGE_SELECTION_FORMAT),
          });
          if (i === 0) setValue('images', []);
          else setValue('images', [images[0]]);
        }
      }
    }
  }, [images, t, setValue, allowedImageFileSize]);

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        router.reload();
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, [router]);

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    const payload: PostSupportQueryPayload = {
      FirstName: data.firstName,
      LastName: data.lastName,
      EmailAddress: data.email,
      MobileNumber: data.mobile,
      SupportQueryTypeId: data.queryType.SupportQueryTypeId,
      VehicleListingId: String(vehicleId),
      Question: data.question,
      FileName1: data.images && data.images[0] && data.images[0].name,
      FileData1:
        data.images &&
        data.images[0] &&
        (await CommonUtils.convertBase64(data.images[0])),
      FileName2: data.images && data.images[1] && data.images[1].name,
      FileData2:
        data.images &&
        data.images[1] &&
        (await CommonUtils.convertBase64(data.images[1])),
      ArtifactTypeId: supportQueryTypeData?.SupportArtifactType.ArtifactTypeId!,
      RecaptchaToken: data.captcha,
      Language: CommonUtils.getLanguageId(router.locale!),
    };
    const response: PostSupportQueryResponse =
      await SupportService.postSupportQuery(payload);
    if (response && response.IsSuccess) {
      const user = SessionUtils.getUserDetails();

      //Added GTM event for Submit Query Click
      PushDataToGTMWithSubEvents(
        GTMEvents.CustomerSupportRequest,
        GTMSubEvents.Submitted,
        {
          vehicleListingId:
            process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + vehicleId,
          userId: user?.UserId
            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
            : null,
          languageId: router.locale,
        }
      );
      setShowModal(true);
      setMessage(LabelConstants.THANK_YOU_FOR_SUBMITTING_YOUR_QUERY);
    } else {
      await MessageBox.open({
        content: t(LabelConstants.SOMETHING_WENT_WRONG_ERROR),
      });
    }
  };
  const onChange = (token: string) => {
    setValue('captcha', token);
    trigger('captcha');
  };

  return (
    <PrivatePageLayout title={t(LabelConstants.CUSTOMER_SUPPORT)}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-gray-400 text-base">
            {t(LabelConstants.REQUEST_FROM_OUR_SUPPORT_TEAMS)}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-5">
            <FormInput
              control={control}
              name="firstName"
              label={`${t(LabelConstants.ENTER_FIRST_NAME)}*`}
            />
            <FormInput
              control={control}
              name="lastName"
              label={`${t(LabelConstants.ENTER_LAST_NAME)}*`}
            />
            <FormPhoneInputV1
              control={control}
              name="mobile"
              label={`${t(LabelConstants.MOBILE_NUMBER)}*`}
            />
            <FormInput
              control={control}
              name="email"
              label={`${t(LabelConstants.ENTER_EMAIL)}*`}
            />
            <FormDropdown
              options={supportQueryTypeData?.SupportQueryTypes!}
              labelAccessor="SupportQueryType"
              valueAccessor="SupportQueryTypeId"
              labelText={`${t(LabelConstants.CHOOSE_A_QUERY)}*`}
              control={control}
              name="queryType"
              isSearchable={false}
              clearText=""
            />
            <FormTextarea
              control={control}
              name="question"
              label={`${t(LabelConstants.QUESTION)}*`}
              rows={4}
            />
            <div className="md:col-span-2">
              <label className="mt-5 label-style label-text">
                {t(LabelConstants.VEHICLE_URL)}
              </label>
              <h1 className="text-xl font-semibold">
                <Link href={`/car-details/${vehicleId}`}>
                  <a className="hover:text-hover">{`${host}/car-details/${vehicleId}`}</a>
                </Link>
              </h1>
            </div>
            <div className="md:col-span-2">
              <label className="mt-4 label-style label-text">
                {t(LabelConstants.VEHICLE_ID)}
              </label>
              <h1 className=" text-xl font-semibold ">
                {String(vehicleId).padStart(8, '0')}
              </h1>
            </div>
            <div className="md:col-span-2 sm:w-1/3">
              <h1 className="mb-2 text-xs text-gray-500">
                {t(LabelConstants.MAXIMUM_2_ATTACHMENTS)}
              </h1>
              <FormFile
                control={control}
                name="images"
                accept="image/png, image/jpeg"
                multiple={true}
                max={2}
              />
            </div>
            {isValidSession === false && (
              <div className="md:col-span-2 mb-6">
                <div className={router.locale === Locales.EN ? '' : 'hidden'}>
                  <ReCAPTCHA
                    sitekey={CAPTCHA_SITE_KEY || ''}
                    onChange={(e) => onChange(e!)}
                    hl="en"
                  />
                </div>
                <div className={router.locale === Locales.AR ? '' : 'hidden'}>
                  <ReCAPTCHA
                    sitekey={CAPTCHA_SITE_KEY || ''}
                    onChange={(e) => onChange(e!)}
                    hl="ar"
                  />
                </div>
                {errors.captcha && errors.captcha.message && (
                  <p className="error">{t(errors.captcha.message)}</p>
                )}
              </div>
            )}
          </div>
          <div className="flex md:justify-start justify-center flex-wrap w-full mt-4 gap-5">
            <button
              type="button"
              className="btn btn-secondary btn-sm uppercase"
              onClick={() => router.back()}
            >
              {t(LabelConstants.CANCEL)}
            </button>
            <button type="submit" className="btn btn-primary btn-sm uppercase">
              {t(LabelConstants.SUBMIT)}
            </button>
          </div>
        </form>
        <Modal
          show={showModal}
          size={ModalSize.EXTRA_LARGE}
          onClose={() => {
            setShowModal(false);
          }}
        >
          <>
            <ModalBody>
              <div className="justify-center" dir="ltr">
                <h1 className="mt-8 text-center text-base ">{t(message)}</h1>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="text-center">
                <Link href="/all-listings">
                  <button className="btn btn-primary btn-modal px-5 text-center">
                    {t(LabelConstants.OK)}
                  </button>
                </Link>
              </div>
            </ModalFooter>
          </>
        </Modal>
      </div>
    </PrivatePageLayout>
  );
};
export default SupportPage;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps<SupportPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const supportQueryTypeData: SupportQueryTypeResponse =
    await SupportService.fetchSupportQueryType(locale);
  return {
    props: {
      supportQueryTypeData,
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};
