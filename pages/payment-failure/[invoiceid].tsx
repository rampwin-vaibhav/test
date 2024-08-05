import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { CrossRedIcon, VisaIcon } from '../../components/icons';
import {
  Locales,
  ProductReferenceType,
  SubscriptionReferenceType,
} from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { CommonUtils, formatNumber } from '../../helpers/utilities';
import { InvoiceItems, PaymentStatusResponse } from '../../types/models';
import { useEffect, useState } from 'react';
import { InvoiceService } from '../../helpers/services';
import moment from 'moment';
import { useAppContext } from '../../provider/AppProvider';

const PaymentFailure = () => {
  const { t } = useTranslation();
  const { dateFormat } = useAppContext();
  const router = useRouter();
  const Bid: number = CommonUtils.decode(String(router.query.invoiceid));
  const [paymentData, setPaymentData] = useState<
    PaymentStatusResponse | undefined
  >();
  const [packageItems, setPackageItems] = useState<Array<InvoiceItems>>();
  const today = moment();

  useEffect(() => {
    const initialLoad = async () => {
      const data = await InvoiceService.getPaymentStatus(Bid, router.locale);
      setPaymentData(data);
      const isPackageData = data?.Items.filter(
        (data: any) =>
          data.SubscriptionReferenceType === SubscriptionReferenceType.B2COrder
      );
      setPackageItems(isPackageData);
    };
    initialLoad();
  }, [Bid, router]);

  return (
    <div className="container lg:!px-52 w-full flex flex-col items-center justify-center">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-center mt-10">
            <CrossRedIcon className="md:w-[5.25rem] w-[4.25rem] md:h-[5.25rem] h-[4.25rem]" />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="md:text-[2.5rem] text-[1.6rem] sm:text-[2rem] text-error font-[700]">
              {t(LabelConstants.PAYMENT_FAILURE_TEXT)}
            </h1>
          </div>
        </div>
        {paymentData && (
          <div className="border md:!w-[43.784rem] mt-[3.875rem] mb-10">
            {paymentData?.Invoice?.IsInitialPayment != null &&
            paymentData?.Invoice?.IsInitialPayment === true &&
            paymentData?.Invoice?.IsFinance != null &&
            paymentData?.Invoice?.IsFinance === false ? (
              <div className="flex justify-between w-full p-6 text-xl font-normal">
                <div className="flex gap-1">
                  <span className="uppercase">
                    {
                      paymentData?.Items.find(
                        (x) =>
                          x.InvoiceItemType === ProductReferenceType.Vehicle
                      )?.DisplayName
                    }
                  </span>
                </div>
                <div className="flex text-xl gap-2 font-normal" dir="ltr">
                  <span>{t(LabelConstants.SAR)}</span>
                  <span>
                    {formatNumber(paymentData?.Invoice.TotalAmount!, 2)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-[2.003rem] p-6 text-xl font-normal">
                <div className="grid grid-cols-2">
                  <div>{t(LabelConstants.PAYMENT_FAILURE_DATE)}</div>
                  <div className="w-full flex justify-end">
                    {paymentData?.Invoice.PurchasedDate
                      ? moment(paymentData?.Invoice.PurchasedDate).format(
                          dateFormat
                        )
                      : today.format(dateFormat)}
                  </div>
                </div>
                {paymentData?.Invoice.CardNumber && (
                  <div className="grid grid-cols-2 items-center">
                    <div className="text-[1.25rem]">
                      {t(LabelConstants.PAYMENT_METHOD)}
                    </div>
                    <div className="w-full flex gap-2 items-center justify-end text-lg font-normal">
                      <VisaIcon className="max-w-[6.25rem] max-h-[3.75rem]" />
                      <span className="">
                        {paymentData?.Invoice.CardNumber}
                      </span>
                    </div>
                  </div>
                )}
                {packageItems?.map((itm) => (
                  <div className="grid grid-cols-2" key={itm.PackageId}>
                    <div className="flex flex-col">
                      <div>{itm.DisplayName}</div>
                      <div className="text-base text-[#929597]">
                        {itm.Description}
                      </div>
                    </div>
                    <div className="w-full">
                      <div className="flex ltr:justify-end gap-2" dir="ltr">
                        <span>{t(LabelConstants.SAR)}</span>
                        <span>{formatNumber(itm.ChargeAmount!, 2)}</span>
                      </div>
                      <div className="flex justify-end text-base text-dark-gray2">
                        {t(LabelConstants.EXCL_VAT)}
                      </div>
                    </div>
                  </div>
                ))}

                {paymentData?.Invoice.PromoCode && (
                  <div className="grid grid-cols-2">
                    <div className="font-bold">
                      {paymentData?.Invoice.PromoCode
                        ? paymentData?.Invoice.PromoCode
                        : ''}
                    </div>
                    <div
                      className="w-full flex gap-2 ltr:justify-end"
                      dir="ltr"
                    >
                      <span>{t(LabelConstants.SAR)}</span>
                      <span>
                        {`(${formatNumber(
                          paymentData?.Invoice.PromoCodeAmount!,
                          2
                        )})`}
                      </span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between">
                  <div>
                    {t(LabelConstants.VAT)}
                    <span
                      className="mx-1"
                      dir="ltr"
                    >{`(${paymentData?.Invoice?.VATPercentage}%)`}</span>
                  </div>
                  <div
                    className="text-dark-gray1 whitespace-nowrap flex gap-2"
                    dir="ltr"
                  >
                    <span>{t(LabelConstants.SAR)}</span>
                    <span>
                      {formatNumber(paymentData?.Invoice?.VATAmount || 0, 2)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 font-bold">
                  <div>{t(LabelConstants.TOTAL_AMOUNT)}</div>
                  <div
                    className="w-full flex ltr:justify-end text-primary gap-2"
                    dir="ltr"
                  >
                    <span>{t(LabelConstants.SAR)}</span>
                    <span>
                      {formatNumber(paymentData?.Invoice.TotalAmount!, 2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-center gap-x-3 mt-[1.898rem] mb-8">
              <button
                className="btn btn-primary btn-sm uppercase"
                onClick={() => router.push(`/cart`)}
              >
                {t(LabelConstants.CONTINUE)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentFailure;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
