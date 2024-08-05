import { CommonUtils, FilterUtils } from '../../../helpers/utilities';
import {
  Color,
  FilterMasterData,
  FilterParams,
  FuelType,
  Ownership,
  Transmission,
} from '../../../types/models';
import { MoreFilterChange } from '../../../types/events';
import DropdownWithCustomOption from '../../common/DropdownWithCustomOption';
import {
  OtherColorIcon,
  PetrolFuelTypeIcon,
  RightTickIcon,
  DieselIcon,
  ElectricIcon,
  HybridIcon,
  LpgIcon,
  MhevIcon,
  PhevIcon,
  DefaultFuelTypeIcon,
  CloseIcon,
} from '../../icons';
import { OtherColorHexCode } from '../../../types/constants';
import { LabelConstants } from '../../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { FuelTypeKey } from '../../../types/enums';
import { useEffect, useState } from 'react';

type MoreFilterProps = {
  masterData: FilterMasterData;
  appliedFilter: FilterParams;
  onChange: (value: MoreFilterChange) => void;
  isNewCarPage?: boolean;
};

/**
 * This component render a filter dropdown for more filter options.
 * @returns JSX.Element
 */
const MoreFilter = ({
  masterData: { vehicleMetaData, fuelTypes },
  appliedFilter,
  onChange,
  isNewCarPage,
}: MoreFilterProps) => {
  const { t } = useTranslation();
  const isActive = <T,>(
    value: T,
    checkWith: keyof Omit<
      FilterParams,
      | 'locale'
      | 'page'
      | 'size'
      | 'yearRange'
      | 'searchKey'
      | 'priceRange'
      | 'mileageRange'
      | 'emiRange'
      | 'sortBy'
      | 'sortDir'
      | 'type'
      | 'multipleSortBy'
    >
  ): boolean => {
    return FilterUtils.isActiveFilter(value, appliedFilter, checkWith);
  };
  const [selectedFilter, setSelectedFilter] = useState<{
    fuelTypes: Array<string>;
    ownership: Array<string>;
    transmission: Array<string>;
    exteriorColor: Array<string>;
    interiorColor: Array<string>;
  }>({
    fuelTypes: appliedFilter.fuelTypes || [],
    ownership: appliedFilter.ownership || [],
    transmission: appliedFilter.transmission || [],
    exteriorColor: appliedFilter.exteriorColor || [],
    interiorColor: appliedFilter.interiorColor || [],
  });

  /**
   * This effect will update user selected values with global filters state data.
   */
  useEffect(() => {
    setSelectedFilter({
      fuelTypes: appliedFilter.fuelTypes || [],
      ownership: appliedFilter.ownership || [],
      transmission: appliedFilter.transmission || [],
      exteriorColor: appliedFilter.exteriorColor || [],
      interiorColor: appliedFilter.interiorColor || [],
    });
  }, [appliedFilter, setSelectedFilter]);

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {FuelType} event value of FuelType.
   */
  const handleLocalFuelTypeChange = (event: FuelType, isSelect: boolean) => {
    if (isSelect) {
      setSelectedFilter({
        ...selectedFilter,
        fuelTypes: [...(selectedFilter.fuelTypes || []), event.FuelTypeKey],
      });
    } else {
      setSelectedFilter({
        ...selectedFilter,
        fuelTypes: (selectedFilter.fuelTypes || []).filter(
          (x) => x !== event.FuelTypeKey
        ),
      });
    }
  };

  const handleFuelTypeChange = (selectedItem: FuelType) => {
    const { item, list, isSelected } =
      FilterUtils.handleChangeForMultiSelectProps<FuelType>(
        selectedItem,
        fuelTypes,
        'fuelTypes',
        'FuelTypeKey',
        appliedFilter
      );
    onChange({ FuelType: { item, list, isSelected } });
  };

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {Ownership} event value of Ownership.
   */
  const handleLocalOwnershipChange = (event: Ownership, isSelect: boolean) => {
    if (isSelect) {
      setSelectedFilter({
        ...selectedFilter,
        ownership: [...(selectedFilter.ownership || []), event.OwnershipKey],
      });
    } else {
      setSelectedFilter({
        ...selectedFilter,
        ownership: (selectedFilter.ownership || []).filter(
          (x) => x !== event.OwnershipKey
        ),
      });
    }
  };

  const handleOwnershipChange = (selectedItem: Ownership) => {
    const { item, list, isSelected } =
      FilterUtils.handleChangeForMultiSelectProps<Ownership>(
        selectedItem,
        vehicleMetaData.Ownerships,
        'ownership',
        'OwnershipKey',
        appliedFilter
      );
    onChange({ Ownership: { item, list, isSelected } });
  };

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {Transmission} event value of Transmission.
   */
  const handleLocalTransmissionChange = (
    event: Transmission,
    isSelect: boolean
  ) => {
    if (isSelect) {
      setSelectedFilter({
        ...selectedFilter,
        transmission: [
          ...(selectedFilter.transmission || []),
          event.TransmissionKey,
        ],
      });
    } else {
      setSelectedFilter({
        ...selectedFilter,
        transmission: (selectedFilter.transmission || []).filter(
          (x) => x !== event.TransmissionKey
        ),
      });
    }
  };

  const handleTransmissionChange = (selectedItem: Transmission) => {
    const { item, list, isSelected } =
      FilterUtils.handleChangeForMultiSelectProps<Transmission>(
        selectedItem,
        vehicleMetaData.Transmissions,
        'transmission',
        'TransmissionKey',
        appliedFilter
      );
    onChange({ Transmission: { item, list, isSelected } });
  };

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {Color} event value of Exterior Color.
   */
  const handleLocalExteriorColorChange = (event: Color, isSelect: boolean) => {
    if (isSelect) {
      setSelectedFilter({
        ...selectedFilter,
        exteriorColor: [
          ...(selectedFilter.exteriorColor || []),
          event.ColorKey,
        ],
      });
    } else {
      setSelectedFilter({
        ...selectedFilter,
        exteriorColor: (selectedFilter.exteriorColor || []).filter(
          (x) => x !== event.ColorKey
        ),
      });
    }
  };

  const handleExteriorColorChange = (selectedItem: Color) => {
    const { item, list, isSelected } =
      FilterUtils.handleChangeForMultiSelectProps<Color>(
        selectedItem,
        vehicleMetaData.ExteriorColors,
        'exteriorColor',
        'ColorKey',
        appliedFilter
      );
    onChange({ ExteriorColor: { item, list, isSelected } });
  };

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {Color} event value of Interior Color.
   */
  const handleLocalInteriorColorChange = (event: Color, isSelect: boolean) => {
    if (isSelect) {
      setSelectedFilter({
        ...selectedFilter,
        interiorColor: [
          ...(selectedFilter.interiorColor || []),
          event.ColorKey,
        ],
      });
    } else {
      setSelectedFilter({
        ...selectedFilter,
        interiorColor: (selectedFilter.interiorColor || []).filter(
          (x) => x !== event.ColorKey
        ),
      });
    }
  };

  const handleInteriorColorChange = (selectedItem: Color) => {
    const { item, list, isSelected } =
      FilterUtils.handleChangeForMultiSelectProps<Color>(
        selectedItem,
        vehicleMetaData.InteriorColors,
        'interiorColor',
        'ColorKey',
        appliedFilter
      );
    onChange({ InteriorColor: { item, list, isSelected } });
  };

  /**
   * This method is execute while use click on Apply button in small devices. (screen width < 768)
   * @param applyFilter - it indicate user is clicked on either apply button or close button.
   */
  const applyFilter = (applyFilter: boolean) => {
    if (applyFilter) {
      onChange({
        FuelType: {
          item: undefined,
          list: fuelTypes.filter((x) =>
            selectedFilter.fuelTypes.some(
              (y) =>
                String(y).toLowerCase() === String(x.FuelTypeKey).toLowerCase()
            )
          ),
          isSelected: true,
        },
        Transmission: {
          item: undefined,
          list: vehicleMetaData.Transmissions.filter((x) =>
            selectedFilter.transmission.some(
              (y) =>
                String(y).toLowerCase() ===
                String(x.TransmissionKey).toLowerCase()
            )
          ),
          isSelected: true,
        },
        Ownership: {
          item: undefined,
          list: vehicleMetaData.Ownerships.filter((x) =>
            selectedFilter.ownership.some(
              (y) =>
                String(y).toLowerCase() === String(x.OwnershipKey).toLowerCase()
            )
          ),
          isSelected: true,
        },
        InteriorColor: {
          item: undefined,
          list: vehicleMetaData.InteriorColors.filter((x) =>
            selectedFilter.interiorColor.some(
              (y) =>
                String(y).toLowerCase() === String(x.ColorKey).toLowerCase()
            )
          ),
          isSelected: true,
        },
        ExteriorColor: {
          item: undefined,
          list: vehicleMetaData.ExteriorColors.filter((x) =>
            selectedFilter.exteriorColor.some(
              (y) =>
                String(y).toLowerCase() === String(x.ColorKey).toLowerCase()
            )
          ),
          isSelected: true,
        },
      });
    }
    setSelectedFilter({
      fuelTypes: appliedFilter.fuelTypes || [],
      ownership: appliedFilter.ownership || [],
      transmission: appliedFilter.transmission || [],
      exteriorColor: appliedFilter.exteriorColor || [],
      interiorColor: appliedFilter.interiorColor || [],
    });
  };

  const getFuelTypeIcon = (key: any) => {
    switch (key) {
      case FuelTypeKey.Diesel:
        return <DieselIcon className="h-4 w-4" />;
      case FuelTypeKey.Electric:
        return <ElectricIcon className="h-4 w-4" />;
      case FuelTypeKey.Hybrid:
        return <HybridIcon className="h-4 w-4" />;
      case FuelTypeKey.Lpg:
        return <LpgIcon className="h-4 w-4" />;
      case FuelTypeKey.Mhev:
        return <MhevIcon className="h-4 w-4" />;
      case FuelTypeKey.Petrol:
        return <PetrolFuelTypeIcon className="h-4 w-4" />;
      case FuelTypeKey.Phev:
        return <PhevIcon className="h-4 w-4" />;
      default:
        return <DefaultFuelTypeIcon className="h-4 w-4" />;
    }
  };

  return (
    <DropdownWithCustomOption
      placeHolderText={t(LabelConstants.MORE_FILTER)}
      buttonClassName="!h-[3.625rem]"
    >
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[39rem] flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex md:hidden h-20 border-b items-center justify-center relative">
              <span className="text-lg font-bold uppercase">
                {t(LabelConstants.MORE_FILTER)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  applyFilter(false);
                  close();
                }}
              >
                <CloseIcon />
              </span>
            </div>

            <div className="p-5 flex flex-col h-[calc(100vh-12rem)] md:h-auto gap-4">
              {/* Fuel Type Filter */}
              <div className="flex flex-col gap-4 w-full">
                <span className="uppercase font-bold text-primary">
                  {t(LabelConstants.FUEL_TYPE)}
                </span>
                <div className="flex justify-between items-center gap-4">
                  <div className="flex flex-row flex-wrap gap-4 w-full">
                    {fuelTypes
                      .filter((x) => x.FuelTypeKey)
                      .map((item: FuelType) => {
                        const isSelected = CommonUtils.hasItem(
                          item.FuelTypeKey,
                          selectedFilter.fuelTypes
                        );
                        return (
                          <div
                            key={item.FuelTypeId}
                            className={`flex items-center gap-2 w-24 p-2 border text-center filter-item font-bold text-primary hover:bg-hover ${
                              isSelected ? 'selected' : ''
                            }`}
                            onClick={() => {
                              if (window.innerWidth < 768) {
                                handleLocalFuelTypeChange(item, !isSelected);
                              } else {
                                handleFuelTypeChange(item);
                              }
                            }}
                          >
                            <div>{getFuelTypeIcon(item.FuelTypeKey)}</div>
                            <div>{item.FuelType}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              {/* Color Filter */}
              <hr />
              <div className="flex flex-col gap-4">
                <span className="uppercase font-bold text-primary">
                  {t(LabelConstants.EXTERIOR_COLOR)}
                </span>
                <div className="flex flex-row flex-wrap gap-4">
                  {vehicleMetaData.ExteriorColors.map((item: Color) => {
                    const isSelected = CommonUtils.hasItem(
                      item.ColorKey,
                      selectedFilter.exteriorColor
                    );
                    return (
                      <div
                        key={item.ColorId}
                        title={item.Color}
                        className={`h-2 w-2 p-3 rounded-full border-2 ga-refresh-vehicles flex items-center justify-center cursor-pointer ${
                          isSelected ? `shadow-lg shadow-dark-gray2` : ''
                        }`}
                        style={{
                          backgroundColor: item.ColorHex,
                        }}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            handleLocalExteriorColorChange(item, !isSelected);
                          } else {
                            handleExteriorColorChange(item);
                          }
                        }}
                      >
                        {isSelected ? (
                          <>
                            {item.ColorHex.trim() === OtherColorHexCode ? (
                              <div className="relative w-auto h-auto">
                                <OtherColorIcon className="h-7 w-7" />
                                <div className="absolute h-full w-full top-0 left-0">
                                  <div className="relative flex items-center justify-center h-full">
                                    <RightTickIcon className="h-4 w-4" />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <RightTickIcon className="h-4 w-4" />
                              </div>
                            )}
                          </>
                        ) : item.ColorHex.trim() === OtherColorHexCode ? (
                          <div className="relative w-auto h-auto">
                            <OtherColorIcon className="h-7 w-7" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Color Filter */}
              <hr />
              <div className="flex flex-col gap-4">
                <span className="uppercase font-bold text-primary">
                  {t(LabelConstants.INTERIOR_COLOR)}
                </span>
                <div className="flex flex-row flex-wrap  gap-4">
                  {vehicleMetaData.InteriorColors.map((item: Color) => {
                    const isSelected = CommonUtils.hasItem(
                      item.ColorKey,
                      selectedFilter.interiorColor
                    );
                    return (
                      <div
                        key={item.ColorId}
                        title={item.Color}
                        className={`h-2 w-2 p-3 rounded-full border-2 ga-refresh-vehicles flex items-center justify-center cursor-pointer ${
                          isSelected ? `shadow-lg shadow-dark-gray2` : ''
                        }`}
                        style={{
                          backgroundColor: item.ColorHex,
                        }}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            handleLocalInteriorColorChange(item, !isSelected);
                          } else {
                            handleInteriorColorChange(item);
                          }
                        }}
                      >
                        {isSelected ? (
                          <>
                            {item.ColorHex.trim() === OtherColorHexCode ? (
                              <div className="relative w-auto h-auto">
                                <OtherColorIcon className="h-7 w-7" />
                                <div className="absolute h-full w-full top-0 left-0">
                                  <div className="relative flex items-center justify-center h-full">
                                    <RightTickIcon className="h-4 w-4" />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <RightTickIcon className="h-4 w-4" />
                              </div>
                            )}
                          </>
                        ) : item.ColorHex.trim() === OtherColorHexCode ? (
                          <div className="relative w-auto h-auto">
                            <OtherColorIcon className="h-7 w-7" />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ownerships && Transmission Filter */}
              <hr />
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {isNewCarPage ? (
                  <></>
                ) : (
                  <>
                    <div className="flex flex-col gap-4 w-full">
                      <span className="uppercase font-bold text-primary">
                        {t(LabelConstants.OWNERSHIP)}
                      </span>
                      <div className="flex items-center gap-4 w-full">
                        <div className="flex flex-row gap-4 w-full">
                          {vehicleMetaData.Ownerships.map((item: Ownership) => {
                            const isSelected = CommonUtils.hasItem(
                              item.OwnershipKey,
                              selectedFilter.ownership
                            );
                            return (
                              <div
                                key={item.OwnershipId}
                                className={`w-14 p-2 border filter-item font-bold text-primary hover:bg-hover ${
                                  isSelected ? 'selected' : ''
                                }`}
                                onClick={() => {
                                  if (window.innerWidth < 768) {
                                    handleLocalOwnershipChange(
                                      item,
                                      !isSelected
                                    );
                                  } else {
                                    handleOwnershipChange(item);
                                  }
                                }}
                              >
                                {item.Ownership}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                )}
                <div className="flex flex-col gap-4 w-full">
                  <span className="uppercase font-bold text-primary">
                    {t(LabelConstants.TRANSMISSION)}
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-row gap-4 w-full">
                      {vehicleMetaData.Transmissions.map(
                        (item: Transmission) => {
                          const isSelected = CommonUtils.hasItem(
                            item.TransmissionKey,
                            selectedFilter.transmission
                          );
                          return (
                            <div
                              key={item.TransmissionId}
                              className={`w-24 p-2 border filter-item font-bold text-primary hover:bg-hover ${
                                isSelected ? 'selected' : ''
                              }`}
                              onClick={() => {
                                if (window.innerWidth < 768) {
                                  handleLocalTransmissionChange(
                                    item,
                                    !isSelected
                                  );
                                } else {
                                  handleTransmissionChange(item);
                                }
                              }}
                            >
                              {item.Transmission}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden h-20 items-center justify-center m-5">
            <button
              className="btn btn-primary !w-full"
              onClick={() => {
                applyFilter(true);
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

export default MoreFilter;
