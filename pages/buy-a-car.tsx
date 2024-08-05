import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DropdownWithLabel from '../components/common/DropdownWithLabel';
import ShoppingItemVehicleCard from '../components/common/ShoppingItemVehicleCard';
import SignInModal from '../components/common/SignInModal';
import SortByDropdown from '../components/common/SortByDropdown';
import { FirstIcon, LastIcon, NextIcon, PrevIcon } from '../components/icons';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import {
  GlobalService,
  InvoiceService,
  ListingService,
  ProfileService,
  VehicleService,
} from '../helpers/services';
import ConfigurationService from '../helpers/services/configuration.service';
import {
  CommonUtils,
  FilterUtils,
  formatNumber,
  SessionUtils,
} from '../helpers/utilities';
import { PageSizes } from '../types/constants';
import {
  ConfigurationKey,
  Locales,
  SortByFilter,
  SortDirection,
  UserProfileStatus,
  VehicleAgeType,
} from '../types/enums';
import { LabelConstants } from '../types/i18n.labels';
import {
  FilterParams,
  ListingResponse,
  SearchResultItem,
  SocialMediaPlatformItem,
  UsedCarFilterMasterData,
} from '../types/models';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../components/common/MessageBox';
import { toast } from 'react-toastify';
import Spinner from '../components/common/Spinner/spinner';

type BuyCarPageProps = {
  masterData: UsedCarFilterMasterData;
  filters: FilterParams;
  compareListingIds: Array<string>;
};

