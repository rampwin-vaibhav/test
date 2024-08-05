import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useState } from 'react';
import { formatNumber } from '../../helpers/utilities';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { FilterParams, Range, VehicleMetaData } from '../../types/models';
import DropdownWithCustomOption from '../common/DropdownWithCustomOption';
import RangeSlider from '../common/RangeSlider';
import { CloseIcon } from '../icons';

type RangeFilterProps = {
  vehicleMetaData: VehicleMetaData;
  appliedFilter: FilterParams;
  onChange: (value: {
    price?: Range;
    mileage?: Range;
    year?: Range;
    emi?: Range;
  }) => void;
  showEMIRange?: boolean;
};

/**
 * This component render a dropdown custom options for other filters.
 * @returns JSX.Element
 */
const RangeFilter = ({
  vehicleMetaData,
  appliedFilter,
  onChange,
  showEMIRange,
}: RangeFilterProps) => {
  const { t } = useTranslation();
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    Range | undefined
  >(
    appliedFilter.priceRange || {
      min: vehicleMetaData.MinVehiclePrice,
      max: vehicleMetaData.MaxVehiclePrice,
    }
  );
  const [selectedMileageRange, setSelectedMileageRange] = useState<
    Range | undefined
  >(
    appliedFilter.mileageRange || {
      min: vehicleMetaData.MinVehicleMileage,
      max: vehicleMetaData.MaxVehicleMileage,
    }
  );
  const [selectedYearRange, setSelectedYearRange] = useState<Range | undefined>(
    appliedFilter.yearRange || {
      min: vehicleMetaData.Years[vehicleMetaData.Years.length - 1],
      max: vehicleMetaData.Years[0],
    }
  );
  const [selectedEMIRange, setSelectedEMIRange] = useState<Range | undefined>(
    appliedFilter.mileageRange || {
      min: vehicleMetaData.MinMonthlyEMI,
      max: vehicleMetaData.MaxMonthlyEMI,
    }
  );
  const router = useRouter();
  useEffect(() => {
    if (appliedFilter.mileageRange)
      setSelectedMileageRange(appliedFilter.mileageRange);
  }, [appliedFilter.mileageRange]);

  useEffect(() => {
    if (appliedFilter.priceRange)
      setSelectedPriceRange(appliedFilter.priceRange);
  }, [appliedFilter.priceRange]);

  useEffect(() => {
    if (appliedFilter.yearRange) setSelectedYearRange(appliedFilter.yearRange);
  }, [appliedFilter.yearRange]);

  useEffect(() => {
    if (appliedFilter.emiRange) setSelectedEMIRange(appliedFilter.emiRange);
  }, [appliedFilter.emiRange]);

  const handlePriceChange = (price: Range) => {
    setSelectedPriceRange(price);
    onChange({
      price,
      mileage: selectedMileageRange,
      year: selectedYearRange,
      emi: selectedEMIRange,
    });
  };

  const handleMileageChange = (mileage: Range) => {
    setSelectedMileageRange(mileage);
    onChange({
      price: selectedPriceRange,
      mileage,
      year: selectedYearRange,
      emi: selectedEMIRange,
    });
  };

  const handleYearChange = (year: Range) => {
    setSelectedYearRange(year);
    onChange({
      price: selectedPriceRange,
      mileage: selectedMileageRange,
      year,
      emi: selectedEMIRange,
    });
  };

  const handleEMIRange = (emi: Range) => {
    setSelectedEMIRange(emi);
    onChange({
      price: selectedPriceRange,
      mileage: selectedMileageRange,
      year: selectedYearRange,
      emi,
    });
  };

  /**
   * This method is execute while use click on Apply button in small devices. (screen width < 768)
   * @param applyFilter - it indicate user is clicked on either apply button or close button.
   */
  const applyRangeFilter = (applyFilter: boolean) => {
    if (applyFilter) {
      onChange({
        price: selectedPriceRange,
        mileage: selectedMileageRange,
        year: selectedYearRange,
        emi: selectedEMIRange,
      });
    }
    setSelectedMileageRange(appliedFilter.mileageRange);
    setSelectedPriceRange(appliedFilter.priceRange);
    setSelectedYearRange(appliedFilter.yearRange);
    setSelectedEMIRange(appliedFilter.emiRange);
  };

  return (
    <DropdownWithCustomOption
      placeHolderText={
        showEMIRange
          ? t(LabelConstants.MILEAGE_YEAR_PRICE_EMI)
          : t(LabelConstants.MILEAGE_YEAR_PRICE)
      }
      optionClassName="ltr:left-0 rtl:right-0"
    >
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[23.875rem] flex flex-col justify-between">
          <div>
            <div className="flex md:hidden h-20 border-b items-center justify-center relative">
              <span className="text-lg font-bold uppercase">
                {showEMIRange
                  ? t(LabelConstants.MILEAGE_YEAR_PRICE_EMI)
                  : t(LabelConstants.MILEAGE_YEAR_PRICE)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  applyRangeFilter(false);
                  close();
                }}
              >
                <CloseIcon />
              </span>
            </div>

            <div className="p-5 flex flex-col justify-between gap-[20px]">
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center gap-4">
                  <span className="uppercase text-sm font-bold">
                    {t(LabelConstants.MILEAGE)}
                  </span>
                  <div className="flex gap-2 items-center">
                    <label className="text-xs">{t(LabelConstants.KM)}</label>
                    <input
                      className="!h-7 text-sm p-1 w-24 bg-lighter-gray text-dark-gray1 font-bold"
                      value={formatNumber(
                        selectedMileageRange?.min ||
                          vehicleMetaData.MinVehicleMileage
                      )}
                      readOnly
                    ></input>
                    {`-`}
                    <input
                      className="!h-7 text-sm p-1 w-24 bg-lighter-gray text-dark-gray1 font-bold"
                      value={formatNumber(
                        selectedMileageRange?.max ||
                          vehicleMetaData.MaxVehicleMileage
                      )}
                      readOnly
                    ></input>
                  </div>
                </div>
                <RangeSlider
                  min={vehicleMetaData.MinVehicleMileage}
                  max={vehicleMetaData.MaxVehicleMileage}
                  value={selectedMileageRange}
                  onChange={(selectedMileage) => {
                    setSelectedMileageRange(selectedMileage);
                  }}
                  onAfterChange={(selectedMileage) => {
                    if (window.innerWidth < 768) {
                      setSelectedMileageRange(selectedMileage);
                    } else {
                      handleMileageChange(selectedMileage);
                    }
                  }}
                  formatLabel={(value) =>
                    `${formatNumber(value)} ${t(LabelConstants.KM)}`
                  }
                  step={500}
                />
              </div>
              <hr />
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center gap-4">
                  <span className="uppercase text-sm font-bold">
                    {t(LabelConstants.YEAR)}
                  </span>
                  <div className="flex gap-2 items-center">
                    <input
                      className="!h-7 text-sm p-1 w-24 bg-lighter-gray text-dark-gray1 font-bold"
                      value={
                        selectedYearRange?.min ||
                        vehicleMetaData.Years[vehicleMetaData.Years.length - 1]
                      }
                      readOnly
                    ></input>
                    {`-`}
                    <input
                      className="!h-7 text-sm p-1 w-24 bg-lighter-gray text-dark-gray1 font-bold"
                      value={selectedYearRange?.max || vehicleMetaData.Years[0]}
                      readOnly
                    ></input>
                  </div>
                </div>
                <RangeSlider
                  max={vehicleMetaData.Years[0]}
                  min={vehicleMetaData.Years[vehicleMetaData.Years.length - 1]}
                  value={selectedYearRange}
                  onChange={(selectedYear) => {
                    setSelectedYearRange(selectedYear);
                  }}
                  onAfterChange={(selectedYear) => {
                    if (window.innerWidth < 768) {
                      setSelectedYearRange(selectedYear);
                    } else {
                      handleYearChange(selectedYear);
                    }
                  }}
                />
              </div>
              <hr />
              <div className="flex flex-col gap-4 w-full">
                <div className="flex justify-between items-center gap-4">
                  <span className="uppercase text-sm font-bold">
                    {t(LabelConstants.PRICE)}
                  </span>
                  <div className="flex gap-2 items-center">
                    <label className="text-xs">{t(LabelConstants.SAR)}</label>
                    <input
                      className="!h-7 text-sm p-1 w-24 bg-lighter-gray text-dark-gray1 font-bold"
                      value={formatNumber(
                        selectedPriceRange?.min ||
                          vehicleMetaData.MinVehiclePrice
                      )}
                      readOnly
                    ></input>
                    {`-`}
                    <input
                      className="!h-7 text-sm p-1 w-24 bg-lighter-gray text-dark-gray1 font-bold"
                      value={formatNumber(
                        selectedPriceRange?.max ||
                          vehicleMetaData.MaxVehiclePrice
                      )}
                      readOnly
                    ></input>
                  </div>
                </div>
                <RangeSlider
                  min={vehicleMetaData.MinVehiclePrice}
                  max={vehicleMetaData.MaxVehiclePrice}
                  value={selectedPriceRange}
                  onChange={(selectedPrice) => {
                    setSelectedPriceRange(selectedPrice);
                  }}
                  onAfterChange={(selectedPrice) => {
                    if (window.innerWidth < 768) {
                      setSelectedPriceRange(selectedPrice);
                    } else {
                      handlePriceChange(selectedPrice);
                    }
                  }}
                  formatLabel={(value) =>
                    `${
                      router.locale === Locales.EN ? t(LabelConstants.SAR) : ''
                    } ${formatNumber(value)} ${
                      router.locale === Locales.AR ? t(LabelConstants.SAR) : ''
                    }`
                  }
                  step={500}
                />
              </div>
              {showEMIRange && (
                <>
                  <hr />
                  <div className="flex flex-col gap-4 w-full">
                    <div className="flex justify-between items-center gap-y-4 gap-x-0">
                      <span className="uppercase text-sm font-bold">
                        {t(LabelConstants.LBL_EMI_MONTH)}
                      </span>
                      <div className="flex gap-2 items-center">
                        <label className="text-xs">
                          {t(LabelConstants.SAR)}
                        </label>
                        <input
                          className="!h-7 text-sm p-1 w-24 bg-lighter-gray text-dark-gray1 font-bold"
                          value={formatNumber(
                            selectedEMIRange?.min ||
                              vehicleMetaData.MinMonthlyEMI
                          )}
                          readOnly
                        ></input>
                        {`-`}
                        <input
                          className="!h-7 text-sm p-1 w-24 bg-lighter-gray text-dark-gray1 font-bold"
                          value={formatNumber(
                            selectedEMIRange?.max ||
                              vehicleMetaData.MaxMonthlyEMI
                          )}
                          readOnly
                        ></input>
                      </div>
                    </div>
                    <RangeSlider
                      min={vehicleMetaData.MinMonthlyEMI}
                      max={vehicleMetaData.MaxMonthlyEMI}
                      value={selectedEMIRange}
                      onChange={(selectedEMI) => {
                        setSelectedEMIRange(selectedEMI);
                      }}
                      onAfterChange={(selectedEMI) => {
                        if (window.innerWidth < 768) {
                          setSelectedEMIRange(selectedEMI);
                        } else {
                          handleEMIRange(selectedEMI);
                        }
                      }}
                      formatLabel={(value) =>
                        `${
                          router.locale === Locales.EN
                            ? t(LabelConstants.SAR)
                            : ''
                        } ${formatNumber(value)} ${
                          router.locale === Locales.AR
                            ? t(LabelConstants.SAR)
                            : ''
                        }`
                      }
                      step={500}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex md:hidden h-20 items-center justify-center m-5">
            <button
              className="btn btn-primary !w-full"
              onClick={() => {
                applyRangeFilter(true);
                close();
              }}
            >
              {t(LabelConstants.APPLY)}
            </button>
          </div>
        </div>
      )}
    </DropdownWithCustomOption>
  );
};

export default RangeFilter;
