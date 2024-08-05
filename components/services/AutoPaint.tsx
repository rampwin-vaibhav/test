import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { BookIcon, CalendarIcon } from '../icons';
import ConnectModal from './ConnectModal';
import { LabelConstants } from '../../types/i18n.labels';
import { useRouter } from 'next/router';
import { Locales } from '../../types/enums';
import { formatNumber, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTMWithSubEvents } from '../../helpers/utilities/gtm';
import { GTMEvents, GTMSubEvents } from '../../types/gtm';

const AutoPaint = () => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = SessionUtils.getUserDetails();

    //Added GTM event for BodyPaint View
    PushDataToGTMWithSubEvents(
      GTMEvents.BodyPaint,
      GTMSubEvents.ViewedService,
      {
        userId: user?.UserId
          ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
          : null,
        languageId: router.locale,
      }
    );
  }, [router.locale]);

  const handelBookNow = () => {
    setOpenModal(true);
    const user = SessionUtils.getUserDetails();

    //Added GTM event for Book Now Click
    PushDataToGTMWithSubEvents(
      GTMEvents.BodyPaint,
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
    <div className="w-full auto-paint-tab">
      <div className="dark-gray1 text-base">
        {t(LabelConstants.AUTO_PAINT_NOTE)}
      </div>
      <div
        className="underline text-red-500 cursor-pointer text-right font-bold hidden"
        onClick={() => setOpenModal(true)}
      >
        {t(LabelConstants.CONNECT_BODY_PAINT)}
      </div>
      <div className="flex flex-col md:flex-row md:gap-0 gap-4 sm:justify-between items-center mt-10">
        {router.locale == Locales.EN ? (
          <picture>
            <img
              src={'/images/bodypaint-logo-en.png'}
              alt="img"
              className="bodyPaintEN"
            />
          </picture>
        ) : (
          <picture>
            <img
              src={'/images/bodypaint-logo-ar.png'}
              alt="img"
              className="bodyPaintAR mb-4 sm:mb-0 mr-2"
            />
          </picture>
        )}

        <div className="rounded-xl flex items-center border border-lighter-gray gap-6 ltr:pl-6 rtl:pr-6">
          <picture className="w-20">
            <img
              src={'/images/body-paint.png'}
              alt="body-paint"
              className="w-20"
            />
          </picture>
          <div className="font-bold text-xs sm:text-base text-dark-gray1 uppercase">
            {t(LabelConstants.GIVE_CAR_NEW_LOOK)}
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
      <div className="mt-8">
        <div className="overflow-x-auto sm:overflow-visible">
          <table
            id="service_table"
            className="border-collapse md:table-fixed table-auto w-full"
          >
            <thead>
              <tr className="h-20 rounded-3xl text-center text-white">
                <th
                  colSpan={2}
                  className="h-10 sm:w-64 border border-lighter-gray rounded-t-xl bg-primary"
                >
                  {t(LabelConstants.DAMAGE_DESCRIPTION)}
                </th>
                <th
                  colSpan={1}
                  className="h-10 sm:w-64 border border-lighter-gray rounded-t-xl bg-primary"
                >
                  {t(LabelConstants.DAMAGE)}
                </th>
                <th
                  colSpan={4}
                  className="h-10 sm:w-64 border border-lighter-gray rounded-t-xl bg-primary"
                >
                  {t(LabelConstants.PRICES)}
                </th>
              </tr>
              <tr className="h-10 text-center bg-dark-gray1 text-white">
                <th className="h-10 sm:w-64 border border-lighter-gray">
                  {t(LabelConstants.PRODUCT)}
                </th>
                <th className="h-10 border sm:w-64 border-lighter-gray">
                  {t(LabelConstants.UNIT)}
                </th>
                <th className="h-10 border sm:w-64 border-lighter-gray">
                  {t(LabelConstants.DAMAGE)}
                </th>
                <th className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ZONE_C)}
                </th>
                <th className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ZONE_B)}
                </th>
                <th className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ZONE_A)}
                </th>
                <th className="h-10 border border-lighter-gray">
                  {t(LabelConstants.PER_ITEM)}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.TO_50_MM)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.TO_100_MM)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.TO_150_MM)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 bg-white text-black font-semibold text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ALLOY_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.REPAIR_FULL)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(350)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ALLOY_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.REPAIR_PARTIAL)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>

              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ALLOY_REPAIR_WHEEL)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.DIAMOND_CUT)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1400)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BUMPER_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.CORNER_CENTER)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(671)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1121)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1301)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(821)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BUMPER_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.CORNER_CENTER)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ADDITIONAL_SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(120)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.FILLER)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.FILLER)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SPLIT_GAUGE_HOLE)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(821)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(821)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(821)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.PANEL_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.DOOR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {` ${formatNumber(971)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1271)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1721)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.EXTERNAL_TRIM_ZONE_C)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(971)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.EXTERNAL_TRIM_ZONE_B)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1271)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.EXTERNAL_TRIM_ZONE_A)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SPLIT_GAUGE_HOLED)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(971)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1271)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1571)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.PANEL_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BOOT_TAILGATE)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1301)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1661)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1841)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 text-black font-semibold border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BOOT_TAILGATE)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.TRIM)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.WHEEL_ARC_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ZONE_ABC)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {` ${formatNumber(1134)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1314)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1494)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.PANEL_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.WING_REAR_QUARTER)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1674)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1854)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(2034)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SILL_FULL)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1494)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SILL_PART)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(2034)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BUFF_POLISH)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BONNET)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(831)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.TOUCH_UP)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BONNET)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.STONE_CHIPS)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1551)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BUFF_POLISH_WAX)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.WHOLE_CAR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.FULL_BODY_BUFF)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(2545)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.GRILL)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(300)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.BOOT_HANDLE)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(250)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.DOOR_MIRROR_COVER)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(175)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.REAR_PARKING_SENSOR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(175)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-white text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.PETROL_CAP)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(125)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.MISC_PAINT_REPAIR)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.DOOR_HANDLE)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.SCUFF_SCRATCH)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(148)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.HEADLAMP_REFURBISHMENT)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.FRONT_HEADLAMP)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.FADED_SUN_UV_DAMAGE)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(576)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.HEADLAMP_REFURBISHMENT_PER_UNIT)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.FRONT_HEADLAMP)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.FADED_SUN_UV_DAMAGE)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(250)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold bg-lighter-gray text-center">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ROOF_RACK)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.ROOF_RACK)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.REPLACE)}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray"></td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1440)}`}
                </td>
              </tr>
              <tr className="h-10 text-black font-semibold text-center bg-white">
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.UNDERNEARTH)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.RUST_TREATMENT_COAT)}
                </td>
                <td className="h-10 border border-lighter-gray">
                  {t(LabelConstants.RUST_TREATMENT)}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(1620)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(2880)}`}
                </td>
                <td className="h-10 border border-lighter-gray" dir="ltr">
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {` ${formatNumber(3510)}`}
                </td>
                <td className="h-10 border border-lighter-gray"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <span className="font-bold">
            {t(LabelConstants.SERVICE_DISCLAIMER)}
          </span>
          {`: ${t(LabelConstants.SERVICE_DIS_DESCRIPTION)}`}
        </div>
      </div>
      {openModal && (
        <ConnectModal
          closeModal={setOpenModal}
          isModalOpen={openModal}
          route="bodyPaint"
        />
      )}
    </div>
  );
};

export default AutoPaint;
