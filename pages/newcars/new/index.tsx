import {
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
  InferGetStaticPropsType,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales } from '../../../types/enums';
import BrandSearch from '../../../components/newcars/BrandSearch';
import { NewCarService, VehicleService } from '../../../helpers/services';
import { Model, VehicleBrand } from '../../../types/models';
import ModelSearch from '../../../components/newcars/ModelSearch';
import MetaDataComponent from '../../../components/PagesMetaData/MetaDataComponent';
import { LabelConstants } from '../../../types/i18n.labels';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

type NewCarsBrandSearchPageProps = {
  allBrands: Array<VehicleBrand>;
  title?: string;
  description?: string;
};

const NewCarsBrandSearchPage: NextPage<NewCarsBrandSearchPageProps> = ({
  allBrands,
  title,
  description,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { m } = router.query;
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const [models, setModels] = useState<Array<Model> | null>(null);
  const [make, setMake] = useState<VehicleBrand | null>(null);
  const [brandsWithSeqNo, setBrandsWithSeqNo] =
    useState<Array<VehicleBrand> | null>(null);
  const [brands, setBrands] = useState<Array<VehicleBrand> | null>(null);

  useEffect(() => {
    return () => {
      setMake(null);
      setModels(null);
      setBrandsWithSeqNo(null);
      setBrands(null);
    };
  }, []);

  useEffect(() => {
    const { locale } = router;
    const initialData = async () => {
      if (m) {
        let make = allBrands.find(
          (x) => x.MakeKey.toLowerCase() === (m as string)?.toLowerCase()
        );
        if (!make) {
          router.replace('404');
        } else {
          let list = await VehicleService.fetchModelByMake(make.MakeId, locale);
          setMake(make);
          setModels(list);
        }
      } else {
        setBrandsWithSeqNo(
          allBrands
            .filter((x) => x.SequenceNumber !== null)
            ?.sort((a, b) => a.SequenceNumber - b.SequenceNumber)
        );
        setBrands(allBrands.filter((x) => x.SequenceNumber === null));
      }
    };

    initialData();

    return () => {
      setMake(null);
      setModels(null);
      setBrandsWithSeqNo(null);
      setBrands(null);
    };
  }, [allBrands, m, router]);

  if (m) {
    return (
      <>{make ? <ModelSearch make={make} models={models || []} /> : <></>}</>
    );
  }
  return (
    <>
      <MetaDataComponent title={title} description={description} />
      {brandsWithSeqNo != null && brands != null ? (
        <BrandSearch
          brands={brands || []}
          brandsWithSeqNo={brandsWithSeqNo || []}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default NewCarsBrandSearchPage;

export const getStaticProps: GetStaticProps<
  NewCarsBrandSearchPageProps
> = async ({ locale }: GetStaticPropsContext) => {
  const allBrands = await NewCarService.fetchNewCarsMake(locale);
  const currentYear = new Date().getFullYear();
  const translations = await serverSideTranslations(locale || Locales.EN, [
    'common',
  ]);
  const title = translations._nextI18Next.initialI18nStore[
    locale ?? 'en'
  ].common.META_TITLE_NEW_CARS.replaceAll(
    '${replacement}',
    `${currentYear}-${currentYear + 1}`
  );
  const description = translations._nextI18Next.initialI18nStore[
    locale ?? 'en'
  ].common.META_DESCRIPTION_NEW_CARS.replaceAll(
    '${replacement}',
    `${currentYear}-${currentYear + 1}`
  );
  return {
    props: {
      ...translations,
      title,
      description,
      allBrands,
    },
    revalidate: 300, // Revalidate every 5 mins
  };
};
