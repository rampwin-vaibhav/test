import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '../../../components/common/Spinner/spinner';
import { ProfileService } from '../../../helpers/services';
import { CommonUtils } from '../../../helpers/utilities';
import { Locales } from '../../../types/enums';
import { LabelConstants } from '../../../types/i18n.labels';
import { ValidateEmailPayload } from '../../../types/models';
import Head from 'next/head';

const EmailVerification = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const secrets = router.query.secrets;

  const [message, setMessage] = useState<string>('');
  const [loader, setLoader] = useState<boolean>();

  useEffect(() => {
    const initialLoad = async () => {
      if (secrets && secrets.length > 0 && secrets.length == 2) {
        setLoader(true);
        const payload: ValidateEmailPayload = {
          IdentifierKey: secrets[1],
          RegistrationId: CommonUtils.decode<number>(secrets[0]),
        };

        const response = await ProfileService.validateEmailVerificationLink(
          payload
        );

        if (response.IsVerified) {
          router.push(`/account/create-account/${secrets[0]}`);
        } else {
          if (response.MessageCode === 'EMAIL_VERIFICATION_LINK_INVALID') {
            setMessage(t(LabelConstants.MSG_EMAIL_VERIFICATION_LINK_INVALID));
          } else {
            setMessage(t(LabelConstants.MSG_EMAIL_VERIFICATION_LINK_INVALID));
          }
        }
      } else {
        setMessage(t(LabelConstants.MSG_EMAIL_VERIFICATION_LINK_INVALID));
      }
      setLoader(false);
    };
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  if (loader) {
    return (
      <div className="account-container flex flex-col sm:items-center sm:justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="account-container flex justify-center md:justify-between">
      <Head>
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
          as="image"
        />
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/gogo-motors.svg`}
          as="image"
        />
      </Head>
      <div className="w-1/2 hidden md:block ">
        <picture>
          <source
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
            type="image/webp"
          />
          <img
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
            alt="gogo motor"
            className="fixed h-[100vh] w-1/2 object-fill"
          />
        </picture>
      </div>
      <div className="flex justify-center sm:w-1/2 h-full">
        <div className="sm:w-[31.25rem] sm:px-[1.25rem]">
          <div className="w-full flex flex-col items-center justify-center gap-y-5 mt-[6rem]">
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
          </div>
          <div className="mt-[2.125rem] text-center ">{message}</div>
        </div>
      </div>
    </div>
  );
};
export default EmailVerification;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

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
