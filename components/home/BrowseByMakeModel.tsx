import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { Brand } from '../../types/models';
import { CollapseArrowIcon, ExpandArrowIcon } from '../icons';
import Link from 'next/link';

type BrowseByMakeModelProps = {
  topBrands: Array<Brand>;
};

const BrowseByMakeModel: NextPage<BrowseByMakeModelProps> = ({ topBrands }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [popularBrands, setPopularBrands] = useState<Array<Brand>>(
    topBrands.slice(0, 9) || []
  );

  useEffect(() => {
    if (!collapse) {
      setPopularBrands(topBrands.slice(0, 9));
    } else {
      setPopularBrands(topBrands);
    }
  }, [collapse, topBrands]);

  return (
    <>
      <div>
        {/* Handle Popular Brand Links on Medium Screen - 3 Columns */}
        <div className="hidden lg:flex flex-col">
          <div className="flex flex-col gap-[1.563rem]">
            {popularBrands
              .reduce((resultArray: Array<Array<Brand>>, item, index) => {
                const chunkIndex = Math.floor(index / 3);
                if (!resultArray[chunkIndex]) {
                  resultArray[chunkIndex] = [];
                }
                resultArray[chunkIndex].push(item);
                return resultArray;
              }, [])
              .map((brands, i) => (
                <div key={i} className="grid grid-cols-3 gap-[28.125rem]">
                  {brands.map((data, i) => (
                    <div
                      key={data.VehicleMakeCode}
                      className="whitespace-nowrap"
                    >
                      <Link
                        href={`${
                          router.locale === Locales.EN
                            ? `/all-listings/?make=${data.VehicleMakeKey?.toLowerCase()}`
                            : `/ar/all-listings/?make=${data.VehicleMakeKey?.toLowerCase()}`
                        }`}
                      >
                        <a className="text-2xl text-dark-gray1 uppercase hover:underline hover:text-heading6">
                          {data.VehicleMake}
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div className="grid grid-cols-3 gap-x-[28.125rem]">
            <div />
            <button
              className="btn btn-primary !text-large btn-sm mt-[3.4375rem] flex justify-center items-center gap-4 !min-w-0 !w-[11.25rem] !h-12"
              onClick={() => setCollapse(!collapse)}
            >
              {collapse
                ? t(LabelConstants.VIEW_LESS)
                : t(LabelConstants.VIEW_MORE)}
              {collapse ? (
                <CollapseArrowIcon className="w-4" />
              ) : (
                <ExpandArrowIcon className="w-4" />
              )}
            </button>
            <div />
          </div>
        </div>

        {/* Handle Popular Brand Links on Medium Screen - 2 Columns */}
        <div className="flex lg:hidden flex-col gap-[1.563rem]">
          {popularBrands
            .reduce((resultArray: Array<Array<Brand>>, item, index) => {
              const chunkIndex = Math.floor(index / 2);
              if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [];
              }
              resultArray[chunkIndex].push(item);
              return resultArray;
            }, [])
            .map((brands, i) => (
              <div key={i} className="grid grid-cols-2 gap-[15rem]">
                {brands.map((data, i) => (
                  <div
                    key={data.VehicleMakeCode}
                    className="whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    <a
                      href={`${
                        router.locale === Locales.EN
                          ? `/all-listings/?make=${data.VehicleMakeKey?.toLowerCase()}`
                          : `/ar/all-listings/?make=${data.VehicleMakeKey?.toLowerCase()}`
                      }`}
                      className="text-2xl text-dark-gray1 uppercase hover:underline hover:text-heading6"
                    >
                      {data.VehicleMake}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          <div className="flex justify-center">
            <button
              className="btn btn-primary !text-large btn-sm mt-[3.4375rem] flex justify-center items-center gap-4 !min-w-0 !w-[11.25rem] !h-12"
              onClick={() => setCollapse(!collapse)}
            >
              {collapse
                ? t(LabelConstants.VIEW_LESS)
                : t(LabelConstants.VIEW_MORE)}
              {collapse ? (
                <CollapseArrowIcon className="w-4" />
              ) : (
                <ExpandArrowIcon className="w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseByMakeModel;
