import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales, PageKey } from '../../../../types/enums';
import { useRouter } from 'next/router';
import { CMSConstants, LabelConstants } from '../../../../types/i18n.labels';
import { useEffect, useState } from 'react';
import ConfigurationService from '../../../../helpers/services/configuration.service';
import { CMSPageKey, CMSConfigurationKey } from '../../../../types/constants';
import Link from 'next/link';
import { CommonUtils } from '../../../../helpers/utilities';
import { Breadcrumb } from '../../../../types/models';
import { ArrowRightIcon } from '../../../../components/icons';
import MetaDataComponent from '../../../../components/PagesMetaData/MetaDataComponent';

type OutletProps = {
  disclaimerTextEn: { [x: string]: string };
  disclaimerTextAr: { [x: string]: string };
  title?: string;
  description?: string;
};

const OutletDescription: NextPage<OutletProps> = ({
  disclaimerTextEn,
  disclaimerTextAr,
  title,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [breadcrumbData, setBreadcrumbData] = useState<Array<Breadcrumb>>([]);

  useEffect(() => {
    const data = CommonUtils.GetPageBreadcrumbs(PageKey.OutletIntro, {});
    setBreadcrumbData(data);
  }, []);

  return (
    <div className="container">
      <MetaDataComponent title={title} description={description} />
      <Head>
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/outlet-introduction.webp`}
          as="image"
        />
      </Head>
      {breadcrumbData ? (
        <div className="flex items-center gap-2 my-4 uppercase">
          <div>
            {breadcrumbData.map((x, i) => (
              <div
                className="text-primary cursor-pointer"
                key={i}
                onClick={() => router.push(x.route)}
              >
                {x.label}
              </div>
            ))}
          </div>
          <div>
            <ArrowRightIcon className="w-3 h-3" />
          </div>
          <div className="text-dark-gray1">
            {t(LabelConstants.OUTLET_OVERVIEW_LABEL)}
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="flex mb-10 flex-col gap-6">
        <picture className="relative flex items-center">
          <picture className="relative flex items-center">
            <img
              src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/outlet-introduction.webp`}
              alt=""
              className="h-[25rem] w-full "
            />
            <div className="absolute flex gap-6 mx-11">
              <div className="w-[0.875rem] h-[5.313rem] bg-warning"></div>
              <p className="font-bold text-[3.625rem] text-white">
                {t(LabelConstants.OUTLET_OVERVIEW)}
              </p>
            </div>
          </picture>
        </picture>
        <p className="text-large whitespace-pre-line" dir="ltr">
          {disclaimerTextEn[CMSConstants.OUTLET_INTRODUCTION]}
        </p>
        <p className="text-large whitespace-pre-line mt-8" dir="rtl">
          {disclaimerTextAr[CMSConstants.OUTLET_INTRODUCTION]}
        </p>
        <div className="flex items-center justify-center">
          <Link href={`/newcars/outlet`}>
            <button className="btn btn-primary !w-[12.5rem] uppercase">
              {t(LabelConstants.GO_GET_STARTED)}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OutletDescription;

export const getStaticProps: GetStaticProps<OutletProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const [disclaimerTextEn, disclaimerTextAr] = await Promise.all([
    await ConfigurationService.fetchCMSCLabelConstant(
      CMSPageKey.Information,
      CMSConfigurationKey.OutletVehiclesIntroduction,
      Locales.EN
    ),
    await ConfigurationService.fetchCMSCLabelConstant(
      CMSPageKey.Information,
      CMSConfigurationKey.OutletVehiclesIntroduction,
      Locales.AR
    ),
  ]);
  const translations = await serverSideTranslations(locale || Locales.EN, [
    'common',
  ]);
  const title =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_TITLE_OUTLET_INTRO;
  const description =
    translations._nextI18Next.initialI18nStore[locale ?? 'en'].common
      .META_DESCRIPTION_OUTLET_INTRO;
  return {
    props: {
      ...translations,
      title,
      description,
      disclaimerTextAr,
      disclaimerTextEn,
    },
    revalidate: 86400, // Revalidate every 1 Day
  };
};
