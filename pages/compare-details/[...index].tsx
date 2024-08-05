import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BackIcon, WindowCloseIcon } from '../../components/icons';
import PrivatePageLayout from '../../components/layout/PrivatePageLayout';
import { Features } from '../../components/vehicle-compare/Features';
import { Overview } from '../../components/vehicle-compare/Overview';
import { Specification } from '../../components/vehicle-compare/Specification';
import vehicleCompareService from '../../helpers/services/vehicle.service';
import { CommonUtils, formatNumber } from '../../helpers/utilities';
import { Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { CompareVehicle, Vehicle } from '../../types/models';

const CompareDetails = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const param = router.query.index;
  const [comparedVehicles, setComparedVehicles] = useState<CompareVehicle>();
  const [commonFeatures, setCommonFeatures] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const arrVehicleID: Array<number> = [];
      const len = param?.length;
      if (len)
        for (let i = 0; i < len; i++) {
          arrVehicleID.push(Number(param[i]));
        }

      const fetchVehicle = async () => {
        let temp: Vehicle[] = [];
        let obj = {
          EmptyObj: true,
          VehicleListingId: 0,
          Overview: null,
          Specification: null,
          Features: [],
        };
        temp?.push(obj);

        const vehicles = await vehicleCompareService.compareVehicle({
          LanguageId: CommonUtils.getLanguageId(router.locale!),
          VehicleListingIds: arrVehicleID,
        });

        const vehicleLen = vehicles.Vehicles.length;
        if (vehicleLen < 4) {
          for (let i = 0; i < 4 - vehicleLen; i++) {
            vehicles.Vehicles.push(obj);
          }
        }

        setComparedVehicles(vehicles);
      };

      fetchVehicle();
    }
  }, [router.isReady, param, router.locale]);

  useEffect(() => {
    if (router.query.isBookmark) {
      setIsBookmark(true);
    } else {
      setIsBookmark(false);
    }
  }, [router.query.isBookmark]);

  function showCommonFeatures(event: Event) {
    let checkBox = event.target as HTMLInputElement;
    const isChecked = checkBox.checked;
    setCommonFeatures(isChecked);
  }

  const removeFromCompare = (vehicleID: number) => {
    let arr = param;
    let url = `/${isBookmark ? 'my-bookmarks' : 'cars'}`;
    const newState: CompareVehicle = {
      ...comparedVehicles!,
      Vehicles:
        comparedVehicles?.Vehicles.filter((x) => {
          if (x.VehicleListingId !== vehicleID) return x;
        }) || [],
    };

    let obj = {
      EmptyObj: true,
      VehicleListingId: 0,
      Overview: null,
      Specification: null,
      Features: [],
    };

    newState.Vehicles.push(obj);

    if (arr && Array.isArray(arr)) {
      arr = arr.filter((item) => item !== String(vehicleID));
      if (arr.length >= 2) {
        url = `/compare-details/${arr?.join('/')}${
          isBookmark ? '?isBookmark=true' : ''
        }`;

        router.push(url, undefined, { shallow: true });
      } else {
        url = `/${isBookmark ? 'my-bookmarks' : 'cars'}?compare=${arr[0]}`;
        router.push(url, undefined, { shallow: false });
      }

      setComparedVehicles(newState);
    }
  };

  const addToCompare = () => {
    let arr = param;
    if (arr && Array.isArray(arr)) {
      let url = `/${isBookmark ? 'my-bookmarks' : 'cars'}?compare=${arr?.join(
        ','
      )}`;
      router.push(url, undefined, { shallow: false });
    }
  };

  return (
    <PrivatePageLayout>
      <div className="container gogo-car-compare-page">
        <div className="w-10" onClick={() => router.back()}>
          <BackIcon className="h-10 w-10 cursor-pointer rtl:rotate-180" />
        </div>
        <div className="w-full mt-7 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4">
          {comparedVehicles?.Vehicles.map((_item, _index) => (
            <React.Fragment key={_index}>
              {!_item.EmptyObj ? (
                <div className="relative">
                  <div
                    className="w-full flex flex-col rounded shadow bg-white cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/car-details/${_item.Overview?.VehicleMake.toLowerCase()}/${_item.Overview?.VehicleModel.toLowerCase()}/${
                          _item.VehicleListingId
                        }`
                      )
                    }
                  >
                    <div className="flex items-center justify-center">
                      <picture className="w-full">
                        <img
                          className="rounded-t aspect-[16/9] w-full object-cover"
                          src={
                            _item.Overview?.ArtifactUrlPath ||
                            '/images/default-car.jpg'
                          }
                          alt={_item.Overview?.VehicleModel}
                          onError={(event: any) => {
                            event.target.src = '/images/default-car.jpg';
                            event.onerror = null;
                          }}
                        />
                      </picture>
                    </div>

                    <div className="relative flex flex-col p-2">
                      <div className="text-xl font-bold text-dark-gray1">
                        {`${_item.Overview?.VehicleMake} ${_item.Overview?.VehicleModel}`}
                      </div>
                      <div className="text-xl font-bold text-primary gap-2 flex items-center">
                        <div>{t(_item.Overview?.CurrencySymbol!)}</div>
                        <div>{formatNumber(_item.Overview?.AskingPrice!)}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute right-2 top-2 cursor-pointer z-0"
                    onClick={() => removeFromCompare(_item.VehicleListingId)}
                  >
                    <WindowCloseIcon className="h-5 w-5 cursor-pointer" />
                  </div>
                </div>
              ) : (
                <div className="aspect-[4/3] h-full w-full object-cover flex items-center justify-center rounded shadow bg-white">
                  <a>
                    <div
                      className="box-content h-8 w-auto border-2 border-dark-gray1 rounded cursor-pointer"
                      onClick={() => addToCompare()}
                    >
                      <h1 className="mt-1 text-dark-gray1 text-center px-1">
                        {t(LabelConstants.ADD_TO_COMPARE)}
                      </h1>
                    </div>
                  </a>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex mt-12 relative justify-end">
          <div className="flex items-center justify-end">
            <input
              className="h-5 w-5 cursor-pointer"
              onClick={(e: any) => showCommonFeatures(e)}
              type="checkbox"
            />
            <h1 className="text-base pr-4 ml-4 text-gray-400">
              {t(LabelConstants.HIDE_COMMON_FEATURES)}
            </h1>
          </div>
        </div>

        <Overview
          compareVehicles={comparedVehicles}
          isExpanded={true}
          commonFlag={commonFeatures}
        ></Overview>

        <Specification
          compareVehicles={comparedVehicles}
          isExpanded={true}
          commonFlag={commonFeatures}
        ></Specification>

        <Features
          compareVehicles={comparedVehicles}
          isExpanded={true}
          commonFlag={commonFeatures}
        ></Features>
      </div>
    </PrivatePageLayout>
  );
};

export default CompareDetails;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
