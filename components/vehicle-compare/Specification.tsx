import { useTranslation } from 'next-i18next';
import React, { FC, ReactElement, useEffect, useState } from 'react';
import { LabelConstants } from '../../types/i18n.labels';
import { CompareVehicle } from '../../types/models/index';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';

type SpecificationProps = {
  compareVehicles?: CompareVehicle;
  isExpanded: boolean;
  commonFlag: boolean;
};
export const Specification: FC<SpecificationProps> = ({
  compareVehicles,
  isExpanded,
  commonFlag,
}) => {
  const [openTable, setOpenTable] = useState(true);
  const { t } = useTranslation();
  let SpecificationData = compareVehicles?.Vehicles.filter(
    (item) => item.Specification != null
  );
  return (
    <div className="shadow">
      <div className={'bg-white mt-5 cursor-pointer '}>
        <div
          className="flex justify-between p-4 items-center"
          onClick={() => setOpenTable(!openTable)}
        >
          <span className="block text-gray-600 text-lg font-bold my-1">
            {t(LabelConstants.SPECIFICATION)}
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
                <th className="px-4 py-3">{t(LabelConstants.SPECIFICATION)}</th>
                {SpecificationData &&
                  SpecificationData.map((name, index) => (
                    <th key={index} className="px-4 py-3 text-ms ">
                      {`${name.Overview?.VehicleMake} 
           ${name.Overview?.VehicleModel}`}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="text-dark-gray1 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data">{t(LabelConstants.ENGINE)}</td>
                    {SpecificationData &&
                      SpecificationData.map((itm, index) => (
                        <td key={index} className="px-4 py-3 text-ms border">
                          {itm.Specification?.EngineSize || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('EngineSize') && (
                    <>
                      <td className="table-data">{t(LabelConstants.ENGINE)}</td>
                      {SpecificationData &&
                        SpecificationData.map((itm, index) => (
                          <td key={index} className="px-4 py-3 text-ms border">
                            {itm.Specification?.EngineSize || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-dark-gray1 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data">
                      {t(LabelConstants.MAX_POWER)}
                    </td>
                    {SpecificationData &&
                      SpecificationData.map((itm, index) => (
                        <td key={index} className="px-4 py-3 text-ms border">
                          {itm.Specification?.Horsepower || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('Horsepower') && (
                    <>
                      <td className="table-data">
                        {t(LabelConstants.MAX_POWER)}
                      </td>
                      {SpecificationData &&
                        SpecificationData.map((itm, index) => (
                          <td key={index} className="px-4 py-3 text-ms border">
                            {itm.Specification?.Horsepower || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-dark-gray1 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data">
                      {t(LabelConstants.DRIVE_TYPE)}
                    </td>
                    {SpecificationData &&
                      SpecificationData.map((itm, index) => (
                        <td key={index} className="px-4 py-3 text-ms border">
                          {itm.Specification?.FinalDrive || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('FinalDrive') && (
                    <>
                      <td className="table-data">
                        {t(LabelConstants.DRIVE_TYPE)}
                      </td>
                      {SpecificationData &&
                        SpecificationData.map((itm, index) => (
                          <td key={index} className="px-4 py-3 text-ms border">
                            {itm.Specification?.FinalDrive || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-dark-gray1 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data">{t(LabelConstants.DOORS)}</td>
                    {SpecificationData &&
                      SpecificationData.map((itm, index) => (
                        <td key={index} className="px-4 py-3 text-ms border">
                          {itm.Specification?.Doors || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('Doors') && (
                    <>
                      <td className="table-data">{t(LabelConstants.DOORS)}</td>
                      {SpecificationData &&
                        SpecificationData.map((itm, index) => (
                          <td key={index} className="px-4 py-3 text-ms border">
                            {itm.Specification?.Doors || '-'}
                          </td>
                        ))}
                    </>
                  )
                )}
              </tr>
              <tr className="text-dark-gray1 p-4">
                {!commonFlag ? (
                  <>
                    <td className="table-data">{t(LabelConstants.SEATS)}</td>
                    {SpecificationData &&
                      SpecificationData.map((itm, index) => (
                        <td key={index} className="px-4 py-3 text-ms border">
                          {itm.Specification?.Seats || '-'}
                        </td>
                      ))}
                  </>
                ) : (
                  !compareVehicles?.CommonFields.includes('Seats') && (
                    <>
                      <td className="table-data">{t(LabelConstants.SEATS)}</td>
                      {SpecificationData &&
                        SpecificationData.map((itm, index) => (
                          <td key={index} className="px-4 py-3 text-ms border">
                            {itm.Specification?.Seats || '-'}
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
