import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import DropdownWithLabel from '../components/common/DropdownWithLabel';
import DropdownWithCheckbox from '../components/common/DropdownWithCheckbox';
import MyVehicleCard from '../components/dashboard/MyVehicleCard';
import SignInModal from '../components/common/SignInModal';
import { FirstIcon, LastIcon, NextIcon, PrevIcon } from '../components/icons';
import Filters from '../components/used-cars/Filters';
import { GlobalService, VehicleService } from '../helpers/services';
import {
  CommonUtils,
  FilterUtils,
  formatNumber,
  SessionUtils,
} from '../helpers/utilities';
import { PageSizes } from '../types/constants';
import {
  ConfigurationKey,
  ListingStatus,
  Locales,
  MultipleSortByFilter,
  SortByFilter,
  SortDirection,
  VehicleAgeType,
} from '../types/enums';
import { BadgeItem } from '../types/events';
import { LabelConstants } from '../types/i18n.labels';
import {
  FilterParams,
  Model,
  MyVehicle,
  MyVehicleResponse,
  SocialMediaPlatformItem,
  Spec,
  UsedCarFilterMasterData,
  VehicleListingStatusItem,
} from '../types/models';
import SortByDropdown from '../components/common/SortByDropdown';
import ConfigurationService from '../helpers/services/configuration.service';

type DashboardPageProps = {
  masterData: UsedCarFilterMasterData;
};

