import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  setLoader,
  updateSelfListingPackageState,
  updateSelfListingStep,
} from '../../../lib/self-listing/selfListing.slice';
import { ListingService, PackageSubscription } from '../../../helpers/services';
import { useRouter } from 'next/router';
import { B2CPackages, Services } from '../../../types/models';
import {
  LabelConstants,
  SelfListingConstants,
} from '../../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import {
  ProductReferenceType,
  ServiceParameterValue,
} from '../../../types/enums';
import { SessionUtils } from '../../../helpers/utilities';
import MessageBox, { MessageBoxType } from '../../common/MessageBox';
import { toast } from 'react-toastify';

const BuyPackage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [allPackages, setAllPackages] = useState<B2CPackages[]>([]);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  const { t } = useTranslation();

  useEffect(() => {
    async function init() {
      dispatch(setLoader(true));
      const response = await ListingService.fetchB2CPackages(router.locale);
      setAllPackages(
        [...response]
          .sort((a, b) => a.SequenceNumber - b.SequenceNumber)
          .slice(1, 4)
      );
      dispatch(setLoader(false));
    }
    init();
  }, [dispatch, router.locale]);

  const tempServices: Array<Services> =
    allPackages[0] && allPackages[0].Service.length > 0
      ? allPackages[0].Service
      : [];
  const sortedServices = [...tempServices]
    .filter((item) => !item.IsVAS)
    .sort((a, b) => a.ServiceSequenceNumber - b.ServiceSequenceNumber);

  const getConfigurationName = (displayText: string | null | undefined) => {
    if (displayText === null || displayText === undefined) {
      return <CrossServiceUnavailableIcon />;
    } else if (
      displayText.toUpperCase() === ServiceParameterValue.Full ||
      displayText.toUpperCase() === ''
    ) {
      return <CheckServiceAvailableIcon />;
    } else {
      return (
        <div className="flex items-center text-[10px] sm:text-[15px] font-normal text-black justify-center h-full text-center py-2">
          {displayText}
        </div>
      );
    }
  };

  const handleBuyB2cPackage = async (pack: B2CPackages) => {
    if (!SessionUtils.isValidSession()) {
      dispatch(
        updateSelfListingStep(SelfListingConstants.SelfListingAuthentication)
      );
    } else {
      const payload = {
        ProductReferenceType: ProductReferenceType.B2CPackage,
        ProductReferenceId: pack.B2CPackageId,
        IsAllowToProceed: true,
      };
      dispatch(setLoader(true));
      const res = await ListingService.addToCart(payload);
      dispatch(setLoader(false));
      if (res.IsSuccess) {
        if (cleverTap) {
          cleverTap.event?.push('sl_plan_selected');
        }
        dispatch(updateSelfListingPackageState(pack));
        dispatch(
          updateSelfListingStep(
            SelfListingConstants.SelfListingConfirmYourDetails
          )
        );
      } else {
        toast.error(res.MessageCode);
      }
    }
  };

  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('sl_plans_page');
    }
  }, [cleverTap]);

  return (
    <>
      {allPackages.length > 0 && (
        <div className="overflow-y-auto h-full pb-4">
          {/* Mobile version */}
          <div className="block sm:hidden">
            <div className="flex p-[16px] w-full items-end justify-evenly shadow-[0px_4px_10px_0px_#0000001F]">
              {allPackages.map((item) => (
                <div key={item.B2CPackageId}>
                  <div className="flex items-center gap-[5px] flex-col">
                    {item.IsRecommended && (
                      <p className="mb-[10px] text-white py-[2px] px-[4px] bg-[#04AA0B] rounded-[2px] ">
                        {t(LabelConstants.RECOMMENDED)}
                      </p>
                    )}
                    <h1 className="text-[15px] font-semibold text-black ">
                      {item.DisplayName}
                    </h1>
                    <div className="text-center ">
                      {item.DisplayPrice.toString() === '0' ? (
                        <>
                          <p className="text-[13px] font-medium text-black ">
                            {t(LabelConstants.COMING_SOON)}
                          </p>
                          <br />
                        </>
                      ) : (
                        <>
                          <p className="text-[13px] font-medium text-black ">
                            {t(LabelConstants.SAR)} {item.DisplayPrice}
                          </p>
                          <p className="text-[10px] font-medium text-[#757575] ">
                            {t(LabelConstants.INCLUSIVE_VAT)}
                          </p>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => handleBuyB2cPackage(item)}
                      disabled={item.DisplayPrice.toString() === '0'}
                      className="text-[13px] disabled:opacity-30 rounded-[8px] font-medium text-white px-[13px] py-[10px] w-[96px] bg-black "
                    >
                      {t(LabelConstants.LBL_BUY)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-y-auto h-[530px] sm:h-[365px] ">
              {sortedServices.map((servItem, index) => (
                <div
                  key={servItem.ServiceId}
                  className={`py-[25px] px-[16px] flex flex-col gap-[10px] items-center ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F8F8F8]'
                  } `}
                >
                  <p className="text-[13px] font-semibold text-black text-center">
                    {servItem.DisplayName}
                  </p>
                  <div className="flex items-center justify-evenly w-full">
                    {allPackages.map((packItem) => {
                      const thisService = packItem.Service.find(
                        (x) => x.ServiceId === servItem.ServiceId
                      );
                      const returnValue = getConfigurationName(
                        thisService?.ServiceAttribute[0]
                          ?.ServiceAttributeDisplayText
                      );
                      return (
                        <div
                          className="w-[96px]"
                          key={`${packItem.B2CPackageId}-${servItem.ServiceId}`}
                        >
                          {returnValue}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Web */}
          <div className="hidden sm:block">
            <div className="mx-auto w-6xl max-w-6xl">
              <div className="grid grid-cols-4 gap-0 border border-black/20 ">
                <div className="p-4 flex items-end border-r border-black/20 bg-white">
                  <h2 className="text-[26px] font-semibold text-black">
                    {t(LabelConstants.FEATURES)}
                  </h2>
                </div>
                {allPackages.map((item, index) => (
                  <div
                    key={item.B2CPackageId}
                    className={`p-4 ${
                      index !== allPackages.length - 1
                        ? 'border-r'
                        : 'rtl:border-r'
                    } border-black/20`}
                  >
                    <div className="flex items-start justify-end h-full gap-[5px] flex-col">
                      {item.IsRecommended && (
                        <p className="mb-[17px] text-[12px] font-medium text-white py-[5px] px-[16px] bg-[#04AA0B] rounded-[2px] ">
                          {t(LabelConstants.RECOMMENDED)}
                        </p>
                      )}
                      <h1 className="text-[26px] mb-[7px] font-bold text-[#212121] ">
                        {item.DisplayName}
                      </h1>
                      <div className="text-center ">
                        {item.DisplayPrice.toString() === '0' ? (
                          <>
                            <p className="text-[20px] font-medium text-black ">
                              {t(LabelConstants.COMING_SOON)}
                            </p>
                          </>
                        ) : (
                          <div className="flex items-end gap-[5px]">
                            <p className="text-[20px] font-medium text-black ">
                              {t(LabelConstants.SAR)} {item.DisplayPrice}
                            </p>
                            <p className="text-[13px] font-medium text-[#757575] ">
                              {t(LabelConstants.INCLUSIVE_VAT)}
                            </p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleBuyB2cPackage(item)}
                        disabled={item.DisplayPrice.toString() === '0'}
                        className="text-[20px] mt-[20px] disabled:opacity-30 rounded-[8px] font-semibold text-white px-[13px] py-[7px] w-full bg-black "
                      >
                        {t(LabelConstants.LBL_BUY)}
                      </button>
                    </div>
                  </div>
                ))}
                {sortedServices.map((servItem, index) => (
                  <React.Fragment key={index}>
                    <div
                      className={`p-4 ${
                        index % 2 === 1 ? 'bg-white' : 'bg-[#F4F4F4]'
                      } text-left border-r border-black/20`}
                    >
                      <p className="text-[15px] font-semibold text-black/70">
                        {servItem.DisplayName}
                      </p>
                    </div>
                    {allPackages.map((packItem) => {
                      const thisService = packItem.Service.find(
                        (x) => x.ServiceId === servItem.ServiceId
                      );
                      const returnValue = getConfigurationName(
                        thisService?.ServiceAttribute[0]
                          ?.ServiceAttributeDisplayText
                      );
                      return (
                        <div
                          key={`${packItem.B2CPackageId}-${servItem.ServiceId}`}
                          className={`p-4 flex ${
                            index % 2 === 1 ? 'bg-white' : 'bg-[#F4F4F4]'
                          } items-center text-[15px] font-normal text-black justify-center border-r border-black/20`}
                        >
                          {returnValue}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyPackage;

export const CheckServiceAvailableIcon = () => (
  <svg
    width="96"
    height="20"
    viewBox="0 0 96 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M42 9.63871L46.2338 14L54 6"
      stroke="#04AA0B"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CrossServiceUnavailableIcon = () => (
  <svg
    width="96"
    height="20"
    viewBox="0 0 96 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M44 6L52 14"
      stroke="#C23C40"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M52 6L44 14"
      stroke="#C23C40"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
