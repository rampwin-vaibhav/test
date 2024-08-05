import React from 'react';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ConfigurationKey, Locales } from '../../types/enums';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ConfigurationService from '../../helpers/services/configuration.service';

const CampaignOld = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleClick = async () => {
    const promotionCodeValue =
      await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.PromotionCodeForCampaignUser,
        router.locale
      );
    if (promotionCodeValue && promotionCodeValue.ConfigurationValue) {
      localStorage.setItem(
        ConfigurationKey.PromotionCodeForCampaignUser,
        promotionCodeValue.ConfigurationValue
      );
    }
    router.push('/sell-it-for-me?mode=sell');
  };
  return (
    <>
      <div className="campaign">
        <div className="md:px-[2.5rem]">
          <div className="placeholder">
            <picture className="h-full w-full">
              <img
                src={`${
                  process.env.NEXT_PUBLIC_Image_CDN_URL
                }/CMS/Campaign/web-banner-${router.locale?.toLowerCase()}.webp`}
                alt="campaign-image"
                className="h-full w-full object-fill"
              />
            </picture>
          </div>
        </div>
        <div className="offer-btn-container">
          <div onClick={() => handleClick()}>
            <button className="btn btn-primary">
              {t(LabelConstants.GO_GET_STARTED)}
            </button>
          </div>
        </div>
        <div className="additional_details">
          {/* <div className="about">{t(LabelConstants.ABOUT_GOGO_MOTOR)}</div> */}
          <div className="w-auto lg:w-[109.125rem] text-3xl px-5 lg:px-0 text-center !leading-[3.5rem]">
            {t(LabelConstants.ADDITIONAL_PROMOTION_DETAILS)}
          </div>
        </div>
        <div className="terms_and_conditions">
          <span>{t(LabelConstants.TIPS_ADVICE)}</span>
          <ul>
            <li>{t(LabelConstants.TERMS_1)}</li>
            <li>{t(LabelConstants.TERMS_2)}</li>
            <li>{t(LabelConstants.TERMS_3)}</li>
            <li className="!leading-[3rem]">{t(LabelConstants.TERMS_4)}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CampaignOld;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    // Task 12102: Campaign page changes as suggested by GGM
    redirect: {
      permanent: false,
      destination: '/404',
    },
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      showCampaignFooter: true,
    },
  };
};
