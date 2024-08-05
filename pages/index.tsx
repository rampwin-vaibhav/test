import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  CarUnderPriceIcon,
  CollapseArrowIcon,
  DiscountIcon,
  ExpandArrowIcon,
} from '../components/icons';
import { Brand, City, TrendingSearch, BodyType } from '../types/models';
import { AffordableCars, Locales } from '../types/enums';
import { VehicleService } from '../helpers/services';
import SearchBox from '../components/home/SearchBox';
import { LabelConstants } from '../types/i18n.labels';
import Link from 'next/link';
import BrowseByMakeModel from '../components/home/BrowseByMakeModel';
import BrowseByStyle from '../components/home/BrowseByStyle';
import BrowseByLocation from '../components/home/BrowseByLocation';
import {
  AffordableCarsFilter,
  CMSConfigurationKey,
  CMSPageKey,
} from '../types/constants';
import { useRouter } from 'next/router';
import { SessionUtils } from '../helpers/utilities';
import SignInModal from '../components/common/SignInModal';
import ConfigurationService from '../helpers/services/configuration.service';

type HomePageProps = {
  cities: Array<City>;
  topBrands: Array<Brand>;
  trendingSearch: Array<TrendingSearch>;
  bodyTypes: Array<BodyType>;
  homePageImages: {
    bannerImage: string;
    defaultBannerImage: string;
  };
};

