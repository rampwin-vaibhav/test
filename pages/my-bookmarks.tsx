import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import DropdownWithLabel from '../components/common/DropdownWithLabel';
import SignInModal from '../components/common/SignInModal';

import {
  FilledLocationIcon,
  FirstIcon,
  FulfilledByIcon,
  ImportedByIcon,
  LastIcon,
  NextIcon,
  PrevIcon,
  SuppliedByIcon,
  VehicleTypeIcon,
} from '../components/icons';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import Filters from '../components/newcars/Filters';
import {
  GlobalService,
  ListingService,
  ProfileService,
  VehicleService,
} from '../helpers/services';
import ConfigurationService from '../helpers/services/configuration.service';
import {
  CommonUtils,
  formatNumber,
  NewFilterUtils,
  SessionUtils,
} from '../helpers/utilities';
import { PageSizes, VehicleTypes } from '../types/constants';
import {
  ConfigurationKey,
  Locales,
  MultipleSortByFilter,
  SortByFilter,
  SortDirection,
  UserProfileStatus,
  VehicleAgeType,
} from '../types/enums';
import { BadgeItem } from '../types/events';
import { LabelConstants } from '../types/i18n.labels';
import {
  FilterMasterData,
  FilterParams,
  Model,
  SearchAllResponse,
  SearchAllResultItem,
  SearchBoolean,
  SocialMediaPlatformItem,
  Spec,
} from '../types/models';
import FilterDropDown from '../components/newcars/FilterDropDown';
import MultipleSortByDropdown from '../components/common/MultipleSortByDropdown';
import NewVehicleCard from '../components/newcars/NewVehicleCard';
import OutletVehicleCard from '../components/newcars/OutletVehicleCard';
import PreOwnedVehicleCard from '../components/newcars/PreOwnedVehicleCard';

type MyBookmarkPageProps = {
  masterData: FilterMasterData;
};

