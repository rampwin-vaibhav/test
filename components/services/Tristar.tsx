import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { Locales } from '../../types/enums';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';
import { BookIcon, CalendarIcon, TransmissionsPartsIcon } from '../icons';
import ConnectModal from './ConnectModal';

const Tristar = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Tristar View
    PushDataToGTMWithSubEvents(GTMEvents.Tristar, GTMSubEvents.ViewedService, {
      userId: user?.UserId
        ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
        : null,
      languageId: router.locale,
    });
  }, [router.locale]);

  const handelBookNow = () => {
    setOpenModal(true);
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Book Now Click
    PushDataToGTMWithSubEvents(
      GTMEvents.Tristar,
      GTMSubEvents.BookServiceInitiated,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
  };

  return (
    <div className="tristar-tab w-full">
      <div className="flex flex-col md:flex-row md:gap-0 gap-4 sm:justify-between items-center text-wrap">
        {router.locale == Locales.EN ? (
          <picture>
            <img src={'/images/logo.png'} alt="img" className="bodyPaintEN" />
          </picture>
        ) : (
          <picture>
            <img
              src={'/images/logo-ar.png'}
              alt="img"
              className="bodyPaintAR mb-4 sm:mb-0 mr-2"
            />
          </picture>
        )}

        <div className="rounded-xl flex items-center border border-lighter-gray gap-6 ltr:pl-6 rtl:pr-6">
          <picture>
            <img
              src={'/images/tristar-service.png'}
              alt="body-paint"
              className="sm:w-32 w-16 ml-6"
            />
          </picture>
          <div className="font-bold text-xs sm:text-base text-dark-gray1 uppercase">
            {t(LabelConstants.PETROMIN_TRISTAR)}
          </div>
          <div
            className="flex cursor-pointer h-full bg-primary hover:bg-hover hover:text-primary text-white ltr:rounded-r-lg rtl:rounded-l-lg p-5 gap-2 items-center"
            onClick={() => handelBookNow()}
          >
            <CalendarIcon className="h-4 w-4" />
            <div className="font-bold whitespace-nowrap">
              {t(LabelConstants.BOOK_NOW)}
            </div>
          </div>
        </div>
      </div>
      <div className="dark-gray1 text-base mt-10">
        {t(LabelConstants.TRISTAR_NOTE)}
      </div>
      <div className="tristar mb-32 mt-8">
        <div className="overflow-x-auto sm:overflow-visible">
          <table
            id="tristar_table"
            className="w-full border border-lighter-gray"
          >
            <tbody>
              <tr>
                <td colSpan={2}>
                  <ul className="text-xs sm:text-base list-disc">
                    <li>{t(LabelConstants.RENEWAL_REPAIRS)}</li>
                    <li>{t(LabelConstants.REPAIR_ELECTRICAL)}</li>
                    <li>{t(LabelConstants.MAINTENANCE_REPAIR)}</li>
                    <li>{t(LabelConstants.QUICK_SERVICE_JOB)}</li>
                    <li className="last-border">
                      {t(LabelConstants.FULL_VEHICLE_CHECKUP)}
                    </li>
                  </ul>
                </td>

                <td align="center">
                  <picture>
                    <img
                      src={'/images/tristar-table.png'}
                      alt="table-img"
                      className="tristar-img p-2 sm:p-0"
                    />
                  </picture>
                </td>
              </tr>
              <tr>
                <td rowSpan={2} align="center" className="selling-part">
                  <div className="flex flex-col items-center">
                    <picture>
                      <img
                        src={'/images/selling-parts.png'}
                        alt="SellingParts"
                        className="p-2"
                      />
                    </picture>
                    <ul className="list-disc">
                      <li className="sm:text-xl text-sm font-semibold mt-2 md:mr-10">
                        <span className="text-color">
                          {t(LabelConstants.SELLING_PARTS)}
                        </span>
                      </li>
                    </ul>
                  </div>
                </td>
                <td align="center">
                  <picture>
                    <img
                      src={'/images/engine-parts.png'}
                      alt="EngineParts"
                      className="p-5 sm:p-0"
                    />
                  </picture>
                  <div className="sm:text-xl text-sm text-color font-semibold sm:mt-2">
                    {t(LabelConstants.ENGINE_PARTS)}
                  </div>
                </td>
                <td className="flex flex-col bg-lighter-gray text-xs sm:text-base desc-div">
                  <ul>
                    <li>{t(LabelConstants.CYLINDER_HEADS)}</li>
                    <li>{t(LabelConstants.CYLINDER_HEAD_COVERS)}</li>
                    <li>{t(LabelConstants.CRANCK_SHAFTS)}</li>
                    <li>{t(LabelConstants.CRANK_SHAFT_MOTOR)}</li>
                    <li>{t(LabelConstants.PISTONS)}</li>
                    <li>{t(LabelConstants.ENGINE_OVERHAUL_GASKET)}</li>
                    <li>{t(LabelConstants.OIL_PUMPS)}</li>
                    <li>{t(LabelConstants.INTAKE_MONIFOLF_VALVES)}</li>
                    <li className="last-border">{t(LabelConstants.OILS)}</li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <TransmissionsPartsIcon className="w-40 h-40" />
                  <div className="sm:text-xl text-sm text-color font-semibold sm:mt-2">
                    {t(LabelConstants.TRANSMISSION_PARTS)}
                  </div>
                </td>
                <td className="flex flex-col bg-white text-xs sm:text-base desc-div">
                  <ul>
                    <li>{t(LabelConstants.TORQUE_CONVERTERS)}</li>
                    <li>{t(LabelConstants.COOLERS)}</li>
                    <li>{t(LabelConstants.COMPLETE_REPAIR_KIT)}</li>
                    <li>{t(LabelConstants.BUSHINGS)}</li>
                    <li>{t(LabelConstants.CLUTCHS)}</li>
                    <li>{t(LabelConstants.FILTERS)}</li>
                    <li>{t(LabelConstants.FRICTIONS)}</li>
                    <li>{t(LabelConstants.P_RUBBER_KIT)}</li>
                    <li>{t(LabelConstants.PISTON_KIT)}</li>
                    <li>{t(LabelConstants.FORCE_MOTOR)}</li>
                    <li className="last-border">{t(LabelConstants.OILS)}</li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {openModal && (
        <ConnectModal
          closeModal={setOpenModal}
          isModalOpen={openModal}
          route="triStar"
        />
      )}
    </div>
  );
};

export default Tristar;
