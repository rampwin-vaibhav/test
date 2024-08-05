import { NextPage } from 'next';
import router from 'next/router';
import { useTranslation } from 'next-i18next';
import { FuelType, Transmission } from '../../types/models';
import {
  ConciergeType,
  FuelTypeKey,
  TransmissionType,
} from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';

import {
  AutomaticIcon,
  DefaultTransmissionIcon,
  DieselIcon,
  ElectricIcon,
  HybridIcon,
  LpgIcon,
  ManualIcon,
  MhevIcon,
  PetrolFuelTypeIcon,
  PhevIcon,
  DefaultFuelTypeIcon,
} from '../icons';

type TransmissionFuelProps = {
  transmissions: Array<Transmission>;
  fuelTypes: Array<FuelType>;
  selectedTransmissions: Array<Transmission>;
  selectedFuelTypes: Array<FuelType>;
  conciergeID: number | null;
  route: string | undefined;
  handleChange: (type: ConciergeType, data: Transmission | FuelType) => void;
  submitConcierge: () => void;
  handleRoute: () => void;
};

const TransmissionFuelType: NextPage<TransmissionFuelProps> = ({
  transmissions,
  fuelTypes,
  selectedTransmissions,
  selectedFuelTypes,
  conciergeID,
  handleChange,
  submitConcierge,
  handleRoute,
  route,
}) => {
  const { t } = useTranslation();

  const handleSelectionChange = (
    check: ConciergeType,
    data: FuelType | Transmission
  ) => {
    handleChange(check, data);
  };

  const getFuelTypeIcon = (fuelTypeKey: string) => {
    switch (fuelTypeKey) {
      case FuelTypeKey.Diesel:
        return (
          <DieselIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      case FuelTypeKey.Electric:
        return (
          <ElectricIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      case FuelTypeKey.Hybrid:
        return (
          <HybridIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      case FuelTypeKey.Lpg:
        return (
          <LpgIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      case FuelTypeKey.Mhev:
        return (
          <MhevIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      case FuelTypeKey.Petrol:
        return (
          <PetrolFuelTypeIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      case FuelTypeKey.Phev:
        return (
          <PhevIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      default:
        return (
          <DefaultFuelTypeIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
    }
  };

  const getTransmissionIcon = (transmissionKey: string) => {
    switch (transmissionKey) {
      case TransmissionType.Automatic:
        return (
          <AutomaticIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      case TransmissionType.Manual:
        return (
          <ManualIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
      default:
        return (
          <DefaultTransmissionIcon className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16 cursor-pointer" />
        );
    }
  };

  return (
    <div className="tab-data">
      <div>
        <div className="text-xl font-semibold mb-4 mt-10">
          {t(LabelConstants.TRANSMISSION)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8 mt-10">
          {transmissions &&
            transmissions &&
            transmissions.length > 0 &&
            transmissions.map((item, index) => (
              <div
                key={index}
                className={
                  selectedTransmissions.some(
                    (x) => x.TransmissionId === item.TransmissionId
                  )
                    ? 'selected-fueltype-box'
                    : 'bodytype-box'
                }
                onClick={() => {
                  handleSelectionChange(ConciergeType.Transmission, item);
                }}
              >
                <div
                  className={`${
                    selectedTransmissions.some(
                      (x) => x.Transmission === item.Transmission
                    )
                      ? ''
                      : 'text-primary'
                  }`}
                >
                  {getTransmissionIcon(item.TransmissionKey)}
                </div>
                <div className="w-1/2 text-xl font-bold">
                  {item.Transmission}
                </div>
              </div>
            ))}
        </div>
        <div className="text-xl font-semibold mb-4">
          {t(LabelConstants.FUEL_TYPE)}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {fuelTypes &&
            fuelTypes.length > 0 &&
            fuelTypes.map((item) => (
              <div
                key={item.FuelTypeCode}
                className={
                  selectedFuelTypes.some((x) => x.FuelType === item.FuelType)
                    ? 'selected-fueltype-box'
                    : 'bodytype-box'
                }
                onClick={() => {
                  handleSelectionChange(ConciergeType.FuelType, item);
                }}
              >
                <div
                  className={`${
                    selectedFuelTypes.some(
                      (x) => x.FuelTypeId === item.FuelTypeId
                    )
                      ? ''
                      : 'text-primary'
                  }`}
                >
                  {getFuelTypeIcon(item.FuelTypeKey)}
                </div>
                <div className="w-1/2 text-xl font-bold">{item.FuelType}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="mt-8 flex sm:justify-end justify-center gap-4">
        <button
          className="btn btn-secondary btn-sm !text-xl uppercase"
          onClick={() =>
            router.push(
              `${
                conciergeID || route
                  ? `/vehicle-wizard/${conciergeID || route}?tab=Budget`
                  : '/vehicle-wizard?tab=Budget'
              }`,
              undefined,
              {
                shallow: true,
              }
            )
          }
        >
          {t(LabelConstants.BACK)}
        </button>
        {route === 'recommendation' ? (
          <button
            className="btn btn-primary btn-sm !text-xl uppercase"
            onClick={handleRoute}
          >
            {t(LabelConstants.SEARCH)}
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm !text-xl uppercase"
            onClick={submitConcierge}
          >
            {t(LabelConstants.NEXT)}
          </button>
        )}
      </div>
    </div>
  );
};

export default TransmissionFuelType;
