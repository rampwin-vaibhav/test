import { CommonUtils, FilterUtils } from '../../helpers/utilities';
import { FilterChangeEvent } from '../../types/events';
import { FilterParams, Make } from '../../types/models';
import DropdownWithCustomOption from '../common/DropdownWithCustomOption';
import { useForm } from 'react-hook-form';
import { FormInput } from '../common/Form';
import { CloseIcon, SearchIcon } from '../icons';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

interface IFormInput {
  searchKey: string;
}

type MakeFilterProps = {
  makes: Array<Make>;
  appliedFilter: FilterParams;
  onChange: (event: FilterChangeEvent<Make>) => void;
};

/**
 * This component render a filter dropdown for vehicle make options.
 * @returns JSX.Element
 */
const MakeFilter = ({ makes, appliedFilter, onChange }: MakeFilterProps) => {
  const { t } = useTranslation();
  const { control, watch } = useForm<IFormInput>();
  const { searchKey } = watch();
  const [selectedMakes, setSelectedMakes] = useState<Array<string>>(
    appliedFilter.makes || []
  );

  /**
   * This effect will update user selected values with global filters state data.
   */
  useEffect(() => {
    setSelectedMakes(appliedFilter.makes || []);
  }, [appliedFilter, setSelectedMakes]);

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {Make} event value of make.
   */
  const handleLocalChange = (event: Make, isSelect: boolean) => {
    if (isSelect) {
      setSelectedMakes([...(selectedMakes || []), event.Make]);
    } else {
      setSelectedMakes((selectedMakes || []).filter((x) => x !== event.Make));
    }
  };

  /**
   * This method is execute while use click on Apply button in small devices. (screen width < 768)
   * @param applyFilter - it indicate user is clicked on either apply button or close button.
   */
  const applyMakeFilter = (applyFilter: boolean) => {
    if (applyFilter) {
      onChange({
        item: undefined,
        list: makes.filter((x) =>
          selectedMakes.some(
            (y) => String(y).toLowerCase() === String(x.Make).toLowerCase()
          )
        ),
        isSelected: true,
      });
      setSelectedMakes(appliedFilter.makes || []);
    } else {
      setSelectedMakes(appliedFilter.makes || []);
    }
  };

  /**
   * This method is executed whenever user click on any make in dropdown list.
   * @param {Make} event value of make.
   */
  const handleChange = (event: Make) => {
    onChange(
      FilterUtils.handleChangeForMultiSelectProps<Make>(
        event,
        makes || [],
        'makes',
        'Make',
        appliedFilter
      )
    );
  };

  return (
    <DropdownWithCustomOption
      placeHolderText={t(LabelConstants.MAKE)}
      optionClassName="ltr:left-0 rtl:right-0"
    >
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[39rem] flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex md:hidden h-20 border-b items-center justify-center relative">
              <span className="text-lg font-bold uppercase">
                {t(LabelConstants.MAKE)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  applyMakeFilter(false);
                  close();
                }}
              >
                <CloseIcon />
              </span>
            </div>
            <div className="p-5 flex flex-col h-[calc(100vh-12rem)] md:h-auto">
              <div className="flex items-center gap-2 border px-2 border-gray-300">
                <SearchIcon className="w-4 h-4" />
                <FormInput
                  control={control}
                  name="searchKey"
                  placeholder={t(LabelConstants.SEARCH_MAKE)}
                  className="border-none px-0"
                />
              </div>
              <div className="md:h-[120px] overflow-y-auto">
                <div className="mt-5 pr-2 grid grid-cols-2 md:grid-cols-4 w-full gap-2">
                  {makes
                    .filter(
                      (x: Make) =>
                        !searchKey ||
                        x.Make.toLowerCase().includes(searchKey.toLowerCase())
                    )
                    .sort((a, b) =>
                      a.MakeKey.toLowerCase() > b.MakeKey.toLowerCase() ? 1 : -1
                    )
                    .map((item: Make) => {
                      const isSelected = CommonUtils.hasItem(
                        item.Make,
                        selectedMakes
                      );
                      return (
                        <div
                          key={item.MakeCode}
                          onClick={() => {
                            if (window.innerWidth < 768) {
                              handleLocalChange(item, !isSelected);
                            } else {
                              handleChange(item);
                            }
                          }}
                          className={`flex items-center filter-item text-primary hover:bg-hover ${
                            isSelected ? 'selected' : ''
                          }`}
                        >
                          <div className="font-bold">{item.Make}</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden h-20 items-center justify-center m-5">
            <button
              className="btn btn-primary !w-full"
              onClick={() => {
                applyMakeFilter(true);
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

export default MakeFilter;
