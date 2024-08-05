import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { isSafari } from 'react-device-detect';
import {
  ConciergeFrequency,
  ConfigurationKey,
  Locales,
  MultipleSortByFilter,
  PageKey,
  SortByFilter,
  SortDirection,
  UserProfileStatus,
  VehicleAgeType,
} from '../../../types/enums';
import {
  ListingService,
  NewCarService,
  ProfileService,
  VehicleService,
} from '../../../helpers/services';
import {
  SearchAllResultItem,
  FilterMasterData,
  FilterParams,
  Model,
  Spec,
  UserSavedSearch,
  VehicleBrand,
  Breadcrumb,
  BookmarkResponse,
} from '../../../types/models';
import { PageSizes } from '../../../types/constants';
import {
  CommonUtils,
  NewFilterUtils,
  SessionUtils,
  formatNumber,
} from '../../../helpers/utilities';
import { BadgeItem } from '../../../types/events';
import ConfigurationService from '../../../helpers/services/configuration.service';
import {
  PushDataToGTM,
  getFilterDataObj,
} from '../../../helpers/utilities/gtm';
import { GTMEvents } from '../../../types/gtm';
import { LabelConstants } from '../../../types/i18n.labels';
import { toast } from 'react-toastify';
import MessageBox from '../../../components/common/MessageBox';
import BannerSlider from '../../../components/newcars/BannerSlider';
import Filters from '../../../components/newcars/Filters';
import NewVehicleCard from '../../../components/newcars/NewVehicleCard';
import {
  ArrowRightIcon,
  FilledLocationIcon,
  FirstIcon,
  FulfilledByIcon,
  ImportedByIcon,
  LastIcon,
  NextIcon,
  PrevIcon,
  SuppliedByIcon,
} from '../../../components/icons';
import DropdownWithLabel from '../../../components/common/DropdownWithLabel';
import SignInModal from '../../../components/common/SignInModal';
import SaveSearchModal from '../../../components/newcars/Filters/SaveSearchModal';
import MultipleSortByDropdown from '../../../components/common/MultipleSortByDropdown';
import FilterDropDown from '../../../components/newcars/FilterDropDown';
import MetaDataComponent from '../../../components/PagesMetaData/MetaDataComponent';

type NewCarsListingPageProps = {
  masterData: FilterMasterData;
};

