import { useRouter } from 'next/router';
import { Breadcrumb, Model, VehicleBrand } from '../../types/models';
import React, { useEffect, useMemo, useState } from 'react';
import ModelCard from './ModelCard';
import BannerSlider from './BannerSlider';
import { CommonUtils } from '../../helpers/utilities';
import { Locales, PageKey } from '../../types/enums';
import { ArrowRightIcon } from '../icons';
import MetaDataComponent from '../PagesMetaData/MetaDataComponent';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';

type NewCarBrandModelPageProps = {
  make: VehicleBrand;
  models: Array<Model>;
};

const ModelSearch = ({ make, models }: NewCarBrandModelPageProps) => {
  const router = useRouter();
  const [breadcrumbData, setBreadcrumbData] = useState<Array<Breadcrumb>>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const data = CommonUtils.GetPageBreadcrumbs(PageKey.ListingModel, {});
    setBreadcrumbData(data);
  }, []);

  const metaTitle = useMemo(
    () =>
      t(LabelConstants.META_TITLE_LATEST_MODEL)
        .replaceAll('{brand}', make?.MakeDisplayName ?? '')
        .replaceAll('{year}', new Date().getFullYear().toString()),
    [make?.MakeDisplayName, t]
  );
  const metaDiscription = useMemo(
    () =>
      t(LabelConstants.META_DESCRIPTION_LATEST_MODEL)
        .replaceAll('${replacement}', make?.MakeDisplayName ?? '')
        .replaceAll('{year}', new Date().getFullYear().toString()),
    [make?.MakeDisplayName, t]
  );
  return (
    <>
      {make && (
        <MetaDataComponent title={metaTitle} description={metaDiscription} />
      )}
      <div className="relative">
        {breadcrumbData ? (
          <div className="container flex items-center uppercase text-white  gap-2 mt-4 absolute top-0 left-0 z-10">
            <div className="flex gap-2 items-center">
              {breadcrumbData.map((x, i) => (
                <React.Fragment key={i}>
                  <div
                    className={`cursor-pointer ${
                      (
                        (make.BannerImages || [])?.filter(
                          (x) => x.URL && x.Platform === 'Web'
                        ) || []
                      ).length > 0
                        ? 'text-white'
                        : 'text-primary'
                    }`}
                    onClick={() => router.push(x.route)}
                  >
                    {x.label}
                  </div>
                  <div>
                    <ArrowRightIcon
                      className={`w-3 h-3 ${
                        (make.BannerImages || []).length > 0
                          ? '!text-white'
                          : '!text-primary'
                      }`}
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div
              className={
                (
                  (make.BannerImages || [])?.filter(
                    (x) => x.URL && x.Platform === 'Web'
                  ) || []
                ).length > 0
                  ? '!text-white'
                  : 'text-primary'
              }
            >
              {make?.MakeDisplayName}
            </div>
          </div>
        ) : (
          <></>
        )}
        <BannerSlider
          bannerImages={
            (make.BannerImages || [])
              .filter((x) => x.URL && x.Platform === 'Web')
              ?.map((x) => ({
                ...x,
                URL: `${process.env.NEXT_PUBLIC_Image_CDN_URL}/${x.URL}`,
              })) || []
          }
          title={make?.Title}
          subTitle={make?.SubTitle}
          dir={router.locale === Locales.AR ? 'rtl' : 'ltr'}
        />
      </div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10 bg-lighter-gray">
        {models.map((model) => (
          <ModelCard key={model.ModelId} model={model} make={make} />
        ))}
      </div>
    </>
  );
};

export default ModelSearch;
