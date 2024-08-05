import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import DropdownWithLabel from '../../components/common/DropdownWithLabel';
import ListingVehicleCard from '../../components/common/ListingVehicleCard';
import MessageBox from '../../components/common/MessageBox';
import SignInModal from '../../components/common/SignInModal';
import SortByDropdown from '../../components/common/SortByDropdown';
import BrowseByLocation from '../../components/home/BrowseByLocation';
import BrowseByMakeModel from '../../components/home/BrowseByMakeModel';
import BrowseByStyle from '../../components/home/BrowseByStyle';
import {
  FirstIcon,
  LastIcon,
  NextIcon,
  PrevIcon,
} from '../../components/icons';
import CompareVehicles from '../../components/used-cars/CompareVehicles';
import Filters from '../../components/used-cars/Filters';
import SaveSearchModal from '../../components/used-cars/SaveSearchModal';
import {
  GlobalService,
  ListingService,
  ProfileService,
  VehicleService,
} from '../../helpers/services';
import ConfigurationService from '../../helpers/services/configuration.service';
import {
  CommonUtils,
  FilterUtils,
  formatNumber,
  SessionUtils,
} from '../../helpers/utilities';
import { getFilterDataObj, PushDataToGTM } from '../../helpers/utilities/gtm';
import { PageSizes } from '../../types/constants';
import {
  ConciergeFrequency,
  ConfigurationKey,
  Locales,
  SortByFilter,
  SortDirection,
  UserProfileStatus,
  VehicleAgeType,
} from '../../types/enums';
import { BadgeItem } from '../../types/events';
import { GTMEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';
import {
  Brand,
  ConciergeFilterPayload,
  FilterParams,
  Model,
  SearchResultItem,
  SocialMediaPlatformItem,
  Spec,
  UsedCarFilterMasterData,
  UserSavedSearch,
} from '../../types/models';
import { isSafari } from 'react-device-detect';
import MetaDataComponent from '../../components/PagesMetaData/MetaDataComponent';

type UsedCarsPageProps = {
  masterData: UsedCarFilterMasterData;
  topBrands: Array<Brand>;
};

const UsedCars: NextPage<UsedCarsPageProps> = ({
  masterData,
  topBrands,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { t } = useTranslation();
  const PaginationRef = useRef<HTMLDivElement | null>(null);

  // component state
  const [isFilterChange, setIsFilterChange] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showSelfListed, setShowSelfListed] = useState<boolean>(true);
  const [bookmarkIds, setBookmarkIds] = useState<Array<number>>([]);
  const [showSaveSearchModal, setShowSaveSearchModal] =
    useState<boolean>(false);
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

  // component props to state
  const [filteredVehicles, setFilteredVehicles] = useState<
    Array<SearchResultItem>
  >([]);
  const [badgeList, setBadgeList] = useState<Array<BadgeItem>>([]);
  const [total, setTotal] = useState<number>(0);
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
    multipleSortBy: [],
  });
  const [filteredModels, setFilteredModels] = useState<Array<Model>>([]);
  const [filteredSpecs, setFilteredSpecs] = useState<Array<Spec>>([]);
  const [sharingPlatform, setSharingPlatform] = useState<
    Array<SocialMediaPlatformItem>
  >([]);
  const [compareVehicleIds, setCompareVehicleIds] = useState<Array<string>>([]);
  const [isNewCarEnabled, setIsNewCarEnabled] = useState<string>('false');

  const loadUserListingData = useCallback(async () => {
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

    setBookmarkIds(bookmarks?.VehicleListingIds);

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
        absherVerification: absherVerification.ConfigurationValue === 'true',
        addressVerification: addressVerification.ConfigurationValue === 'true',
      },
    });

    setSavedSearches(savedSearchList);
  }, [router.locale]);

  useEffect(() => {
    {
      /* Added script to load global style for Safari browser */
    }
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

  useEffect(() => {
    const handleAuth = async () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (!isAuthenticated) {
          setBookmarkIds([]);
          setSavedSearches([]);
          setELMConfiguration(undefined);
        } else {
          setShowLogin(false);
          await loadUserListingData();
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, [loadUserListingData]);

  const loadInitialData = async () => {
    const { query, locale } = router;

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

    let { conciergeRequestId, compare } = query;

    if (!conciergeRequestId) {
      // read makes, model and specs filter details from URL params.
      const { 'filter-params': filterParams } = query as {
        'filter-params'?: Array<string>;
      };

      if (filterParams && filterParams.length > 0 && filterParams.length <= 2) {
        const makeModels = filterParams[0];
        if (makeModels) {
          const selectedMakeModels = makeModels.split('-');
          selectedMakeModels[0] && filters.makes?.push(selectedMakeModels[0]);
          selectedMakeModels[1] && filters.models?.push(selectedMakeModels[1]);
          filterParams[1] && filters.specs?.push(filterParams[1]);
        }
      } else {
        if (filterParams && filterParams.length > 2) {
          // invalid URL navigate user to 404 Page
        }
      }

      //check filter parameter.
      const {
        filters: pageFilter,
        page = 1,
        size = PageSizes[0],
        sort = SortByFilter.ListedDate,
        dir = SortDirection.Desc,
        carType = VehicleAgeType.Old,
        searchKey = '',
      } = query;
      filters = {
        ...filters,
        page: parseInt(String(page)),
        size: parseInt(String(size)),
        sortBy: String(sort) as SortByFilter,
        sortDir: String(dir) as SortDirection,
        searchKey: decodeURIComponent(String(searchKey)),
        type: String(carType) as VehicleAgeType,
      };

      if (pageFilter) {
        filters = {
          ...filters,
          ...CommonUtils.decode<FilterParams>(String(pageFilter)),
        };
      } else {
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
        } = query;

        // prepare filter object to search cars.
        if (cityKey) filters.cities = [decodeURIComponent(String(cityKey))];
        if (spec) filters.specs = [decodeURIComponent(String(spec))];
        if (bodytype)
          filters.bodyTypes = [decodeURIComponent(String(bodytype))];
        if (fueltype)
          filters.fuelTypes = [decodeURIComponent(String(fueltype))];
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
    }

    // load master data for filters
    const { models, specs } = await FilterUtils.fetchModelAndSpecFilterData(
      locale!,
      masterData.makes,
      filters.makes,
      filters.models
    );

    // search vehicles data with filter criteria.
    const { badges } = await FilterUtils.getSearchParams(filters, masterData);
    setFilteredModels(models || []);
    setFilteredSpecs(specs || []);
    setBadgeList(badges);
    setCompareVehicleIds(compare ? String(compare).split(',') : []);

    return filters;
  };

  /**
   * This effect is use to fetch initial data for the page.
   */
  useEffect(() => {
    const init = async () => {
      const initialFilter = await loadInitialData();
      let filters: FilterParams = { ...appliedFilter, ...initialFilter };
      const [platforms] = await Promise.all([
        GlobalService.fetchSocialMediaPlatform(router.locale),
      ]);

      setSharingPlatform(platforms);

      if (SessionUtils.isValidSession()) {
        await loadUserListingData();
      }

      let isNewCarEnabled = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.IsNewCarEnabled,
        router.locale
      );
      setIsNewCarEnabled(isNewCarEnabled.ConfigurationValue);
      if (
        isNewCarEnabled.ConfigurationValue === 'true' &&
        router.query.carType === VehicleAgeType.New
      ) {
        filters = {
          ...filters,
          type: VehicleAgeType.New,
        };
      } else if (router.query.carType === VehicleAgeType.Outlet) {
        filters = {
          ...filters,
          type: VehicleAgeType.Outlet,
        };
      } else {
        filters = {
          ...filters,
          type: VehicleAgeType.Old,
        };
      }

      /**
       * apply concierge filter if we detect conciergeRequestId in route.
       */
      if (router.query.conciergeRequestId) {
        if (SessionUtils.isValidSession()) {
          const response = await VehicleService.fetchEditConcierge(
            router.locale!,
            String(router.query.conciergeRequestId)
          );
          const vehicleData: ConciergeFilterPayload = JSON.parse(
            response.ConciergeRequest && response.ConciergeRequest.VehicleJson
          );

          /**
           * fetch make model
           */
          let availableModels: Array<Model> = [];
          let availableSpecs: Array<Spec> = [];
          if (
            vehicleData.VehicleMakeId &&
            vehicleData.VehicleMakeId.length > 0
          ) {
            const data = await Promise.all(
              vehicleData.VehicleMakeId.map((x) =>
                VehicleService.fetchModelByMake(x, router.locale!)
              )
            );
            availableModels = data.flat();
            /**
             * fetch dependent specs/trims for selected models.
             */
            const filteredModelObjs = availableModels.filter((x) =>
              vehicleData.VehicleModelId?.some((y) => y === x.ModelCode)
            );

            if (filteredModelObjs && filteredModelObjs.length > 0) {
              // find specs for selected models...
              const data = await Promise.all(
                filteredModelObjs.map((x) =>
                  VehicleService.fetchVehicleSpecs(x.MakeCode, x.ModelCode)
                )
              );

              availableSpecs = data.flat();
              setFilteredSpecs(availableSpecs);
              setFilteredModels(availableModels);
            }
          }

          filters = {
            ...filters,
            cities: masterData.cities
              .filter((x) =>
                (vehicleData.CityId || []).some((y) => y === x.CityId)
              )
              .map((x) => x.CityKey),
            ownership: masterData.vehicleMetaData.Ownerships.filter((x) =>
              (vehicleData.OwnershipId || []).some((y) => y === x.OwnershipId)
            ).map((x) => x.OwnershipKey),
            makes: masterData.makes
              .filter((x) =>
                (vehicleData.VehicleMakeId || []).some((y) => y === x.MakeCode)
              )
              .map((x) => x.Make),
            models: availableModels
              .filter((x) =>
                (vehicleData.VehicleModelId || []).some(
                  (y) => y === x.ModelCode
                )
              )
              .map((x) => x.Model),
            specs: availableSpecs
              .filter((x) =>
                (vehicleData.SpecId || []).some((y) => y === x.TrimCode)
              )
              .map((x) => x.Trim),
            yearRange: {
              min:
                (vehicleData.ManufactureYearId || [])[0] ||
                masterData.vehicleMetaData.Years[
                  masterData.vehicleMetaData.Years.length - 1
                ],
              max:
                (vehicleData.ManufactureYearId || [])[1] ||
                masterData.vehicleMetaData.Years[0],
            },
            interiorColor: masterData.vehicleMetaData.InteriorColors.filter(
              (x) =>
                (vehicleData.InteriorColorId || []).some((y) => y === x.ColorId)
            ).map((x) => x.ColorKey),
            exteriorColor: masterData.vehicleMetaData.ExteriorColors.filter(
              (x) =>
                (vehicleData.ExteriorColorId || []).some((y) => y === x.ColorId)
            ).map((x) => x.ColorKey),
            features: masterData.vehicleMetaData.Features.flatMap(
              (x) => x.FeatureList
            )
              .filter((x) =>
                (vehicleData.VehicleFeatureCSV || []).some(
                  (y) => y === x.FeatureId
                )
              )
              .map((x) => x.FeatureKey),
            mileageRange: {
              min:
                vehicleData.MileageRange?.MinValue ||
                masterData.vehicleMetaData.MinVehicleMileage,
              max:
                vehicleData.MileageRange?.MaxValue ||
                masterData.vehicleMetaData.MaxVehicleMileage,
            },
            emiRange: {
              min:
                vehicleData.EMIRange?.MinValue ||
                masterData.vehicleMetaData.MinMonthlyEMI,
              max:
                vehicleData.EMIRange?.MaxValue ||
                masterData.vehicleMetaData.MaxMonthlyEMI,
            },
            bodyTypes: masterData.bodyTypes
              .filter((x) =>
                vehicleData.BodyTypeId.some((y) => y === x.BodyTypeId)
              )
              .map((x) => x.BodyTypeKey),
            fuelTypes: masterData.fuelTypes
              .filter((x) =>
                vehicleData.FuelTypeId.some((y) => y === x.FuelTypeId)
              )
              .map((x) => x.FuelTypeKey),
            transmission: masterData.vehicleMetaData.Transmissions.filter((x) =>
              vehicleData.TransmissionId.some((y) => y === x.TransmissionId)
            ).map((x) => x.TransmissionKey),
            priceRange: {
              min:
                vehicleData.AskingPriceRange.MinBudget ||
                masterData.vehicleMetaData.MinVehiclePrice,
              max:
                vehicleData.AskingPriceRange.MaxBudget ||
                masterData.vehicleMetaData.MaxVehiclePrice,
            },
          };

          setAppliedFilter(filters);
          setIsFilterChange(true);
        } else {
          setShowLogin(true);
          setAppliedFilter(filters);
          setIsFilterChange(true);
        }
      } else {
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

        setAppliedFilter(filters);
        setIsFilterChange(true);
      }
    };

    if (router.isReady) init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.locale]);

  useEffect(() => {
    if (
      isNewCarEnabled === 'true' &&
      router.query.carType &&
      router.query.carType !== appliedFilter.type
    ) {
      setAppliedFilter({
        ...appliedFilter,
        page: 1,
        type: router.query.carType as VehicleAgeType,
      });
      setIsFilterChange(true);
    }

    if (
      router.query.carType === VehicleAgeType.New ||
      router.query.carType === VehicleAgeType.Outlet
    ) {
      setShowSelfListed(false);
      setAppliedFilter({
        ...appliedFilter,
        type: router.query.carType,
      });
    } else {
      setShowSelfListed(true);
    }
    PaginationRef.current?.scrollIntoView({ behavior: 'smooth' });
    /**
     * disabled linting warning for dependency array, to avoid multiple execution.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  /**
   * This effect is use to fetch vehicle details as per user's search criteria.
   */
  useEffect(() => {
    const handleFilterChange = async () => {
      // prepare payload and querystring.
      const { searchPayload, queryString, badges } =
        await FilterUtils.getSearchParams(
          { ...appliedFilter, locale: router.locale },
          {
            ...masterData,
            models: filteredModels,
            specs: filteredSpecs,
          },
          true,
          compareVehicleIds || []
        );

      // update shallow route with queryString to support SSR with filter.
      await router.push(`/cars${queryString}`, undefined, {
        shallow: true,
      });

      // send request to fetch filtered vehicles.
      const vehicles = await ListingService.searchVehicle(searchPayload);
      await setLoading(false);

      //Added GTM event for Applied Filter Click
      PushDataToGTM(
        GTMEvents.CompletedSearch,
        getFilterDataObj(badges, router)
      );

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
      handleFilterChange
    ) {
      handleFilterChange();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isFilterChange,
    appliedFilter,
    router.isReady,
    router.locale,
    masterData,
    filteredModels,
    filteredSpecs,
    compareVehicleIds,
  ]);

  const handleChangeBookmark = async () => {
    const result = await VehicleService.fetchBookmark();
    setBookmarkIds(result?.VehicleListingIds);
  };

  const handleChangeCompare = (id: string, vehicleData: any) => {
    const user = SessionUtils.getUserDetails();
    if (compareVehicleIds.some((x) => x === id)) {
      setCompareVehicleIds(compareVehicleIds.filter((x) => x !== id));
    } else if (compareVehicleIds.length < 4) {
      //Added GTM event for Add To Compare Click
      PushDataToGTM(GTMEvents.AddedToCompare, {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        make: vehicleData.VehicleMake,
        model: vehicleData.VehicleModel,
        fuelType: vehicleData.FuelType,
        transmissionType: vehicleData.Transmission,
        vehicleListingId:
          process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! +
          vehicleData.VehicleListingId,
        languageId: router.locale,
      });
      setCompareVehicleIds([...compareVehicleIds, id]);
    }
  };

  const handleNotifyMe = async () => {
    if (SessionUtils.isValidSession()) {
      const { searchObj } = await FilterUtils.getSearchParams(
        { ...appliedFilter, locale: router.locale },
        {
          ...masterData,
          models: filteredModels,
          specs: filteredSpecs,
        },
        true,
        compareVehicleIds || []
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
      await FilterUtils.getSearchParamsBySavedSearch(router.locale, event);
    const { queryString } = await FilterUtils.getSearchParams(
      { ...appliedFilter, locale: router.locale },
      {
        ...masterData,
        models: filteredData.models,
        specs: filteredData.specs,
      },
      false
    );

    setAppliedFilter(appliedFilter);
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

  const componentMetadata: any = useMemo(() => {
    const defaultMetaData: { title?: string; description?: string } = {
      title: undefined,
      description: undefined,
    };
    if (badgeList?.length >= 2) {
      let make = undefined;
      let model = undefined;
      badgeList?.forEach((badge) => {
        if (badge?.type == 'Make') {
          make = badge?.displayValue;
        } else if (badge?.type == 'Model') {
          model = badge?.displayValue;
        }
      });
      if (make && model) {
        defaultMetaData.title = t('META_TITLE_USED_MODEL')
          .replaceAll('{brand}', make ?? '')
          .replaceAll('{model}', model ?? '')
          .replace('{count}', String(total ?? ''));
        defaultMetaData.description = t('META_DESCRIPTION_USED_MODEL')
          .replaceAll('{brand}', make ?? '')
          .replaceAll('{model}', model ?? '');
      }
    }

    return defaultMetaData;
  }, [badgeList, t, total]);

  if (loading) {
    return (
      <>
        <MetaDataComponent
          title={componentMetadata.title}
          description={componentMetadata.description}
        />
      </>
    );
  }

  return (
    <>
      <MetaDataComponent
        title={componentMetadata.title}
        description={componentMetadata.description}
      />

      <div className="w-full" ref={PaginationRef}>
        <header className="container py-[2.625rem] flex flex-col gap-[1.0819rem]">
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
            showSelfListedCheckBox={showSelfListed}
          />
          <CompareVehicles
            compareVehicleIds={compareVehicleIds}
            onCompareChange={handleChangeCompare}
            clear={() => setCompareVehicleIds([])}
          />
        </header>
        <div className="bg-lighter-gray container pt-10 pb-[3.625rem] flex flex-col gap-10 mx-auto">
          <div className="flex flex-col gap-5">
            <section className="grid grid-cols-[repeat(1,20.5rem)]  min-[530px]:grid-cols-[repeat(2,20.5rem)]  md:grid-cols-[repeat(3,19.5rem)] lg:grid-cols-[repeat(4,20.5rem)] min-[1745px]:grid-cols-[repeat(5,20rem)] 3xl:grid-cols-[repeat(5,20.5rem)] gap-5 justify-center">
              <div className="text-base text-dark-gray1 leading-5 uppercase flex items-center">{`${t(
                LabelConstants.RESULTS
              )}: ${formatNumber(total)}`}</div>
              <div className="md:col-span-2 lg:col-span-3 min-[1745px]:col-span-4 flex justify-end">
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
                      onChange={(
                        e: {
                          key: string;
                          value: SortByFilter;
                        },
                        direction: SortDirection
                      ) => {
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
                      showEMISort={true}
                    />
                  </div>
                </div>
              </div>
            </section>
            <section className="grid grid-cols-[repeat(1,24.5rem)]  min-[530px]:grid-cols-[repeat(2,20.5rem)]  md:grid-cols-[repeat(3,19.5rem)] lg:grid-cols-[repeat(4,20.5rem)] min-[1745px]:grid-cols-[repeat(5,20rem)] 3xl:grid-cols-[repeat(5,20.5rem)] gap-5 justify-center">
              {filteredVehicles.map((vehicle) => {
                return (
                  <ListingVehicleCard
                    vehicle={vehicle}
                    key={vehicle.VehicleListingId}
                    sharingPlatform={sharingPlatform}
                    bookmarkIds={bookmarkIds}
                    onCompareChange={handleChangeCompare}
                    compareVehicleIds={compareVehicleIds}
                    setSignInRequired={() => setShowLogin(true)}
                    onChangeBookmark={handleChangeBookmark}
                    elmConfiguration={elmConfiguration}
                    isNewCarEnabled={isNewCarEnabled}
                    quotationIds={[]}
                  />
                );
              })}
            </section>
          </div>
          {/* Pagination */}
          {total > appliedFilter.size && (
            <>
              <div className="flex sm:hidden justify-center items-center w-full font-bold text-xl text-dark-gray1">
                <div>
                  {t(LabelConstants.PAGE_INDICATOR, {
                    currentPage: appliedFilter.page,
                    lastPage: Math.ceil(total / appliedFilter.size),
                  })}
                </div>
              </div>
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
                    className="btn btn-pagination rtl:!w-[7.5rem]"
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
                    <span className="flex justify-center items-center text-lg leading-[1.375rem] uppercase">
                      <PrevIcon className="rtl:rotate-180" />
                      <label>{t(LabelConstants.BACK)}</label>
                    </span>
                  </button>
                </div>
                <div className="hidden sm:flex justify-center items-center w-full font-bold text-xl text-dark-gray1">
                  <div>
                    {t(LabelConstants.PAGE_INDICATOR, {
                      currentPage: appliedFilter.page,
                      lastPage: Math.ceil(total / appliedFilter.size),
                    })}
                  </div>
                </div>
                <div className="flex justify-end w-full gap-2">
                  <button
                    className="btn btn-pagination rtl:!w-[7.5rem]"
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
            </>
          )}
        </div>
        <div className="bg-white w-full px-8 lg:px-[80px] xl:px-[120px] 2xl:px-[142px] 3xl:px-[180px] flex flex-col gap-[3.4375rem] pb-[3.8125rem] pt-[5.625rem]">
          {/* 
          Browse by popular make and models
        */}
          <div className="flex flex-col gap-[3.4375rem] mt-[5.6612rem] lg:mt-0">
            <h1 className="font-bold text-3xl text-primary">
              {t(LabelConstants.BROWSE_BY_POPULAR_MAKE)}
            </h1>
            <BrowseByMakeModel topBrands={topBrands} />
          </div>

          {/* 
          Browse by style
        */}
          <div className="flex flex-col gap-[3.4375rem] mt-[5.6612rem] lg:mt-0">
            <h1 className="font-bold text-3xl text-primary">
              {t(LabelConstants.BROWSE_BY_STYLES)}
            </h1>
            <BrowseByStyle bodyTypes={masterData.bodyTypes} />
          </div>

          {/* 
          Browse by location
        */}
          <div className="flex flex-col gap-[3.4375rem] mt-[5.6612rem] lg:mt-0">
            <h1 className="font-bold text-3xl text-primary">
              {t(LabelConstants.BROWSE_BY_LOCATION)}
            </h1>
            <BrowseByLocation topCities={masterData.cities} />
          </div>
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

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps<UsedCarsPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const masterData = await FilterUtils.fetchFilterMasterData(locale!);
  const topBrands = await VehicleService.fetchPopularBrands(locale);
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      masterData: { ...masterData, models: [], specs: [] },
      topBrands,
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};

export default UsedCars;
