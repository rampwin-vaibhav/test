import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { SortLetterAtoZIcon, SortLetterZtoAIcon } from '../icons';
import { useState } from 'react';
import { VehicleBrand } from '../../types/models';
import BrandSearchInput from './BrandSearchInput';
import NewCarBrandLink from './NewCarBrandLink';
import Image from 'next/image';

const BrandSearch = ({
  brands,
  brandsWithSeqNo,
}: {
  brands: Array<VehicleBrand>;
  brandsWithSeqNo: Array<VehicleBrand>;
}) => {
  const { t } = useTranslation();
  const [searchKey, setSearchKey] = useState<string>();
  const [sortBy, setSortBy] = useState<'ASC' | 'DESC'>('ASC');
  const [sortByForIIR, setSortByForIIR] = useState<'ASC' | 'DESC'>('ASC');

  const searchHandler = (searchKey: string) => {
    setSearchKey(searchKey);
  };

  return (
    <>
      {(brands && brands.length > 0) || brandsWithSeqNo?.length > 0 ? (
        <div className="gogo-new-cars-page">
          <section className="relative flex flex-col justify-center">
            <picture className="w-full relative lg:absolute top-0">
              <Image
                src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/new-car-banner.webp`}
                alt="new car"
                priority={true}
                width={1920}
                height={660}
                className="w-full h-auto object-cover"
                loading="eager"
                unoptimized={true}
              />
            </picture>
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
                  {!searchKey &&
                  brands.filter((x) => {
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
                  }).length > 0 ? (
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
                  {brandsWithSeqNo
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
                    ?.map((brand, index) => (
                      <NewCarBrandLink
                        key={brand.MakeId}
                        brand={brand}
                        useOriginalLogo={brand.UseOriginalLogo}
                      />
                    ))}
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
                {!searchKey &&
                brands.filter((x) => {
                  return !x.DoNotUseBrand && !x.UseOriginalLogo;
                }).length > 0 ? (
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
                      {brandsWithSeqNo
                        .filter((x) => {
                          return !x.DoNotUseBrand && !x.UseOriginalLogo;
                        })
                        ?.map((brand, index) => (
                          <NewCarBrandLink
                            key={brand.MakeId}
                            brand={brand}
                            useOriginalLogo={brand.UseOriginalLogo}
                          />
                        ))}
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
                ) : (
                  <></>
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

export default BrandSearch;
