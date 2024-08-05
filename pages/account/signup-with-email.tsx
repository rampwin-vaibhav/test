import { useEffect, useState } from 'react';
import { FormInput } from '../../components/common/Form';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ConfigurationKey, Locales } from '../../types/enums';
import { AuthService, ProfileService } from '../../helpers/services';
import { CommonUtils } from '../../helpers/utilities';
import { VerifyEmailPayload } from '../../types/models';
import { toast } from 'react-toastify';
import { ProfileIcon } from '../../components/icons';
import Link from 'next/link';
import Spinner from '../../components/common/Spinner/spinner';

interface IFormInput {
  emailId: string;
}
const schema = yup
  .object({
    emailId: yup
      .string()
      .nullable()
      .required(LabelConstants.EMAIL_IS_REQUIRED)
      .email(LabelConstants.EMAIL_FORMAT_SHOULD_BE)
      .test(
        'maxDigit',
        LabelConstants.ALLOWED_MAX_150_CHAR,
        (number) => String(number).length <= 150
      ),
  })
  .required();

const SignUpEmail = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [loader, setLoader] = useState<boolean>(false);

  const { control, handleSubmit } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [campaignKey, setCampaignKey] = useState('');

  useEffect(() => {
    if (
      localStorage.getItem(ConfigurationKey.PromotionCodeForCampaignUser) &&
      localStorage.getItem(ConfigurationKey.PromotionCodeForCampaignUser) !== ''
    ) {
      setCampaignKey(
        localStorage.getItem(ConfigurationKey.PromotionCodeForCampaignUser)!
      );
    }
  }, []);

  const onSignInClickHandler = async () => {
    // const response = await AuthService.fetchSignInUrl(
    //   CommonUtils.getLanguageId(router.locale!)
    // );
    // if (response) {
    //   window.location.href = response;
    // }
    router.push('/sign-in');
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    setLoader(true);
    const payload: VerifyEmailPayload = {
      EmailAddress: data.emailId,
      Language: router.locale === Locales.EN ? 'English' : 'Arabic',
      CampaignKey: campaignKey,
    };
    const response = await ProfileService.verifyAndSendVerificationLink(
      payload
    );
    if (
      response.IsSuccess &&
      response.MessageCode === 'VERIFICATION_LINK_SENT'
    ) {
      /** Navigate to successPage */
      const params: Array<string> = [`e=${encodeURIComponent(data.emailId)}`];
      if (campaignKey) params.push(`c=${campaignKey}`);
      router.push(`/account/signup-info?${params.join('&')}`);
    } else {
      if (response.MessageCode === 'EMAIL_ALREADY_EXISTS') {
        toast.error(t(LabelConstants.MSG_EMAIL_ALREADY_EXISTS));
      } else {
        toast.error(t(LabelConstants.MSG_VERIFICATION_LINK_SENT_FAILURE));
      }
    }
    setLoader(false);
  };

  return (
    <div
      className={`w-full account-container flex justify-center sm:justify-between ${
        loader ? 'relative' : ''
      }`}
    >
      {loader && (
        <div className="absolute bg-lighter-gray opacity-50 top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      <div className="w-1/2 h-full hidden sm:block">
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
            <ProfileIcon className="w-[4.904rem] h-[4.904rem] text-primary mt-[2.16rem]" />
            <span className="text-4xl font-semibold mt-2 text-primary">
              {t(LabelConstants.SIGN_UP)}
            </span>
          </div>
          <div className="mt-[2.125rem]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-5">
                <div className="flex flex-col gap-y-1">
                  <div className="flex flex-col gap-y-2">
                    <FormInput
                      control={control}
                      name="emailId"
                      label={`${t(LabelConstants.EMAIL_ID)}*`}
                      className="!px-[12px] !py-[20px]"
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary uppercase btn-auto"
                  type="submit"
                >
                  {t(LabelConstants.VERIFY)}
                </button>
              </div>
            </form>
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
        </div>
      </div>
    </div>
  );
};
export default SignUpEmail;

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
