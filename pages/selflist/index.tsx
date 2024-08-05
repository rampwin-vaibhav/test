import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ConfigurationKey, Locales } from '../../types/enums';
import { useRouter } from 'next/router';
import ConfigurationService from '../../helpers/services/configuration.service';
import {
  OneNumber,
  TwoNumber,
  ThreeNumber,
  FourNumber,
  FiveNumber,
  OneNumberAr,
  TwoNumberAr,
  ThreeNumberAr,
  FourNumberAr,
  FiveNumberAr,
} from '../../components/icons';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalSize,
} from '../../components/common/Modal';
import { isMobile, isIOS, isAndroid } from 'react-device-detect';

const Selflist = () => {
  const [openDownlaodModal, setOpenDownloadModal] = useState(false);
  const { t } = useTranslation();
  const router = useRouter();

  const handleClick = async () => {
    const promotionCodeValue =
      await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.PromotionCodeForSelfListCampaign,
        router.locale
      );
    const promotionCodeId = await ConfigurationService.fetchConfigurationValue(
      ConfigurationKey.PromotionCodeForSelfListPackageId,
      router.locale
    );

    if (promotionCodeValue && promotionCodeValue.ConfigurationValue) {
      localStorage.setItem(
        ConfigurationKey.SelfListPromotionCodeForCampaignUser,
        promotionCodeValue.ConfigurationValue
      );
    }
    if (promotionCodeId && promotionCodeId.ConfigurationValue) {
      localStorage.setItem(
        ConfigurationKey.SelfListPackageIdForCampaignUser,
        promotionCodeId.ConfigurationValue
      );
    }
    if (
      promotionCodeValue &&
      promotionCodeValue.ConfigurationValue &&
      promotionCodeId &&
      promotionCodeId.ConfigurationValue
    ) {
      if (!isMobile) {
        router.push(
          `/sell-it-for-me?mode=sell&packageid=${promotionCodeId.ConfigurationValue}&promocode=${promotionCodeValue.ConfigurationValue}`
        );
      } else {
        let now = new Date().valueOf();

        setTimeout(function () {
          if (new Date().valueOf() - now > 100) return;
          window.location.href =
            process.env.NEXT_PUBLIC_STORE_QR_CREATOR_URL || '';
        }, 25);

        window.location.href =
          router.locale === Locales.EN
            ? `gogomotor://sell-it-for-me?mode=sell&packageid=${promotionCodeId.ConfigurationValue}&promocode=${promotionCodeValue.ConfigurationValue}`
            : `gogomotor://ar/sell-it-for-me?mode=sell&packageid=${promotionCodeId.ConfigurationValue}&promocode=${promotionCodeValue.ConfigurationValue}`;
      }
    }
  };

  const handleDownload = () => {
    if (!isMobile) {
      setOpenDownloadModal(true);
    } else {
      window.open(process.env.NEXT_PUBLIC_STORE_QR_CREATOR_URL, '_blank');
    }
  };

  return (
    <>
      <div className="new-campaign text-dark-gray1">
        <div className="md:px-[2.5rem]">
          <div className="placeholder">
            <picture className="h-full w-full">
              <img
                src={`${
                  process.env.NEXT_PUBLIC_Image_CDN_URL
                }/CMS/Campaign/GGMFreeSelfList/${router.locale?.toLowerCase()}/web-banner.webp`}
                alt="campaign-image"
                className="h-full w-full object-fill"
              />
            </picture>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="md:my-20 my-10 md:text-[3.125rem] text-3xl text-primary w-[23rem] md:w-full font-bold flex items-center justify-center text-center md:!leading-[4.5rem] !leading-[3rem]">
            <h1
              className="w-[68.875rem]"
              dangerouslySetInnerHTML={{
                __html: t(LabelConstants.MAIN_HEADING),
              }}
            ></h1>
          </div>
        </div>
        <div className="flex flex-col gap-36 text-3xl">
          <div
            className={`flex md:flex-row flex-col gap-3 lg:h-[440px] items-center justify-center w-full md:px-[8.6rem] px-[4rem]`}
          >
            <div className="flex flex-col md:gap- gap-3 justify-center md:w-1/2 w-full">
              <div className="flex flex-row gap-10 items-center">
                <div>
                  {router.locale === Locales.EN ? (
                    <OneNumber className="md:w-16 w-8 h-32" />
                  ) : (
                    <OneNumberAr className="md:w-16 w-8 h-32" />
                  )}
                </div>
                <div>
                  <h1
                    className={`lg:text-5xl text-3xl text-black lg:!leading-[4.125rem] !leading-[3rem] font-bold ${
                      router.locale === Locales.EN ? 'w-3/4' : 'w-full'
                    }  xl:w-[26.938rem]`}
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.DOWNLOAD_APP),
                    }}
                  ></h1>
                </div>
              </div>
              <div className="md:!leading-[3.125rem] text-black font-light leading-8 text-lg md:text-xl lg:text-3xl w-full">
                <span>{t(LabelConstants.QR_SCAN)}</span>
                <span
                  className="text-gradient underline cursor-pointer"
                  onClick={handleDownload}
                >
                  {t(LabelConstants.DOWNLOAD_OUR_APP)}
                </span>
                <span>{t(LabelConstants.GET_STARTED)}</span>
              </div>
            </div>
            <div className="md:w-1/2 w-full h-full">
              <picture>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMFreeSelfList/${router.locale?.toLowerCase()}/mobile-qr-code.png`}
                  alt="img"
                  className="md:max-w-[48.75rem] h-full w-full aspect-[431/278] object-contain"
                />
              </picture>
            </div>
          </div>
          <div
            className={`flex md:flex-row gap-3 flex-col-reverse items-center justify-center w-full md:px-[8.6rem] px-[4rem]`}
          >
            <div className="md:w-1/2 w-full">
              <picture>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMFreeSelfList/${router.locale?.toLowerCase()}/package.png`}
                  alt="img"
                  className="md:max-w-[46.125rem] w-full aspect-[779/673] object-contain"
                />
              </picture>
            </div>
            <div className="flex flex-col md:gap-12 gap-3 justify-items-end items-center md:w-1/2 w-full">
              <div
                className={`flex flex-row gap-10 items-center ${
                  router.locale === Locales.EN
                    ? 'md:justify-end justify-start'
                    : 'justify-start'
                } w-full`}
              >
                <div>
                  {router.locale === Locales.EN ? (
                    <TwoNumber className="md:w-28 w-14 h-32" />
                  ) : (
                    <TwoNumberAr className="md:w-28 w-14 h-32" />
                  )}
                </div>
                <div>
                  <h1
                    className="lg:text-5xl text-3xl text-black lg:!leading-[4rem] !leading-[3rem] font-bold xl:w-[22.5rem] w-full"
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.SILVER_PACKAGE_HEADING),
                    }}
                  ></h1>
                </div>
              </div>
              <div
                className={`flex w-full justify-start ${
                  router.locale === Locales.EN ? 'justify-end' : 'justify-start'
                }`}
              >
                <p className="md:!leading-[3.125rem] text-black font-light leading-8 text-lg md:text-xl lg:text-3xl w-full md:w-[38.313rem] flex justify-start md:text-right">
                  {t(LabelConstants.SILVER_PACKAGE_TEXT)}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`flex md:flex-row gap-3 flex-col lg:h-[440px] items-center justify-center w-full md:px-[8.6rem] px-[4rem]`}
          >
            <div className="flex flex-col md:gap-12 gap-3 justify-center md:w-1/2 w-full">
              <div className="flex flex-row gap-10 items-center">
                <div>
                  {router.locale === Locales.EN ? (
                    <ThreeNumber className="md:w-28 w-14 h-32" />
                  ) : (
                    <ThreeNumberAr className="md:w-28 w-14 h-32" />
                  )}
                </div>
                <div>
                  <h1
                    className={`lg:text-5xl text-3xl text-black lg:!leading-[3.975rem] !leading-[3rem] font-bold ${
                      router.locale === Locales.EN ? 'w-7/12' : 'w-full'
                    } xl:w-[21.9rem]`}
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.PROMO_CODE_HEADING),
                    }}
                  ></h1>
                </div>
              </div>
              <div className="md:!leading-[3.063rem] text-black font-light leading-8 text-lg md:text-xl lg:text-3xl w-full">
                {t(LabelConstants.PROMO_CODE_TEXT)}
              </div>
            </div>
            <div
              className={`md:w-1/2 w-full h-full flex ${
                router.locale === Locales.EN ? 'justify-end' : 'justify-start'
              }`}
            >
              <picture>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMFreeSelfList/${router.locale?.toLowerCase()}/order-summary.png`}
                  alt="img"
                  className="md:max-w-[44.375rem] w-full h-full aspect-[356/225] object-contain"
                />
              </picture>
            </div>
          </div>
          <div
            className={`flex md:flex-row gap-3 flex-col-reverse items-center justify-center w-full md:px-[8.6rem] px-[2rem]`}
          >
            <div className="md:w-1/2 w-full">
              <picture>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMFreeSelfList/${router.locale?.toLowerCase()}/campaign-car.png`}
                  alt="img"
                  className="md:max-w-[44.438rem] w-full aspect-[553/303] object-contain"
                />
              </picture>
            </div>
            <div className="flex flex-col md:gap-12 gap-3 justify-end items-center md:w-1/2 w-full">
              <div
                className={`flex flex-row gap-10 items-center ${
                  router.locale === Locales.EN
                    ? 'md:justify-end justify-start'
                    : 'justify-start'
                } w-full`}
              >
                <div>
                  {router.locale === Locales.EN ? (
                    <FourNumber className="md:w-28 w-14 h-32" />
                  ) : (
                    <FourNumberAr className="md:w-28 w-14 h-32" />
                  )}
                </div>
                <div>
                  <h1
                    className={`lg:text-5xl text-3xl text-black lg:!leading-[4.188rem] !leading-[3rem] font-bold xl:w-[17.5rem] ${
                      router.locale === Locales.EN ? 'w-7/12' : 'w-full'
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.CAR_DETAILS_HEADING),
                    }}
                  ></h1>
                </div>
              </div>
              <div
                className={`flex w-full justify-start ${
                  router.locale === Locales.EN ? 'justify-end' : 'justify-start'
                }`}
              >
                <p className="w-full md:!leading-[3.063rem] text-black font-light leading-8 text-lg md:text-xl lg:text-3xl md:text-right md:w-[46.875rem]">
                  {t(LabelConstants.CAR_DETAILS_TEXT)}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`flex md:flex-row gap-3 flex-col  items-center justify-center w-full lg:h-[440px] md:px-[8.6rem] px-[4rem]`}
          >
            <div className="flex flex-col md:gap-12 gap-3 justify-center md:w-1/2 w-full">
              <div className="flex flex-row gap-10 items-center">
                <div>
                  {router.locale === Locales.EN ? (
                    <FiveNumber className="md:w-28 w-14 h-32" />
                  ) : (
                    <FiveNumberAr className="md:w-28 w-14 h-32" />
                  )}
                </div>

                <div>
                  <h1
                    className={`lg:text-5xl text-3xl text-black lg:!leading-[3.875rem] !leading-[3rem] font-bold ${
                      router.locale === Locales.EN ? 'w-full' : 'w-full'
                    } xl:w-[23.9rem]`}
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.UPLOAD_PICTURE_HEADING),
                    }}
                  ></h1>
                </div>
              </div>
              <div className="md:!leading-[3.063rem] font-light text-black leading-8 text-lg md:text-xl lg:text-3xl w-full">
                {t(LabelConstants.UPLOAD_PICTURE_TEXT)}
              </div>
            </div>
            <div
              className={`md:w-1/2 w-full h-full flex ${
                router.locale === Locales.EN ? 'justify-end' : 'justify-start'
              }`}
            >
              <picture className="w-full">
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMFreeSelfList/${router.locale?.toLowerCase()}/mobile-app.png`}
                  alt="img"
                  className="md:max-w-[44.375rem] w-full h-full aspect-[356/225] object-contain"
                />
              </picture>
            </div>
          </div>
          <div className="flex flex-col gap-16 w-full items-center justify-center text-center mb-20 md:px-[8.6rem]">
            <div className="flex flex-col gap-4">
              <h1 className="md:text-[2.75rem] text-3xl md:leading-[4rem] leading-[2.5rem] text-primary font-bold">
                {t(LabelConstants.NEED_TO_KNOW_TEXT)}
              </h1>
              <p className="md:text-xl text-xl text-black">
                {t(LabelConstants.ONE_CLICK_AWAY)}
              </p>
            </div>
            <div>
              <button
                className="cursor-pointer px-5 py-4 w-full flex items-center justify-center  md:!h-[5.313rem] h-12 whitespace-nowrap md:!text-[1.438rem] text-base text-center text-white font-bold bg-gradient rounded uppercase"
                onClick={() => handleClick()}
              >
                <span>{t(LabelConstants.GET_STARTED_NOW)}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-grey-color">
          <div className="w-full flex flex-col items-center gap-9 justify-center md:px-[8.6rem] px-[4rem]">
            <div className="bg-white rounded-[1.25rem] mt-[4.938rem] xl:w-[76.875rem] w-full">
              <div className="flex flex-col gap-6 py-7 px-10">
                <h1 className="md:text-[2rem] text-black text-[1.375rem] font-bold">
                  {t(LabelConstants.GOGO_MOTOR_CRITERIA)}
                </h1>
                <div className="inspection_point md:text-[1.438rem] text-baltic-sea text-base md:leading-[2.25rem] leading-7">
                  <p>{t(LabelConstants.GOGOMOTOR_LIST_CAR_TEXT)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[1.25rem] xl:w-[76.875rem] w-full">
              <div className="flex flex-col py-7 px-10">
                <h1 className="md:text-[2rem] text-black text-[1.375rem]  font-bold">
                  {t(LabelConstants.GOGOMOTOR_SALE_HEADING)}
                </h1>
                <div
                  className={`${
                    router.locale === Locales.EN
                      ? 'inspection_point_en'
                      : 'inspection_point_ar'
                  } md:text-[1.438rem] text-base md:leading-9 leading-7 text-baltic-sea`}
                >
                  <ul>
                    <li>{t(LabelConstants.GOGOMOTOR_SALE_ITEM_1)}</li>
                    <li>{t(LabelConstants.GOGOMOTOR_SALE_ITEM_2)}</li>
                    <li>{t(LabelConstants.GOGOMOTOR_SALE_ITEM_3)}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[1.25rem] xl:w-[76.875rem] w-full">
              <div className="flex flex-col py-7 px-10">
                <h1 className="md:text-[2rem] text-black text-[1.375rem] font-bold">
                  {t(LabelConstants.TERM_AND_CONDITION_TEXT)}
                </h1>
                <div
                  className={`${
                    router.locale === Locales.EN
                      ? 'inspection_point_en'
                      : 'inspection_point_ar'
                  } md:text-[1.438rem] text-base md:leading-9 leading-7 !text-baltic-sea`}
                >
                  <ul>
                    <li>{t(LabelConstants.TERM_AND_CONDITION_ITEM_1)}</li>
                    <li>{t(LabelConstants.TERM_AND_CONDITION_ITEM_2)}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="xl:w-[76.875rem] w-full flex items-center flex-col gap-7 mb-[5.125rem] text-center mt-8">
              <h1 className="md:text-[3.375rem] text-3xl md:leading-[4rem] leading-[2.5rem] text-primary font-bold">
                {t(LabelConstants.GOT_ANSWER)}
              </h1>
              <p
                className={`md:text-[1.938rem] text-black text-lg md:leading-[2.75rem] leading-6 font-bold w-[89%] ${
                  router.locale === Locales.EN
                    ? 'md:w-[69.938rem] w-[89%]'
                    : 'md:w-[46.938rem] w-[69%]'
                }`}
              >
                {t(LabelConstants.GOT_ANSWER_HEADING)}
              </p>
            </div>
          </div>
        </div>
        <Modal
          show={openDownlaodModal}
          onClose={() => setOpenDownloadModal(false)}
          size={ModalSize.MEDIUM}
          containerClassName="max-w-[30rem]"
        >
          <>
            <ModalBody>
              <div className="flex flex-col gap-4 items-center justify-center">
                <picture>
                  <source
                    srcSet={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_scanner.png`}
                    type="image/png"
                  />
                  <img
                    src={`${process.env.NEXT_PUBLIC_Image_CDN_URL}/CMS/Common/app_scanner.png`}
                    alt="gogo motor"
                    className="w-[12rem] h-[12rem]"
                  />
                </picture>
                <span
                  className="text-large font-semibold text-center"
                  dangerouslySetInnerHTML={{
                    __html: t(LabelConstants.SCAN_QR_TO_DOWNLOAD_APP),
                  }}
                ></span>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="flex items-center justify-center">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setOpenDownloadModal(false)}
                >
                  {t(LabelConstants.CANCEL)}
                </button>
              </div>
            </ModalFooter>
          </>
        </Modal>
      </div>
    </>
  );
};

export default Selflist;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    redirect: {
      permanent: false,
      destination: '/404',
    },
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      showCampaignFooter: true,
    },
  };
};
