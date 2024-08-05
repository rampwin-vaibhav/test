import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { VehicleService } from '../../helpers/services';
import { CommonUtils, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTM } from '../../helpers/utilities/gtm';
import { GTMEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';
import { CompareVehicle } from '../../types/models';
import { WindowCloseIcon } from '../icons';

type CompareVehiclesProps = {
  compareVehicleIds: Array<string>;
  onCompareChange: (VehicleListingId: string, VehicleData: any) => void;
  clear: () => void;
  isBookmark?: boolean;
};

/**
 * It is compare vehicles component, which loads selected vehicles and links to open compare page.
 * @returns JSX.Element
 */
const CompareVehicles = ({
  compareVehicleIds,
  onCompareChange,
  clear,
  isBookmark = false,
}: CompareVehiclesProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [compareVehicles, setCompareVehicles] = useState<CompareVehicle>();

  /**
   * This callback method is use to fetch vehicle compare details.
   */
  const fetchVehicleCompareDetails = useCallback(async () => {
    if (compareVehicleIds && compareVehicleIds.length > 0) {
      const compareVehicles = await VehicleService.compareVehicle({
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        VehicleListingIds: compareVehicleIds,
      });
      setCompareVehicles(compareVehicles);
    } else {
      setCompareVehicles(undefined);
    }
  }, [router.locale, compareVehicleIds]);

  /**
   * This effect is use to fetch vehicle compare details depends on selected vehicle Ids.
   */
  useEffect(() => {
    fetchVehicleCompareDetails();
    let { compare, ...query } = router.query;
    if (compareVehicleIds && compareVehicleIds.length > 0) {
      query = { ...query, compare: compareVehicleIds.join(',') };
    }

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );

    /**
     * disabled linting warnings for router dependency. not added routed dependency to avoid infinite refresh.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compareVehicleIds, fetchVehicleCompareDetails]);

  const handleCompareClick = (compareVehicles: any) => {
    const user = SessionUtils.getUserDetails();
    const vehicleIds = compareVehicles.Vehicles.map(
      (x: any) =>
        process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + x.VehicleListingId
    ).join(',');

    //Added GTM event for Compare Click
    PushDataToGTM(GTMEvents.CompareClick, {
      userId: user?.UserId
        ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
        : null,
      vehicleListingId: vehicleIds,
      languageId: router.locale,
    });
    router.push(
      `/compare-details/${compareVehicles.Vehicles.map(
        (x: any) => x.VehicleListingId
      ).join('/')}${isBookmark ? '?isBookmark=true' : ''}`
    );
  };

  return (
    <>
      {compareVehicles && (
        <div className="grid grid-cols-4 lg:grid-cols-5 gap-4 items-center">
          {(compareVehicles?.Vehicles || []).map((item) => (
            <div
              key={item.VehicleListingId}
              className="w-full flex justify-center items-center"
            >
              <picture className="relative w-full max-w-[318px]">
                <img
                  src={
                    item.Overview?.ArtifactUrlPath || '/images/default-car.jpg'
                  }
                  className="w-full max-w-[318px] vehicle"
                  alt=""
                  onError={(event: any) => {
                    event.target.src = '/images/default-car.jpg';
                    event.onerror = null;
                  }}
                />
                <div className="absolute top-0 right-0">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      onCompareChange(String(item.VehicleListingId), item)
                    }
                  >
                    <WindowCloseIcon className="h-4 w-4" />
                  </div>
                </div>
              </picture>
            </div>
          ))}
          {compareVehicles?.Vehicles.length < 4
            ? Array(4 - compareVehicles?.Vehicles.length)
                .fill('')
                .map((x, i) => (
                  <div
                    key={i}
                    className="w-full flex justify-center items-center"
                  >
                    <div className="w-full max-w-[318px] border border-dashed border-gray-400 aspect-[16/9]"></div>
                  </div>
                ))
            : null}
          <div className="col-span-4 lg:col-span-1 flex flex-col justify-center gap-2">
            <button
              disabled={compareVehicles.Vehicles.length <= 1}
              className="btn btn-primary btn-sm"
              onClick={() => {
                handleCompareClick(compareVehicles);
              }}
            >
              {t(LabelConstants.COMPARE)}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={clear}>
              {t(LabelConstants.CANCEL)}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CompareVehicles;
