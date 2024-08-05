import { useTranslation } from 'next-i18next';
import React from 'react';
import {
  LabelConstants,
  SelfListingConstants,
} from '../../../types/i18n.labels';
import { useAppSelector } from '../../../lib/hooks';

const PaymentRecieved = () => {
  const { t } = useTranslation();
  const selfListingSelector = useAppSelector((state) => state.selfListing);

  return (
    <div className="h-full sm:pb-[90px] overflow-y-auto">
      <div className="flex flex-col items-center gap-[20px]">
        <svg
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M31 0C13.8909 0 0 13.8909 0 31C0 48.1091 13.8909 62 31 62C48.1091 62 62 48.1091 62 31C62 13.8909 48.1091 0 31 0ZM17.9367 32.5284L25.6247 40.2193C25.8256 40.4202 26.0641 40.5797 26.3266 40.6884C26.5891 40.7972 26.8704 40.8532 27.1546 40.8532C27.4387 40.8532 27.7201 40.7972 27.9825 40.6884C28.245 40.5797 28.4835 40.4202 28.6844 40.2193L44.0633 24.8404C44.4574 24.4327 44.6757 23.8864 44.671 23.3193C44.6664 22.7523 44.4392 22.2097 44.0383 21.8085C43.6375 21.4073 43.0952 21.1796 42.5281 21.1744C41.961 21.1692 41.4146 21.387 41.0065 21.7807L27.156 35.6313L20.9935 29.4716C20.7928 29.2709 20.5545 29.1117 20.2923 29.0031C20.03 28.8945 19.749 28.8386 19.4651 28.8386C19.1813 28.8386 18.9002 28.8945 18.638 29.0031C18.3757 29.1117 18.1375 29.2709 17.9367 29.4716C17.736 29.6723 17.5768 29.9106 17.4682 30.1729C17.3596 30.4351 17.3037 30.7162 17.3037 31C17.3037 31.2838 17.3596 31.5649 17.4682 31.8271C17.5768 32.0894 17.736 32.3277 17.9367 32.5284Z"
            fill="#038700"
          />
        </svg>

        <p className="text-[18px] text-[#272828] font-medium">
          {t(SelfListingConstants.SelfListingPaymentRecieved)}
        </p>
      </div>

      {/* Pack */}
      <div className="p-[14px] my-[25px] mx-[31px] flex flex-col gap-[18px] border rounded-[8px] border-[#E1D3EA] bg-[linear-gradient(112.26deg,rgba(255,255,255,0.5)_12%,rgba(220,204,229,0.265)_64.56%,rgba(180,159,193,0.35)_109.33%)] rtl:bg-[linear-gradient(-112.26deg,rgba(255,255,255,0.5)_12%,rgba(220,204,229,0.265)_64.56%,rgba(180,159,193,0.35)_109.33%)]">
        <div>
          <p className="text-[15px] text-[#272828] font-semibold">
            Platinum Plan
          </p>
          <p className="text-[11px] text-[#A0A0A0] ">Promotion Package</p>
        </div>
        <div className="flex items-center gap-[7px]">
          <p className="text-[12px] font-medium text-[#272828]">SAR 5150.59</p>
          <span className="py-[1px] px-[5px] bg-[#038700] rounded-[9px] flex items-center gap-[3px] text-[10px] text-white">
            <svg
              width="8"
              height="6"
              viewBox="0 0 8 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 2.71271L2.85304 4.5L7 0.5"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
            Paid
          </span>
        </div>
        <button className="text-[11px] w-fit text-[#212121] underline ">
          Check receipt
        </button>
      </div>

      {/* Whats next */}
      <div className="mt-[80px] flex items-center flex-col gap-[15px]">
        <p className="text-[20px] text-[#212121] font-semibold">Whats next</p>
        <p className="text-[15px] w-[230px] text-center text-[#212121]">
          Our team will contact you within 24 hours and assist for further
          process
        </p>
      </div>

      {/* Explore */}
      <div className="absolute scrollbar-none bottom-0 left-0 w-full">
        <div className="py-[15px] bg-white px-[26px] shadow-[0px_0px_15px_0px_#0000001A]">
          <p className="text-[13px] mb-[16px] font-semibold text-black/[54%]">
            {t(LabelConstants.EXPLORE_NEW_CARS_BY_BUDGET)}
          </p>
          <div className="flex items-center gap-[8px] overflow-x-scroll">
            <button className="p-[12px] rounded-[32px] flex-shrink-0 text-[13px] text-black border border-[#B3B3B3] ">
              {t(LabelConstants.EXPLORE_UNDER_75K)}
            </button>
            <button className="p-[12px] rounded-[32px] flex-shrink-0 text-[13px] text-black border border-[#B3B3B3] ">
              {t(LabelConstants.EXPLORE_75K_130K)}
            </button>
            <button className="p-[12px] rounded-[32px] flex-shrink-0 text-[13px] text-black border border-[#B3B3B3] ">
              {t(LabelConstants.EXPLORE_130K_200K)}
            </button>
            <button className="p-[12px] rounded-[32px] flex-shrink-0 text-[13px] text-black border border-[#B3B3B3] ">
              {t(LabelConstants.EXPLORE_200K_250K)}
            </button>
            <button className="p-[12px] rounded-[32px] flex-shrink-0 text-[13px] text-black border border-[#B3B3B3] ">
              {t(LabelConstants.EXPLORE_250K_PLUS)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRecieved;
