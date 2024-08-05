import { useTranslation } from 'next-i18next';
import { VehicleListingData } from '../../types/models';
import { LabelConstants } from '../../types/i18n.labels';

type OverviewProps = {
  vehicle: VehicleListingData;
};

const VehicleOverview = ({ vehicle }: OverviewProps) => {
  const { t } = useTranslation();
  return (
    <>
      {vehicle.Overview && (
        <div className="border rounded p-4 lg:p-6">
          <p className="text-3xl font-semibold uppercase text-primary">
            {t(LabelConstants.OVERVIEW)}
          </p>
          <div className="flex pt-4 lg:pt-6 flex-wrap gap-y-5">
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.MODEL_YEAR)}</p>
              <p className="pt-1">{vehicle.Overview?.ModelYear || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.FUEL_TYPE)}</p>
              <p className="pt-1">{vehicle.Overview?.FuelType || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.BODY_STYLE)}</p>
              <p className="pt-1">{vehicle.Overview?.BodyType || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">
                {t(LabelConstants.TRANSMISSION)}
              </p>
              <p className="pt-1">{vehicle.Overview?.Transmission || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.IMPORTED_BY)}</p>
              <p className="pt-1">{vehicle.Overview?.Importer || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.SUPPLIED_BY)}</p>
              <p className="pt-1">
                {vehicle?.Overview?.IsNew && vehicle?.Overview?.IsOutlet
                  ? vehicle.Overview?.Distributor
                    ? vehicle.Overview?.Distributor
                    : vehicle.Overview?.DealerName || '-'
                  : vehicle.Overview?.DealerName || '-'}
              </p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">
                {t(LabelConstants.FULFILLED_BY)}
              </p>
              <p className="pt-1">{vehicle.Overview?.FulFilledBy || '-'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
  {
  }
};

export default VehicleOverview;