const BuyCarPage: NextPage<BuyCarPageProps> = ({
  masterData,
  filters,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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

  // component props to state
  const [financeRequestIds, setFinanceRequestIds] = useState<Array<number>>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<
    Array<SearchResultItem>
  >([]);
  const [total, setTotal] = useState(0);
  const [appliedFilter, setAppliedFilter] = useState<FilterParams>(filters);
  const [sharingPlatform, setSharingPlatform] = useState<
    Array<SocialMediaPlatformItem>
  >([]);

  const [isNewCarEnabled, setIsNewCarEnabled] = useState<string>('false');
  const [loader, setLoader] = useState<boolean>();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const [financeRequestVehicleIds, platforms] = await Promise.all([
        VehicleService.fetchFinanceRequest(),
        GlobalService.fetchSocialMediaPlatform(router.locale),
      ]);
      const getUserPreference = FilterUtils.getUserPreference(
        SessionUtils.getUserDetails()?.UserId || null
      );

      if (getUserPreference) {
        setAppliedFilter({
          ...appliedFilter,
          sortBy: getUserPreference?.sortBy,
          sortDir: getUserPreference?.sortDir,
        });
      }
      setIsFilterChange(true);

      if (financeRequestVehicleIds && financeRequestVehicleIds.length > 0) {
        // search vehicles data with filter criteria.
        const { searchPayload } = await FilterUtils.getSearchParams(
          filters,
          masterData,
          false
        );
        searchPayload.Filter.term.push(
          `id=${financeRequestVehicleIds.join(',')}`
        );
        const vehicles: ListingResponse = await ListingService.searchVehicle(
          searchPayload
        );

        setFilteredVehicles(vehicles.DataList);
        setTotal(vehicles.DataCount);

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
      setFinanceRequestIds(financeRequestVehicleIds);
      setSharingPlatform(platforms);
      setLoading(false);
    };
    init();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);

  useEffect(() => {
    const handleFilterChange = async () => {
      // prepare payload and querystring.
      const { searchPayload, queryString } = await FilterUtils.getSearchParams(
        appliedFilter,
        {
          ...masterData,
        },
        false
      );
      searchPayload.Filter.term.push(`id=${financeRequestIds.join(',')}`);

      // send request to fetch filtered vehicles.
      const vehicles = await ListingService.searchVehicle(searchPayload);

      // update shallow route with queryString to support SSR with filter.
      router.push(`/buy-a-car${queryString}`, undefined, {
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
    };

    if (
      isFilterChange &&
      appliedFilter &&
      handleFilterChange &&
      financeRequestIds &&
      financeRequestIds.length > 0
    ) {
      handleFilterChange();
    }
  }, [isFilterChange, appliedFilter, router, masterData, financeRequestIds]);

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

  const fetchFinanceRequest = async () => {
    const financeRequestVehicleIds = await VehicleService.fetchFinanceRequest();
    setFinanceRequestIds(financeRequestVehicleIds);
    setIsFilterChange(true);
  };

  if (loading) {
    return <></>;
  }

  const handelDelete = async (vehicleId: string) => {
    const result = await MessageBox.open({
      content: `${t(LabelConstants.FINANCE_DELETE_CONFIRMATION_TEXT)}`,
      type: MessageBoxType.Confirmation,
    });
    if (result === MessageBoxResult.Yes) {
      setLoader(true);
      const res = await VehicleService.deleteFinanceRequest(vehicleId);
      if (res) {
        setLoader(false);
        toast.success(t(LabelConstants.DELETE_SUCCESS));
        const result = await VehicleService.fetchFinanceRequest();
        setFinanceRequestIds(result);
        setIsFilterChange(true);
      } else {
        setLoader(false);
        toast.error(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
      }
    }
  };

  const handelFinanceIt = async (vehicle: any) => {
    setLoader(true);
    const quotationResponse = await InvoiceService.saveQuotation({
      VehicleListingId: vehicle?.VehicleListingId || '',
      SellerId: vehicle?.SellerId || '',
    });
    if (quotationResponse.IsSuccess) {
      setShowModal(true);
      setLoader(false);
    } else {
      toast.error(t(LabelConstants.FINANCE_REQUEST_ERROR_MSG));
      setLoader(false);
    }
  };

  return (
    <div className="w-full">
      {loader && (
        <div className="absolute top-0 bg-lighter-gray opacity-50 account-container flex flex-col sm:items-center sm:justify-center">
          <Spinner />
        </div>
      )}
      {financeRequestIds && financeRequestIds.length === 0 ? (
        <PrivatePageLayout>
          <div className="w-full flex justify-center text-center items-center">
            <div className="absolute top-0 left-0 w-full h-full font-bold text-3xl flex flex-col gap-8 items-center justify-center">
              <label>{t(LabelConstants.YOU_HAVE_NOT_SELECT_ANY_VEHICLE)}</label>
              <div>
                <Link href="/all-listings">
                  <button className="btn btn-primary sm:!w-[12.5rem] !min-w-[10rem] uppercase">
                    {t(LabelConstants.BTN_BUY_CAR)}
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
              {t(LabelConstants.SHOPPING_CART)}
            </span>
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
              </section>
              <section className="grid grid-flow-row gap-5">
                {filteredVehicles.map((vehicle) => {
                  return (
                    <ShoppingItemVehicleCard
                      vehicle={vehicle}
                      key={vehicle.VehicleListingId}
                      sharingPlatform={sharingPlatform}
                      setSignInRequired={() => setShowLogin(true)}
                      elmConfiguration={elmConfiguration}
                      isNewCarEnabled={isNewCarEnabled}
                      quotationIds={financeRequestIds}
                      handelDelete={handelDelete}
                      fetchFinanceRequest={fetchFinanceRequest}
                      handelFinanceIt={handelFinanceIt}
                      showModal={showModal}
                      setShowModal={setShowModal}
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
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<BuyCarPageProps> = async ({
  locale,
  query,
  req,
  res,
}: GetServerSidePropsContext) => {
  if (!SessionUtils.isValidServerSession(req, res)) {
    return {
      notFound: true,
    };
  }
  let { compare } = query;

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
    if (ownership) filters.ownership = [decodeURIComponent(String(ownership))];
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
  const masterData: UsedCarFilterMasterData =
    await FilterUtils.loadFilterMasterData(
      locale!,
      filters.makes,
      filters.models
    );

  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      masterData,
      filters,
      compareListingIds: compare ? String(compare).split(',') : [],
    },
  };
};

export default BuyCarPage;