const Home: NextPage<HomePageProps> = ({
  cities,
  topBrands,
  trendingSearch,
  bodyTypes,
  homePageImages,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [collapse, setCollapse] = useState<Boolean>(false);
  const [selectedBody, setSelectedBody] = useState<Array<BodyType>>(
    bodyTypes.slice(0, 6) || []
  );
  const [viewMore, setViewMore] = useState<Boolean>(false);
  const [selectedTendingVehicle, setSelectedTendingVehicle] = useState<
    Array<TrendingSearch>
  >(trendingSearch.slice(0, 6) || []);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);

  useEffect(() => {
    if (!collapse) {
      setSelectedBody(bodyTypes.slice(0, 6));
    } else {
      setSelectedBody(bodyTypes);
    }
  }, [collapse, bodyTypes]);

  useEffect(() => {
    if (!viewMore) {
      setSelectedTendingVehicle(trendingSearch.slice(0, 6));
    } else {
      setSelectedTendingVehicle(trendingSearch);
    }
  }, [viewMore, trendingSearch]);

  const getAffordableDeal = (type: AffordableCars) => {
    switch (type) {
      case AffordableCars.CarsUnder20000:
      case AffordableCars.ShopByCarFeatures:
        return <CarUnderPriceIcon className="h-[3.125rem] w-[4.625rem]" />;
      case AffordableCars.GreatDeal:
        return <DiscountIcon className="h-[3.125rem] w-[3.125rem]" />;
    }
  };

  const redirectNeedHelp = () => {
    const isAuthenticated = SessionUtils.isValidSession();
    if (isAuthenticated) {
      router.push('/vehicle-wizard/recommendation?tab=BodyType');
    } else {
      setOpenSignInModal(true);
    }
  };

  return (
    <div className="gogo-home-page">
      {/*
          Header Image Section
      */}
      <section className="sticky-search relative">
        <div className="relative w-full">
          <Image
            src={homePageImages?.bannerImage}
            alt="gogo motor"
            width={1920}
            height={854}
            className="w-full h-auto object-cover"
            priority={true}
            loading="eager"
            unoptimized={true}
          />
        </div>
        {/*
          Header Image Search Section
        */}
        <section className="search-area hidden relative lg:absolute lg:flex justify-center left-0 bottom-[0.9375rem] h-full w-full">
          <section className="relative w-full h-full flex justify-center">
            <div className="flex flex-col justify-end">
              <div className="flex justify-center">
                <span className="text-heading1 font-bold text-white leading-[6.125rem]">
                  {t(LabelConstants.FIND_YOUR_DREAM_WHEEL)}
                </span>
              </div>
              <div className="flex justify-center mt-6">
                <SearchBox />
              </div>
              <div className="flex justify-center mt-12">
                <div className="grid grid-cols-3 gap-x-5 gap-y-3">
                  {selectedBody.map((data) => (
                    <Link
                      href={encodeURI(
                        `/all-listings?bodytype=${data.BodyTypeKey}`
                      )}
                      key={data.BodyTypeId}
                    >
                      <a>
                        <div
                          className="flex items-center min-w-[23.188rem] h-[4.5rem] ltr:gap-[1.875rem] rtl:gap-[0.625rem] rounded-md shadow-lg bg-primary text-white hover:bg-hover hover:text-primary ltr:pl-[5.125rem] rtl:pl-[3.125rem] ltr:pr-2 rtl:pr-[1.3125rem]"
                          key={data.BodyTypeId}
                        >
                          <Image
                            width="85"
                            height="30"
                            src={data.ImageUrlPath}
                            alt="gogo motor"
                            className="w-[5.3125rem] ltr:scale-x-[-1]"
                            priority={true}
                            loading="eager"
                            unoptimized={true}
                          />
                          <span className="ltr:text-lg rtl:text-base font-bold leading-7 whitespace-nowrap overflow-hidden text-ellipsis">
                            {data.BodyType}
                          </span>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center mt-[0.9375rem]">
                <div
                  className="cursor-pointer text-white"
                  onClick={() => setCollapse(!collapse)}
                >
                  {collapse ? (
                    <CollapseArrowIcon className="w-9" />
                  ) : (
                    <ExpandArrowIcon className="w-9" />
                  )}
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>

      {/*
          Header Search Section - For Small Devices
      */}
      <div className="flex flex-col lg:hidden blade-outer-container search-wrapper !py-5 items-center justify-center">
        <div className="flex justify-center mb-3">
          <span className="text-7xl md:text-heading1 font-bold text-primary text-center">
            {t(LabelConstants.FIND_YOUR_DREAM_WHEEL)}
          </span>
        </div>
        <div className="w-full">
          <SearchBox />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 sm:mx-6 mt-[2rem]">
          {selectedBody.map((data) => (
            <Link
              href={encodeURI(`/all-listings?bodytype=${data.BodyTypeKey}`)}
              key={data.BodyTypeId}
            >
              <a>
                <div className="flex items-center gap-2 rounded-md shadow-lg h-[50px] bg-primary text-white hover:bg-hover hover:text-primary px-6">
                  <Image
                    src={data.ImageUrlPath}
                    width="85"
                    height="30"
                    alt="gogo motor"
                    className="w-[43px] lg:w-[45px] ltr:scale-x-[-1]"
                    priority={true}
                    loading="eager"
                    unoptimized={true}
                  />
                  <span className="text-large font-bold leading-7 whitespace-nowrap overflow-hidden text-ellipsis">
                    {data.BodyType}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center mt-[20px]">
          <div
            className="cursor-pointer"
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? (
              <CollapseArrowIcon className="w-11" />
            ) : (
              <ExpandArrowIcon className="w-11" />
            )}
          </div>
        </div>
      </div>

      {/*
        Buy-a-Car & Sell-Your-Car-Section
      */}
      <div className="blade-outer-container !pt-[7.625rem]">
        <div className="w-full flex sm:flex-col lg:flex-row flex-wrap min-[1096px]:flex-nowrap gap-[3.125rem] items-center justify-center">
          <div className="h-full md:w-[60%] lg:min-w-[47.1875rem] border flex flex-row rounded-md border-primary">
            <div className="flex flex-col sm:flex-row  items-center justify-center sm:items-start sm:justify-start w-full">
              <picture className="flex items-center p-[0.9375rem] pr-[1.0806rem]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/HomePage/buy-a-car.webp`}
                  alt="gogo motor"
                  className="lg:w-[22.3569rem] w-[17.3569rem] max-w-none h-[19.3212rem] rounded-md object-cover"
                  height="310"
                  width="358"
                  priority={true}
                  loading="eager"
                  unoptimized={true}
                />
              </picture>
              <div className="flex flex-col items-center sm:items-start leading-[2.313rem] w-[15.625rem] lg:w-[21.875rem]">
                <div className="text-3xl font-bold mt-[3.0625rem]">
                  {t(LabelConstants.BUY_PREOWNED_CAR)}
                </div>
                <div className="flex text-large leading-[2.5rem] mt-[1.125rem]">
                  {t(LabelConstants.BUY_A_PREOWNED_VEHICLE)}
                </div>
                <div className="mt-9 sm:mb-0 mb-[3.75rem]">
                  <Link prefetch={false} href="/buy-preowned-vehicle">
                    <button className="btn btn-primary btn-sm uppercase lg:!text-large lg:!w-[19.375rem] lg:!min-h-[3.75rem]">
                      {t(LabelConstants.KNOW_MORE)}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full md:w-[60%] lg:min-w-[47.1875rem] border flex flex-row rounded-md border-primary">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:items-start sm:justify-start w-full">
              <picture className="flex items-center p-[0.9375rem] pr-[1.0806rem]">
                <Image
                  src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/HomePage/sell-your-car.webp`}
                  alt="gogo motor"
                  className="lg:w-[22.3569rem] w-[17.3569rem] max-w-none h-[19.3212rem] rounded-md object-cover"
                  height="310"
                  width="358"
                  priority={true}
                  loading="eager"
                  unoptimized={true}
                />
              </picture>
              <div className="flex flex-col items-center sm:items-start leading-[2.313rem] w-[15.625rem] xl:w-[21.875rem]">
                <div className="text-3xl font-bold mt-[3.0625rem]">
                  {t(LabelConstants.LIST_MY_CAR)}
                </div>
                <div className="text-large leading-[2.5rem] mt-[1.125rem]">
                  {t(LabelConstants.FEW_MINUTES_AND_YOUR_VEHICLE_IS_HERE)}
                </div>
                <div className="mt-9 sm:mb-0 mb-[3.75rem]">
                  <Link prefetch={false} href="/sell-it-for-me">
                    <button className="btn btn-primary btn-sm uppercase lg:!text-large lg:!min-w-[19.375rem] lg:!min-h-[3.75rem] mt-[31px] sm:mt-0">
                      {t(LabelConstants.KNOW_MORE)}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blade-outer-container !pt-[5.375rem] pb-[5.75rem]">
        <div className="text-heading4 font-bold text-center pb-[3.5625rem] text-dark-gray1 leading-[3.063rem]">
          {t(LabelConstants.AFFORDABLE_CARS_AVAILABLE_NOW)}
        </div>
        <div className="gap-5 flex justify-center flex-wrap lg:flex-nowrap">
          {AffordableCarsFilter.map((item, id) => (
            <Link prefetch={false} key={item.key} href="/all-listings">
              <a className="affordable-filter bg-primary text-white hover:bg-hover hover:text-primary w-[31.8125rem] h-[10.625rem]">
                <div>{getAffordableDeal(item.key)}</div>
                <div className="px-2 text-2xl font-bold text-center">
                  {t(item.label)}
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>

      {/*
        Shop Great Values
      */}
      {selectedTendingVehicle && selectedTendingVehicle.length > 0 ? (
        <div className="blade-outer-container trending-search pt-[5.3125rem] pb-[5.625rem]">
          <div className="text-heading4 font-bold text-center pb-[3.8125rem] text-dark-gray1 leading-[3.063rem]">
            {t(LabelConstants.SHOP_GREAT_VALUES)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.875rem]">
            {selectedTendingVehicle.map((item, id) => (
              <Link
                key={item.TrendingSearchId}
                href={`/all-listings/?make=${item.VehicleMakeKey?.toLowerCase()}&model=${item.VehicleModelKey?.toLowerCase()}`}
                className="rounded-[0.25rem]"
              >
                <a className="trending-vehicle-img bg-white border border-primary rounded-md hover:bg-hover">
                  <div className="flex justify-between px-[6.25rem] sm:px-12 lg:px-[6.25rem] m-1 items-center h-[10rem] grid-cols-2 grid-rows-1">
                    <span className="text-3xl font-bold pt-2 text-primary">
                      {`${item.VehicleMake} ${item.VehicleModel}`}
                    </span>
                    <Image
                      src={item.ImageUrlPath}
                      alt="car image"
                      width="156"
                      height="127"
                      loading="lazy"
                      unoptimized={true}
                    />
                  </div>
                </a>
              </Link>
            ))}
          </div>
          <div className="view-more text-center pt-[5.625rem]">
            <Link prefetch={false} href={`/all-listings`}>
              <button className="btn btn-primary btn-lg uppercase">
                {t(LabelConstants.VIEW_ALL)}
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/*
        Need help searching
      */}
      <div className="blade-outer-container need-help-container">
        <div className="need-help w-full relative lg:rounded-md aspect-[78/25]">
          <div className="absolute top-0 ltr:left-0 rtl:right-0 h-full w-full ltr:pr-2 rtl:pl-2 ltr:sm:pr-4 rtl:sm:pl-4">
            <Image
              width="1544"
              height="500"
              src={
                router.locale === Locales.EN
                  ? `${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/HomePage/need-help-search-en.webp`
                  : `${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/HomePage/need-help-search-ar.webp`
              }
              alt="gogo motor"
              className="w-full h-auto object-cover"
              loading="lazy"
              unoptimized={true}
            />
          </div>
          <div className="absolute w-full top-[1rem] sm:top-[2rem] md:top-[4rem] lg:top-[7rem]">
            <div className="max-w-[60%] lg:max-w-[55%] 2xl:max-w-[59%] flex flex-col min-[530px]:gap-3 md:gap-6 ltr:pl-10 rtl:pr-10">
              <span className="text-base min-[530px]:text-3xl md:text-5xl lg:text-6xl !leading-[2.5rem] rtl:!leading-[1.8rem] 2xl:!leading-[3.75rem] rtl:2xl:!leading-[3.75rem] font-bold text-white rtl:text-heading6 md:rtl:text-4xl lg:rtl:text-heading4 2xl:rtl:text-heading3">
                {t(LabelConstants.VEHICLE_RECOMMENDATION)}
              </span>
              <span className="text-xs min-[530px]:text-base md:text-2xl text-white mb-1 sm:mb-4 w-[75%] sm:w-[70%] xl:w-full">
                {t(LabelConstants.STEP_TELL_WHAT_YOU_LOOKING)}
              </span>
              <div>
                <button
                  className="btn-recommendation btn uppercase !text-base sm:!text-xl !min-w-[8.775rem] min-[530px]:!min-w-[16.375rem] md:!min-w-[19.375rem] min-[530px]:!min-h-[2.75rem] md:!min-h-[3.75rem] !min-h-[2.25rem]"
                  onClick={() => redirectNeedHelp()}
                >
                  {t(LabelConstants.KNOW_MORE)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="blade-outer-container flex flex-col gap-[3.4375rem] pb-[3.9375rem]">
        {/*
          Browse by popular make and models
        */}
        <div className="flex flex-col gap-[3.4375rem] mt-[5.6612rem] lg:mt-0">
          <span className="font-bold text-3xl text-primary">
            {t(LabelConstants.BROWSE_BY_POPULAR_MAKE)}
          </span>
          <BrowseByMakeModel topBrands={topBrands} />
        </div>

        {/*
          Browse by style
        */}
        <div className="flex flex-col gap-[3.4375rem]">
          <span className="font-bold text-3xl text-primary">
            {t(LabelConstants.BROWSE_BY_STYLES)}
          </span>
          <BrowseByStyle bodyTypes={bodyTypes} />
        </div>

        {/*
          Browse by location
        */}
        <div className="flex flex-col gap-[3.4375rem]">
          <span className="font-bold text-3xl text-primary">
            {t(LabelConstants.BROWSE_BY_LOCATION)}
          </span>
          <BrowseByLocation topCities={cities} />
        </div>

        {/* SignIn/SignUp Modal */}
        {openSignInModal && (
          <SignInModal
            show={openSignInModal}
            onClose={() => setOpenSignInModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomePageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const [cities, topBrands, trendingSearch, bodyTypes, data] =
    await Promise.all([
      VehicleService.fetchAllCities(locale),
      VehicleService.fetchPopularBrands(locale),
      VehicleService.fetchTrendingSearches(locale),
      VehicleService.fetchBodyTypes(locale),
      ConfigurationService.fetchCMSConfigurationValue(
        CMSPageKey.HomePage,
        null,
        locale
      ),
    ]);

  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      cities,
      topBrands,
      trendingSearch,
      bodyTypes: bodyTypes.filter((x) => x.IsSearchable),
      homePageImages: {
        bannerImage:
          data.find(
            (x) => x.ConfigurationKey === CMSConfigurationKey.BannerImageWeb
          )?.ArtifactURL ||
          `${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/HomePage/banner.webp`,
        defaultBannerImage:
          data.find(
            (x) => x.ConfigurationKey === CMSConfigurationKey.DefaultBannerWeb
          )?.ArtifactURL ||
          `${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/HomePage/banner.webp`,
      },
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};
