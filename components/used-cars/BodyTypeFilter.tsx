import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { CommonUtils, FilterUtils } from '../../helpers/utilities';
import { FilterChangeEvent } from '../../types/events';
import { LabelConstants } from '../../types/i18n.labels';
import { BodyType, FilterParams } from '../../types/models';
import DropdownWithCustomOption from '../common/DropdownWithCustomOption';
import { CloseIcon } from '../icons';

type BodyTypeFilterProps = {
  bodyTypes: Array<BodyType>;
  onChange: (event: FilterChangeEvent<BodyType>) => void;
  appliedFilter: FilterParams;
};

/**
 * This component render a filter dropdown for body-type options.
 * @returns JSX.Element
 */
const BodyTypeFilter = ({
  bodyTypes = [],
  appliedFilter,
  onChange,
}: BodyTypeFilterProps) => {
  const { t } = useTranslation();
  const [selectedBodyTypes, setSelectedBodyTypes] = useState<Array<string>>(
    appliedFilter.bodyTypes || []
  );

  /**
   * This effect will update user selected values with global filters state data.
   */
  useEffect(() => {
    setSelectedBodyTypes(appliedFilter.bodyTypes || []);
  }, [appliedFilter, setSelectedBodyTypes]);

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {BodyType} event value of BodyType.
   */
  const handleLocalChange = (event: BodyType, isSelect: boolean) => {
    if (isSelect) {
      setSelectedBodyTypes([...(selectedBodyTypes || []), event.BodyTypeKey]);
    } else {
      setSelectedBodyTypes(
        (selectedBodyTypes || []).filter((x) => x !== event.BodyTypeKey)
      );
    }
  };

  /**
   * This method is execute while use click on Apply button in small devices. (screen width < 768)
   * @param applyFilter - it indicate user is clicked on either apply button or close button.
   */
  const applyBodyTypeFilter = (applyFilter: boolean) => {
    if (applyFilter) {
      onChange({
        item: undefined,
        list: bodyTypes.filter((x) =>
          selectedBodyTypes.some(
            (y) =>
              String(y).toLowerCase() === String(x.BodyTypeKey).toLowerCase()
          )
        ),
        isSelected: true,
      });
      setSelectedBodyTypes(appliedFilter.bodyTypes || []);
    } else {
      setSelectedBodyTypes(appliedFilter.bodyTypes || []);
    }
  };

  /**
   * This method is executed whenever user click on any body type in dropdown list.
   * @param {BodyType} event value of body type.
   */
  const handleChange = (event: BodyType) => {
    onChange(
      FilterUtils.handleChangeForMultiSelectProps<BodyType>(
        event,
        bodyTypes,
        'bodyTypes',
        'BodyTypeKey',
        appliedFilter
      )
    );
  };

  return (
    <DropdownWithCustomOption placeHolderText={t(LabelConstants.BODY_TYPE)}>
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[37.6875rem] flex flex-col justify-between">
          <div>
            <div className="flex md:hidden h-20 border-b items-center justify-center relative">
              <span className="text-lg font-bold uppercase">
                {t(LabelConstants.BODY_TYPE)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  applyBodyTypeFilter(false);
                  close();
                }}
              >
                <CloseIcon />
              </span>
            </div>
            <div className="p-5 grid grid-cols-3 md:grid-cols-5 gap-3">
              {bodyTypes
                .filter((x) => x.IsSearchable)
                .map((item: BodyType) => {
                  const isSelected = CommonUtils.hasItem(
                    item.BodyTypeKey,
                    selectedBodyTypes
                  );

                  return (
                    <div
                      key={item.BodyTypeId}
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
                      <picture className="w-28 h-8 md:w-20 md:h-6">
                        <img
                          src={item.ImageUrlPath}
                          alt={item.BodyTypeKey}
                          className="w-28 h-8 md:w-20 md:h-6"
                        />
                      </picture>
                      <div className="text-center pt-4 md:pt-2">
                        {item.BodyType}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="flex md:hidden h-20 items-center justify-center m-5">
            <button
              className="btn btn-primary !w-full"
              onClick={() => {
                applyBodyTypeFilter(true);
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

export default BodyTypeFilter;
