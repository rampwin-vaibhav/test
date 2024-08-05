import { useTranslation } from 'next-i18next';
import React from 'react';
import AutoCare from '../../components/services/AutoCare';
import AutoPaint from '../../components/services/AutoPaint';
import TitleTransfer from '../../components/services/TitleTransfer';
import Tristar from '../../components/services/Tristar';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Locales } from '../../types/enums';
import { Tabs } from '../../components/common/Tabs';
import { LabelConstants } from '../../types/i18n.labels';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';

const Services = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="relative gogo-services-page">
        <picture>
          <img src="/images/pre-owned-banner.png" alt="img" />
        </picture>
        <div className="absolute top-[50%] left-[45%]">
          <div className="text-white font-bold sm:text-2xl text-base  text-center">
            {t(LabelConstants.SERVICE)}
          </div>
          <div className="flex justify-center">
            <div className="heading-border"></div>
          </div>
        </div>
      </div>

      <div>
        <Tabs default="AutoCare">
          <Tabs.Item id="AutoCare">
            <span className="h-[2.5rem] flex items-center justify-center w-full cursor-pointer text-center text-xl font-bold">
              {t(LabelConstants.AUTO_CARE)}
            </span>
          </Tabs.Item>
          <Tabs.Item id="BodyPaint">
            <span className="h-[2.5rem] flex items-center justify-center w-full cursor-pointer text-center text-xl font-bold">
              {t(LabelConstants.BODY_PAINT)}
            </span>
          </Tabs.Item>
          <Tabs.Item id="Tristar">
            <span className="h-[2.5rem] flex items-center justify-center w-full cursor-pointer text-center text-xl font-bold">
              {t(LabelConstants.TRISTAR)}
            </span>
          </Tabs.Item>
          <Tabs.Item id="TitleTransfer">
            <span className="h-[2.5rem] flex items-center justify-center w-full cursor-pointer text-center text-xl font-bold">
              {t(LabelConstants.TITLE_TRANSFER)}
            </span>
          </Tabs.Item>
          <Tabs.Page id="AutoCare">
            <div className="flex w-full sm:justify-center sm:px-24 px-8 py-10">
              <AutoCare />
            </div>
          </Tabs.Page>
          <Tabs.Page id="BodyPaint">
            <div className="flex w-full sm:justify-center sm:px-24 px-8 py-10">
              <AutoPaint />
            </div>
          </Tabs.Page>
          <Tabs.Page id="Tristar">
            <div className="flex w-full sm:justify-center sm:px-24 px-8 py-10">
              <Tristar />
            </div>
          </Tabs.Page>
          <Tabs.Page id="TitleTransfer">
            <div className="flex w-full sm:justify-center sm:px-24 px-8 py-10">
              <TitleTransfer />
            </div>
          </Tabs.Page>
        </Tabs>
      </div>
    </>
  );
};

export default Services;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    //Note: Azure #8942- Remove service pages
    redirect: {
      permanent: false,
      destination: '/404',
    },
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
