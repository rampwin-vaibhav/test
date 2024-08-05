import { FilterParams, Spec } from '../../types/models';
import DropdownWithCustomOption from '../common/DropdownWithCustomOption';
import { useForm } from 'react-hook-form';
import { FormInput } from '../common/Form';
import { FilterChangeEvent } from '../../types/events';
import { CommonUtils, FilterUtils } from '../../helpers/utilities';
import { CloseIcon, SearchIcon } from '../icons';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

interface IFormInput {
  searchKey: string;
}

type SpecFilterProps = {
  specs: Array<Spec>;
  appliedFilter: FilterParams;
  onChange: (event: FilterChangeEvent<Spec>) => void;
};

/**
 * This component render a filter dropdown for vehicle spec options.
 * @returns JSX.Element
 */
const SpecFilter = ({ specs, appliedFilter, onChange }: SpecFilterProps) => {
  const { t } = useTranslation();
  const { control, watch } = useForm<IFormInput>();
  const { searchKey } = watch();
  const [selectedSpecs, setSelectedSpecs] = useState<Array<string>>(
    appliedFilter.specs || []
  );

  /**
   * This effect will update user selected values with global filters state data.
   */
  useEffect(() => {
    setSelectedSpecs(appliedFilter.specs || []);
  }, [appliedFilter, setSelectedSpecs]);

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {Spec} event value of model.
   */
  const handleLocalChange = (event: Spec, isSelect: boolean) => {
    if (isSelect) {
      setSelectedSpecs([...(selectedSpecs || []), event.Trim]);
    } else {
      setSelectedSpecs((selectedSpecs || []).filter((x) => x !== event.Trim));
    }
  };

  /**
   * This method is execute while use click on Apply button in small devices. (screen width < 768)
   * @param applyFilter - it indicate user is clicked on either apply button or close button.
   */
  const applySpecFilter = (applyFilter: boolean) => {
    if (applyFilter) {
      onChange({
        item: undefined,
        list: specs.filter((x) =>
          selectedSpecs.some(
            (y) => String(y).toLowerCase() === String(x.Trim).toLowerCase()
          )
        ),
        isSelected: true,
      });
      setSelectedSpecs(appliedFilter.specs || []);
    } else {
      setSelectedSpecs(appliedFilter.specs || []);
    }
  };

  /**
   * This method is executed whenever user click on any spec in dropdown list.
   * @param {Spec} event value of make.
   */
  const handleChange = (event: Spec) => {
    onChange(
      FilterUtils.handleChangeForMultiSelectProps<Spec>(
        event,
        specs || [],
        'specs',
        'Trim',
        appliedFilter
      )
    );
  };

  return (
    <DropdownWithCustomOption
      placeHolderText={t(LabelConstants.SPEC)}
      disabled={!(specs && specs.length > 0)}
    >
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[39rem] flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex md:hidden h-20 border-b items-center justify-center">
              <span className="text-lg font-bold uppercase">
                {t(LabelConstants.SPEC)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  applySpecFilter(false);
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
                  placeholder={t(LabelConstants.SEARCH_SPEC)}
                  className="border-none px-0"
                />
              </div>
              <div className="md:h-[120px] overflow-y-auto">
                <div className="mt-5 pr-2 grid grid-cols-2 md:grid-cols-4 w-full gap-2">
                  {specs
                    .filter(
                      (x: Spec, index: number) =>
                        (!searchKey ||
                          x.Trim.toLowerCase().includes(
                            searchKey.toLowerCase()
                          )) &&
                        index ===
                          specs.findIndex(
                            (o) => x.Trim.toLowerCase() === o.Trim.toLowerCase()
                          )
                    )
                    .sort((a, b) =>
                      a.TrimKey.toLowerCase() > b.TrimKey.toLowerCase() ? 1 : -1
                    )
                    .map((item: Spec) => {
                      const isSelected = CommonUtils.hasItem(
                        item.Trim,
                        selectedSpecs
                      );
                      return (
                        <div
                          key={item.TrimCode}
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
                          <div className="font-bold">{item.Trim}</div>
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
                applySpecFilter(true);
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

export default SpecFilter;
