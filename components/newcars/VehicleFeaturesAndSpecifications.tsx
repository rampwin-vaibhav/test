import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { SetStateAction } from 'react';
import { CommonUtils } from '../../helpers/utilities';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { Features, SpecificationItem } from '../../types/models';

type SpecificationProps = {
  specifications: Array<SpecificationItem>;
  features: Array<Features>;
  setShowMoreDataModal: (value: SetStateAction<boolean>) => void;
};

const VehicleFeaturesAndSpecifications = ({
  specifications,
  features,
  setShowMoreDataModal,
}: SpecificationProps) => {
  const router = useRouter();
  const { t } = useTranslation();

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

  return (
    <div className="border rounded p-4 lg:p-6 mt-4 lg:mt-8">
      <p className="text-3xl font-semibold uppercase text-primary">
        {t(LabelConstants.FEATURES_SPECIFICATION)}
      </p>
      {specifications ? (
        <>
          <div className="flex justify-between pt-4 lg:pt-6 flex-wrap pb-4 ">
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.ENGINE)}</p>
              <p className="pt-1">{getSpecValue('Engine')}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.MAX_POWER)}</p>
              <p className="pt-1">{getSpecValue('MaxPower')}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.CYLINDERS)}</p>
              <p className="pt-1">{getSpecValue('Cylinder')}</p>
            </div>
            <div className="w-1/4"></div>
          </div>
        </>
      ) : (
        <></>
      )}
      {features?.length > 0 ? (
        <div className="grid grid-cols-2 pt-4 lg:pt-6 pb-4 border-t">
          {features?.map((feature, index) => {
            if (index <= 3) {
              return (
                <div key={index} className="py-4">
                  <div className="text-dark-gray2 pb-2 break-words">
                    {feature.FeatureCategory}
                  </div>
                  <div>
                    <ul className="list-disc list-inside flex-wrap gap-x-4">
                      {feature.FeatureList &&
                        feature.FeatureList.length > 0 &&
                        feature.FeatureList.map((item, id) => {
                          if (id <= 1) {
                            return (
                              <li key={id} className="leading-loose">
                                <span className="relative ltr:-left-3 rtl:left-2">
                                  {item.Feature}
                                </span>
                              </li>
                            );
                          }
                        })}
                    </ul>
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <></>
      )}

      <button
        className="mt-6 mb-2 text-primary text-base font-bold w-36 h-12 rounded-r rounded-l px-2 text-xl/1.5 cursor-pointer whitespace-nowrap text-center border border-primary uppercase"
        onClick={() => setShowMoreDataModal(true)}
      >
        {t(LabelConstants.VIEW_MORE)}
      </button>
    </div>
  );
};

export default VehicleFeaturesAndSpecifications;
