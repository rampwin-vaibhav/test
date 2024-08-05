import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import Spinner from '../../components/common/Spinner/spinner';
import { CircleSuccessIcon } from '../../components/icons';
import { CommonUtils, formatNumber } from '../../helpers/utilities';
import {
  ConfigurationKey,
  Locales,
  SubscriptionReferenceType,
} from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { InvoiceItems, PaymentStatusResponse } from '../../types/models';
import { useEffect, useState } from 'react';
import { InvoiceService, PackageSubscription } from '../../helpers/services';
import FileSaver from 'file-saver';
import moment from 'moment';
import { useAppContext } from '../../provider/AppProvider';
import { InvoiceStatus } from '../../types/constants';
import ConfigurationService from '../../helpers/services/configuration.service';
import ShowRestrictUserDropdown from '../../components/common/ShowRestrictUserDropdown';
type PaymentPageProps = {};
const PaymentSuccess: NextPage<PaymentPageProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { dateFormat } = useAppContext();
  const { t } = useTranslation();
  const router = useRouter();
  const Bid: number = CommonUtils.decode(String(router.query.invoiceid));
  const [paymentData, setPaymentData] = useState<
    PaymentStatusResponse | undefined
  >();
  const [items, setItems] = useState<Array<InvoiceItems>>();
  const [packageItems, setPackageItems] = useState<Array<InvoiceItems>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showRestrictUserText, setShowRestrictUserText] = useState<string>('');
  const [showRestrictUserDropdown, setShowRestrictUserDropdown] =
    useState<boolean>(false);
  const today = moment();

  useEffect(() => {
    const initialLoad = async () => {
      const data = await InvoiceService.getPaymentStatus(Bid, router.locale);
      setLoading(false);
      setPaymentData(data);
      const isPackageData = data?.Items.filter(
        (data) =>
          data.SubscriptionReferenceType === SubscriptionReferenceType.B2COrder
      );
      setPackageItems(isPackageData);
      const configurationValue =
        await ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.IsRestrictOnBoardingFromWebForSelfListed,
          router.locale
        );
      setShowRestrictUserText(configurationValue.ConfigurationValue);
    };
    initialLoad();
  }, [Bid, router]);

  useEffect(() => {
    if (paymentData && paymentData.Items) {
      const groupByCategory = paymentData.Items.reduce(
        (group: any, product: any) => {
          const { PackageId } = product;
          group[PackageId] = group[PackageId] ?? [];
          group[PackageId].push(product);
          return group;
        },
        []
      );
      const finalList = groupByCategory.map(
        (item: Array<InvoiceItems>, temp: any) => {
          temp = item[0];
          temp.Quantity = item.length;
          return temp;
        }
      );
      setItems(
        finalList.filter((itm: any) => {
          return itm !== null;
        })
      );
    }
  }, [paymentData, paymentData?.Items]);

  const handleDownloadInvoice = async (invoiceId: number) => {
    let res = await PackageSubscription.downloadInvoice(invoiceId);
    if (res) {
      FileSaver.saveAs(res, 'Invoice');
    }
  };

  if (loading) {
    return (
      <>
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );
  }
  return (
    <div className="container lg:!px-52 w-full flex flex-col items-center justify-center">
      <div className="flex flex-col">
        <div className="flex flex-col gap-10">
          <div className="flex items-center justify-center mt-10">
            <CircleSuccessIcon className="md:w-[5.25rem] w-[4.25rem] md:h-[5.25rem] h-[4.25rem]" />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="md:text-[2.5rem] text-[1.6rem] sm:text-[2rem] font-[700]">
              {t(LabelConstants.PAYMENT_SUCCESS)}
            </h1>
          </div>
        </div>
        <div className="border md:!w-[50.125rem] mt-[3.875rem] mb-10">
          <div className="flex flex-col gap-[0.78rem] p-6">
            <div className="grid grid-cols-2 items-center">
              <div className="md:text-[1.625rem] text-[1.3rem] text-primary md:font-bold font-semibold">
                {t(LabelConstants.ORDER_SUMMARY)}
              </div>
              <div className="w-full flex justify-end text-lg font-normal">
                {t(LabelConstants.INVOICE_NUMBER)}:
                <span className="font-bold pl-1">
                  {paymentData?.Invoice.InvoiceNumber}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center">
              <div className="text-[1.25rem]">
                {t(LabelConstants.PAYMENT_DATE)}
              </div>
              <div className="w-full flex justify-end text-lg font-normal">
                {today.format(dateFormat)}
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="flex flex-col gap-[2.003rem] p-6 text-xl font-normal">
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
            <div className="grid grid-cols-2">
              <div className="font-bold">
                {paymentData?.Invoice.PromoCode
                  ? paymentData?.Invoice.PromoCode
                  : ''}
              </div>
              <div className="w-full flex gap-2 ltr:justify-end" dir="ltr">
                <span>{t(LabelConstants.SAR)}</span>
                <span>
                  {`(${formatNumber(
                    paymentData?.Invoice.PromoCodeAmount!,
                    2
                  )})`}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                {t(LabelConstants.VAT)}
                <span
                  className="mx-1"
                  dir="ltr"
                >{`(${paymentData?.Invoice.VATPercentage}%)`}</span>
              </div>
              <div className="w-full flex gap-2 ltr:justify-end" dir="ltr">
                <span>{t(LabelConstants.SAR)}</span>
                <span>
                  {formatNumber(paymentData?.Invoice.TaxCalculatedAmount!, 2)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 font-bold">
              <div>{t(LabelConstants.TOTAL_AMOUNT)}</div>
              <div
                className="w-full flex gap-2 ltr:justify-end text-primary"
                dir="ltr"
              >
                <span>{t(LabelConstants.SAR)}</span>
                <span>
                  {formatNumber(paymentData?.Invoice.TotalAmount!, 2)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-[1.875rem] mb-8">
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <button
                  className="btn btn-primary btn-sm uppercase"
                  onClick={() => router.push(`/my-orders`)}
                >
                  {t(LabelConstants.MY_ORDERS)}
                </button>
                <button
                  className="btn btn-secondary btn-sm uppercase"
                  onClick={() => handleDownloadInvoice(Bid)}
                >
                  {t(LabelConstants.DOWNLOAD_INVOICE)}
                </button>
              </div>
              <div className="flex gap-3">
                {packageItems[0].PackageReferenceId &&
                  packageItems[0].SubscriptionReferenceId &&
                  paymentData?.Invoice.InvoiceStatusKey! ===
                    InvoiceStatus.PAID && (
                    <button
                      className="btn btn-secondary btn-sm !min-w-[12rem] sm:!min-w-[15rem] uppercase"
                      onClick={() => {
                        if (
                          packageItems[0].IsSelfListedPackage &&
                          showRestrictUserText === 'true'
                        ) {
                          setShowRestrictUserDropdown(true);
                        } else {
                          router.push({
                            pathname: '/vehicle-onboard',
                            search: `p_id=${packageItems[0].PackageReferenceId}&OrderItemId=${packageItems[0].SubscriptionReferenceId}`,
                          });
                        }
                      }}
                    >
                      {t(LabelConstants.LIST_VEHICLE)}
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showRestrictUserDropdown && (
        <ShowRestrictUserDropdown
          showDropdown={showRestrictUserDropdown}
          setShowDropdown={setShowRestrictUserDropdown}
        />
      )}
    </div>
  );
};
export default PaymentSuccess;

export async function getStaticPaths() {
  return {
    paths: [], // No paths to pre-render at build time
    fallback: 'blocking', // Fallback to on-demand rendering
  };
}
export const getStaticProps: GetStaticProps<PaymentPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
