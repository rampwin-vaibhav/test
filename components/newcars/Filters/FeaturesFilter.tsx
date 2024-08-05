import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { CommonUtils, FilterUtils } from '../../../helpers/utilities';
import { FilterChangeEvent } from '../../../types/events';
import { LabelConstants } from '../../../types/i18n.labels';
import { Feature, FeatureItem, FilterParams } from '../../../types/models';
import DropdownWithCustomOption from '../../common/DropdownWithCustomOption';
import { CloseIcon } from '../../icons';

type FeaturesFilterProps = {
  features: Array<Feature>;
  appliedFilter: FilterParams;
  onChange: (event: FilterChangeEvent<FeatureItem>) => void;
};

/**
 * This component render a filter dropdown for vehicle feature options.
 * @returns JSX.Element
 */
const FeaturesFilter = ({
  features = [],
  appliedFilter,
  onChange,
}: FeaturesFilterProps) => {
  const { t } = useTranslation();
  const [selectedFeatures, setSelectedFeatures] = useState<Array<string>>(
    appliedFilter.features || []
  );

  /**
   * This effect will update user selected values with global filters state data.
   */
  useEffect(() => {
    setSelectedFeatures(appliedFilter.features || []);
  }, [appliedFilter, setSelectedFeatures]);

  /**
   * This method is executed whenever user click on any make in dropdown list for Mobile device where we are forcing user to apply filter with user action on Apply button.
   * @param {FeatureItem} event value of Feature.
   */
  const handleLocalChange = (event: FeatureItem, isSelect: boolean) => {
    if (isSelect) {
      setSelectedFeatures([...(selectedFeatures || []), event.FeatureKey]);
    } else {
      setSelectedFeatures(
        (selectedFeatures || []).filter((x) => x !== event.FeatureKey)
      );
    }
  };

  /**
   * This method is execute while use click on Apply button in small devices. (screen width < 768)
   * @param applyFilter - it indicate user is clicked on either apply button or close button.
   */
  const applyFeaturesFilter = (applyFilter: boolean) => {
    if (applyFilter) {
      onChange({
        item: undefined,
        list: (features.flatMap((x) => x.FeatureList) || []).filter((x) =>
          selectedFeatures.some(
            (y) =>
              String(y).toLowerCase() === String(x.FeatureKey).toLowerCase()
          )
        ),
        isSelected: true,
      });
      setSelectedFeatures(appliedFilter.features || []);
    } else {
      setSelectedFeatures(appliedFilter.features || []);
    }
  };

  /**
   * This method is executed whenever user click on any feature in dropdown list.
   * @param {FeatureItem} event value of feature.
   */
  const handleChange = (event: FeatureItem) => {
    onChange(
      FilterUtils.handleChangeForMultiSelectProps<FeatureItem>(
        event,
        features.flatMap((x) => x.FeatureList) || [],
        'features',
        'FeatureKey',
        appliedFilter
      )
    );
  };

  return (
    <DropdownWithCustomOption
      placeHolderText={t(LabelConstants.FEATURE)}
      optionClassName="ltr:left-0 rtl:right-0"
      buttonClassName="!h-[3.625rem]"
    >
      {({ close }) => (
        <div className="w-full h-screen md:h-auto md:w-[39rem] flex flex-col justify-between">
          <div>
            <div className="flex md:hidden h-20 border-b items-center justify-center relative">
              <span className="text-lg font-bold uppercase">
                {t(LabelConstants.FEATURE)}
              </span>
              <span
                className="absolute h-20 top-0 ltr:right-0 rtl:left-0 flex items-center p-5 cursor-pointer"
                onClick={() => {
                  applyFeaturesFilter(false);
                  close();
                }}
              >
                <CloseIcon />
              </span>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 w-full gap-8 content-center">
              {features.map((category) => (
                <div
                  key={category.FeatureCategoryId}
                  className="flex flex-col gap-2"
                >
                  <div className="uppercase font-bold text-primary">
                    {category.Featurecategory}
                  </div>
                  <div className="flex flex-wrap gap-2 w-full">
                    {category.FeatureList.map((item) => {
                      const isSelected = CommonUtils.hasItem(
                        item.FeatureKey,
                        selectedFeatures
                      );
                      return (
                        <div
                          key={item.FeatureId}
                          className={`filter-item font-bold text-primary hover:bg-hover ${
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
                          {item.Feature}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex md:hidden h-20 items-center justify-center m-5">
            <button
              className="btn btn-primary !w-full"
              onClick={() => {
                applyFeaturesFilter(true);
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

export default FeaturesFilter;
