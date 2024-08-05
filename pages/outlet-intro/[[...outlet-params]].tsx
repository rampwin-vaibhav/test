import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../types/enums';
import { useRouter } from 'next/router';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import { useEffect, useState } from 'react';
import ConfigurationService from '../../helpers/services/configuration.service';
import { CMSPageKey } from '../../types/constants';
import Link from 'next/link';
import Head from 'next/head';
import MetaDataComponent from '../../components/PagesMetaData/MetaDataComponent';

type OutletProps = {
  selectedMakeModels: any;
};

const OutletDescription: NextPage<OutletProps> = ({
  selectedMakeModels,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation();
  const router = useRouter();
  const queryStr = router.asPath.split('?')[1];
  const [disclaimerText, setDisclaimerText] = useState<{ [x: string]: string }>(
    {}
  );
  useEffect(() => {
    const initialLoad = async () => {
      const disclaimerTextData =
        await ConfigurationService.fetchCMSCLabelConstant(
          CMSPageKey.Information,
          null,
          router.locale
        );
      setDisclaimerText(disclaimerTextData);
    };
    initialLoad();
  }, [router.locale]);

  return (
    <div className="container my-10 flex flex-col gap-6">
      <Head>
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/outlet-introduction.webp`}
          as="image"
        />
      </Head>
      <div className="relative flex items-center h-[25rem] w-full">
        <img
          src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/outlet-introduction.webp`}
          alt=""
        />
        <div className="absolute flex gap-6 mx-11">
          <div className="w-[0.875rem] h-[5.313rem] bg-warning"></div>
          <p className="font-bold text-[3.625rem] text-white">
            {t(LabelConstants.OUTLET_OVERVIEW)}
          </p>
        </div>
      </div>
      <p className="text-large whitespace-pre-line">
        {disclaimerText[CMSConstants.OUTLET_INTRODUCTION]}
      </p>
      <div className="flex items-center justify-center">
        <button className="btn btn-primary !w-[12.5rem] uppercase">
          {/* It is for navigating to the outlet page */}
          {/* <Link
            href={`/cars${
              queryStr
                ? `?${queryStr}&carType=outlet`
                : selectedMakeModels && selectedMakeModels.length === 1
                ? `/${selectedMakeModels[0]}?carType=outlet`
                : selectedMakeModels && selectedMakeModels.length > 1
                ? `/${selectedMakeModels[0]}-${selectedMakeModels[1]}?carType=outlet`
                : '?carType=outlet'
            }`}
          >
            {t(LabelConstants.GO_GET_STARTED)}
          </Link> */}
          <Link href={`/outlet`}>{t(LabelConstants.GO_GET_STARTED)}</Link>
        </button>
      </div>
    </div>
  );
};
export default OutletDescription;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps<OutletProps> = async ({
  locale,
  params,
}: GetStaticPropsContext) => {
  const { 'outlet-params': outletParams } = params as {
    'outlet-params'?: Array<string>;
  };
  let selectedMakeModels;
  if (outletParams && outletParams.length > 0 && outletParams.length <= 2) {
    const makeModels = outletParams[0];

    if (makeModels) {
      selectedMakeModels = makeModels.split('-');
    }
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      selectedMakeModels: selectedMakeModels || null,
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};
