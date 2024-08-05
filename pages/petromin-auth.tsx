import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
  InferGetServerSidePropsType,
} from 'next';
import { useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../types/enums';
import { AuthService } from '../helpers/services';
import { useRouter } from 'next/router';
import { AuthTokenResponse } from '../types/models';
import { SessionUtils } from '../helpers/utilities';
import Spinner from '../components/common/Spinner/spinner';
import { RedirectURL } from '../types/constants';
import MessageBox from '../components/common/MessageBox';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../types/i18n.labels';
import { PushDataToGTM } from '../helpers/utilities/gtm';
import { GTMEvents } from '../types/gtm';

type PetrominAuthPageProps = {
  code: string;
};

const PetrominAuth: NextPage<PetrominAuthPageProps> = ({
  code,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    const createSession = async () => {
      try {
        if (code) {
          const response = (await AuthService.getAuthToken(
            code,
            router.locale
          )) as any;

          /**
           *  Handle Unauthorized request
           */
          if (response.status === 401) {
            if (response.data !== 'INVALID_AUTH_CODE') {
              await MessageBox.open({
                content: `${t(LabelConstants.ACCOUNT_NOT_FOUND)}`,
              });
            }
          } else {
            const tokenData = response as AuthTokenResponse;
            SessionUtils.setUserDetails(tokenData);

            //Added GTM event for successful sign in
            PushDataToGTM(GTMEvents.SignIn, {
              userId:
                process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + tokenData.UserId,
            });
          }

          const url = localStorage.getItem(RedirectURL) || '/';
          router.push(url);
        }
      } catch (err) {}
    };

    createSession();
  }, [code, router]);

  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default PetrominAuth;

export const getServerSideProps: GetServerSideProps<
  PetrominAuthPageProps
> = async ({ locale, query }: GetServerSidePropsContext) => {
  const { code } = query;
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      code: code as string,
    },
  };
};
