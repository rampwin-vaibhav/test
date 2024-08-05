import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  BestPriceIcon,
  BestSellerIcon,
  EasySearchIcon,
  InspectedVehicleIcon,
  VerifiedIcon,
} from '../components/icons';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import { Locales } from '../types/enums';
import { LabelConstants } from '../types/i18n.labels';
import Head from 'next/head';

const BuyPreownedVehicle: NextPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <PrivatePageLayout>
      <div className="buy-vehicle mb-24 mt-7">
        <Head>
          <link rel="preload" href="/images/car-image-png.png" as="image" />
        </Head>
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="bg-primary rounded-full text-white sm:px-24 px-4 py-2 text-3xl font-bold my-4">
              {t(LabelConstants.BUY_BANNER_TEXT)}
            </div>
            <div
              className={`flex items-center absolute ${
                router.locale === Locales.AR && 'top-9'
              } top-14 ltr:-right-1 ltr:md:-right-12 rtl:right-72 rtl:md:-left-8 arabic-text-buyer`}
            >
              <span className="font-bold text-color sm:text-lg text-xs mt-2">
                {t(LabelConstants.BUY_PREOWNED_TAB)}
              </span>
              <picture
                className={`relative h-full w-36 sm:w-60 ${
                  router.locale === Locales.AR && '-scale-x-100'
                }`}
              >
                <img src="/images/car-image-png.png" alt="image" />
              </picture>
            </div>
          </div>
        </div>
        <div className="flex w-full mt-32 flex-col">
          <div className="flex w-full flex-col md:flex-row">
            <div className="flex w-full">
              <div className="flex md:w-full flex-col md:flex-row">
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full"></div>
                </div>
                <div>
                  <div className="h-20 w-20 p-3 border-[0.375rem] border-primary rounded-full">
                    <InspectedVehicleIcon className="h-full w-full" />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full">
                    <div className="w-[0.375rem] h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="text-center">
                    <div className="font-bold text-xl sm:mt-3 text-primary">
                      {t(LabelConstants.INSPECTED_VEHICLES)}
                    </div>
                  </div>
                  <div className="font-bold text-sm sm:mt-3 text-center w-3/4">
                    {t(LabelConstants.INSPECTED_VEHICLES_TEXT)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex md:w-full flex-col md:flex-row">
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full">
                    <div className="w-[0.375rem] h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="h-20 w-20 p-3 border-[0.375rem] border-primary rounded-full">
                    <BestPriceIcon className="h-full w-full" />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full">
                    <div className="w-[0.375rem] h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="text-center">
                    <div className="font-bold text-xl sm:mt-3 text-primary">
                      {t(LabelConstants.RIGHT_PRICE)}
                    </div>
                  </div>
                  <div className="font-bold text-sm sm:mt-3 text-center w-3/4">
                    {t(LabelConstants.RIGHT_PRICE_TEXT)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex md:w-full flex-col md:flex-row">
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full">
                    <div className="w-[0.375rem] h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="h-20 w-20 p-3 border-[0.375rem] border-primary rounded-full">
                    <EasySearchIcon className="h-full w-full" />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full">
                    <div className="w-[0.375rem] h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="text-center">
                    <div className="font-bold text-xl sm:mt-3 text-primary">
                      {t(LabelConstants.EASY_SEARCH)}
                    </div>
                  </div>
                  <div className="font-bold text-sm sm:mt-3 text-center w-3/4">
                    {t(LabelConstants.EASY_SEARCH_TEXT)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex md:w-full flex-col md:flex-row">
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full">
                    <div className="w-[0.375rem] h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="h-20 w-20 p-3 border-[0.375rem] border-primary rounded-full">
                    <VerifiedIcon className="h-full w-full" />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full">
                    <div className="w-[0.375rem] h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="text-center">
                    <div className="font-bold text-xl sm:mt-3 text-primary">
                      {t(LabelConstants.VERIFIED_SELLER)}
                    </div>
                  </div>
                  <div className="font-bold text-sm sm:mt-3 text-center w-3/4">
                    {t(LabelConstants.VERIFIED_SELLER)}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex md:w-full flex-col md:flex-row">
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full">
                    <div className="w-[0.375rem] h-full md:h-[0.375rem] md:w-full bg-primary"></div>
                  </div>
                </div>
                <div>
                  <div className="h-20 w-20 p-3 border-[0.375rem] border-primary rounded-full">
                    <BestSellerIcon className="h-full w-full" />
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-center items-center h-10 md:h-20 w-20 md:w-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col md:hidden w-full px-2">
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="text-center">
                    <div className="font-bold text-xl sm:mt-3 text-primary">
                      {t(LabelConstants.GREAT_CHOICE)}
                    </div>
                  </div>
                  <div className="font-bold text-sm sm:mt-3 text-center w-3/4">
                    {t(LabelConstants.VERIFIED_SELLER_TEXT)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* this section visible in desktop version */}
          <div className="hidden md:flex w-full flex-col md:flex-row">
            <div className="flex flex-col items-center justify-center w-full h-fit">
              <div className="text-center">
                <div className="font-bold text-xl sm:mt-3 text-primary">
                  {t(LabelConstants.INSPECTED_VEHICLES)}
                </div>
              </div>
              <div className="font-bold text-sm sm:mt-2 text-center w-3/4">
                {t(LabelConstants.INSPECTED_VEHICLES_TEXT)}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-fit">
              <div className="text-center">
                <div className="font-bold text-xl sm:mt-3 text-primary">
                  {t(LabelConstants.RIGHT_PRICE)}
                </div>
              </div>
              <div className="font-bold text-sm sm:mt-2 text-center w-3/4">
                {t(LabelConstants.RIGHT_PRICE_TEXT)}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-fit">
              <div className="text-center">
                <div className="font-bold text-xl sm:mt-3 text-primary">
                  {t(LabelConstants.EASY_SEARCH)}
                </div>
              </div>
              <div className="font-bold text-sm sm:mt-2 text-center w-3/4">
                {t(LabelConstants.EASY_SEARCH_TEXT)}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-fit">
              <div className="text-center">
                <div className="font-bold text-xl sm:mt-3 text-primary">
                  {t(LabelConstants.VERIFIED_SELLER)}
                </div>
              </div>
              <div className="font-bold text-sm sm:mt-2 text-center w-3/4">
                {t(LabelConstants.VERIFIED_SELLER_TEXT)}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full h-fit">
              <div className="text-center">
                <div className="font-bold text-xl sm:mt-3 text-primary">
                  {t(LabelConstants.GREAT_CHOICE)}
                </div>
              </div>
              <div className="font-bold text-sm sm:mt-2 text-center w-3/4">
                {t(LabelConstants.GREAT_CHOICE_TEXT)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivatePageLayout>
  );
};

export default BuyPreownedVehicle;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