const MyBookmarkPage: NextPage<MyBookmarkPageProps> = ({
  masterData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t } = useTranslation();

  // component state
  const [isFilterChange, setIsFilterChange] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [elmConfiguration, setELMConfiguration] = useState<{
    userConfig: {
      absherVerification: boolean;
      addressVerification: boolean;
      isAbsherVerified: boolean;
      isYakeenVerified: boolean;
      status: UserProfileStatus;
      isActive: boolean;
      email: string;
    };
    globalConfig: { absherVerification: boolean; addressVerification: boolean };
  }>();
  const ref = useRef<HTMLDivElement>(null);
  // component props to state
  const [bookmarkIds, setBookmarkIds] = useState<Array<number>>([]);
  const [productCatalogueIds, setProductCatalogueIds] = useState<Array<number>>(
    []
  );
  const [filteredVehicles, setFilteredVehicles] = useState<
    Array<SearchAllResultItem>
  >([]);
  const [badgeList, setBadgeList] = useState<Array<BadgeItem>>([]);
  const [total, setTotal] = useState(0);
  const [appliedFilter, setAppliedFilter] = useState<FilterParams>({
    locale: router.locale,
    makes: [],
    models: [],
    specs: [],
    page: 1,
    size: PageSizes[0],
    sortBy: SortByFilter.ListedDate,
    sortDir: SortDirection.Desc,
    type: VehicleAgeType.All,
    multipleSortBy: [],
  });
  const [filteredModels, setFilteredModels] = useState<Array<Model>>([]);
  const [filteredSpecs, setFilteredSpecs] = useState<Array<Spec>>([]);
  const [sharingPlatform, setSharingPlatform] = useState<
    Array<SocialMediaPlatformItem>
  >([]);
  const [isNewCarEnabled, setIsNewCarEnabled] = useState<string>('false');
  const TypeOfVehicles =
    VehicleTypes.map((x) => ({
      ...x,
      VehicleType: t(x.VehicleType),
    })) || [];

  const applyInitialFilter = async () => {
    const { locale, query } = router;

    if (!SessionUtils.isValidSession()) {
      router.replace('/404');
    }

    let filters: FilterParams = {
      locale,
      makes: [],
      models: [],
      specs: [],
      page: 1,
      size: PageSizes[0],
      sortBy: SortByFilter.ListedDate,
      sortDir: SortDirection.Desc,
      type: VehicleAgeType.All,
      multipleSortBy: [],
    };

    //check filter parameter.
    const {
      filters: pageFilter,
      page = 1,
      size = PageSizes[0],
      sort = SortByFilter.ListedDate,
      dir = SortDirection.Desc,
      searchKey = '',
    } = query;
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
      const {
        make,
        model,
        spec,
        city: cityKey,
        mileage,
        price,
        year,
        bodytype,
        feature,
        ownership,
        transmission,
        color,
        interiorColor,
        fueltype,
      } = query;

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

    // load master data for filters
    const { models, specs } = await NewFilterUtils.fetchModelAndSpecFilterData(
      locale!,
      masterData.makes,
      filters.makes,
      filters.models
    );

    setFilteredModels(models);
    setFilteredSpecs(specs);

    return filters;
  };

  useEffect(() => {
    const init = async () => {
      let initialFilterData = await applyInitialFilter();
      let filters: FilterParams = {
        ...appliedFilter,
        ...initialFilterData,
      };
      const getUserPreference = NewFilterUtils.getUserPreference(
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
      const [bookmarks, platforms] = await Promise.all([
        VehicleService.fetchBookmark(),
        GlobalService.fetchSocialMediaPlatform(router.locale),
      ]);

      if (
        (bookmarks &&
          bookmarks.VehicleListingIds &&
          bookmarks.VehicleListingIds.length > 0) ||
        (bookmarks &&
          bookmarks.ProductCatalogueIds &&
          bookmarks.ProductCatalogueIds.length > 0)
      ) {
        // search vehicles data with filter criteria.
        const { searchPayload, badges } = await NewFilterUtils.getSearchParams(
          filters,
          masterData
        );
        searchPayload.Filter.term.push(
          `id=${[
            ...bookmarks.VehicleListingIds?.map((i) => `VL_${i}`),
            ...bookmarks.ProductCatalogueIds?.map((i) => `PC_${i}`),
          ].join(',')}`
        );
        const vehicles: SearchAllResponse =
          await ListingService.searchAllVehicle(searchPayload);

        setFilteredVehicles(vehicles.DataList);
        setTotal(vehicles.DataCount);
        setBadgeList(badges);

        // Fetching ELM configuration details
        if (SessionUtils.isValidSession()) {
          const [profile, absherVerification, addressVerification] =
            await Promise.all([
              ProfileService.fetchUserData(router.locale),
              ConfigurationService.fetchConfigurationValue(
                ConfigurationKey.IsAbsherVerificationRequired,
                router.locale
              ),
              ConfigurationService.fetchConfigurationValue(
                ConfigurationKey.IsUserAddressVerificationRequired,
                router.locale
              ),
            ]);
          setELMConfiguration({
            userConfig: {
              isAbsherVerified: profile.IsAbsherVerified,
              isYakeenVerified: profile.IsYakeenVerified,
              absherVerification: profile.IsAbsherVerificationRequired,
              addressVerification: profile.IsAddressVerificationRequired,
              status: profile.UserProfileStatusKey as UserProfileStatus,
              isActive: profile.IsActive,
              email: profile.EmailAddress,
            },
            globalConfig: {
              absherVerification:
                absherVerification.ConfigurationValue === 'true',
              addressVerification:
                addressVerification.ConfigurationValue === 'true',
            },
          });
        }
      }
      setAppliedFilter({
        ...filters,
      });
      setBookmarkIds(bookmarks?.VehicleListingIds || []);
      setProductCatalogueIds(bookmarks?.ProductCatalogueIds || []);
      setSharingPlatform(platforms);
      setLoading(false);
    };
    if (router.isReady) {
      init();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.locale]);

  useEffect(() => {
    const handleFilterChange = async () => {
      // prepare payload and querystring.
      const { searchPayload, queryString, badges } =
        await NewFilterUtils.getSearchParams(appliedFilter, {
          ...masterData,
          models: filteredModels,
          specs: filteredSpecs,
        });
      searchPayload.Filter.term.push(
        `id=${[
          ...bookmarkIds?.map((i) => `VL_${i}`),
          ...productCatalogueIds?.map((i) => `PC_${i}`),
        ].join(',')}`
      );
      // send request to fetch filtered vehicles.
      const vehicles = await ListingService.searchAllVehicle(searchPayload);

      if (
        vehicles &&
        vehicles.DataList.length === 0 &&
        appliedFilter.page > 1
      ) {
        setAppliedFilter({
          ...appliedFilter,
          page: appliedFilter.page - 1,
        });
      }

      // update shallow route with queryString to support SSR with filter.
      router.push(`/my-bookmarks${queryString}`, undefined, {
        shallow: true,
      });
      var isNewCarEnabled = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.IsNewCarEnabled,
        router.locale
      );
      setIsNewCarEnabled(isNewCarEnabled.ConfigurationValue);
      // update client side component state to reflect updated filtered data to UI.
      setIsFilterChange(false);
      setFilteredVehicles(vehicles.DataList);
      setTotal(vehicles.DataCount);
      setBadgeList(badges);
    };

    if (
      isFilterChange &&
      appliedFilter &&
      router.isReady &&
      handleFilterChange &&
      ((bookmarkIds && bookmarkIds.length > 0) ||
        (productCatalogueIds && productCatalogueIds.length > 0))
    ) {
      handleFilterChange();
    }
  }, [
    isFilterChange,
    appliedFilter,
    router,
    router.isReady,
    masterData,
    filteredModels,
    filteredSpecs,
    bookmarkIds,
    productCatalogueIds,
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

  const handleChangeBookmark = async () => {
    const result = await VehicleService.fetchBookmark();
    setBookmarkIds(result?.VehicleListingIds || []);
    setProductCatalogueIds(result?.ProductCatalogueIds || []);
    setIsFilterChange(true);
  };

  if (loading) {
    return <></>;
  }

  return (
    <div className="w-full">
      {bookmarkIds &&
      bookmarkIds.length === 0 &&
      productCatalogueIds &&
      productCatalogueIds.length === 0 ? (
        <PrivatePageLayout>
          <div className="w-full flex justify-center text-center items-center">
            <div className="flex flex-col justify-center text-centre sm:w-1/2 w-2/3 h-1/2 bg-white p-12 shadow-md gap-10">
              <label>
                {t(LabelConstants.YOU_HAVE_NOT_BOOKMARKED_ANY_VEHICLE)}
              </label>
              <div>
                <Link href="/all-listings">
                  <button className="btn btn-primary sm:!w-[12.5rem] !min-w-[10rem]">
                    {t(LabelConstants.BOOKMARK_NOW)}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </PrivatePageLayout>
      ) : (
        <>
          <header className="container py-[2.625rem] flex flex-col gap-[1.0819rem]">
            <span className="text-3xl font-bold uppercase leading-[2.3125rem]">
              {t(LabelConstants.MY_BOOKMARKS)}
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
              showSaveSearch={!!elmConfiguration}
              showSaveSearchLink={true}
              showEMIRange={true}
              showSelfListedCheckBox={false}
              isNewCarPage={false}
            />
          </header>
          <div className="bg-lighter-gray container pt-10 pb-[3.625rem] flex flex-col gap-10 mx-auto">
            <div className="flex flex-col gap-5">
              <div className="flex flex-row justify-between flex-wrap gap-2 lg:gap-0">
                <div className="flex flex-row items-center sm:gap-12 gap-4 flex-wrap">
                  <div ref={ref} className="relative">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <FilledLocationIcon className="w-4 h-4" />
                        <div>{t(LabelConstants.LOCATION)}</div>
                      </div>
                      <FilterDropDown
                        onChange={(e) => {
                          if (e) {
                            setAppliedFilter({
                              ...appliedFilter,
                              cities: [String(e.CityKey)],
                              page: 1,
                            });
                            setIsFilterChange(true);
                          } else {
                            setAppliedFilter({
                              ...appliedFilter,
                              cities: [],
                              page: 1,
                            });
                            setIsFilterChange(true);
                          }
                        }}
                        optionValues={masterData.cities || []}
                        selectedValue={
                          appliedFilter?.cities &&
                          appliedFilter?.cities.length > 0
                            ? masterData.cities.find(
                                (x) =>
                                  String(x.CityKey) ===
                                  String(appliedFilter?.cities![0] || '')
                              )
                            : null
                        }
                        label="City"
                        value="CityKey"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <VehicleTypeIcon className="w-5 h-5" />
                      <div>{t(LabelConstants.VEHICLE_TYPE)}</div>
                    </div>
                    <FilterDropDown
                      onChange={(e) => {
                        if (e) {
                          setAppliedFilter({
                            ...appliedFilter,
                            vehicleType: [String(e.VehicleKey)],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        } else {
                          setAppliedFilter({
                            ...appliedFilter,
                            vehicleType: [],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        }
                      }}
                      optionValues={TypeOfVehicles}
                      selectedValue={
                        appliedFilter?.vehicleType &&
                        appliedFilter?.vehicleType.length > 0
                          ? TypeOfVehicles.find(
                              (x) =>
                                String(x.VehicleKey) ===
                                String(appliedFilter?.vehicleType![0] || '')
                            )
                          : null
                      }
                      label={'VehicleType'}
                      value="VehicleKey"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <ImportedByIcon className="w-5 h-5" />
                      <div>{t(LabelConstants.IMPORTED_BY)}</div>
                    </div>
                    <FilterDropDown
                      onChange={(e) => {
                        if (e) {
                          setAppliedFilter({
                            ...appliedFilter,
                            importedBy: [String(e.ImporterId)],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        } else {
                          setAppliedFilter({
                            ...appliedFilter,
                            importedBy: [],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        }
                      }}
                      optionValues={masterData.importedBy || []}
                      selectedValue={
                        appliedFilter?.importedBy &&
                        appliedFilter?.importedBy.length > 0
                          ? masterData.importedBy.find(
                              (x) =>
                                String(x.ImporterId) ===
                                String(appliedFilter?.importedBy![0] || '')
                            )
                          : null
                      }
                      label="Name"
                      value="ImporterId"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <SuppliedByIcon className="w-5 h-5" />
                      <div>{t(LabelConstants.SUPPLIED_BY)}</div>
                    </div>
                    <FilterDropDown
                      onChange={(e) => {
                        if (e && e.Type === 'Distributor') {
                          setAppliedFilter({
                            ...appliedFilter,
                            suppliedBy: [String(e.Id)],
                            dealers: [],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        } else if (e && e.Type === 'Dealer') {
                          setAppliedFilter({
                            ...appliedFilter,
                            suppliedBy: [],
                            dealers: [String(e.Id)],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        } else {
                          setAppliedFilter({
                            ...appliedFilter,
                            suppliedBy: [],
                            dealers: [],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        }
                      }}
                      optionValues={masterData.suppliedBy || []}
                      selectedValue={
                        appliedFilter?.suppliedBy &&
                        appliedFilter?.suppliedBy.length > 0
                          ? masterData.suppliedBy.find(
                              (x) =>
                                String(x.Id) ===
                                  String(appliedFilter?.suppliedBy![0] || '') &&
                                x.Type === 'Distributor'
                            )
                          : appliedFilter?.dealers &&
                            appliedFilter?.dealers.length > 0
                          ? masterData.suppliedBy.find(
                              (x) =>
                                String(x.Id) ===
                                  String(appliedFilter?.dealers![0] || '') &&
                                x.Type === 'Dealer'
                            )
                          : null
                      }
                      label="Name"
                      value="Id,Type"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      <FulfilledByIcon className="w-5 h-5" />
                      <div>{t(LabelConstants.FULFILLED_BY)}</div>
                    </div>
                    <FilterDropDown
                      onChange={(e) => {
                        if (e) {
                          setAppliedFilter({
                            ...appliedFilter,
                            fulfilledBy: [String(e.FulfilledId)],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        } else {
                          setAppliedFilter({
                            ...appliedFilter,
                            fulfilledBy: [],
                            page: 1,
                          });
                          setIsFilterChange(true);
                        }
                      }}
                      optionValues={masterData.fulfilledBy || []}
                      selectedValue={
                        appliedFilter?.fulfilledBy &&
                        appliedFilter?.fulfilledBy.length > 0
                          ? masterData.fulfilledBy.find(
                              (x) =>
                                String(x.FulfilledId) ===
                                String(appliedFilter?.fulfilledBy![0] || '')
                            )
                          : null
                      }
                      label="Name"
                      value="FulfilledId"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <div className="text-base text-dark-gray1 leading-5 uppercase flex items-center">{`${t(
                    LabelConstants.RESULTS
                  )}: ${formatNumber(total)}`}</div>

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
                    <MultipleSortByDropdown
                      selectedValue={{
                        multipleSortBy: appliedFilter.multipleSortBy || [],
                        direction: appliedFilter.sortDir,
                      }}
                      onChange={(
                        e: Array<{
                          key: string;
                          value: MultipleSortByFilter;
                        }>,
                        direction: SortDirection
                      ) => {
                        setAppliedFilter({
                          ...appliedFilter,
                          multipleSortBy: e.map((x) => x.value) || [
                            MultipleSortByFilter.AskingPrice,
                          ],
                          sortDir: direction,
                          page: 1,
                        });
                        setIsFilterChange(true);
                        NewFilterUtils.setMultipleUserPreference(
                          e.map((x) => x.value) || [
                            MultipleSortByFilter.AskingPrice,
                          ],
                          direction,
                          SessionUtils.getUserDetails()?.UserId || null
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">
                {filteredVehicles.map((vehicle, index) => {
                  // New Vehicle Card
                  if (
                    vehicle.IsNew === SearchBoolean.True &&
                    vehicle.IsOutlet === SearchBoolean.False
                  ) {
                    return (
                      <Fragment key={index}>
                        <NewVehicleCard
                          vehicle={vehicle}
                          key={vehicle.VehicleListingId}
                          bookmarkIds={bookmarkIds}
                          productCatalogueBookmarkIds={productCatalogueIds}
                          setSignInRequired={() => setShowLogin(true)}
                          onChangeBookmark={handleChangeBookmark}
                          elmConfiguration={elmConfiguration}
                          location={
                            masterData?.cities?.find(
                              (x) => x.CityId.toString() === vehicle.CityId
                            ) || null
                          }
                          bodyType={
                            masterData?.bodyTypes?.find(
                              (x) =>
                                x.BodyTypeId.toString() === vehicle.BodyTypeId
                            ) || null
                          }
                        />
                      </Fragment>
                    );
                  }
                  // Outlet Vehicle Card
                  else if (
                    vehicle.IsNew === SearchBoolean.True &&
                    vehicle.IsOutlet === SearchBoolean.True
                  ) {
                    return (
                      <Fragment key={index}>
                        <OutletVehicleCard
                          vehicle={vehicle}
                          key={vehicle.VehicleListingId}
                          bookmarkIds={bookmarkIds}
                          setSignInRequired={() => setShowLogin(true)}
                          onChangeBookmark={handleChangeBookmark}
                          elmConfiguration={elmConfiguration}
                          location={
                            masterData?.cities?.find(
                              (x) => x.CityId.toString() === vehicle.CityId
                            ) || null
                          }
                          bodyType={
                            masterData?.bodyTypes?.find(
                              (x) =>
                                x.BodyTypeId.toString() === vehicle.BodyTypeId
                            ) || null
                          }
                        />
                      </Fragment>
                    );
                  }
                  // Preowned Vehicle Card
                  else if (
                    vehicle.IsNew === SearchBoolean.False &&
                    vehicle.IsOutlet === SearchBoolean.False
                  ) {
                    return (
                      <Fragment key={index}>
                        <PreOwnedVehicleCard
                          vehicle={vehicle}
                          key={vehicle.VehicleListingId}
                          bookmarkIds={bookmarkIds}
                          setSignInRequired={() => setShowLogin(true)}
                          onChangeBookmark={handleChangeBookmark}
                          elmConfiguration={elmConfiguration}
                          location={
                            masterData?.cities?.find(
                              (x) => x.CityId.toString() === vehicle.CityId
                            ) || null
                          }
                          bodyType={
                            masterData?.bodyTypes?.find(
                              (x) =>
                                x.BodyTypeId.toString() === vehicle.BodyTypeId
                            ) || null
                          }
                        />
                      </Fragment>
                    );
                  } else {
                    return <Fragment key={index} />;
                  }
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
        </>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps<MyBookmarkPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  // load master data for filters
  const masterData: FilterMasterData =
    await NewFilterUtils.fetchFilterMasterData(locale!);

  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      masterData,
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};

export default MyBookmarkPage;
