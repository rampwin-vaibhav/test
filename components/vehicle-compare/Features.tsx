import { useTranslation } from 'next-i18next';
import React, { FC, Fragment, ReactElement, useEffect, useState } from 'react';
import { LabelConstants } from '../../types/i18n.labels';
import { CompareVehicle, Vehicle } from '../../types/models/index';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';

type FeaturesProps = {
  compareVehicles?: CompareVehicle;
  isExpanded: boolean;
  commonFlag: boolean;
};

export const Features: FC<FeaturesProps> = ({
  compareVehicles,
  isExpanded,
  commonFlag,
}) => {
  const [openTable, setOpenTable] = useState(true);
  let FeaturesData: Vehicle[] | undefined = compareVehicles?.Vehicles.filter(
    (item) => item.Features.length > 0
  );
  const { t } = useTranslation();

  let availableCategory = compareVehicles?.Vehicles[0].Features;
  let totalCars = FeaturesData && FeaturesData?.length;
  let commonCatID: number[] = [];
  let featureDataObj: any = FeaturesData && FeaturesData[0];

  if (featureDataObj) {
    featureDataObj.Features.map((i: any) => {
      let len = i.FeatureList.length;
      let commonID = 0;
      i.FeatureList.map((j: any) => {
        if (compareVehicles?.CommonFeatureIds.includes(j.FeatureId)) {
          ++commonID;
        }
        if (commonID == len) {
          commonCatID.push(i.FeatureCategoryId);
        }
      });
    });
  }

  const getData = (mainCat: string, subCat: string, carIndex: number) => {
    const fetureSet = FeaturesData && FeaturesData[carIndex];
    const vehicleSet =
      fetureSet &&
      fetureSet.Features.find((itm) =>
        itm.FeatureCategory === mainCat ? itm.FeatureList : null
      );
    const check =
      vehicleSet && vehicleSet.FeatureList.find((c) => c.Feature === subCat);
    return check && check.IsAvailable ? t(LabelConstants.YES) : '-';
  };
  return !(
    commonCatID.length === featureDataObj?.Features.length && commonFlag
  ) ? (
    <div className="shadow">
      <div
        className={
          'bg-white mt-5 cursor-pointer ' + (!openTable ? ' mb-5' : '')
        }
      >
        <div
          className="flex justify-between p-4 items-center"
          onClick={() => setOpenTable(!openTable)}
        >
          <span className="block text-gray-600 text-lg font-bold my-1">
            {t(LabelConstants.FEATURES)}
          </span>
          <div>
            {openTable ? (
              <ArrowUpIcon className="h-4 w-4 " />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
      {openTable && (
        <div className="overflow-x-auto mb-5">
          <table className="table-auto sm:table-fixed w-full bg-white">
            <thead>
              <tr className="table-row">
                <th className="px-4 py-3 ">{t(LabelConstants.FEATURES)}</th>
                {FeaturesData &&
                  FeaturesData.map((name, index) => (
                    <th key={index} className="px-4 py-3 text-ms ">
                      {`${name.Overview?.VehicleMake} ${name.Overview?.VehicleModel}`}
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody className="bg-white">
              {availableCategory &&
                availableCategory.length > 0 &&
                availableCategory.map((item, index) =>
                  !(
                    commonCatID.includes(item.FeatureCategoryId) && commonFlag
                  ) ? (
                    <Fragment key={index}>
                      <tr className="text-dark-gray1 p-4 border" key={index}>
                        <td className="px-4 py-3 text-ms font-semibold">
                          {item.FeatureCategory}
                        </td>
                      </tr>
                      {item.FeatureList &&
                        item.FeatureList.map((data, index) => (
                          <Fragment key={index}>
                            {!commonFlag ? (
                              <tr>
                                <td className="table-data">{data.Feature}</td>
                                {Array(totalCars)
                                  .fill('')
                                  .map((ref, index) => (
                                    <Fragment key={index}>
                                      <td className="px-4 py-3 border uppercase">
                                        {getData(
                                          item.FeatureCategory,
                                          data.Feature,
                                          index
                                        )}
                                      </td>
                                    </Fragment>
                                  ))}
                              </tr>
                            ) : (
                              !compareVehicles?.CommonFeatureIds.includes(
                                data.FeatureId
                              ) && (
                                <tr>
                                  <td className="table-index">
                                    {data.Feature}
                                  </td>
                                  {Array(totalCars)
                                    .fill('')
                                    .map((ref, index) => (
                                      <Fragment key={index}>
                                        <td className="table-data border uppercase">
                                          {getData(
                                            item.FeatureCategory,
                                            data.Feature,
                                            index
                                          )}
                                        </td>
                                      </Fragment>
                                    ))}
                                </tr>
                              )
                            )}
                          </Fragment>
                        ))}
                    </Fragment>
                  ) : (
                    <></>
                  )
                )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};