const DashboardPage: NextPage<DashboardPageProps> = ({
  masterData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t } = useTranslation();

  // component state
  const [isFilterChange, setIsFilterChange] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // component props to state
  const [filteredVehicles, setFilteredVehicles] = useState<Array<MyVehicle>>(
    []
  );
  const [badgeList, setBadgeList] = useState<Array<BadgeItem>>([]);
  const [total, setTotal] = useState(0);
  const [userTotalVehicle, setUserTotalVehicle] = useState(0);
  const [appliedFilter, setAppliedFilter] = useState<FilterParams>({
    locale: router.locale,
    makes: [],
    models: [],
    specs: [],
    page: 1,
    size: PageSizes[0],
    sortBy: SortByFilter.ListedDate,
    sortDir: SortDirection.Asc,
    type: VehicleAgeType.All,
    multipleSortBy: [MultipleSortByFilter.AskingPrice],
  });
  const [filteredModels, setFilteredModels] = useState<Array<Model>>([]);
  const [filteredSpecs, setFilteredSpecs] = useState<Array<Spec>>([]);
  const [sharingPlatform, setSharingPlatform] = useState<
    Array<SocialMediaPlatformItem>
  >([]);
  const [filterStatusList, setFilterStatusList] = useState<
    Array<VehicleListingStatusItem>
  >([]);
  const [inspectionServiceId, setInspectionServiceId] = useState(0);
  const [showRestrictUserText, setShowRestrictUserText] = useState<string>('');

  const applyInitialFilter = async () => {
    const { locale, query } = router;
    if (!SessionUtils.isValidSession()) {
      router.replace('/404');
    }
    const {
      city: cityKey,
      make,
      model,
      mileage,
      price,
      spec,
      year,
      bodytype,
      feature,
      ownership,
      transmission,
      color,
      interiorColor,
      fueltype,
      filters: pageFilter,
      page = 1,
      size = PageSizes[0],
      sort = SortByFilter.ListedDate,
      dir = SortDirection.Asc,
      searchKey = '',
    } = query;

    let filters: FilterParams = {
      locale,
      makes: [],
      models: [],
      specs: [],
      page: 1,
      size: PageSizes[0],
      sortBy: SortByFilter.ListedDate,
      sortDir: SortDirection.Asc,
      type: VehicleAgeType.All,
      multipleSortBy: [MultipleSortByFilter.AskingPrice],
    };

    filters = {
      ...filters,
      page: parseInt(String(page)),
      size: parseInt(String(size)),
      sortBy: String(sort) as SortByFilter,
      sortDir: String(dir) as SortDirection,
      searchKey: decodeURIComponent(String(searchKey)),
    };

    if (pageFilter) {
      filters = {
        ...filters,
        ...CommonUtils.decode<FilterParams>(String(pageFilter)),
      };
    } else {
      // prepare filter object to search cars.
      if (cityKey) filters.cities = [decodeURIComponent(String(cityKey))];
      if (make) filters.makes = [decodeURIComponent(String(make))];
      if (model) filters.models = [decodeURIComponent(String(model))];
      if (spec) filters.specs = [decodeURIComponent(String(spec))];
      if (bodytype) filters.bodyTypes = [decodeURIComponent(String(bodytype))];
      if (fueltype) filters.fuelTypes = [decodeURIComponent(String(fueltype))];
      if (feature) filters.features = [decodeURIComponent(String(feature))];
      if (ownership)
        filters.ownership = [decodeURIComponent(String(ownership))];
      if (status) filters.status = [decodeURIComponent(String(status))];
      if (transmission)
        filters.transmission = [decodeURIComponent(String(transmission))];
      if (color) filters.exteriorColor = [decodeURIComponent(String(color))];
      if (interiorColor)
        filters.interiorColor = [decodeURIComponent(String(interiorColor))];
      if (mileage) {
        const mileageRange = decodeURIComponent(String(mileage)).split(',');
        if (mileageRange && mileageRange.length === 2)
          filters.mileageRange = {
            min: parseInt(mileageRange[0]),
            max: parseInt(mileageRange[1]),
          };
      }
      if (price) {
        const priceRange = String(price).split(',');
        if (priceRange && priceRange.length === 2)
          filters.priceRange = {
            min: parseInt(priceRange[0]),
            max: parseInt(priceRange[1]),
          };
      }
      if (year) {
        const yearRange = String(year).split(',');
        if (yearRange && yearRange.length === 2)
          filters.yearRange = {
            min: parseInt(yearRange[0]),
            max: parseInt(yearRange[1]),
          };
      }
    }

    const { models, specs } = await FilterUtils.fetchModelAndSpecFilterData(
      locale!,
      masterData.makes,
      filters.makes,
      filters.models
    );

    setFilteredModels(models);
    setFilteredSpecs(specs);

    return filters;
  };

  const init = useCallback(async () => {
    if (router.isReady) {
      // search vehicles data with filter criteria.
      let initialFilterData = await applyInitialFilter();
      let filters: FilterParams = {
        ...appliedFilter,
        ...initialFilterData,
      };
      const { searchPayload, badges } =
        await FilterUtils.getMyVehicleSearchParams(filters, masterData);

      const [platforms, statusList, searchResult] = await Promise.all([
        GlobalService.fetchSocialMediaPlatform(router.locale),
        VehicleService.fetchVehicleListingStatus(router.locale),
        VehicleService.searchMyVehicle(searchPayload),
      ]);
      const getUserPreference = FilterUtils.getUserPreference(
        SessionUtils.getUserDetails()?.UserId || null
      );

      if (getUserPreference) {
        filters = {
          ...filters,
          sortBy: getUserPreference?.sortBy,
          sortDir: getUserPreference?.sortDir,
        };
      }
      setIsFilterChange(true);
      setFilteredVehicles(searchResult.DataList);
      setTotal(searchResult.DataCount);
      setUserTotalVehicle(searchResult.UserVehicleCount);
      setInspectionServiceId(searchResult.InspectionServiceId);
      setBadgeList(badges);
      setSharingPlatform(platforms);
      setLoading(false);
      setFilterStatusList(statusList);
      const configurationValue =
        await ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.IsRestrictOnBoardingFromWebForSelfListed,
          router.locale
        );
      setShowRestrictUserText(configurationValue.ConfigurationValue);
      setAppliedFilter({
        ...filters,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale, router.isReady]);

  useEffect(() => {
    init();
  }, [router.isReady, init]);

  useEffect(() => {
    const handleFilterChange = async () => {
      // prepare payload and querystring.
      const { searchPayload, queryString, badges } =
        await FilterUtils.getMyVehicleSearchParams(appliedFilter, {
          ...masterData,
          models: filteredModels,
          specs: filteredSpecs,
        });

      // send request to fetch filtered vehicles.
      const searchResult: MyVehicleResponse =
        await VehicleService.searchMyVehicle(searchPayload);

      // update shallow route with queryString to support SSR with filter.
      if (queryString.split('&')[0] === '?sort=MonthlyEMI') {
        router.push(`/dashboard?dir=asc`, undefined, {
          shallow: true,
        });
      } else {
        router.push(`/dashboard${queryString}`, undefined, {
          shallow: true,
        });
      }

      // update client side component state to reflect updated filtered data to UI.
      setIsFilterChange(false);
      setFilteredVehicles(searchResult.DataList);
      setTotal(searchResult.DataCount);
      setBadgeList(badges);
      setInspectionServiceId(searchResult.InspectionServiceId);
    };

    if (isFilterChange && appliedFilter && handleFilterChange) {
      handleFilterChange();
    }
  }, [
    isFilterChange,
    appliedFilter,
    router,
    masterData,
    filteredModels,
    filteredSpecs,
  ]);

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (!isAuthenticated) {
          setShowLogin(true);
        } else {
          setShowLogin(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, []);

  const handleStatusFilterChange = (
    selectedState?: Array<VehicleListingStatusItem>
  ) => {
    if (selectedState) {
      setAppliedFilter({
        ...appliedFilter,
        status: selectedState.map((x) => x.VehicleListingStatusKey),
        page: 1,
      });
    } else {
      setAppliedFilter({ ...appliedFilter, status: [], page: 1 });
    }
    setIsFilterChange(true);
  };

  if (loading) {
    return <></>;
  }

  return (
    <div className="gogo-dashboard-card w-full">
      <header className="container py-[2.625rem] flex flex-col gap-[1.0819rem]">
        <span className="text-3xl font-bold uppercase leading-[2.3125rem]">
          {t(LabelConstants.MY_VEHICLES)}
        </span>
        <Filters
          appliedFilter={appliedFilter}
          badges={badgeList}
          masterData={masterData}
          setAppliedFilter={(e) => {
            setAppliedFilter(e);
            setIsFilterChange(true);
          }}
          setFilteredModels={setFilteredModels}
          setFilteredSpecs={setFilteredSpecs}
          filteredModels={filteredModels}
          filteredSpecs={filteredSpecs}
          showNotifyMe={total === 0}
          showSearchArea={false}
          showSaveSearchLink={false}
          showEMIRange={false}
          showSelfListedCheckBox={true}
        />
      </header>
      <div className="bg-lighter-gray container pt-10 pb-[3.625rem] flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between flex-wrap gap-2">
              <div className="flex justify-between gap-3 items-center">
                <div className="text-base text-dark-gray1 leading-5 uppercase">{`${t(
                  LabelConstants.RESULTS
                )}: ${formatNumber(total)}`}</div>

                {/* Status Filter */}
                <div>
                  <DropdownWithCheckbox
                    options={filterStatusList.filter(
                      (x) =>
                        x.VehicleListingStatusKey !==
                          ListingStatus.AwaitedListing &&
                        x.VehicleListingStatusKey !== ListingStatus.Deleted
                    )}
                    label={'VehicleListingStatus'}
                    value={'VehicleListingStatusKey'}
                    selected={appliedFilter.status || []}
                    onChange={(e) => handleStatusFilterChange(e)}
                    labelText={t(LabelConstants.FILTER_BY)}
                    hasAll={true}
                  />
                </div>
              </div>

              <div className="flex justify-between gap-3 items-center">
                {/* PageSize Filter */}
                <div>
                  <DropdownWithLabel
                    options={PageSizes.map((x) => ({ key: x }))}
                    label={'key'}
                    value={'key'}
                    selected={appliedFilter.size}
                    onChange={(e) => {
                      setAppliedFilter({
                        ...appliedFilter,
                        page: 1,
                        size: e?.key || PageSizes[0],
                      });
                      setIsFilterChange(true);
                    }}
                    isSearchable={false}
                    showClearButton={false}
                    labelText={t(LabelConstants.SHOW)}
                    selectedClassName="font-bold"
                  />
                </div>

                {/* Sort By */}
                <div>
                  <SortByDropdown
                    selectedValue={{
                      sortBy: appliedFilter.sortBy,
                      direction: appliedFilter.sortDir,
                    }}
                    onChange={(e, direction) => {
                      setAppliedFilter({
                        ...appliedFilter,
                        sortBy: e.value || SortByFilter.ListedDate,
                        sortDir: direction,
                        page: 1,
                      });
                      setIsFilterChange(true);
                      FilterUtils.setUserPreference(
                        e.value || SortByFilter.ListedDate,
                        direction,
                        SessionUtils.getUserDetails()?.UserId || null
                      );
                    }}
                    showEMISort={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <section className="mx-auto max-w-[20.5rem] space-y-5 sm:space-y-0 sm:max-w-none sm:grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filteredVehicles.map((vehicle) => {
              return (
                <MyVehicleCard
                  key={vehicle.VehicleListingId}
                  vehicle={vehicle}
                  sharingPlatform={sharingPlatform}
                  inspectionServiceId={inspectionServiceId}
                  handleDelete={() => {
                    setIsFilterChange(true);
                  }}
                  loadVehicleData={() => init()}
                />
              );
            })}
          </section>
        </div>
        {/* Pagination */}
        {total > appliedFilter.size && (
          <div className="flex w-full">
            <div className="flex justify-start w-full gap-2">
              <button
                className="btn btn-pagination btn-pagination-icon"
                disabled={appliedFilter.page === 1}
                onClick={() => {
                  setAppliedFilter({ ...appliedFilter, page: 1 });
                  setIsFilterChange(true);
                }}
                title={t(LabelConstants.FIRST).toUpperCase()}
              >
                <span className="w-full flex justify-center items-center uppercase">
                  <FirstIcon className="rtl:rotate-180" />
                </span>
              </button>
              <button
                className="btn btn-pagination"
                disabled={appliedFilter.page === 1}
                onClick={() => {
                  setAppliedFilter({
                    ...appliedFilter,
                    page: appliedFilter.page - 1,
                  });
                  setIsFilterChange(true);
                }}
                title={t(LabelConstants.BACK).toUpperCase()}
              >
                <span className="w-full flex justify-center items-center text-lg leading-[1.375rem] uppercase">
                  <PrevIcon className="rtl:rotate-180" />
                  <label>{t(LabelConstants.BACK)}</label>
                </span>
              </button>
            </div>
            <div className="flex justify-center items-center w-full font-bold text-xl text-dark-gray1">
              <div>
                {t(LabelConstants.PAGE_INDICATOR, {
                  currentPage: appliedFilter.page,
                  lastPage: Math.ceil(total / appliedFilter.size),
                })}
              </div>
            </div>
            <div className="flex justify-end w-full gap-2">
              <button
                className="btn btn-pagination"
                onClick={() => {
                  if (total > appliedFilter.page * appliedFilter.size) {
                    setAppliedFilter({
                      ...appliedFilter,
                      page: appliedFilter.page + 1,
                    });
                    setIsFilterChange(true);
                  }
                }}
                disabled={total <= appliedFilter.page * appliedFilter.size}
                title={t(LabelConstants.NEXT).toUpperCase()}
              >
                <span className="w-full flex justify-center items-center text-lg leading-[1.375rem] uppercase">
                  <label>{t(LabelConstants.NEXT)}</label>
                  <NextIcon className="rtl:rotate-180" />
                </span>
              </button>
              <button
                className="btn btn-pagination btn-pagination-icon"
                onClick={() => {
                  setAppliedFilter({
                    ...appliedFilter,
                    page: Math.ceil(total / appliedFilter.size),
                  });
                  setIsFilterChange(true);
                }}
                disabled={total <= appliedFilter.page * appliedFilter.size}
                title={t(LabelConstants.LAST).toUpperCase()}
              >
                <span className="w-full flex justify-center items-center uppercase">
                  <LastIcon className="rtl:rotate-180" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Sign In Modal */}
      <SignInModal
        show={showLogin}
        onClose={() => {
          setShowLogin(false);
          router.push('/');
        }}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps<DashboardPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const {
    vehicleMetaData,
    cities,
    makes,
    models,
    bodyTypes,
    specs,
    fuelTypes,
    status,
  } = await FilterUtils.fetchFilterMasterData(locale!);
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      masterData: {
        vehicleMetaData,
        cities,
        makes,
        models,
        bodyTypes,
        specs,
        fuelTypes,
        status,
      },
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};

export default DashboardPage;
