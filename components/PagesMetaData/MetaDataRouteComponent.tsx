import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCurrentPageMetaData } from '../../helpers/utilities/metaDataHelper';

type MetaData = {
  title: string;
  description: string;
};
const MetaDataRouteComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [metaData, setMetadata] = useState<MetaData>();
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      console.log('handleRouteChange::', url);
      if (typeof window !== 'undefined') {
        setMetadata(getCurrentPageMetaData(url, t));
      }
    };

    const url = typeof window !== 'undefined' && window?.location?.href;
    if (url) {
      setMetadata(getCurrentPageMetaData(url, t));
    }
    router?.events?.on('routeChangeComplete', handleRouteChange);

    return () => {
      router?.events?.off('routeChangeComplete', handleRouteChange);
    };
  }, [router?.events, t]);
  // console.log('metaData::', metaData);
  return (
    <Head>
      <title key={'page-title'}>{metaData?.title ?? ''}</title>

      <meta
        name="description"
        content={metaData?.description ?? ''}
        key="meta-data-description"
      />
    </Head>
  );
};

export default MetaDataRouteComponent;
