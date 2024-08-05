import { NextPage } from 'next';
import router from 'next/router';
import { useTranslation } from 'next-i18next';
import { SetStateAction, useEffect } from 'react';
import { VehicleService } from '../../helpers/services';
import {
  BodyType,
  BodyTypeByVehicleTypePayload,
  VehicleType,
} from '../../types/models';
import { ConciergeType } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { CommonUtils } from '../../helpers/utilities';

type bodyTypeProps = {
  selectedBodyTypes: Array<BodyType>;
  selectedVehicleTypes: Array<VehicleType>;
  bodyTypes: Array<BodyType>;
  conciergeID: number | null;
  isSelectionChange: boolean;
  route: string | undefined;
  setSelectionChange: (value: SetStateAction<boolean>) => void;
  setSelectedBodyType: (value: SetStateAction<Array<BodyType>>) => void;
  handleChange: (type: ConciergeType, data: BodyType) => void;
};

const BodyType: NextPage<bodyTypeProps> = ({
  selectedBodyTypes,
  selectedVehicleTypes,
  bodyTypes,
  conciergeID,
  isSelectionChange,
  route,
  setSelectionChange,
  setSelectedBodyType,
  handleChange,
}) => {
  const { t } = useTranslation();

  const filteredBodyTypes = bodyTypes.filter((data) => data.IsSearchable);

  useEffect(() => {
    if (
      selectedVehicleTypes &&
      selectedVehicleTypes.length > 0 &&
      isSelectionChange
    ) {
      let ids =
        selectedVehicleTypes &&
        selectedVehicleTypes.map((itm: VehicleType) => itm.VehicleTypeId);
      let data: BodyTypeByVehicleTypePayload = {
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        VehicleTypeIds: ids,
      };
      const initialLoad = async () => {
        const response = await VehicleService.fetchBodyTypeByVehicleType(data);
        setSelectedBodyType(
          response.filter((data: BodyType) => data.IsSearchable)
        );
      };
      initialLoad();
    }
    setSelectionChange(false);
  }, [
    setSelectedBodyType,
    selectedVehicleTypes,
    selectedBodyTypes,
    isSelectionChange,
    setSelectionChange,
  ]);

  const handleSelectionChange = (data: BodyType) => {
    handleChange(ConciergeType.BodyType, data);
  };

  return (
    <div className="tab-data">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-10">
        {filteredBodyTypes &&
          filteredBodyTypes.length > 0 &&
          filteredBodyTypes.map((item) => (
            <div
              key={item.BodyTypeId}
              className={
                selectedBodyTypes.some((x) => x.BodyTypeId === item.BodyTypeId)
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
                  alt={item.BodyTypeKey}
                  className="ltr:mr-8 rtl:ml-8 h-12 lg:h-16"
                />
              </picture>
              <div className="w-1/2 text-xl font-bold">{item.BodyType}</div>
            </div>
          ))}
      </div>
      <div className="mt-8 flex sm:justify-end justify-center gap-4">
        <button
          className="btn btn-secondary btn-sm !text-xl uppercase"
          onClick={() =>
            router.push(
              `${
                conciergeID
                  ? `/vehicle-wizard/${conciergeID}?tab=BodyType`
                  : '/vehicle-wizard?tab=BodyType'
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
        <button
          className="btn btn-primary btn-sm !text-xl uppercase"
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
          disabled={selectedBodyTypes && selectedBodyTypes.length <= 0}
        >
          {t(LabelConstants.NEXT)}
        </button>
      </div>
    </div>
  );
};

export default BodyType;
