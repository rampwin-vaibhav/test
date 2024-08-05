import {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { Locales } from '../../types/enums';
import { VehicleBrand } from '../../types/models';
import { LabelConstants } from '../../types/i18n.labels';
import { SortLetterAtoZIcon, SortLetterZtoAIcon } from '../../components/icons';
import { NewCarService } from '../../helpers/services';
import NewCarBrandLink from '../../components/newcars/NewCarBrandLink';
import BrandSearchInput from '../../components/newcars/BrandSearchInput';
import Head from 'next/head';
import MetaDataComponent from '../../components/PagesMetaData/MetaDataComponent';

type NewCarsBrandSearchPageProps = { title?: string; description?: string };

const NewCarsBrandSearchPage: NextPage<NewCarsBrandSearchPageProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [brands, setBrandsData] = useState<Array<VehicleBrand>>([]);
  const [searchKey, setSearchKey] = useState<string>();
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('ASC');
  const [sortByForIIR, setSortByForIIR] = useState<'ASC' | 'DESC'>('ASC');

  useEffect(() => {
    const init = async () => {
      const data = await NewCarService.fetchNewCarsMake(router.locale);
      setBrandsData(data);
    };

    init();

    return () => {
      setBrandsData([]);
    };
  }, [router.locale]);

  const searchHandler = (searchKey: string) => {
    setSearchKey(searchKey);
  };

  const handleSort = () => {
    setSortBy(sortBy == 'ASC' ? 'DESC' : 'ASC');
  };

  return (
    <>
      <Head>
        <link
          rel="preload"
          href={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/new-car-banner.webp`}
          as="image"
        />
      </Head>
      <MetaDataComponent title={props.title} description={props.description} />
      {brands && brands.length > 0 ? (
        <div className="gogo-new-cars-page">
          <section className="relative flex flex-col justify-center">
            <div className="w-full relative lg:absolute top-0">
              <img
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/new-car-banner.webp`}
                alt="new car"
              />
            </div>
            <div className="container pt-14 flex flex-col gap-y-8 z-10">
              <div className="flex justify-between relative">
                <label className="text-primary text-4xl text-center w-full">
                  {t(LabelConstants.EXPLORE)}{' '}
                  <strong className="uppercase">
                    {t(LabelConstants.NEW_CARS)}
                  </strong>{' '}
                  {t(LabelConstants.BY_BRANDS)}
                </label>
              </div>
              <div className="flex items-center">
                <div className="grow flex justify-center">
                  <div className="w-[70%]">
                    <BrandSearchInput onSearch={searchHandler} />
                  </div>
                </div>
                <div className="w-[6rem]">
                  {!searchKey ? (
                    <div
                      className="cursor-pointer bg-white flex gap-2 rounded-full border shadow-xl justify-center items-center py-1"
                      onClick={() =>
                        setSortBy(sortBy == 'ASC' ? 'DESC' : 'ASC')
                      }
                    >
                      <span className="text-sm leading-none">Sort</span>
                      {sortBy === 'ASC' ? (
                        <SortLetterAtoZIcon className="h-[1.5rem]" />
                      ) : (
                        <SortLetterZtoAIcon className="h-[1.5rem]" />
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-20">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 p-4 justify-evenly justify-items-center content-evenly items-center">
                  {brands
                    .filter((x) => {
                      if (searchKey) {
                        return (
                          !x.DoNotUseBrand &&
                          x.MakeDisplayName.toLowerCase().includes(
                            searchKey.toLowerCase()
                          )
                        );
                      } else {
                        return !x.DoNotUseBrand && x.UseOriginalLogo;
                      }
                    })
                    .sort((a, b) =>
                      sortBy === 'ASC'
                        ? a.MakeDisplayName.localeCompare(b.MakeDisplayName)
                        : b.MakeDisplayName.localeCompare(a.MakeDisplayName)
                    )
                    ?.map((brand, index) => (
                      <NewCarBrandLink
                        key={brand.MakeId}
                        brand={brand}
                        useOriginalLogo={brand.UseOriginalLogo}
                      />
                    ))}
                </div>
                {!searchKey && (
                  <div className="flex flex-col gap-5">
                    <div className="flex w-full justify-end">
                      <div
                        className="cursor-pointer bg-white flex gap-2 rounded-full border shadow-xl justify-center items-center w-[6rem] py-1"
                        onClick={() =>
                          setSortByForIIR(
                            sortByForIIR == 'ASC' ? 'DESC' : 'ASC'
                          )
                        }
                      >
                        <span className="text-sm">Sort</span>
                        {sortByForIIR === 'ASC' ? (
                          <SortLetterAtoZIcon className="h-[1.5rem]" />
                        ) : (
                          <SortLetterZtoAIcon className="h-[1.5rem]" />
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 p-4 justify-evenly justify-items-center content-evenly items-center">
                      {brands
                        .filter((x) => {
                          return !x.DoNotUseBrand && !x.UseOriginalLogo;
                        })
                        .sort((a, b) =>
                          sortByForIIR === 'ASC'
                            ? a.MakeDisplayName.localeCompare(b.MakeDisplayName)
                            : b.MakeDisplayName.localeCompare(a.MakeDisplayName)
                        )
                        ?.map((brand, index) => (
                          <NewCarBrandLink
                            key={brand.MakeId}
                            brand={brand}
                            useOriginalLogo={brand.UseOriginalLogo}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
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
    },
    revalidate: 86400, // Revalidate every 1 Day
  };
};
