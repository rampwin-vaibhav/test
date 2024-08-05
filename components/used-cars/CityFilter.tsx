import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { CommonUtils, FilterUtils } from '../../helpers/utilities';
import { FilterChangeEvent } from '../../types/events';
import { LabelConstants } from '../../types/i18n.labels';
import { City, FilterParams } from '../../types/models';
import DropdownWithCustomOption from '../common/DropdownWithCustomOption';
import { CloseIcon } from '../icons';

type CityFilterProps = {
  cities: Array<City>;
  onChange: (event: FilterChangeEvent<City>) => void;
  appliedFilter: FilterParams;
};

/**
 * This component render a filter dropdown for city options.
 * @returns JSX.Element
 */
const CityFilter = ({
  cities = [],
  appliedFilter,
  onChange,
}: CityFilterProps) => {
  const { t } = useTranslation();
  const [selectedCities, setSelectedCities] = useState<Array<string>>(
    appliedFilter.cities || []
  );

  /**
   * This effect will update user selected values with global filters state data.
   */
  useEffect(() => {
    setSelectedCities(appliedFilter.cities || []);
  }, [appliedFilter, setSelectedCities]);

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {City} event value of city.
   */
  const handleLocalChange = (event: City, isSelect: boolean) => {
    if (isSelect) {
      setSelectedCities([...(selectedCities || []), event.CityKey]);
    } else {
      setSelectedCities(
        (selectedCities || []).filter((x) => x !== event.CityKey)
      );
    }
  };

  /**
   * This method is execute while use click on Apply button in small devices. (screen width < 768)
   * @param applyFilter - it indicate user is clicked on either apply button or close button.
   */
  const applyCityFilter = (applyFilter: boolean) => {
    if (applyFilter) {
      onChange({
        item: undefined,
        list: cities.filter((x) =>
          selectedCities.some(
            (y) => String(y).toLowerCase() === String(x.CityKey).toLowerCase()
          )
        ),
        isSelected: true,
      });
      setSelectedCities(appliedFilter.cities || []);
    } else {
      setSelectedCities(appliedFilter.cities || []);
    }
  };

  /**
   * This method is executed whenever user click on any city in dropdown list.
   * @param {City} event value of city.
   */
  const handleChange = (event: City) => {
    onChange(
      FilterUtils.handleChangeForMultiSelectProps<City>(
        event,
        cities,
        'cities',
        'CityKey',
        appliedFilter
      )
    );
  };

  return (
    <DropdownWithCustomOption placeHolderText={t(LabelConstants.CITY)}>
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[39rem] flex flex-col justify-between">
          <div>
            <div className="flex md:hidden h-20 border-b items-center justify-center relative">
              <span className="text-lg font-bold uppercase">
                {t(LabelConstants.CITY)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  applyCityFilter(false);
                  close();
                }}
              >
                <CloseIcon />
              </span>
            </div>
            <div className="p-5 flex flex-wrap w-full gap-4 md:gap-2 content-center justify-center md:justify-start">
              {cities.map((item: City) => {
                const isSelected = CommonUtils.hasItem(
                  item.CityKey,
                  selectedCities
                );
                return (
                  <div
                    key={item.CityId}
                    className={`body-type filter-item font-bold text-primary hover:bg-hover ${
                      isSelected ? 'selected' : ''
                    }`}
                    onClick={() => {
                      if (window.innerWidth < 768) {
                        handleLocalChange(item, !isSelected);
                      } else {
                        handleChange(item);
                      }
                    }}
                  >
                    <div className="text-center">{item.City}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex md:hidden h-20 items-center justify-center m-5">
            <button
              className="btn btn-primary !w-full"
              onClick={() => {
                applyCityFilter(true);
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

export default CityFilter;
