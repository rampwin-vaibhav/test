import React, { useCallback, useEffect, useState } from 'react';
import { SpecificationItem, FeatureList, Features } from '../../types/models';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { CommonUtils } from '../../helpers/utilities';
import { useRouter } from 'next/router';
import { Locales } from '../../types/enums';

type SpecificationAndFeatureProps = {
  specifications: Array<SpecificationItem>;
  features: Array<Features>;
};

type CarFeatureAndSpecificationItemType = 'Feature' | 'Specification';

type CarFeatureAndSpecificationItem = {
  type: CarFeatureAndSpecificationItemType;
  categoryId: number;
  item: SpecificationItem | FeatureList;
};

type CommonCategory = {
  type: CarFeatureAndSpecificationItemType;
  CategoryId: number;
  CategoryKey: string;
  Category: string;
};

const SpecificationAndFeatures = ({
  specifications,
  features,
}: SpecificationAndFeatureProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [category, setCategory] = useState<Array<CommonCategory>>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<CommonCategory | null>(null);
  const [data, setData] = useState<Array<CarFeatureAndSpecificationItem>>([]);
  const [searchKey, setSearchKey] = useState(null);

  const prepareData = useCallback(
    (searchKey: string | null) => {
      if (specifications && features) {
        // Create common categories for Feature & Specification
        let filteredFeatures = features.filter(
          (x) =>
            !searchKey ||
            x.FeatureList.some((y) =>
              y.Feature.toLowerCase().includes(searchKey!.toLowerCase())
            )
        );
        let specs = specifications.filter(
          (x) =>
            !searchKey ||
            x.Specification.toLowerCase().includes(searchKey!.toLowerCase())
        );
        let commonCategory: Array<CommonCategory> = [];
        let allList: Array<CarFeatureAndSpecificationItem> = [];

        if (specs && specs.length > 0) {
          specs.forEach((y) => {
            if (
              !commonCategory.find(
                (x) =>
                  x.type === 'Specification' &&
                  x.CategoryId === y.SpecificationCategoryId
              )
            ) {
              commonCategory.push({
                type: 'Specification',
                CategoryId: y.SpecificationCategoryId,
                CategoryKey: y.SpecificationCategoryKey,
                Category: y.SpecificationCategory,
              });
            }

            allList.push({
              type: 'Specification',
              item: y,
              categoryId: y.SpecificationCategoryId,
            });
          });
        }

        if (filteredFeatures && filteredFeatures.length > 0) {
          filteredFeatures.forEach((y) => {
            if (
              !commonCategory.find(
                (x) =>
                  x.type === 'Feature' && x.CategoryId === y.FeatureCategoryId
              )
            ) {
              commonCategory.push({
                type: 'Feature',
                CategoryId: y.FeatureCategoryId,
                CategoryKey: y.FeatureCategoryId.toString(),
                Category: y.FeatureCategory,
              });
            }

            // add filtered features
            allList = allList.concat(
              y.FeatureList.filter(
                (y) =>
                  !searchKey ||
                  y.Feature.toLowerCase().includes(searchKey!.toLowerCase())
              ).map((f) => ({
                type: 'Feature',
                item: f,
                categoryId: y.FeatureCategoryId,
              }))
            );
          });
        }

        setCategory(commonCategory);
        setData(allList);
        setSelectedCategory(commonCategory[0]);
      }
    },
    [specifications, features]
  );

  useEffect(() => {
    if (specifications && features) {
      prepareData(null);
    }
    return () => setSearchKey(null);
  }, [prepareData, specifications, features]);

  React.useEffect(() => {
    const getData = setTimeout(() => {
      prepareData(searchKey);
    }, 500);
    return () => clearTimeout(getData);
  }, [prepareData, searchKey]);

  const handleSearch = (e: any) => {
    if (e.target.value?.trim().length > 0) {
      setSearchKey(e.target.value);
    } else {
      setSearchKey(null);
    }
  };

  const getSpecValue = (key: string) => {
    let result = null;
    const specs = specifications;
    if (specs && specs.length > 0) {
      const spec = specs.find((x) => x.SpecificationKey === key);

      result = spec?.Values?.find(
        (x) => x.LanguageId === CommonUtils.getLanguageId(router.locale!)
      )?.SpecificationValue;

      if (result) {
        result = spec?.Values?.find(
          (x) => x.LanguageId === CommonUtils.getLanguageId(Locales.EN)
        )?.SpecificationValue;
      }
    }
    return result || '-';
  };

  const getUnitOfMeasure = (item: SpecificationItem) => {
    let result = null;
    result = item?.UnitOfMeasure?.find(
      (x) => x.LanguageId === CommonUtils.getLanguageId(router.locale!)
    )?.Value;
    if (result) {
      result = item?.UnitOfMeasure?.find(
        (x) => x.LanguageId === CommonUtils.getLanguageId(Locales.EN)
      )?.Value;
    }

    return result || '';
  };

  const getSpecificationItem = (item: SpecificationItem) => {
    return (
      <div className="flex justify-between p-4 border border-l-0">
        <span>{item?.Specification}</span>
        <div className="flex gap-2">
          <span>{getSpecValue(item.SpecificationKey)}</span>
          {item?.Values?.length! > 0 ? (
            <span>{getUnitOfMeasure(item)}</span>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const getFeatureItem = (item: FeatureList) => {
    return (
      <div className="flex justify-between p-4 border">
        <span>{item?.Feature}</span>
      </div>
    );
  };

  return (
    <div className="border rounded p-4 lg:p-6 mt-4 lg:mt-8">
      <div className="flex gap-4 items-center">
        <p className="uppercase text-3xl text-primary font-semibold">
          {t(LabelConstants.FEATURES_SPECIFICATION)}
        </p>
      </div>
      <div className="flex flex-row border-l-[1px] my-8 w-13/12">
        <div className="w-80">
          {category.map((x, i) => (
            <div
              className={`flex justify-between border-l-[6px] p-5 border hover:bg-light-gray items-center cursor-pointer text-lg ${
                selectedCategory?.type === x.type &&
                selectedCategory?.CategoryId === x.CategoryId
                  ? 'border-l-primary text-primary font-bold bg-lighter-gray'
                  : 'border-l-transparent'
              }`}
              onClick={(e) => {
                setSelectedCategory(x);
              }}
              key={i}
            >
              <span>{x.Category}</span>
            </div>
          ))}
        </div>
        <div className="w-3/4 border-l rtl:border-r">
          {data
            .filter(
              (x) =>
                x.type === selectedCategory?.type &&
                x.categoryId === selectedCategory.CategoryId
            )
            .map((x, i) => (
              <React.Fragment key={i}>
                {x.type === 'Feature'
                  ? getFeatureItem(x.item as FeatureList)
                  : getSpecificationItem(x.item as SpecificationItem)}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SpecificationAndFeatures;
