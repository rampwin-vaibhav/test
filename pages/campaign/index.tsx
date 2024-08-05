import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import {
  FourNumber,
  OneNumber,
  ThreeNumber,
  TwoNumber,
} from '../../components/icons';
import ConfigurationService from '../../helpers/services/configuration.service';
import { ConfigurationKey, Locales } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';

const Campaign = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleClick = async () => {
    const promotionCodeValue =
      await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.PromotionCodeForCampaignUser,
        router.locale
      );
    if (promotionCodeValue && promotionCodeValue.ConfigurationValue) {
      localStorage.setItem(
        ConfigurationKey.PromotionCodeForCampaignUser,
        promotionCodeValue.ConfigurationValue
      );
    }
    router.push('/sell-it-for-me?mode=sell');
  };
  return (
    <>
      <div className="campaign text-dark-gray1">
        <div className="md:px-[2.5rem]">
          <div className="placeholder">
            <picture className="h-full w-full">
              <img
                src={`${
                  process.env.NEXT_PUBLIC_Image_CDN_URL
                }/CMS/Campaign/GGMLaunch/${router.locale?.toLowerCase()}/web-banner.webp`}
                alt="campaign-image"
                className="h-full w-full object-fill"
              />
            </picture>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="md:my-20 my-10 md:text-5xl text-3xl text-primary w-[23rem] md:w-full font-bold flex items-center justify-center text-center md:!leading-[4.5rem] !leading-[3rem]">
            <h1
              className="w-[68.875rem]"
              dangerouslySetInnerHTML={{
                __html: t(LabelConstants.CAMPAIGN_MAIN_HEADING),
              }}
            ></h1>
          </div>
        </div>
        <div className="flex flex-col gap-32 text-3xl">
          <div
            className={`flex ${
              router.locale === Locales.EN
                ? 'md:flex-row'
                : 'md:flex-row-reverse'
            }  flex-col gap-3 items-center justify-center w-full md:px-[8.6rem] px-[4rem]`}
          >
            <div className="flex flex-col md:gap-12 gap-3 justify-center md:w-1/2 w-full">
              <div className="flex flex-row gap-10 items-center">
                <div>
                  <OneNumber className="md:w-16 w-8 h-32" />
                </div>
                <div>
                  <h1
                    className={`lg:text-6xl text-3xl md:!leading-[5.125rem] !leading-[3rem] font-bold ${
                      router.locale === Locales.EN ? 'w-3/4' : 'w-full'
                    }  xl:w-[26.938rem]`}
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.SELECT_GOLD_PACKAGE),
                    }}
                  ></h1>
                </div>
              </div>
              <div className="md:!leading-[3.125rem] leading-8 text-lg md:text-xl lg:text-3xl w-full">
                {t(LabelConstants.GOLD_PACKAGE_HEADING)}
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <picture>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMLaunch/${router.locale?.toLowerCase()}/package.png`}
                  alt="img"
                  className="md:max-w-[48.75rem] w-full aspect-[431/278]"
                />
              </picture>
            </div>
          </div>
          <div
            className={`flex ${
              router.locale === Locales.EN
                ? 'md:flex-row'
                : 'md:flex-row-reverse'
            } gap-3 flex-col-reverse items-center justify-center w-full md:px-[8.6rem] px-[4rem]`}
          >
            <div className="md:w-1/2 w-full">
              <picture>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMLaunch/${router.locale?.toLowerCase()}/order-summary.png`}
                  alt="img"
                  className="md:max-w-[46.125rem] w-full aspect-[779/673]"
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
                  <TwoNumber className="md:w-28 w-14 h-32" />
                </div>
                <div>
                  <h1
                    className="lg:text-6xl text-3xl md:!leading-[4.5rem] !leading-[3rem] font-bold xl:w-[21.5rem] w-3/4"
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.APPLY_PROMO_CODE),
                    }}
                  ></h1>
                </div>
              </div>
              <div
                className={`flex w-full justify-start ${
                  router.locale === Locales.EN ? 'justify-end' : 'justify-start'
                }`}
              >
                <p className="md:!leading-[3.125rem] leading-8 text-lg md:text-xl lg:text-3xl w-full md:w-[38.313rem] flex justify-start md:text-right">
                  {t(LabelConstants.APPLY_PROMO_CODE_HEADING)}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`flex  ${
              router.locale === Locales.EN
                ? 'md:flex-row'
                : 'md:flex-row-reverse'
            } gap-3 flex-col  items-center justify-center w-full md:px-[8.6rem] px-[4rem]`}
          >
            <div className="flex flex-col md:gap-12 gap-3 justify-center md:w-1/2 w-full">
              <div className="flex flex-row gap-10 items-center">
                <div>
                  <ThreeNumber className="md:w-28 w-14 h-32" />
                </div>
                <div>
                  <h1
                    className={`lg:text-6xl text-3xl md:!leading-[4.875rem] !leading-[3rem] font-bold ${
                      router.locale === Locales.EN ? 'w-7/12' : 'w-2/3'
                    } xl:w-[21.9rem]`}
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.ADD_CAR_DETAILS),
                    }}
                  ></h1>
                </div>
              </div>
              <div className="md:!leading-[3.063rem] leading-8 text-lg md:text-xl lg:text-3xl w-full">
                {t(LabelConstants.ADD_CAR_DETAILS_HEADING)}
              </div>
            </div>
            <div
              className={`md:w-1/2 w-full flex ${
                router.locale === Locales.EN ? 'justify-end' : 'justify-start'
              }`}
            >
              <picture>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMLaunch/${router.locale?.toLowerCase()}/campaign-car.png`}
                  alt="img"
                  className="md:max-w-[44.375rem] w-full aspect-[356/225]"
                />
              </picture>
            </div>
          </div>
          <div
            className={`flex  ${
              router.locale === Locales.EN
                ? 'md:flex-row'
                : 'md:flex-row-reverse'
            } gap-3 flex-col-reverse items-center justify-center w-full md:px-[8.6rem] px-[2rem]`}
          >
            <div className="md:w-1/2 w-full">
              <picture>
                <img
                  src={`${
                    process.env.NEXT_PUBLIC_Image_CDN_URL
                  }/CMS/Campaign/GGMLaunch/${router.locale?.toLowerCase()}/campaign-map.png`}
                  alt="img"
                  className="md:max-w-[44.438rem] w-full aspect-[712/605]"
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
                  <FourNumber className="md:w-28 w-14 h-32" />
                </div>
                <div>
                  <h1
                    className={`lg:text-6xl text-3xl md:!leading-[5.188rem] !leading-[3rem] font-bold xl:w-[26.5rem] ${
                      router.locale === Locales.EN ? 'w-7/12' : 'w-full'
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: t(LabelConstants.CAR_FOR_INSPECTION),
                    }}
                  ></h1>
                </div>
              </div>
              <div
                className={`flex w-full justify-start ${
                  router.locale === Locales.EN ? 'justify-end' : 'justify-start'
                }`}
              >
                <p className="w-full md:!leading-[3.063rem] leading-8 text-lg md:text-xl lg:text-3xl md:text-right md:w-[46.875rem]">
                  {t(LabelConstants.CAR_FOR_INSPECTION_HEADING)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-16 w-full items-center justify-center text-center mb-20 md:px-[8.6rem]">
            <div className="flex flex-col gap-4">
              <h1 className="md:text-[3.375rem] text-3xl md:leading-[4rem] leading-[2.5rem] text-primary font-bold">
                {t(LabelConstants.NEED_TO_KNOW_TEXT)}
              </h1>
              <p className="md:text-[1.625rem] text-xl font-bold">
                {t(LabelConstants.ONE_CLICK_AWAY)}
              </p>
            </div>
            <div>
              <button
                className="cursor-pointer px-[1.625rem] py-2 md:!min-w-[20.75rem] md:!w-full flex items-center justify-center w-[13.5rem] md:!h-[5.313rem] h-12 whitespace-nowrap md:!text-3xl text-base text-center text-white font-bold bg-gradient rounded-sm uppercase"
                onClick={() => handleClick()}
              >
                <span>{t(LabelConstants.GET_STARTED_NOW)}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-grey-color">
          <div className="w-full flex flex-col items-center gap-9 justify-center md:px-[8.6rem] px-[4rem]">
            <div className="bg-white mt-[4.938rem] rounded-[1.25rem] xl:w-[76.875rem] w-full">
              <div className="flex flex-col py-7 px-10">
                <h1 className="md:text-[2rem] text-[1.375rem]  font-bold">
                  {t(LabelConstants.INSPECTION_MAIN_HEADING)}
                </h1>
                <div
                  className={`${
                    router.locale === Locales.EN
                      ? 'inspection_point_en'
                      : 'inspection_point_ar'
                  } md:text-[1.438rem] text-base md:leading-9 leading-7`}
                >
                  <ul>
                    <li>{t(LabelConstants.INSPECTION_ITEM_1)}</li>
                    <li>{t(LabelConstants.INSPECTION_ITEM_2)}</li>
                    <li>{t(LabelConstants.INSPECTION_ITEM_3)}</li>
                    <li>{t(LabelConstants.INSPECTION_ITEM_4)}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[1.25rem] xl:w-[76.875rem] w-full">
              <div className="flex flex-col gap-6 py-7 px-10">
                <h1 className="md:text-[2rem] text-[1.375rem] font-bold">
                  {t(LabelConstants.MY_CAR_OFFER_HEADING)}
                </h1>
                <div className="inspection_point md:text-[1.438rem] font-semibold text-base md:leading-[2.25rem] leading-7">
                  <p>{t(LabelConstants.MY_CAR_OFFER_PARAGRAPH)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[1.25rem] xl:w-[76.875rem] w-full">
              <div className="flex flex-col gap-6 py-7 px-10">
                <h1 className="md:text-[2rem] text-[1.375rem] font-bold">
                  {t(LabelConstants.GOGO_MOTOR_CRITERIA)}
                </h1>
                <div className="inspection_point md:text-[1.438rem] font-semibold text-base md:leading-[2.25rem] leading-7">
                  <p>{t(LabelConstants.GOGO_MOTOR_CRITERIA_PARAGRAPH)}</p>
                </div>
              </div>
            </div>
            <div className="xl:w-[76.875rem] w-full flex items-center flex-col gap-7 mb-[5.125rem] text-center mt-8">
              <h1 className="md:text-[3.375rem] text-3xl md:leading-[4rem] leading-[2.5rem] text-primary font-bold">
                {t(LabelConstants.GOT_ANSWER)}
              </h1>
              <p
                className={`md:text-[1.938rem] text-lg md:leading-[2.75rem] leading-6 font-bold w-[89%] ${
                  router.locale === Locales.EN
                    ? 'md:w-[70.938rem] w-[89%]'
                    : 'md:w-[46.938rem] w-[69%]'
                }`}
              >
                {t(LabelConstants.GOT_ANSWER_HEADING)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaign;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
}: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
      showCampaignFooter: true,
    },
  };
};
