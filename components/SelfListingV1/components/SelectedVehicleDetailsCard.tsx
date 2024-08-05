import React from 'react';
import { useAppSelector } from '../../../lib/hooks';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../../types/i18n.labels';

const SelectedVehicleDetailsCard = ({
  hideDemandInfo = false,
}: {
  hideDemandInfo?: boolean;
}) => {
  const { t } = useTranslation();
  const currentSelfListingData = useAppSelector(
    ({ selfListing }) => selfListing.data
  );
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center gap-[12px] bg-[#F5F5F5] h-[48px] w-[312px] rounded-[30px] ">
        <svg
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 4.42649L3.47072 7.10742L9 1.10742"
            stroke="black"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-[15px] text-black font-normal">
          {`${currentSelfListingData.manufacture_year.year} ${currentSelfListingData.brand.brandName} ${currentSelfListingData.model.modelName} ${currentSelfListingData.variant.variantName}`}
        </span>
      </div>
      {!hideDemandInfo && (
        <p className="text-black/50 text-[11px] font-medium mt-[6px]">
          {`${t(LabelConstants.CAR_IS_IN_HIGH_DEMAND)} ${
            currentSelfListingData.city.cityName
          }`}
        </p>
      )}
    </div>
  );
};

export default SelectedVehicleDetailsCard;
