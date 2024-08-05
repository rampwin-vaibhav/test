import { AnimatePresence } from 'framer-motion';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FadeIn } from '../../../components/common/Animations';
import Spinner from '../../../components/common/Spinner/spinner';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../components/icons';
import VasService from '../../../helpers/services/vas.service';
import { CommonUtils } from '../../../helpers/utilities';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  rehydrateWarrantyState,
  updateWarrantyStep,
  WarrantyState,
} from '../../../lib/vas/warranty-flow/warranty.slice';
import { AppTheme } from '../../../types/constants';
import { Locales } from '../../../types/enums';
import { LabelConstants, WarrantyConstants } from '../../../types/i18n.labels';
import { translationsLang } from '../../../utilities/constants';

const ConfirmWarrantyDetails = () => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const query = router.query;
  const dispatch = useAppDispatch();
  const warrantySelector = useAppSelector(({ warranty }) => warranty);
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  useEffect(() => {
    if (cleverTap) {
      cleverTap.event?.push('Payment Confirmation');
    }
  }, [cleverTap]);

  useEffect(() => {
    if (query.p) {
      const rehydratedData = CommonUtils.decodeB64<WarrantyState>(
        query.p as string
      );
      dispatch(rehydrateWarrantyState(rehydratedData));
    } else {
      router.push('/vas/warranty');
    }
  }, [query, dispatch, router]);

  const handlePayNow = () => {
    setLoader(true);
    try {
      const languageId = CommonUtils.encodeB64(
        `${CommonUtils.getLanguageId(router.locale!)}`
      );
      const invoiceId = CommonUtils.encodeB64(`${warrantySelector.invoiceId}`);
      if (warrantySelector.invoiceId === 0) {
        toast.error('Invalid Invoice ID', { position: 'bottom-right' });
        return;
      }
      VasService.getPaymentToken({
        Key: warrantySelector.invoiceId,
        ApplicationKey: 'GGM-Portal',
      }).then((response) => {
        if (response) {
          window.location.href =
            process.env.NODE_ENV === 'development'
              ? `https://po-paymentportal-uat.azurewebsites.net/checkout.aspx?invoiceid=${invoiceId}&languageid=${languageId}`
              : `${process.env.NEXT_PUBLIC_PAYMENT_CHECKOUT_PAGE}?invoiceid=${invoiceId}&languageid=${languageId}`;
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  const handleBack = () => {
    updateWarrantyStep(WarrantyConstants.EnterKmDriven);
    router.push(
      `/vas/warranty/packages?p=${CommonUtils.encode({
        ...warrantySelector,
        showAdditionalInfoModal: false,
      })}`,
      '',
      { shallow: true }
    );
  };
  return (
    <>
      <AnimatePresence>
        {loader && (
          <FadeIn className="h-full w-full flex justify-center items-center bg-black bg-opacity-10 absolute top-0 left-0 backdrop-blur-[2px] z-10">
            <Spinner className="!w-8 !h-8" />
          </FadeIn>
        )}
      </AnimatePresence>
      <div className="relative max-w-full w-full mx-auto bg-white sm:bg-[#F8F7FC] px-[16px] py-[32px] theme-v1 min-h-[calc(100vh-6.75rem)] lg:min-h-[calc(100vh-10.5rem)]">
        <div className="flex items-center mb-4 gap-3">
          <button className="text-2xl font-light">
            <div className="h-4 w-4 cursor-pointer" onClick={handleBack}>
              {router.locale === translationsLang.Arabic ? (
                <ArrowRightIcon className="h-4 w-4 !text-black" />
              ) : (
                <ArrowLeftIcon className="h-4 w-4 !text-black" />
              )}
            </div>
          </button>
          <div className="flex items-center w-full justify-start">
            <h2 className="text-[20px] font-medium ml-2">
              {t('ConfirmYourDetails')}
            </h2>
          </div>
        </div>

        <div className="bg-white border border-black/10 p-4 mx-auto md:w-[328px] rounded-[8px] mb-4">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h3 className="font-medium text-[18px]">
                {warrantySelector.data.brand.brandName}{' '}
                {warrantySelector.data.model.modelName}{' '}
                {warrantySelector.data.model.modelYear}
              </h3>
              <p className="text-black opacity-70 flex items-center gap-2 font-medium text-[13px]">
                <span>
                  {warrantySelector.data.cylinders}{' '}
                  {t(LabelConstants.CYLINDERS)}
                </span>{' '}
                • <span>{warrantySelector.data.cubic_capacity} CC</span> •{' '}
                <span>GCC</span>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-black/10  p-4 mx-auto md:w-[328px] rounded-lg mb-14">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h3 className="font-bold text-[22px] text-primary">
                {warrantySelector.package_data?.DisplayName}
              </h3>
              <p className="text-[#3E3E3E] font-normal text-[13px]">
                {
                  warrantySelector.package_data
                    ?.WarrantyVASPackageAdditionalDetails[0]?.ExtensionName
                }
              </p>
              {/* <button className="text-primary mt-2 flex items-center gap-1.5 font-medium underline text-[11px]">
              Show Details
              <ChevronRightIcon className="w-1.5 h-1.5" stroke="#4c0055" />
            </button> */}
            </div>
          </div>
          <div className="border-t flex flex-col gap-3 border-black/10 pt-3">
            <div className="flex justify-between mb-1">
              <p className="text-[#3E3E3E] text-[12px] font-normal">
                {warrantySelector.package_data?.DisplayName} ({t('1Year')})
              </p>
              {/* <p className="text-black text-[13px] font-normal">SAR 3000.00</p> */}
            </div>
            <div className="flex justify-between mb-1">
              <p className="text-[#3E3E3E] text-[12px] font-normal">
                {
                  warrantySelector.package_data
                    ?.WarrantyVASPackageAdditionalDetails[0]?.ExtensionName
                }
              </p>
              <p className="text-black text-[13px] font-normal">
                SAR{' '}
                {warrantySelector.package_data
                  ?.WarrantyVASPackageAdditionalDetails[0] &&
                  (warrantySelector.package_data?.WarrantyVASPackageAdditionalDetails[0]?.Premium).toFixed(
                    2
                  )}
              </p>
            </div>
            {/* </div> */}
            <div className="border-t border-black/10 mb-1" />
            <div className="flex justify-between mb-1">
              <p className="text-black text-[15px] font-semibold">
                {t('TotalCost')}
              </p>
              <p className="text-black text-[13px] font-semibold">
                SAR{' '}
                {warrantySelector.package_data
                  ?.WarrantyVASPackageAdditionalDetails[0] &&
                  (warrantySelector.package_data?.WarrantyVASPackageAdditionalDetails[0]?.Premium).toFixed(
                    2
                  )}
              </p>
            </div>
          </div>
        </div>

        {/* <div className="bg-black flex items-center sm:rounded-tl-[6px] sm:rounded-tr-[6px] justify-center gap-1 text-white py-1 w-auto sm:w-[321px] -mx-4 sm:mx-auto text-[11px] font-normal text-center">
        The amount is refundable.
        <button className="underline font-medium flex items-center gap-1">
          Learn more
          <ArrowRightIcon className="w-[9.9px] h-[7.2px]" />
        </button>
      </div> */}

        <div className="py-4 px-4 sm:px-0 shadow-[0px_0px_15px_0px_#0000001A] fixed bottom-0 left-0 w-full bg-white">
          <div className="flex justify-between items-center w-full sm:w-[321px] sm:mx-auto">
            <div>
              <h3 className="font-semibold text-[15px]">
                {warrantySelector.package_data?.DisplayName}
              </h3>
              <p className="font-medium text-[13px] text-[#272828]">
                SAR{' '}
                {warrantySelector.package_data
                  ?.WarrantyVASPackageAdditionalDetails[0] &&
                  (warrantySelector.package_data?.WarrantyVASPackageAdditionalDetails[0]?.Premium).toFixed(
                    2
                  )}
              </p>
            </div>

            <button
              className="bg-primary text-white rounded-[60px] w-[152px] h-[48px] text-[15px] font-semibold flex items-center gap-2 justify-center"
              onClick={handlePayNow}
            >
              {t('PayNow')}
              {router.locale === translationsLang.Arabic ? (
                <ArrowLeftIcon className="w-[12px] h-[12px]" />
              ) : (
                <ArrowRightIcon className="w-[12px] h-[12px]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmWarrantyDetails;
export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      applyTheme: AppTheme.V1,
    },
  };
};
