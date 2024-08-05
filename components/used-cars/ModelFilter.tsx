import { CommonUtils, FilterUtils } from '../../helpers/utilities';
import { FilterChangeEvent } from '../../types/events';
import { FilterParams, Model } from '../../types/models';
import DropdownWithCustomOption from '../common/DropdownWithCustomOption';
import { useForm } from 'react-hook-form';
import { FormInput } from '../common/Form';
import { CloseIcon, SearchIcon } from '../icons';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { useEffect, useState } from 'react';

interface IFormInput {
  searchKey: string;
}

type ModelFilterProps = {
  models: Array<Model>;
  appliedFilter: FilterParams;
  onChange: (event: FilterChangeEvent<Model>) => void;
};

/**
 * This component render a filter dropdown for vehicle model options.
 * @returns JSX.Element
 */
const ModelFilter = ({ models, appliedFilter, onChange }: ModelFilterProps) => {
  const { t } = useTranslation();
  const { control, watch } = useForm<IFormInput>();
  const { searchKey } = watch();
  const [selectedModels, setSelectedModels] = useState<Array<string>>(
    appliedFilter.models || []
  );

  /**
   * This effect will update user selected values with global filters state data.
   */
  useEffect(() => {
    setSelectedModels(appliedFilter.models || []);
  }, [appliedFilter, setSelectedModels]);

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {Model} event value of model.
   */
  const handleLocalChange = (event: Model, isSelect: boolean) => {
    if (isSelect) {
      setSelectedModels([...(selectedModels || []), event.Model]);
    } else {
      setSelectedModels(
        (selectedModels || []).filter((x) => x !== event.Model)
      );
    }
  };

  /**
   * This method is execute while use click on Apply button in small devices. (screen width < 768)
   * @param applyFilter - it indicate user is clicked on either apply button or close button.
   */
  const applyModelFilter = (applyFilter: boolean) => {
    if (applyFilter) {
      onChange({
        item: undefined,
        list: models.filter((x) =>
          selectedModels.some(
            (y) => String(y).toLowerCase() === String(x.Model).toLowerCase()
          )
        ),
        isSelected: true,
      });
      setSelectedModels(appliedFilter.models || []);
    } else {
      setSelectedModels(appliedFilter.models || []);
    }
  };

  /**
   * This method is executed whenever user click on any model in dropdown list.
   * @param {Model} event value of make.
   */
  const handleChange = (event: Model) => {
    onChange(
      FilterUtils.handleChangeForMultiSelectProps<Model>(
        event,
        models || [],
        'models',
        'Model',
        appliedFilter
      )
    );
  };

  return (
    <DropdownWithCustomOption
      placeHolderText={t(LabelConstants.MODEL)}
      optionClassName="ltr:left-0 rtl:right-0"
      disabled={!(models && models.length > 0)}
    >
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[39rem] flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex md:hidden h-20 border-b items-center justify-center relative">
              <span className="text-lg font-bold uppercase">
                {t(LabelConstants.MODEL)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  applyModelFilter(false);
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
                  placeholder={t(LabelConstants.SEARCH_MODEL)}
                  className="border-none px-0"
                />
              </div>
              <div className="md:h-[120px] overflow-y-auto">
                <div className="mt-5 pr-2 grid grid-cols-2 md:grid-cols-4 w-full gap-2">
                  {models
                    .filter(
                      (x: Model, index: number) =>
                        (!searchKey ||
                          x.Model.toLowerCase().includes(
                            searchKey.toLowerCase()
                          )) &&
                        index ===
                          models.findIndex(
                            (o) =>
                              x.Model.toLowerCase() === o.Model.toLowerCase()
                          )
                    )
                    .sort((a, b) =>
                      a.ModelKey.toLowerCase() > b.ModelKey.toLowerCase()
                        ? 1
                        : -1
                    )
                    .map((item: Model) => {
                      const isSelected = CommonUtils.hasItem(
                        item.Model,
                        selectedModels
                      );
                      return (
                        <div
                          key={item.ModelCode}
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
                          <div className="font-bold">{item.Model}</div>
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
                applyModelFilter(true);
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

export default ModelFilter;