const NewCarsListingPage: NextPage<NewCarsListingPageProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter();
  const { t } = useTranslation();
  const PaginationRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSaveSearchModal, setShowSaveSearchModal] =
    useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<BookmarkResponse>({
    UserId: 0,
    ProductCatalogueIds: [],
    VehicleListingIds: [],
  });
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
  const [savedSearches, setSavedSearches] = useState<Array<UserSavedSearch>>(
    []
  );

  // const [appliedFilter, setAppliedFilter] = useState<FilterParams>();
  const [pageState, setPageState] = useState<{
    appliedFilter: FilterParams;
    isFilterChange: boolean;
  }>({
    appliedFilter: {
      locale: router.locale,
      makes: [],
      models: [],
      specs: [],
      page: 1,
      size: PageSizes[0],
      sortBy: SortByFilter.ListedDate,
      sortDir: SortDirection.Asc,
      type: VehicleAgeType.New,
      multipleSortBy: [MultipleSortByFilter.AskingPrice],
    },
    isFilterChange: false,
  });
  const [filteredModels, setFilteredModels] = useState<Array<Model>>([]);
  const [filteredSpecs, setFilteredSpecs] = useState<Array<Spec>>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<
    Array<SearchAllResultItem>
  >([]);
  const [badgeList, setBadgeList] = useState<Array<BadgeItem>>([]);
  const [total, setTotal] = useState<number>(0);
  const [breadcrumbData, setBreadcrumbData] = useState<Array<Breadcrumb>>([]);
  const [selectedMake, setSelectedMake] = useState<
    VehicleBrand | null | undefined
  >();
  const [selectedModel, setSelectedModel] = useState<
    Model | null | undefined
  >();

  const loadPageInitialData = useCallback(
    async (loadOnlyAuth: boolean = false) => {
      const isAuthenticated = SessionUtils.isValidSession();
      if (!isAuthenticated) {
        setBookmarks({
          UserId: 0,
          ProductCatalogueIds: [],
          VehicleListingIds: [],
        });
        setSavedSearches([]);
        setELMConfiguration(undefined);
      } else {
        setShowLogin(false);
        const [
          bookmarks,
          profile,
          absherVerification,
          addressVerification,
          savedSearchList,
        ] = await Promise.all([
          VehicleService.fetchBookmark(),
          ProfileService.fetchUserData(router.locale),
          ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.IsAbsherVerificationRequired,
            router.locale
          ),
          ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.IsUserAddressVerificationRequired,
            router.locale
          ),
          VehicleService.listingSearch(),
        ]);

        setBookmarks(bookmarks);

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

        setSavedSearches(savedSearchList);
      }

      if (!loadOnlyAuth) {
        // Other init API calls
      }
    },
    [router.locale]
  );

  /* Added script to load global style for Safari browser */
  useEffect(() => {
    if (isSafari) {
      const styleTag = document.createElement('style');
      styleTag.innerText = `*{font-weight:400;}`;
      document.head?.appendChild(styleTag);

      // Do cleanup to avoid weird issues
      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, []);

  // load auth specific details for page visibilitychange
  useEffect(() => {
    const handleAuth = async () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        await loadPageInitialData(true);
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, [loadPageInitialData]);

  const applyInitialFilter = async () => {
    const { locale, query } = router;
    const slug: Array<string> = (query.slug as Array<string>) || [];
    if (slug.length === 0 || slug.length > 2) router.replace('/404');

    // read selected make and model from slug
    const [makeKey, modelKey] = slug;
    let make: VehicleBrand | null | undefined = null;
    let model: Model | null | undefined = null;

    // verify selected make and model key
    const allMakes = await NewCarService.fetchNewCarsMake(locale);
    make = allMakes.find(
      (x) => x.MakeKey.toLowerCase() === makeKey?.toLowerCase()
    );
    setSelectedMake(make);
    if (!make) {
      router.replace('/404');
    } else if (modelKey) {
      const models = await VehicleService.fetchModelByMake(make.MakeId, locale);
      model = models.find(
        (x) => x.ModelKey.toLowerCase() === modelKey?.toLowerCase()
      );
      setSelectedModel(model);
    }
    const {
      city: cityKey,
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
      emi,
      filters: queryParamFilters,
      page = 1,
      size = PageSizes[0],
      sort = SortByFilter.ListedDate,
      dir = SortDirection.Asc,
      searchKey = '',
    } = query;

    let filters: FilterParams = {
      locale,
      makes: [make?.MakeKey!],
      models: model ? [model.ModelKey] : [],
      specs: [],
      page: 1,
      size: PageSizes[0],
      sortBy: SortByFilter.ListedDate,
      sortDir: SortDirection.Asc,
      type: VehicleAgeType.New,
      multipleSortBy: [MultipleSortByFilter.AskingPrice],
    };

    filters = {
      ...filters,
      page: parseInt(String(page)),
      size: parseInt(String(size)),
      sortBy: String(sort) as SortByFilter,
      sortDir: String(dir) as SortDirection,
      searchKey: decodeURIComponent(String(searchKey)),
      multipleSortBy: [MultipleSortByFilter.AskingPrice],
      type: VehicleAgeType.New,
    };
    if (queryParamFilters) {
      filters = {
        ...filters,
        ...CommonUtils.decode<FilterParams>(String(queryParamFilters)),
      };
    } else {
      // prepare filter object to search cars.
      if (cityKey) filters.cities = [decodeURIComponent(String(cityKey))];
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
      if (emi) {
        const emiRange = String(emi).split(',');
        if (emiRange && emiRange.length === 2)
          filters.emiRange = {
            min: parseInt(emiRange[0]),
            max: parseInt(emiRange[1]),
          };
      }
    }

    // search vehicles data with filter criteria.
    const { badges } = await NewFilterUtils.getSearchParams(
      filters,
      props.masterData
    );

    const { models, specs } = await NewFilterUtils.fetchModelAndSpecFilterData(
      locale!,
      props.masterData.makes,
      filters.makes,
      filters.models
    );

    setFilteredModels(models);
    setFilteredSpecs(specs);
    setBadgeList(badges);

    return filters;
  };

  // load initial data
  useEffect(() => {
    const init = async () => {
      let initialFilterData = await applyInitialFilter();
      await loadPageInitialData();
      // get user preference to load data
      let filters: FilterParams = {
        ...pageState.appliedFilter,
        ...initialFilterData,
      };
      const getUserPreference = NewFilterUtils.getMultipleUserPreference(
        SessionUtils.getUserDetails()?.UserId || null
      );
      if (getUserPreference) {
        filters = {
          ...filters,
          multipleSortBy: getUserPreference?.sortBy || [],
          sortDir: getUserPreference?.sortDir,
        };
      }
      setPageState({
        ...pageState,
        appliedFilter: {
          ...filters,
        },
        isFilterChange: true,
      });
    };
    if (router.isReady) {
      init();
    }
    /**
     * disabled linting warning for dependency array, to avoid multiple execution.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.locale]);

  /**
   * This effect is use to fetch vehicle details as per user's search criteria.
   */
  useEffect(() => {
    const handleFilterChange = async () => {
      // prepare payload and querystring.
      const { searchPayload, queryString, badges } =
        await NewFilterUtils.getSearchParams(
          { ...pageState.appliedFilter, locale: router.locale },
          {
            ...props.masterData,
            models: filteredModels,
            specs: filteredSpecs,
          }
        );

      // update shallow route with queryString to support SSR with filter.
      if (selectedModel) {
        router.push(
          `/newcars/new/${selectedMake?.MakeKey.toLowerCase()}/${selectedModel.ModelKey.toLowerCase()}/${queryString}`,
          undefined,
          {
            shallow: true,
          }
        );
      } else {
        router.push(
          `/newcars/new/${selectedMake?.MakeKey.toLowerCase()}/${queryString}`,
          undefined,
          {
            shallow: true,
          }
        );
      }

      // send request to fetch filtered vehicles.
      const vehicles = await ListingService.searchAllVehicle(searchPayload);
      await setLoading(false);

      //Added GTM event for Applied Filter Click
      PushDataToGTM(
        GTMEvents.CompletedSearch,
        getFilterDataObj(badges, router)
      );

      // update client side component state to reflect updated filtered data to UI.
      setPageState({ ...pageState, isFilterChange: false });
      setFilteredVehicles(vehicles.DataList);
      setTotal(vehicles.DataCount);
      setBadgeList(badges);
    };

    if (
      pageState.isFilterChange &&
      pageState.appliedFilter &&
      handleFilterChange
    ) {
      handleFilterChange();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageState, router.locale, selectedMake, selectedModel, props.masterData]);

  useEffect(() => {
    if (selectedMake?.IsAssociatedWithGGMDealer) {
      const data = CommonUtils.GetPageBreadcrumbs(PageKey.NewListing, {
        make: selectedMake?.MakeDisplayName,
        makeKey: selectedMake?.MakeKey,
      });
      setBreadcrumbData(data);
    } else {
      const data = CommonUtils.GetPageBreadcrumbs(PageKey.NewListingV1, {
        make: selectedMake?.MakeDisplayName,
        makeKey: selectedMake?.MakeKey,
      });
      setBreadcrumbData(data);
    }
  }, [selectedMake]);

  const handleChangeBookmark = async () => {
    const result = await VehicleService.fetchBookmark();
    setBookmarks(result);
  };

  const handleNotifyMe = async () => {
    if (SessionUtils.isValidSession()) {
      const { searchObj } = await NewFilterUtils.getSearchParams(
        { ...pageState.appliedFilter, locale: router.locale },
        {
          ...props.masterData,
          models: filteredModels,
          specs: filteredSpecs,
        }
      );
      const data = {
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        VehicleJson: JSON.stringify(searchObj),
        IsSMS: false,
        IsWhatsApp: false,
        IsEmailId: true,
        EmailId: elmConfiguration?.userConfig.email!,
        SMSNumber: null,
        WhatsAppNumber: null,
        ConciergeCommunicationFrequency: ConciergeFrequency.WEEKLY,
        IsNotifyMeRequest: true,
      };
      const notifyMeRes = await VehicleService.notifyMe(data);
      if (notifyMeRes.IsSuccess) {
        MessageBox.open({
          content: t(LabelConstants.WE_WILL_NOTIFY_THANK_YOU),
        });
      } else {
        MessageBox.open({
          content: t(LabelConstants.MAXIMUM_CONCIERGE_REACHED),
        });
      }
    } else {
      setShowLogin(true);
    }
  };

  const handleApplySavedSearch = async (event: UserSavedSearch) => {
    const { filteredData, appliedFilter } =
      await NewFilterUtils.getSearchParamsBySavedSearch(router.locale, event);
    const { queryString } = await NewFilterUtils.getSearchParams(
      { ...appliedFilter, locale: router.locale },
      {
        ...props.masterData,
        models: filteredData.models,
        specs: filteredData.specs,
      }
    );

    router.push(`/all-listings${queryString}`);
  };

  const handleDeleteSavedSearch = async (event: UserSavedSearch) => {
    const result = await VehicleService.removeSaveSearch(
      event.UserVehicleSearchID
    );
    if (result) {
      const savedSearchList = await VehicleService.listingSearch();
      setSavedSearches(savedSearchList);
    }
  };

  const handleSaveSearch = async (searchName: string) => {
    if (savedSearches.length < 3) {
      const response = await VehicleService.saveSearch({
        SearchName: searchName,
        SearchParam: JSON.stringify(badgeList),
        UserID: SessionUtils.getUserDetails()?.UserId!,
      });

      if (response.IsSuccess) {
        const savedSearchList = await VehicleService.listingSearch();
        setSavedSearches(savedSearchList);
        await MessageBox.open({
          content: `${t(LabelConstants.SEARCH_LIMIT, {
            total: savedSearchList.length,
          })}`,
        });
      } else {
        if (
          response.MessageCode ===
          LabelConstants.VEHICLE_SEARCHNAME_ALREADY_EXISTS
        )
          toast.error(t(LabelConstants.VEHICLE_SEARCHNAME_ALREADY_EXISTS));
      }
    } else {
      toast.warning(t(LabelConstants.MAXIMUM_3_SEARCHED_CAN_BE_SAVED));
    }
  };

  const title = useMemo(
    () =>
      t(LabelConstants.META_TITLE_LATEST_MODEL_LISTING)
        .replaceAll('{brand}', selectedMake?.MakeDisplayName ?? '')
        .replaceAll('{model}', selectedModel?.Model ?? ''),
    [selectedMake?.MakeDisplayName, selectedModel?.Model, t]
  );

  const description = useMemo(
    () =>
      t(LabelConstants.META_DESCRIPTION_LATEST_MODEL_LISTING)
        .replaceAll('{brand}', selectedMake?.MakeDisplayName ?? '')
        .replaceAll('{model}', selectedModel?.Model ?? ''),
    [selectedMake?.MakeDisplayName, selectedModel?.Model, t]
  );

  if (loading) {
    return (
      <>
        <MetaDataComponent title={title} description={description} />
      </>
    );
  }

  // UI Render
  return (
    <>
      <MetaDataComponent title={title} description={description} />
      <div className="w-full" ref={PaginationRef}>
        <div className="relative">
          {breadcrumbData ? (
            <div className="container uppercase flex items-center gap-2 mt-4 absolute top-0 left-0 z-10">
              <div className="flex gap-2 items-center">
                {breadcrumbData.map((x, i) => (
                  <React.Fragment key={i}>
                    <div
                      className={`cursor-pointer ${
                        (
                          selectedMake?.BannerImages?.filter(
                            (x) => x.URL && x.Platform === 'Web'
                          ) || []
                        ).length > 0
                          ? 'text-white'
                          : 'text-primary'
                      }`}
                      onClick={() => router.push(x.route)}
                    >
                      {x.label}
                    </div>
                    <div>
                      <ArrowRightIcon
                        className={`w-3 h-3 ${
                          (
                            selectedMake?.BannerImages?.filter(
                              (x) => x.URL && x.Platform === 'Web'
                            ) || []
                          ).length > 0
                            ? '!text-white'
                            : '!text-primary'
                        }`}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <div
                className={
                  (
                    selectedMake?.BannerImages?.filter(
                      (x) => x.URL && x.Platform === 'Web'
                    ) || []
                  ).length > 0
                    ? '!text-white'
                    : 'text-primary'
                }
              >
                {selectedMake?.IsAssociatedWithGGMDealer
                  ? `${selectedMake?.MakeDisplayName} ${selectedModel?.Model}`
                  : selectedMake?.MakeDisplayName}
              </div>
            </div>
          ) : (
            <></>
          )}
          <BannerSlider
            bannerImages={
              selectedMake?.BannerImages?.filter(
                (x) => x.URL && x.Platform === 'Web'
              )?.map((x) => ({
                ...x,
                URL: `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${x.URL}`,
              })) || []
            }
            title={selectedMake?.Title}
            subTitle={selectedMake?.SubTitle}
            dir={router.locale === Locales.AR ? 'rtl' : 'ltr'}
          />
        </div>

        <header className="container py-[2.625rem] flex flex-col gap-[1.0819rem]">
          <Filters
            appliedFilter={pageState.appliedFilter}
            badges={badgeList}
            masterData={props.masterData}
            setAppliedFilter={(e) => {
              setPageState({
                ...pageState,
                appliedFilter: e,
                isFilterChange: true,
              });
            }}
            setFilteredModels={setFilteredModels}
            setFilteredSpecs={setFilteredSpecs}
            filteredModels={filteredModels}
            filteredSpecs={filteredSpecs}
            showNotifyMe={total === 0}
            handleNotifyMe={handleNotifyMe}
            showSaveSearch={!!elmConfiguration}
            showSaveSearchLink={true}
            savedSearch={savedSearches}
            handleApplySavedSearch={handleApplySavedSearch}
            handleDeleteSavedSearch={handleDeleteSavedSearch}
            handleSaveSearch={() => {
              if (!!elmConfiguration) setShowSaveSearchModal(true);
              else setShowLogin(true);
            }}
            showEMIRange={true}
            showSelfListedCheckBox={false}
            showMakeFilter={false}
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
                          setPageState({
                            ...pageState,
                            isFilterChange: true,
                            appliedFilter: {
                              ...pageState.appliedFilter,
                              cities: [String(e.CityKey)],
                              page: 1,
                            },
                          });
                        } else {
                          setPageState({
                            ...pageState,
                            isFilterChange: true,
                            appliedFilter: {
                              ...pageState.appliedFilter,
                              cities: [],
                              page: 1,
                            },
                          });
                        }
                      }}
                      optionValues={props.masterData.cities || []}
                      selectedValue={
                        pageState.appliedFilter?.cities &&
                        pageState.appliedFilter?.cities.length > 0
                          ? props.masterData.cities.find(
                              (x) =>
                                String(x.CityKey) ===
                                String(
                                  pageState.appliedFilter?.cities![0] || ''
                                )
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
                    <ImportedByIcon className="w-5 h-5" />
                    <div>{t(LabelConstants.IMPORTED_BY)}</div>
                  </div>
                  <FilterDropDown
                    onChange={(e) => {
                      if (e) {
                        setPageState({
                          ...pageState,
                          isFilterChange: true,
                          appliedFilter: {
                            ...pageState.appliedFilter,
                            importedBy: [String(e.ImporterId)],
                            page: 1,
                          },
                        });
                      } else {
                        setPageState({
                          ...pageState,
                          isFilterChange: true,
                          appliedFilter: {
                            ...pageState.appliedFilter,
                            importedBy: [],
                            page: 1,
                          },
                        });
                      }
                    }}
                    optionValues={props.masterData.importedBy || []}
                    selectedValue={
                      pageState.appliedFilter?.importedBy &&
                      pageState.appliedFilter?.importedBy.length > 0
                        ? props.masterData.importedBy.find(
                            (x) =>
                              String(x.ImporterId) ===
                              String(
                                pageState.appliedFilter?.importedBy![0] || ''
                              )
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
                        setPageState({
                          ...pageState,
                          isFilterChange: true,
                          appliedFilter: {
                            ...pageState.appliedFilter,
                            suppliedBy: [String(e.Id)],
                            dealers: [],
                            page: 1,
                          },
                        });
                      } else if (e && e.Type === 'Dealer') {
                        setPageState({
                          ...pageState,
                          isFilterChange: true,
                          appliedFilter: {
                            ...pageState.appliedFilter,
                            suppliedBy: [],
                            dealers: [String(e.Id)],
                            page: 1,
                          },
                        });
                      } else {
                        setPageState({
                          ...pageState,
                          isFilterChange: true,
                          appliedFilter: {
                            ...pageState.appliedFilter,
                            suppliedBy: [],
                            dealers: [],
                            page: 1,
                          },
                        });
                      }
                    }}
                    optionValues={props.masterData.suppliedBy || []}
                    selectedValue={
                      pageState.appliedFilter?.suppliedBy &&
                      pageState.appliedFilter?.suppliedBy.length > 0
                        ? props.masterData.suppliedBy.find(
                            (x) =>
                              String(x.Id) ===
                                String(
                                  pageState.appliedFilter?.suppliedBy![0] || ''
                                ) && x.Type === 'Distributor'
                          )
                        : pageState.appliedFilter?.dealers &&
                          pageState.appliedFilter?.dealers.length > 0
                        ? props.masterData.suppliedBy.find(
                            (x) =>
                              String(x.Id) ===
                                String(
                                  pageState.appliedFilter?.dealers![0] || ''
                                ) && x.Type === 'Dealer'
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
                        setPageState({
                          ...pageState,
                          isFilterChange: true,
                          appliedFilter: {
                            ...pageState.appliedFilter,
                            fulfilledBy: [String(e.FulfilledId)],
                            page: 1,
                          },
                        });
                      } else {
                        setPageState({
                          ...pageState,
                          isFilterChange: true,
                          appliedFilter: {
                            ...pageState.appliedFilter,
                            fulfilledBy: [],
                            page: 1,
                          },
                        });
                      }
                    }}
                    optionValues={props.masterData.fulfilledBy || []}
                    selectedValue={
                      pageState.appliedFilter?.fulfilledBy &&
                      pageState.appliedFilter?.fulfilledBy.length > 0
                        ? props.masterData.fulfilledBy.find(
                            (x) =>
                              String(x.FulfilledId) ===
                              String(
                                pageState.appliedFilter?.fulfilledBy![0] || ''
                              )
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
                    selected={pageState.appliedFilter.size}
                    onChange={(e) => {
                      setPageState({
                        ...pageState,
                        isFilterChange: true,
                        appliedFilter: {
                          ...pageState.appliedFilter,
                          page: 1,
                          size: e?.key || PageSizes[0],
                        },
                      });
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
                      multipleSortBy:
                        pageState.appliedFilter.multipleSortBy || [],
                      direction: pageState.appliedFilter.sortDir,
                    }}
                    onChange={(
                      e: Array<{
                        key: string;
                        value: MultipleSortByFilter;
                      }>,
                      direction: SortDirection
                    ) => {
                      setPageState({
                        ...pageState,
                        isFilterChange: true,
                        appliedFilter: {
                          ...pageState.appliedFilter,
                          multipleSortBy: e.map((x) => x.value) || [
                            MultipleSortByFilter.AskingPrice,
                          ],
                          sortDir: direction,
                          page: 1,
                        },
                      });
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
                return (
                  <Fragment key={index}>
                    <NewVehicleCard
                      vehicle={vehicle}
                      key={vehicle.VehicleListingId}
                      bookmarkIds={bookmarks.VehicleListingIds}
                      productCatalogueBookmarkIds={
                        bookmarks.ProductCatalogueIds
                      }
                      setSignInRequired={() => setShowLogin(true)}
                      onChangeBookmark={handleChangeBookmark}
                      elmConfiguration={elmConfiguration}
                      location={
                        props.masterData?.cities?.find(
                          (x) => x.CityId.toString() === vehicle.CityId
                        ) || null
                      }
                      bodyType={
                        props.masterData?.bodyTypes?.find(
                          (x) => x.BodyTypeId.toString() === vehicle.BodyTypeId
                        ) || null
                      }
                    />
                  </Fragment>
                );
              })}
            </section>
          </div>
          {/* Pagination */}
          {total > pageState.appliedFilter.size && (
            <>
              <div className="flex sm:hidden justify-center items-center w-full font-bold text-xl text-dark-gray1">
                <div>
                  {t(LabelConstants.PAGE_INDICATOR, {
                    currentPage: pageState.appliedFilter.page,
                    lastPage: Math.ceil(total / pageState.appliedFilter.size),
                  })}
                </div>
              </div>
              <div className="flex w-full">
                <div className="flex justify-start w-full gap-2">
                  <button
                    className="btn btn-pagination btn-pagination-icon"
                    disabled={pageState.appliedFilter.page === 1}
                    onClick={() => {
                      setPageState({
                        ...pageState,
                        isFilterChange: true,
                        appliedFilter: { ...pageState.appliedFilter, page: 1 },
                      });
                    }}
                    title={t(LabelConstants.FIRST).toUpperCase()}
                  >
                    <span className="w-full flex justify-center items-center uppercase">
                      <FirstIcon className="rtl:rotate-180" />
                    </span>
                  </button>
                  <button
                    className="btn btn-pagination rtl:!w-[7.5rem]"
                    disabled={pageState.appliedFilter.page === 1}
                    onClick={() => {
                      setPageState({
                        ...pageState,
                        isFilterChange: true,
                        appliedFilter: {
                          ...pageState.appliedFilter,
                          page: pageState.appliedFilter.page - 1,
                        },
                      });
                    }}
                    title={t(LabelConstants.BACK).toUpperCase()}
                  >
                    <span className="flex justify-center items-center text-lg leading-[1.375rem] uppercase">
                      <PrevIcon className="rtl:rotate-180" />
                      <label>{t(LabelConstants.BACK)}</label>
                    </span>
                  </button>
                </div>
                <div className="hidden sm:flex justify-center items-center w-full font-bold text-xl text-dark-gray1">
                  <div>
                    {t(LabelConstants.PAGE_INDICATOR, {
                      currentPage: pageState.appliedFilter.page,
                      lastPage: Math.ceil(total / pageState.appliedFilter.size),
                    })}
                  </div>
                </div>
                <div className="flex justify-end w-full gap-2">
                  <button
                    className="btn btn-pagination rtl:!w-[7.5rem]"
                    onClick={() => {
                      if (
                        total >
                        pageState.appliedFilter.page *
                          pageState.appliedFilter.size
                      ) {
                        setPageState({
                          ...pageState,
                          isFilterChange: true,
                          appliedFilter: {
                            ...pageState.appliedFilter,
                            page: pageState.appliedFilter.page + 1,
                          },
                        });
                      }
                    }}
                    disabled={
                      total <=
                      pageState.appliedFilter.page *
                        pageState.appliedFilter.size
                    }
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
                      setPageState({
                        ...pageState,
                        isFilterChange: true,
                        appliedFilter: {
                          ...pageState.appliedFilter,
                          page: Math.ceil(total / pageState.appliedFilter.size),
                        },
                      });
                    }}
                    disabled={
                      total <=
                      pageState.appliedFilter.page *
                        pageState.appliedFilter.size
                    }
                    title={t(LabelConstants.LAST).toUpperCase()}
                  >
                    <span className="w-full flex justify-center items-center uppercase">
                      <LastIcon className="rtl:rotate-180" />
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Sign In Modal */}
        <SignInModal
          show={showLogin}
          onClose={() => {
            setShowLogin(false);
            localStorage.removeItem('SignInRedirectOperation');
          }}
        />

        {/* Save Search Modal */}
        <SaveSearchModal
          show={showSaveSearchModal}
          onClose={(searchName?: string) => {
            if (searchName) handleSaveSearch(searchName);
            setShowSaveSearchModal(false);
          }}
        />
      </div>
    </>
  );
};

export default NewCarsListingPage;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps<NewCarsListingPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const {
    bodyTypes,
    cities,
    fuelTypes,
    makes,
    status,
    fulfilledBy,
    importedBy,
    suppliedBy,
    vehicleMetaData,
  } = await NewFilterUtils.fetchFilterMasterData(locale!);

  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      masterData: {
        bodyTypes,
        cities,
        fuelTypes,
        makes,
        status,
        fulfilledBy,
        importedBy,
        suppliedBy,
        vehicleMetaData,
        models: [],
        specs: [],
      },
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};
