import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Locales, ProductReferenceType } from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { ListingService } from '../../helpers/services';
import { useRouter } from 'next/router';
import { ViewBreakUp } from '../../types/models';
import { formatNumber } from '../../helpers/utilities';
import Spinner from '../../components/common/Spinner/spinner';
import { BackIcon } from '../../components/icons';

type ViewBreakUpProps = {};

const ViewBreakUpPage: NextPage<ViewBreakUpProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [myOrder, setMyOrder] = useState<Array<ViewBreakUp>>();
  const [vehicleData, setVehicledata] = useState<ViewBreakUp>();
  useEffect(() => {
    const initLoad = async () => {
      let packagesData = await ListingService.getViewBreakUp(
        router.query.orderId!,
        router.locale
      );
      setMyOrder(packagesData);
      setVehicledata(
        packagesData.find(
          (x) => x.ProductReferenceType === ProductReferenceType.Vehicle
        )
      );
    };
    initLoad();
  }, [router.locale, router.query.orderId]);

  if (!router.query.orderId || !myOrder) {
    return (
      <>
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );
  }
  return (
    <div>
      <div className="flex gap-4 items-center my-9 mx-20">
        <div
          onClick={() => router.back()}
          className="inline-flex cursor-pointer"
        >
          <BackIcon className="h-8 w-8 rtl:rotate-180" />
        </div>
        <span className="uppercase text-xl font-bold text-primary">
          {t(LabelConstants.VIEW_BREAK_UP)}
        </span>
      </div>
      <div className="my-10 flex items-center justify-center container">
        <div className="border-2 flex flex-col gap-3 sm:w-[40.188rem] w-full my-4 border-light-gray rounded-sm p-8">
          <div className="flex justify-between">
            <span className="text-2xl text-primary font-bold">
              {vehicleData?.DisplayName}
            </span>
            <div className="flex flex-col">
              <span className="text-2xl text-dark-gray1 font-bold">
                {`${LabelConstants.SAR} ${formatNumber(
                  vehicleData?.PriceInclTax!,
                  2
                )}`}
              </span>
              <span className="flex justify-end text-[0.875rem] text-dark-gray2">
                {t(LabelConstants.INCLUSIVE_VAT)}
              </span>
            </div>
          </div>
          {myOrder
            .filter(
              (x) => x.ProductReferenceType !== ProductReferenceType.Vehicle
            )
            .map((x, id) => (
              <div className="flex justify-between" key={id}>
                <span className={'text-xl text-dark-gray1 font-light'}>
                  {x.DisplayName}
                </span>
                <div className="flex flex-col">
                  <span className="text-xl text-dark-gray1 font-light ">
                    {`${t(LabelConstants.SAR)} ${formatNumber(
                      x.PriceInclTax,
                      2
                    )}`}
                  </span>
                  <span className="flex justify-end text-[0.875rem] text-dark-gray2">
                    {t(LabelConstants.INCLUSIVE_VAT)}
                  </span>
                </div>
              </div>
            ))}
          <hr className="my-3" />
          {!vehicleData?.IsFinance ? (
            <div className="flex justify-between">
              <span className="text-xl text-dark-gray1 font-bold">
                {t(LabelConstants.BOOKING_AMOUNT)}
              </span>
              <div className="flex flex-col">
                <span className="text-xl text-dark-gray1 font-bold">
                  {`${LabelConstants.SAR} (${formatNumber(
                    myOrder?.find(
                      (x) =>
                        x.ProductReferenceType! === ProductReferenceType.Vehicle
                    )?.BookingAmount!,
                    2
                  )})`}
                </span>
                <span className="text-dark-gray2 text-end font-normal text-sm">
                  {t(LabelConstants.INCLUSIVE_VAT)}
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex justify-between">
            <span className="text-2xl text-primary font-bold">
              {t(LabelConstants.BALANCE_AMOUNT)}
            </span>
            <div className="flex flex-col">
              <span className="text-2xl text-primary font-bold">
                {`${LabelConstants.SAR} ${formatNumber(
                  myOrder?.find(
                    (x) =>
                      x.ProductReferenceType! === ProductReferenceType.Vehicle
                  )?.BalanceAmount!,
                  2
                )}`}
              </span>
              <span className="text-dark-gray2 text-end font-normal text-sm">
                {t(LabelConstants.INCLUSIVE_VAT)}
              </span>
            </div>
          </div>
          {vehicleData?.BookingPeriod ? <hr className="my-5" /> : <></>}
          <div className="flex justify-between">
            {vehicleData?.BookingPeriod ? (
              <div className="flex gap-3 justify-end items-center w-auto">
                <div className="color-border-box">
                  <div className="text-red-600 text-lg font-black">
                    {vehicleData?.BookingPeriod}
                  </div>
                </div>
                <div className="leading-0 text-sm font-semibold">
                  {t(LabelConstants.DAYS_REMAINING_TO_COMPLETE_PAYMENT)}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBreakUpPage;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps<ViewBreakUpProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
