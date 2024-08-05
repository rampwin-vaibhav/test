import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import router from 'next/router';
import { ConciergeType } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { VehicleType } from '../../types/models';

type vehicleTypeProps = {
  selectedVehicleTypes: Array<VehicleType>;
  vehicleTypes: Array<VehicleType>;
  conciergeID: number | null;
  route: string | undefined;
  handleChange: (type: ConciergeType, data: VehicleType) => void;
};

const VehicleTypes: NextPage<vehicleTypeProps> = ({
  selectedVehicleTypes,
  vehicleTypes,
  conciergeID,
  route,
  handleChange,
}) => {
  const { t } = useTranslation();

  const handleSelectionChange = (data: VehicleType) => {
    handleChange(ConciergeType.VehicleType, data);
  };

  return (
    <div className="tab-data">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
        {vehicleTypes &&
          vehicleTypes.length > 0 &&
          vehicleTypes.map((item) => (
            <div
              key={item.VehicleTypeId}
              className={
                selectedVehicleTypes.some(
                  (x) => x.VehicleTypeId === item.VehicleTypeId
                )
                  ? 'selected-bodytype-box'
                  : 'bodytype-box'
              }
              onClick={() => {
                handleSelectionChange(item);
              }}
            >
              <picture>
                <source srcSet={item.ImageUrlPath} />
                <img
                  src={item.ImageUrlPath}
                  alt={item.VehicleType}
                  className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16"
                />
              </picture>
              <div className="w-1/2 text-xl font-bold">{item.VehicleType}</div>
            </div>
          ))}
      </div>
      <div className="mt-8 flex sm:justify-end">
        <button
          className="btn btn-primary btn-sm !text-xl uppercase"
          onClick={() =>
            router.push(
              `${
                conciergeID || route
                  ? `/vehicle-wizard/${conciergeID || route}?tab=BodyType`
                  : '/vehicle-wizard?tab=BodyType'
              }`,
              undefined,
              {
                shallow: true,
              }
            )
          }
        >
          {t(LabelConstants.NEXT)}
        </button>
      </div>
    </div>
  );
};

export default VehicleTypes;
