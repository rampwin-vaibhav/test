import { useTranslation } from 'next-i18next';
import { ProductCatalogueData } from '../../types/models';
import { LabelConstants } from '../../types/i18n.labels';

type OverviewProps = {
  vehicle: ProductCatalogueData | undefined;
};

const ProductCatalogueOverview = ({ vehicle }: OverviewProps) => {
  const { t } = useTranslation();
  return (
    <>
      {vehicle && (
        <div className="border rounded p-4 lg:p-6">
          <p className="text-3xl font-semibold uppercase text-primary">
            {t(LabelConstants.OVERVIEW)}
          </p>
          <div className="flex pt-4 lg:pt-6 flex-wrap gap-y-5">
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.MODEL_YEAR)}</p>
              <p className="pt-1">{vehicle?.Year || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.FUEL_TYPE)}</p>
              <p className="pt-1">{vehicle?.FuelType || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.BODY_STYLE)}</p>
              <p className="pt-1">{vehicle?.BodyType || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">
                {t(LabelConstants.TRANSMISSION)}
              </p>
              <p className="pt-1">{vehicle?.Transmission || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.IMPORTED_BY)}</p>
              <p className="pt-1">{vehicle?.ImportedBy || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">{t(LabelConstants.SUPPLIED_BY)}</p>
              <p className="pt-1">{vehicle?.SuppliedBy || '-'}</p>
            </div>
            <div className="w-1/4">
              <p className="text-dark-gray2">
                {t(LabelConstants.FULFILLED_BY)}
              </p>
              <p className="pt-1">{vehicle?.FulfilledBy || '-'}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
  {
  }
};

export default ProductCatalogueOverview;
