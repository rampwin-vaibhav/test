import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../../types/enums';
import { ChangeMobileIcon } from '../../../components/icons';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ProfileService } from '../../../helpers/services';
import { GetUserTrackingResponse } from '../../../types/models';
import OldMobile from '../../../components/common/account/oldMobile';
import NewMobile from '../../../components/common/account/newMobile';
import { LabelConstants } from '../../../types/i18n.labels';
import Link from 'next/link';

const ChangeMobile = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const trackingId: any = atob(router.query.changeMobile as string);
  const [isOldNumberVerified, setIsNewNumberVerified] =
    useState<boolean>(false);
  const [userTrackingDetails, setUserTrackingDetails] =
    useState<GetUserTrackingResponse>();

  useEffect(() => {
    const initialLoad = async () => {
      const response = await ProfileService.getUserTrackingDetails(trackingId);
      if (response.IsSuccess) {
        setUserTrackingDetails(response);
      }
    };
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, isOldNumberVerified]);

  return (
    <div className="w-full flex justify-center md:justify-between">
      <div className="w-1/2  hidden md:block">
        <picture>
          <source
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
            type="image/webp"
          />
          <img
            src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/sign-up-banner.webp`}
            alt="gogo motor"
            className="h-full w-full object-fill"
          />
        </picture>
      </div>
      <div className="flex justify-center w-full md:w-1/2">
        <div className="md:w-[36.25rem] md:px-[1.25rem] w-full p-[1.5rem]">
          <div className="md:mt-[4rem]">
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

          <div className="flex flex-col items-center mt-[2.16rem]">
            <ChangeMobileIcon className="mt-[0.938rem] w-[4.875rem] h-[4.875rem]" />
            <div className="text-primary text-3xl md:text-4xl font-bold mt-4">
              {t(LabelConstants.CHANGE_MOBILE_NUMBER_LBL)}
            </div>
            <div className="w-full">
              {userTrackingDetails &&
              userTrackingDetails.OldPhoneNumberVerified ? (
                <NewMobile />
              ) : (
                <OldMobile
                  userTrackingDetails={userTrackingDetails!}
                  setIsNewNumberVerified={setIsNewNumberVerified}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangeMobile;

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
