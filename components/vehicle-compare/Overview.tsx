import { useTranslation } from 'next-i18next';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { formatNumber } from '../../helpers/utilities';
import { LabelConstants } from '../../types/i18n.labels';
import { CompareVehicle } from '../../types/models';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';

type OverviewProps = {
  compareVehicles?: CompareVehicle;
  isExpanded: boolean;
  commonFlag: boolean;
};

export const Overview: FC<OverviewProps> = ({
  compareVehicles,
  isExpanded,
  commonFlag,
}): ReactElement => {
  const [openTable, setOpenTable] = useState(true);
  const { t } = useTranslation();
  let overViewData = compareVehicles?.Vehicles.filter(
    (item) => item.Overview != null
  );
  useEffect(() => {});

  return (
    <div className="shadow">
      <div className={'bg-white mt-5 cursor-pointer shadow'}>
        <div
          className="flex justify-between p-4 items-center"
          onClick={() => setOpenTable(!openTable)}
        >
          <span className="block text-gray-600 text-lg font-bold my-1">
            {t(LabelConstants.OVERVIEW)}
          </span>
          <div>
            {' '}
            {openTable ? (
              <ArrowUpIcon className="h-4 w-4 " />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
          </div>
        </div>
      </div>
      {openTable && (
        <div className="overflow-x-auto ">
          <table className="table-auto sm:table-fixed w-full bg-white">
            <thead>
              <tr className="table-row">
                <th className="px-4 py-3 "> {t(LabelConstants.OVERVIEW)}</th>
                {overViewData &&
                  overViewData.map((name, index) => (
                    <th key={index} className="px-4 py-3 text-lighter-gray">
                      {`${name.Overview?.VehicleMake} ${name.Overview?.VehicleModel}`}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="ext-dark-gray1 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.MODEL)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.VehicleModel || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('VehicleModel') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.MODEL)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.VehicleModel || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.SELLER)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.SellerName || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('SellerName') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.SELLER)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.SellerName || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.KILOMETERS)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {formatNumber(itm.Overview?.OdometerReading!) || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes(
                    'OdometerReading'
                  ) && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.KILOMETERS)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.OdometerReading || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.OWNER)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.Ownership || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('Ownership') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.OWNER)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.Ownership || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.FUEL)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.FuelType || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('FuelType') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.FUEL)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.FuelType || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {' '}
                      {t(LabelConstants.TRANSMISSION)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.Transmission || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('Transmission') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.TRANSMISSION)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.Transmission || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.BODY_STYLE)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.BodyType || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('BodyType') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.BODY_STYLE)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.BodyType || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.LOCATION)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.City || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('City') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.LOCATION)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.City || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.EXTERIOR_COLOR)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.Color || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('Color') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.EXTERIOR_COLOR)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.Color || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-gray-700 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data border">
                      {t(LabelConstants.ORIGIN)}
                    </td>
                    {overViewData &&
                      overViewData.map((itm, index) => (
                        <td
                          key={index}
                          className="px-4 py-3 text-dark-gray1 border"
                        >
                          {itm.Overview?.SpecRegionKey || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('SpecRegionKey') && (
                    <>
                      <td className="table-data border">
                        {t(LabelConstants.ORIGIN)}
                      </td>
                      {overViewData &&
                        overViewData.map((itm, index) => (
                          <td
                            key={index}
                            className="px-4 py-3 text-dark-gray1 border"
                          >
                            {itm.Overview?.SpecRegionKey || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
