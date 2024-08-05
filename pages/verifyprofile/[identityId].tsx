import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ProfileService } from '../../helpers/services';

const VerifyProfile = (): InferGetStaticPropsType<typeof getStaticProps> => {
  const router = useRouter();
  const { t } = useTranslation();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const initialLoad = async () => {
      const param: any = router?.query?.identityId;
      if (param) {
        const getStatusCode = await ProfileService.fetchUserProfileStatus(
          param
        );
        if (getStatusCode) {
          const code = getStatusCode.MessageCode;
          if (code === 'EMAIL_VERIFIED') {
            setMessage(LabelConstants.EMAIL_VERIFIED);
          } else if (code === 'EMAIL_LINK_EXPIRED') {
            setMessage(LabelConstants.EMAIL_LINK_EXPIRED);
          } else if (code === 'EMAIL_LINK_INVALID') {
            setMessage(LabelConstants.EMAIL_LINK_INVALID);
          }
        }
      }
    };
    initialLoad();
  }, [router]);

  return (
    <PrivatePageLayout>
      <div className="w-full flex justify-center text-center items-center">
        <div className="flex flex-col justify-center text-centre w-1/2 h-1/2 bg-white p-12 shadow-md">
          <p className="text-blue-500	text-2xl font-semibold">{t(message)}</p>
        </div>
      </div>
    </PrivatePageLayout>
  );
};

export default VerifyProfile;

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
    },
  };
};
