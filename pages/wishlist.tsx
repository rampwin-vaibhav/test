import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SignInModal from '../components/common/SignInModal';
import { SessionUtils } from '../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../helpers/utilities/gtm';
import { Locales } from '../types/enums';
import { GTMEvents, GTMSubEvents } from '../types/gtm';
import { LabelConstants } from '../types/i18n.labels';

const WishList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);

  useEffect(() => {
    const isAuthenticated = SessionUtils.isValidSession();
    setIsAuthenticated(isAuthenticated);
  }, []);

  const startConcierge = () => {
    router.push('vehicle-wizard?tab=BodyType');
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Start Concierge Click
    PushDataToGTMWithSubEvents(
      GTMEvents.ConciergeServiceRequest,
      GTMSubEvents.Initiated,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
  };

  return (
    <>
      <Head>
        <link rel="preload" href="/images/concierge.jpg" as="image" />
      </Head>
      <div className="gogo-concierge-page relative w-full">
        <div className="w-full h-full relative">
          <img
            src="/images/concierge.jpg"
            className="w-full"
            alt="gogo motor"
          />
        </div>
        <div className="box relative sm:left-[10%] flex justify-center sm:absolute rounded-3xl">
          <div className="p-5 md:p-7 text-center sm:ml-0 sm:ltr:text-left sm:rtl:text-right w-[20rem]">
            <h1 className="text-heading6 text-gray-600 font-semibold">
              {t(LabelConstants.LET_US_HELP)}
            </h1>
            <p className="mt-5 text-lg font-semibold text-gray-500">
              {t(LabelConstants.CONCIERGE_LABEL)}
            </p>

            <button
              id="concierge-start"
              className="w-full text-base btn btn-primary !min-w-0 font-semibold mt-2 md:mt-5 lg:mt-28 text-white uppercase"
              onClick={() =>
                isAuthenticated ? startConcierge() : setOpenSignInModal(true)
              }
            >
              {t(LabelConstants.GO_GET_STARTED)}
            </button>
          </div>
        </div>
      </div>

      {/* SignIn/SignUp Modal */}
      <SignInModal
        show={openSignInModal}
        onClose={() => setOpenSignInModal(false)}
      />
    </>
  );
};

export default WishList;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
