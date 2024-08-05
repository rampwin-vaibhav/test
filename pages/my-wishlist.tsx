import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../components/common/MessageBox';
import SignInModal from '../components/common/SignInModal';
import {
  CalendarIcon,
  ConciergeBodyIcon,
  TransmissionIcon,
} from '../components/icons';
import PrivatePageLayout from '../components/layout/PrivatePageLayout';
import { ListingService, VehicleService } from '../helpers/services';
import { FilterUtils, SessionUtils } from '../helpers/utilities';
import { Locales } from '../types/enums';
import { LabelConstants } from '../types/i18n.labels';
import {
  BodyType,
  ConciergeList,
  FuelType,
  Transmission,
} from '../types/models';
import Spinner from '../components/common/Spinner/spinner';

const MyWishlist = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [conciergeList, setConciergeList] = useState<Array<ConciergeList>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [conciergeVehicleCount, setConciergeVehicleCount] = useState<
    Array<{ id: number; count: number }>
  >([]);

  const [showLogin, setShowLogin] = useState<boolean>(false);
  useEffect(() => {
    const loadData = async () => {
      const data = await Promise.all(
        conciergeList.map(async (x) => await getVehicleCount(router.locale!, x))
      );
      setConciergeVehicleCount(data);
    };
    if (conciergeList && conciergeList.length > 0) {
      loadData();
    }
  }, [conciergeList, router.locale]);

  useEffect(() => {
    const initialLoad = async () => {
      setLoading(true);
      if (SessionUtils.isValidSession()) {
        const response = await VehicleService.fetchConciergeList(router.locale);
        setConciergeList(response);
        setLoading(false);
      } else {
        router.push('/404');
      }
    };
    initialLoad();
  }, [router, router.locale]);

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

  const generateHeading = (data: string) => {
    const vehicleData = JSON.parse(data);
    const vehicleType =
      vehicleData.VehicleTypes && vehicleData.VehicleTypes[0].VehicleType;
    const bodyType = vehicleData.BodyTypes && vehicleData.BodyTypes[0].BodyType;
    const budgetType = vehicleData.BudgetTypes
      ? `(${vehicleData.BudgetTypes[0].DisplayText})`
      : vehicleData.AskingPriceRange &&
        vehicleData.AskingPriceRange.MaxBudget === null
      ? `(${vehicleData.AskingPriceRange.MinBudget})`
      : `(${vehicleData.AskingPriceRange.MinBudget} - ${vehicleData.AskingPriceRange.MaxBudget})`;
    const fuelType = vehicleData.FuelTypes && vehicleData.FuelTypes[0].FuelType;
    return (
      (vehicleType !== undefined ? `${vehicleType}  - ` : '') +
      (bodyType !== undefined ? `${bodyType} - ` : '') +
      (budgetType !== undefined ? budgetType : '') +
      (fuelType !== undefined ? ` - (${fuelType})` : '')
    );
  };

  const getVehicleCount = async (
    locale: string,
    concierge: ConciergeList
  ): Promise<{ id: number; count: number }> => {
    const searchPayload = await FilterUtils.getSearchParamByConcierge(
      locale!,
      concierge.VehicleJson
    );
    const vehicles = await ListingService.searchAllVehicle(searchPayload);
    return { count: vehicles.DataCount || 0, id: concierge.ConciergeRequestId };
  };
  const getAllBodyType = (data: string) => {
    const vehicleData = JSON.parse(data);
    const bodyType =
      vehicleData.BodyTypes &&
      vehicleData.BodyTypes.map((itm: BodyType) => itm.BodyType);
    return bodyType && bodyType.join(', ');
  };

  const getAllFuelType = (data: string) => {
    const vehicleData = JSON.parse(data);
    const fuelType =
      vehicleData.FuelTypes &&
      vehicleData.FuelTypes.map((itm: FuelType) => itm.FuelType);

    return fuelType && fuelType.join(', ');
  };

  const getAllTransmissionType = (data: string) => {
    const vehicleData = JSON.parse(data);
    const transType =
      vehicleData.Transmissions &&
      vehicleData.Transmissions.map((itm: Transmission) => itm.Transmission);

    return transType && transType.join(', ');
  };

  /**
   * It deletes selected concierge by conciergeRequestId.
   */
  const handleDelete = async (id: number) => {
    const result = MessageBox.open({
      content: t(LabelConstants.DELETION_CONFIRMATION),
      type: MessageBoxType.Confirmation,
    });
    if ((await result) === MessageBoxResult.Yes) {
      if (SessionUtils.isValidSession()) {
        const data = {
          ConciergeRequestId: id,
        };
        const response = await VehicleService.deleteConcierge(data);
        if (response) {
          const response = await VehicleService.fetchConciergeList();
          setConciergeList(response);
          MessageBox.open({
            content: t(LabelConstants.CONCIERGE_DELETED),
            type: MessageBoxType.Message,
          });
        }
      }
    }
  };

  /**
   * It edit selected concierge by conciergeRequestId.
   */
  const handleEdit = (id: number) => {
    router.push(`/vehicle-wizard/${id}?tab=BodyType`);
  };

  if (loading) {
    return (
      <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <PrivatePageLayout title={t(LabelConstants.MY_CONCIERGE)}>
      <div className="min-h-[50vh]">
        {conciergeList && conciergeList.length > 0 ? (
          conciergeList.map((data, index) => (
            <div
              className="bg-lighter-gray flex justify-between p-4 mb-3 rounded shadow"
              key={index}
            >
              <div className="flex flex-col w-full">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    {data.Name && (
                      <p className="text-xl font-semibold pb-[0.313rem]">
                        {data.Name}
                      </p>
                    )}
                    <p className="text-lg font-semibold pb-[0.313rem]">
                      {generateHeading(data.VehicleJson)}
                    </p>
                  </div>
                  <div className="flex items-center flex-col sm:flex-row gap-2">
                    <button
                      className="btn btn-secondary btn-auto w-24 lg:w-24 text-lg uppercase font-semibold !pl-0 !pr-0"
                      onClick={() => handleDelete(data.ConciergeRequestId)}
                    >
                      {t(LabelConstants.DELETE)}
                    </button>
                    <button
                      className="btn btn-primary btn-auto w-24 lg:w-24 text-lg uppercase"
                      onClick={() => handleEdit(data.ConciergeRequestId)}
                    >
                      {t(LabelConstants.EDIT)}
                    </button>
                  </div>
                </div>

                <div className="flex sm:justify-between sm:flex-row flex-col pt-3 w-full">
                  <div className="flex justify-between flex-col gap-2 sm:gap-3 sm:flex-row">
                    <div className="flex items-center gap-1">
                      <ConciergeBodyIcon className="h-[1.125rem] w-[1.25rem]" />
                      <div>{getAllBodyType(data.VehicleJson)}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-[0.875rem] w-[1rem]" />
                      <div>{getAllFuelType(data.VehicleJson)}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TransmissionIcon className="h-[0.875rem] w-[1rem]" />
                      <div>{getAllTransmissionType(data.VehicleJson)}</div>
                    </div>
                  </div>
                  <div className="flex justify-end underline text-primary">
                    <Link
                      href={`/all-listings?conciergeRequestId=${data.ConciergeRequestId}`}
                    >
                      {`${t(LabelConstants.VEHICLES_FOUND)} (${
                        conciergeVehicleCount.find(
                          (x) => x.id === data.ConciergeRequestId
                        )?.count || 0
                      })`}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-white p-4">
            <div className="flex flex-col justify-center gap-4">
              <p className="text-center">{t(LabelConstants.NO_CONCIERGE)}</p>
              <div className="flex justify-center">
                <Link href="/vehicle-wizard?tab=BodyType">
                  <button className="btn btn-primary w-24 uppercase">
                    {t(LabelConstants.ADD_CONCIERGE)}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
        {/* Sign In Modal */}
        <SignInModal
          show={showLogin}
          onClose={() => {
            setShowLogin(false);
            router.push('/');
          }}
        />
      </div>
    </PrivatePageLayout>
  );
};

export default MyWishlist;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
