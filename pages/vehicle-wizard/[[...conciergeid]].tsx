import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '../../components/common/Tabs';
import BodyTypes from '../../components/concierge/BodyTypes';
import Budget from '../../components/concierge/Budget';
import TransmissionFuelType from '../../components/concierge/TransmissionFuelType';
import {
  ConciergeType,
  Locales,
  SortByFilter,
  SortDirection,
  VehicleAgeType,
} from '../../types/enums';
import {
  BodyType,
  ConciergeParams,
  ConciergeRequest,
  FuelType,
  Range,
  Transmission,
  VehicleType,
} from '../../types/models';
import WishListSummary from '../../components/concierge/WishListSummary';
import MessageBox from '../../components/common/MessageBox';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { VehicleService } from '../../helpers/services';
import { FilterUtils, SessionUtils } from '../../helpers/utilities';
import SignInModal from '../../components/common/SignInModal';

type ConciergeProps = {
  conciergeID: number | null;
};

const VehicleWizard: NextPage<ConciergeProps> = ({
  conciergeID,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [vehicleTypes, setVehicleTypes] = useState<Array<VehicleType>>([]);
  const [bodyTypes, setBodyTypes] = useState<Array<BodyType>>([]);
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [fuelTypes, setFuelTypes] = useState<Array<FuelType>>([]);
  const [transmissions, setTransmissions] = useState<Array<Transmission>>([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState<
    Array<VehicleType>
  >([]);
  const [selectedBodyType, setSelectedBodyType] = useState<Array<BodyType>>([]);
  const [selectedTransmission, setSelectedTransmission] = useState<
    Array<Transmission>
  >([]);
  const [selectedFuelType, setSelectedFuelType] = useState<Array<FuelType>>([]);
  const [isSummaryPage, setIsSummaryPage] = useState<boolean>(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState<Range>();
  const [queryData, setQueryData] = useState<ConciergeParams>();
  const [conciergeRequest, setConciergeRequest] = useState<
    ConciergeRequest | undefined
  >();
  const [initialVehicleSelection, setInitialType] = useState<
    Array<VehicleType>
  >([]);
  const [isSelectionChange, setSelectionChange] = useState<boolean>(false);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      let navigation: any = performance.getEntriesByType('navigation')[0];
      if (
        navigation.type &&
        (!router.query.tab || router.query.tab !== 'BodyType')
      ) {
        router.push(
          `${
            conciergeID
              ? `/vehicle-wizard/${conciergeID}?tab=BodyType`
              : router.query.conciergeid && router.query.conciergeid[0]!
              ? `/vehicle-wizard/${router.query.conciergeid[0]!}?tab=BodyType`
              : '/vehicle-wizard?tab=BodyType'
          }`,
          undefined,
          {
            shallow: true,
          }
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    const initialLoad = async () => {
      if (SessionUtils.isValidSession()) {
        const [vehicleTypes, bodyTypes, price, fuelType, transmissionType] =
          await Promise.all([
            VehicleService.fetchVehicleType(router.locale),
            VehicleService.fetchBodyTypes(router.locale),
            VehicleService.fetchFilterMetadata(router.locale),
            VehicleService.fetchFuelTypes(router.locale),
            VehicleService.fetchFilterMetadata(router.locale),
          ]);
        setVehicleTypes(vehicleTypes);
        setBodyTypes(bodyTypes);
        setMinPrice(price.MinVehiclePrice);
        setMaxPrice(price.MaxVehiclePrice);
        setFuelTypes(fuelType);
        setTransmissions(transmissionType.Transmissions);
        if (!selectedPriceRange) {
          setSelectedPriceRange({
            min: price.MinVehiclePrice,
            max: price.MaxVehiclePrice,
          });
        }
      } else {
        router.push('/404');
      }
    };
    initialLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.locale]);

  /**
   * This useEffect used to update states to edit concierge by conciergeID.
   */
  useEffect(() => {
    if (conciergeID) {
      const initialLoad = async () => {
        const response = await VehicleService.fetchEditConcierge(
          router.locale,
          conciergeID
        );
        const vehicleData = JSON.parse(
          response.ConciergeRequest && response.ConciergeRequest.VehicleJson
        );

        setSelectedBodyType(
          bodyTypes.filter((x) => vehicleData.BodyTypeId.includes(x.BodyTypeId))
        );
        setSelectedPriceRange({
          min: vehicleData.AskingPriceRange.MinBudget,
          max: vehicleData.AskingPriceRange.MaxBudget,
        });
        setSelectedFuelType(
          fuelTypes.filter((x) => vehicleData.FuelTypeId.includes(x.FuelTypeId))
        );
        setSelectedTransmission(
          transmissions.filter((x) =>
            vehicleData.TransmissionId.includes(x.TransmissionId)
          )
        );
        setConciergeRequest(response.ConciergeRequest);
      };
      initialLoad();
    }
  }, [
    router.locale,
    conciergeID,
    vehicleTypes,
    bodyTypes,
    fuelTypes,
    transmissions,
  ]);

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (!isAuthenticated) {
          setOpenSignInModal(true);
        } else {
          setOpenSignInModal(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, []);

  const handleChange = (
    type: ConciergeType,
    event: BodyType | VehicleType | Transmission | FuelType
  ) => {
    if (type === ConciergeType.VehicleType) {
      /**
       * It handles user selection action for vehicle types.
       */
      const data: VehicleType = event as VehicleType;
      let initialSelection: Array<VehicleType> = [];
      initialSelection = initialVehicleSelection;
      if (initialVehicleSelection.length === 0) {
        setInitialType([data]);
        initialSelection = [data];
      }
      let commonVal = [data].filter(
        (o1) =>
          !initialSelection.some((o2) => o1.VehicleTypeId === o2.VehicleTypeId)
      );

      if (
        initialVehicleSelection.length > 0 &&
        commonVal.length === 0 &&
        [data].length === initialSelection.length
      ) {
        setSelectionChange(false);
      } else {
        setSelectionChange(true);
      }
      setInitialType([data]);
      if (
        selectedVehicleType.some(
          (el: VehicleType) => el.VehicleTypeId === data.VehicleTypeId
        )
      ) {
        setSelectedVehicleType(
          selectedVehicleType.filter(
            (itm: VehicleType) => itm.VehicleTypeId !== data.VehicleTypeId
          )
        );
      } else {
        setSelectedVehicleType([...selectedVehicleType, data]);
      }
    } else if (type === ConciergeType.BodyType) {
      /**
       * It handles user selection action for body types.
       */
      const data: BodyType = event as BodyType;
      if (
        selectedBodyType.some(
          (el: BodyType) => el.BodyTypeId === data.BodyTypeId
        )
      ) {
        setSelectedBodyType(
          selectedBodyType.filter(
            (itm: BodyType) => itm.BodyTypeId !== data.BodyTypeId
          )
        );
      } else {
        setSelectedBodyType([...selectedBodyType, data]);
      }
    } else if (type === ConciergeType.Transmission) {
      /**
       * It handles user selection action for transmission types.
       */
      const data: Transmission = event as Transmission;
      if (
        selectedTransmission.some(
          (el: Transmission) => el.TransmissionId === data.TransmissionId
        )
      ) {
        setSelectedTransmission(
          selectedTransmission.filter(
            (itm: Transmission) => itm.TransmissionId !== data.TransmissionId
          )
        );
      } else {
        setSelectedTransmission([...selectedTransmission, data]);
      }
    } else {
      /**
       * It handles user selection action for fuel types.
       */
      const data: FuelType = event as FuelType;
      if (
        selectedFuelType.some(
          (el: FuelType) => el.FuelTypeId === data.FuelTypeId
        )
      ) {
        setSelectedFuelType(
          selectedFuelType.filter(
            (itm: FuelType) => itm.FuelTypeId !== data.FuelTypeId
          )
        );
      } else {
        setSelectedFuelType([...selectedFuelType, data]);
      }
    }
  };

  const handleRoute = async () => {
    if (selectedBodyType.length > 0 && selectedPriceRange) {
      const { queryString } = await FilterUtils.getSearchParams({
        page: 1,
        size: 15,
        sortBy: SortByFilter.ListedDate,
        sortDir: SortDirection.Desc,
        bodyTypes: selectedBodyType.map((x) => x.BodyTypeKey),
        fuelTypes: selectedFuelType.map((x) => x.FuelTypeKey),
        transmission: selectedTransmission.map((x) => x.TransmissionKey),
        priceRange: selectedPriceRange,
        type: VehicleAgeType.All,
        multipleSortBy: [],
      });
      router.push(`/all-listings${queryString}`);
    } else {
      MessageBox.open({
        content: `${t(LabelConstants.SELECT_ATLEAST_ONE_BODY_TYPE_BUDGET)}`,
      });
    }
  };

  const submitConcierge = () => {
    if (selectedBodyType.length > 0 && selectedPriceRange) {
      setQueryData({
        vehicleType: selectedVehicleType,
        bodyType: selectedBodyType,
        budget: selectedPriceRange!,
        fuelType: selectedFuelType,
        transmission: selectedTransmission,
      });

      /**
       * Update route for summary page.
       */
      router.push(
        `${conciergeID ? `/vehicle-wizard/${conciergeID}` : '/vehicle-wizard'}`,
        undefined,
        { shallow: true }
      );

      /**
       * Open concierge summary form.
       */
      setIsSummaryPage(true);
    } else {
      MessageBox.open({
        content: `${t(LabelConstants.SELECT_ATLEAST_ONE_BODY_TYPE_BUDGET)}`,
      });
    }
  };

  return (
    <div className="gogo-concierge-page w-full">
      {isSummaryPage && queryData ? (
        <WishListSummary
          queryData={queryData}
          setIsSummaryPage={setIsSummaryPage}
          conciergeRequest={conciergeRequest}
          conciergeID={conciergeID}
        />
      ) : (
        <Tabs default="VehicleType">
          <Tabs.Item id="BodyType">
            <span className="h-[2.5rem] flex items-center justify-center w-full cursor-pointer text-center text-xl font-bold">
              {t(LabelConstants.BODY_TYPE)}
            </span>
          </Tabs.Item>
          <Tabs.Item id="Budget">
            <span className="h-[2.5rem] flex items-center justify-center w-full cursor-pointer text-center text-xl font-bold">
              {t(LabelConstants.BUDGET)}
            </span>
          </Tabs.Item>
          <Tabs.Item id="TransmissionFuel">
            <span className="h-[2.5rem] flex items-center justify-center w-full cursor-pointer text-center text-xl font-bold">
              {t(LabelConstants.TRANSMISSION_FUEL_TYPE)}
            </span>
          </Tabs.Item>
          <Tabs.Page id="BodyType">
            <div className="container">
              <BodyTypes
                handleChange={handleChange}
                selectedBodyTypes={selectedBodyType}
                selectedVehicleTypes={selectedVehicleType}
                setSelectedBodyType={setSelectedBodyType}
                bodyTypes={bodyTypes}
                conciergeID={conciergeID}
                isSelectionChange={isSelectionChange}
                setSelectionChange={setSelectionChange}
                route={router.query.conciergeid && router.query.conciergeid[0]}
              />
            </div>
          </Tabs.Page>
          <Tabs.Page id="Budget">
            <div className="container">
              <Budget
                setSelectedPriceRange={setSelectedPriceRange}
                selectedPriceRange={selectedPriceRange}
                minPrice={minPrice}
                maxPrice={maxPrice}
                conciergeID={conciergeID}
                route={router.query.conciergeid && router.query.conciergeid[0]}
              />
            </div>
          </Tabs.Page>
          <Tabs.Page id="TransmissionFuel">
            <div className="container">
              <TransmissionFuelType
                handleChange={handleChange}
                submitConcierge={submitConcierge}
                selectedTransmissions={selectedTransmission}
                selectedFuelTypes={selectedFuelType}
                transmissions={transmissions}
                fuelTypes={fuelTypes}
                conciergeID={conciergeID}
                route={router.query.conciergeid && router.query.conciergeid[0]}
                handleRoute={handleRoute}
              />
            </div>
          </Tabs.Page>
        </Tabs>
      )}
      {/* Sign In Modal */}
      <SignInModal
        show={openSignInModal}
        onClose={() => {
          setOpenSignInModal(false);
          router.push('/');
        }}
      />
    </div>
  );
};
export default VehicleWizard;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps = async ({
  locale,
  params,
}: GetStaticPropsContext) => {
  let id: number | null = null;
  if (params && params.conciergeid && params.conciergeid.length > 0) {
    id = Number(params?.conciergeid![0]);
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      conciergeID: id,
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};
