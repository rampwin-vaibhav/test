import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SignInModal from '../components/common/SignInModal';
import { SessionUtils, formatNumber } from '../helpers/utilities';
import {
  ConfigurationKey,
  Locales,
  ProductReferenceType,
  UserProfileStatus,
} from '../types/enums';
import { LabelConstants } from '../types/i18n.labels';
import {
  InvoiceService,
  ListingService,
  PackageSubscription,
  ProfileService,
} from '../helpers/services';
import {
  AddToCartPayload,
  QuotationResponse,
  ServiceResponse,
} from '../types/models';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import Link from 'next/link';
import QuotationItemVehicleCard from '../components/common/QuotationItemVehicleCard';
import ConfigurationService from '../helpers/services/configuration.service';
import Spinner from '../components/common/Spinner/spinner';

const Quotations = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [quotationsData, setQuotationsData] = useState<QuotationResponse>();
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isNewCarEnabled, setIsNewCarEnabled] = useState<string>('false');
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [fetchingData, setFetchingData] = useState<boolean>(false);
  const [serviceDetails, setServiceDetails] =
    useState<Array<ServiceResponse>>();
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

  useEffect(() => {
    const init = async () => {
      const data = await InvoiceService.getQuotations(router.locale);
      setQuotationsData(data);
      setTotal(data?.TotalRecords);

      var isNewCarEnabled = await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.IsNewCarEnabled,
        router.locale
      );
      setIsNewCarEnabled(isNewCarEnabled.ConfigurationValue);
      // fetch IsVAS services
      const serviceData: Array<ServiceResponse> =
        await PackageSubscription.getAllServices(router.locale);
      setServiceDetails(serviceData.filter((x) => x.IsVAS));

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
      setLoading(false);
    };
    init();
  }, [router.locale]);

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

  const addToShoppingCart = async (items: Array<AddToCartPayload>) => {
    setFetchingData(true);
    const res = await Promise.all(
      items.map((x) => {
        return ListingService.addToCart(x);
      })
    );
    if (res.length > 0) {
      setFetchingData(false);
    }
    router.push('/cart');
  };

  if (loading) {
    return (
      <>
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    <div className="w-full relative">
      {fetchingData && (
        <div className="fixed bg-lighter-gray opacity-50 top-0 left-0 overflow-y-hidden w-full h-screen flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {quotationsData && quotationsData.Records.length === 0 ? (
        <PrivatePageLayout>
          <div className="w-full flex justify-center text-center items-center">
            <div className="flex flex-col justify-center text-centre sm:w-1/2 w-2/3 h-1/2 bg-white p-12 shadow-md gap-10">
              <label>
                {t(LabelConstants.YOU_HAVE_NOT_FINANCE_REQUESTED_ANY_VEHICLE)}
              </label>
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
              {t(LabelConstants.QUOTATIONS)}
            </span>
          </header>
          <div className="bg-lighter-gray container pt-10 pb-[3.625rem] flex flex-col gap-10 mx-auto">
            <div className="flex flex-col gap-5">
              <section className="grid grid-cols-[repeat(1,20.5rem)]  min-[530px]:grid-cols-[repeat(2,20.5rem)]  md:grid-cols-[repeat(3,19.5rem)] lg:grid-cols-[repeat(4,20.5rem)] min-[1745px]:grid-cols-[repeat(5,20rem)] 3xl:grid-cols-[repeat(5,20.5rem)] gap-5 justify-center">
                <div className="text-base text-dark-gray1 leading-5 uppercase flex items-center">{`${t(
                  LabelConstants.RESULTS
                )}: ${formatNumber(total)}`}</div>
              </section>
              <section className="flex flex-col gap-[1.875rem]">
                {quotationsData?.Records.map((vehicle, index) => {
                  return (
                    <QuotationItemVehicleCard
                      vehicle={vehicle.VehicleDetails}
                      key={index}
                      setSignInRequired={() => setShowLogin(true)}
                      elmConfiguration={elmConfiguration}
                      isNewCarEnabled={isNewCarEnabled}
                      quotationsData={vehicle}
                      sliderData={serviceDetails!}
                      addToShoppingCart={addToShoppingCart}
                    />
                  );
                })}
              </section>
            </div>
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

export default Quotations;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    // Task 12338: Hide My Quotation link from Profile Menu
    redirect: {
      permanent: false,
      destination: '/404',
    },
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
