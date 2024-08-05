import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { Locales } from '../../types/enums';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';
import { NextIcon } from '../icons';
import ConnectModal from './ConnectModal';

const AutoCare = () => {
  const { t } = useTranslation();
  const [showExterior, setShowExterior] = useState(false);
  const [showInterior, setShowInterior] = useState(false);
  const [showUnderChassis, setShowUnderChassis] = useState(false);
  const [showEngineRoom, setShowEngineRoom] = useState(false);
  const [showFinalCheck, setShowFinalCheck] = useState(false);
  const [showGeneralService, setShowGeneralService] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for AutoCare View
    PushDataToGTMWithSubEvents(GTMEvents.AutoCare, GTMSubEvents.ViewedService, {
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
      GTMEvents.AutoCare,
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
    <div className="w-full">
      <div className="dark-gray1 text-base">
        {t(LabelConstants.AUTO_CARE_NOTE)}
      </div>
      <div className="mt-10">
        <div className="mt-4 flex sm:justify-end justify-center mb-5 lg:mb-0">
          <button
            onClick={() => handelBookNow()}
            className="btn btn-primary flex items-center justify-between"
          >
            <div>{t(LabelConstants.BOOK_A_SERVICE_NOW)}</div>
            <NextIcon className="h-4 w-6 rtl:rotate-180" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-4">
          {router.locale === Locales.EN ? (
            <picture>
              <img
                src={'/images/autocare-logo-en.png'}
                alt="img"
                className="autoCareEN mb-4 sm:mb-0 mr-2"
              />
            </picture>
          ) : (
            <picture>
              <img
                src={'/images/autocare-logo-ar.png'}
                alt="img"
                className="autoCareAR mb-4 sm:mb-0 mr-2"
              />
            </picture>
          )}

          <div className="flex justify-between gap-5 flex-wrap font-bold">
            <div className="flex text-gray-600 text-base items-center">
              <div>{t(LabelConstants.I_LABEL)} - </div>
              {t(LabelConstants.INSPECTION)}
            </div>
            <div className="flex text-gray-600 text-base">
              <div>{t(LabelConstants.L_LABEL)} -</div>
              {t(LabelConstants.LUBRICATE)}
            </div>
            <div className="flex text-gray-600 text-base">
              <div>{t(LabelConstants.A_LABEL)} -</div>
              {t(LabelConstants.ADJUST)}
            </div>
            <div className="flex text-gray-600 text-base">
              <div>{t(LabelConstants.TU_LABEL)} -</div>
              {t(LabelConstants.TOP_UP)}
            </div>
            <div className="flex text-gray-600 text-base">
              <div>{t(LabelConstants.C_LABEL)} -</div>
              {t(LabelConstants.CLEAN)}
            </div>
            <div className="flex text-gray-600 text-base">
              <div>{t(LabelConstants.R_LABEL)} -</div>
              {t(LabelConstants.REPLACE)}
            </div>
            <div className="flex text-gray-600 text-base">
              <div>{t(LabelConstants.DO)} -</div>
              {t(LabelConstants.DO)}
            </div>
          </div>
          <div
            className="underline text-red-500 cursor-pointer hidden"
            onClick={() => setOpenModal(true)}
          >
            {t(LabelConstants.CONNECT_AUTO_CARE)}
          </div>
        </div>
        <table
          cellPadding="0"
          className="border-collapse border border-slate-400 w-full"
        >
          <tbody>
            <tr>
              <td colSpan={4}>
                <div
                  onClick={() => setShowExterior(!showExterior)}
                  className="flex items-center relative cursor-pointer"
                >
                  <picture className="w-full">
                    <img
                      className="h-32 main-img w-full"
                      src={'/images/exterior.png'}
                      alt="img"
                    />
                  </picture>
                  <picture>
                    <img
                      className="h-32"
                      src={'/images/dark-vertical.png'}
                      alt="img"
                    />
                  </picture>

                  <div className="w-full flex justify-center absolute">
                    <button className="px-4 py-2 text-xl text-white text-center btn btn-primary cursor-pointer rounded btn-sm">
                      {t(LabelConstants.EXTERIOR)}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            {showExterior && (
              <>
                <tr className="h-16 rounded-3xl text-center text-white">
                  <th
                    colSpan={2}
                    className="w-96 border border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.STANDARD_CHECK)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MINOR_SERVICES)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MAJOR_SERVICES)}
                  </th>
                </tr>
                <tr className="h-10 text-black font-semibold text-center bg-white">
                  <td className="h-10 border border-lighter-gray" colSpan={2}>
                    {t(LabelConstants.FRONT_REAR_WINDSHIELD)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold text-center bg-lighter-gray">
                  <td className="h-10 border border-lighter-gray" colSpan={2}>
                    {t(LabelConstants.ALL_DOOR_HINGES)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-white text-center">
                  <td className="h-10 border border-lighter-gray" colSpan={2}>
                    {t(LabelConstants.HOOD_STAY_LOCK)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td className="h-10 border border-lighter-gray" colSpan={2}>
                    {t(LabelConstants.TRUNK_STAY_LOCK)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-white text-center">
                  <td className="h-10 border border-lighter-gray" colSpan={2}>
                    {t(LabelConstants.SMOKE)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td className="h-10 border border-lighter-gray" colSpan={2}>
                    {t(LabelConstants.FRONT_REAR_WIPER)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td colSpan={4}>
                <div
                  onClick={() => setShowInterior(!showInterior)}
                  className="flex items-center relative cursor-pointer"
                >
                  <picture className="w-full">
                    <img
                      className="h-32 w-full"
                      src={'/images/interior.png'}
                      alt="img"
                    />
                  </picture>
                  <picture>
                    <img
                      className="h-32"
                      src={'/images/dark-vertical.png'}
                      alt="img"
                    />
                  </picture>
                  <div className="w-full flex justify-center absolute">
                    <button className="px-4 py-2 text-xl text-white text-center btn btn-primary cursor-pointer rounded btn-sm">
                      {t(LabelConstants.INTERIOR)}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            {showInterior && (
              <>
                <tr className="h-16 rounded-3xl text-center text-white">
                  <th
                    colSpan={2}
                    className="w-96 border border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.STANDARD_CHECK)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MINOR_SERVICES)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MAJOR_SERVICES)}
                  </th>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.SEAT_BELT)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.AIR_BAGS)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.POWER_WINDOW)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.INTERIOR_LIGHTS)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.PARKING_BRAKE)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.A_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.A_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.WINDSHIELD_WASHER)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.AC_OPERATION)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.AC_GAS)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.AC_FILTER)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.C_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.R_LABEL)}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td colSpan={4}>
                <div
                  onClick={() => setShowUnderChassis(!showUnderChassis)}
                  className="flex items-center relative cursor-pointer"
                >
                  <picture className="w-full">
                    <img
                      src={'/images/underchasis.png'}
                      className="h-32 w-full"
                      alt="img"
                    />
                  </picture>
                  <picture>
                    <img
                      className="h-32"
                      src={'/images/dark-vertical.png'}
                      alt="img"
                    />
                  </picture>
                  <div className="w-full flex justify-center absolute">
                    <button className="px-4 py-2 text-xl text-white text-center btn btn-primary cursor-pointer rounded btn-sm">
                      {t(LabelConstants.UNDER_CHASIS)}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            {showUnderChassis && (
              <>
                <tr className="h-16 rounded-3xl text-center text-white">
                  <th
                    colSpan={2}
                    className="w-96 border border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.STANDARD_CHECK)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MINOR_SERVICES)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MAJOR_SERVICES)}
                  </th>
                </tr>
                <tr className="h-10 text-black font-semibold bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.ENGINE_OIL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.R_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.R_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.ENGINE_NOISE)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.AUTOMATIC_TRANSMISSION)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.R_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.CVT_FLUID)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.COOLENT)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.GEAR_SELECTOR)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.BREAK_PIPE)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.FUEL_LINES)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.STEERING_BOOTS)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.PROPELLER_SHAFTS)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.DRIVE_SHAFT)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.BALL_JOINT)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.L_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.FRONT_REAR_SHOCK)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.FRONT_REAR_SUSPENSION)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.WHEEL_BEARING)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.EXHAUST_PIPE)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.ENGINE_TRANSMISSION)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TRANSFER_BOX)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.R_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TYRE_CONDITION)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.BRAKE_PADEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.FRONT_BRAKE_PAD)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.REAR_BRAKE_PAD)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td colSpan={4}>
                <div
                  onClick={() => setShowEngineRoom(!showEngineRoom)}
                  className="flex items-center relative cursor-pointer"
                >
                  <picture className="w-full">
                    <img
                      className="h-32 w-full"
                      src={'/images/engine-room.png'}
                      alt="img"
                    />
                  </picture>
                  <picture>
                    <img
                      className="h-32"
                      src={'/images/dark-vertical.png'}
                      alt="img"
                    />
                  </picture>
                  <div className="w-full flex justify-center absolute">
                    <button className="px-4 py-2 text-xl text-white text-center btn btn-primary cursor-pointer rounded btn-sm">
                      {t(LabelConstants.ENGINE_ROOM)}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            {showEngineRoom && (
              <>
                <tr className="h-16 rounded-3xl text-center text-white">
                  <th
                    colSpan={2}
                    className="w-96 border border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.STANDARD_CHECK)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MINOR_SERVICES)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MAJOR_SERVICES)}
                  </th>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.BATTERY)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.AIR_FILTER)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.SPARK_PLUGS)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.R_LABEL_100K)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.BRAKE_FLUID)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray"></td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.FUEL_FILTER)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.R_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.POWER_STEERING)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.WINDSHIELD_WASHER_FLUID)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TU_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.DRIVE_BELTS)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.TIMING_BELT)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.R_LABEL_100K)}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td colSpan={4}>
                <div
                  onClick={() => setShowFinalCheck(!showFinalCheck)}
                  className="flex items-center relative cursor-pointer"
                >
                  <picture className="w-full">
                    <img
                      className="h-32 w-full"
                      src={'/images/finalcheck.png'}
                      alt="img"
                    />
                  </picture>
                  <picture>
                    <img
                      className="h-32"
                      src={'/images/dark-vertical.png'}
                      alt="img"
                    />
                  </picture>
                  <div className="w-full flex justify-center absolute">
                    <button className="px-4 py-2 text-xl text-white text-center btn btn-primary cursor-pointer rounded btn-sm">
                      {t(LabelConstants.FINAL_CHECK)}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            {showFinalCheck && (
              <>
                <tr className="h-16 rounded-3xl text-center text-white">
                  <th
                    colSpan={2}
                    className="w-96 border border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.STANDARD_CHECK)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MINOR_SERVICES)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MAJOR_SERVICES)}
                  </th>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.SCANNING_OBD)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.DO)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.DO)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold	bg-white text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.ALL_FLUID_LEVEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.ALL_COVER_CONNECTOR)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.I_LABEL)}
                  </td>
                </tr>
              </>
            )}
            <tr>
              <td colSpan={4}>
                <div
                  onClick={() => setShowGeneralService(!showGeneralService)}
                  className="flex items-center relative cursor-pointer"
                >
                  <picture className="w-full">
                    <img
                      className="h-32 w-full"
                      src={'/images/general -service.png'}
                      alt="img"
                    />
                  </picture>
                  <picture>
                    <img
                      className="h-32"
                      src={'/images/dark-vertical.png'}
                      alt="img"
                    />
                  </picture>
                  <div className="w-full flex justify-center absolute">
                    <button className="px-4 py-2 text-xl text-white text-center btn btn-primary cursor-pointer rounded btn-sm">
                      {t(LabelConstants.GENERAL_SERVICE)}
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            {showGeneralService && (
              <>
                <tr className="h-16 rounded-3xl text-center text-white">
                  <th
                    colSpan={2}
                    className="w-96 border border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.STANDARD_CHECK)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MINOR_SERVICES)}
                  </th>
                  <th
                    colSpan={1}
                    className="border w-36 border-lighter-gray bg-primary"
                  >
                    {t(LabelConstants.MAJOR_SERVICES)}
                  </th>
                </tr>
                <tr className="h-10 text-black font-semibold	 bg-white text-center">
                  <td
                    colSpan={2}
                    className="h-10 border border-lighter-gray"
                  ></td>
                  <td className="h-10 border border-lighter-gray"></td>
                  <td className="h-10 border border-lighter-gray"></td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                  <td colSpan={2} className="h-10 border border-lighter-gray">
                    {t(LabelConstants.CLEANING_POLISHING_VALLETING)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.DO)}
                  </td>
                  <td className="h-10 border border-lighter-gray">
                    {t(LabelConstants.DO)}
                  </td>
                </tr>
                <tr className="h-10 text-black font-semibold bg-white text-center">
                  <td
                    colSpan={2}
                    className="h-10 border border-lighter-gray"
                  ></td>
                  <td className="h-10 border border-lighter-gray"></td>
                  <td className="h-10 border border-lighter-gray"></td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>
      {openModal && (
        <ConnectModal
          closeModal={setOpenModal}
          isModalOpen={openModal}
          route="autoCare"
        />
      )}
    </div>
  );
};
export default AutoCare;
