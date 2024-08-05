import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Spinner from '../../components/common/Spinner/spinner';
import { InvoiceService, PackageSubscription } from '../../helpers/services';
import {
  CommonUtils,
  formatNumber,
  SessionUtils,
} from '../../helpers/utilities';
import {
  AmericanExpressIcon,
  ApplePayIcon,
  CasaMadaIcon,
  CircleSuccessIcon,
  MasterCardIcon,
  STCPayIcon,
  VisaIcon,
} from '../../components/icons';
import {
  ConfigurationKey,
  Locales,
  PaymentType,
  ProductReferenceType,
  SubscriptionReferenceType,
} from '../../types/enums';
import { LabelConstants } from '../../types/i18n.labels';
import { InvoiceItems, PaymentStatusResponse } from '../../types/models';
import FileSaver from 'file-saver';
import moment from 'moment';
import MessageBox, { MessageBoxType } from '../../components/common/MessageBox';
import { useAppContext } from '../../provider/AppProvider';
import InspectionAppointmentModal from '../../components/dashboard/InspectionAppointmentModal';
import { InvoiceStatus } from '../../types/constants';
import ShowRestrictUserDropdown from '../../components/common/ShowRestrictUserDropdown';
import ConfigurationService from '../../helpers/services/configuration.service';
type PaymentPageProps = {};

const PaymentSuccess: NextPage<PaymentPageProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { dateFormat } = useAppContext();
  const Bid: number = CommonUtils.decode(String(router.query.invoiceid));
  const [paymentData, setPaymentData] =
    useState<PaymentStatusResponse | null>();
  const [items, setItems] = useState<Array<InvoiceItems>>();
  const [itemsData, setItemsData] = useState<InvoiceItems>();

  const [packageItems, setPackageItems] = useState<Array<InvoiceItems>>();

  const [loading, setLoading] = useState<boolean>(true);
  const [showBuyInspectionPopUp, setShowBuyInspectionPopUp] =
    useState<boolean>(false);
  const [listingId, setListingId] = useState<number>(-1);
  const [showRestrictUserText, setShowRestrictUserText] = useState<string>('');
  const [showRestrictUserDropdown, setShowRestrictUserDropdown] =
    useState<boolean>(false);
  const today = moment();

  const initialLoad = useCallback(async () => {
    const isAuthenticated = SessionUtils.isValidSession();
    if (!isAuthenticated) {
      router.push('/');
    } else {
      const data = await InvoiceService.getPaymentDetails(Bid, router.locale);
      setItemsData(
        data?.Items.find(
          (x) => x.InvoiceItemType !== ProductReferenceType.B2CPackageCreditItem
        )
      );
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
    }
  }, [Bid, router]);

  useEffect(() => {
    initialLoad();
  }, [initialLoad, router]);

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

  if (loading) {
    return (
      <>
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );
  }

  const handleDownloadInvoice = async (
    invoiceId: number,
    IsDocumentAvailable: boolean
  ) => {
    if (IsDocumentAvailable) {
      let res = await PackageSubscription.downloadInvoice(invoiceId);
      if (res) {
        FileSaver.saveAs(res, 'Invoice');
      }
    } else {
      await MessageBox.open({
        content: `${t(LabelConstants.INVOICE_NOT_GENERATE_PAYMENT_MSG)}`,
        type: MessageBoxType.Message,
      });
    }
  };

  const getPaymentIcon = () => {
    switch (paymentData?.Invoice.PaymentMethod) {
      case PaymentType.MasterCard:
        return (
          <MasterCardIcon className="max-w-[6.25rem] max-h-[3.75rem] w-[4.375rem] h-[1.875rem]" />
        );
      case PaymentType.Visa:
        return (
          <VisaIcon className="max-w-[6.25rem] max-h-[3.75rem] w-[2.688rem] h-[0.938rem]" />
        );
      case PaymentType.STCPAY:
        return (
          <STCPayIcon className="max-w-[6.25rem] max-h-[3.75rem] w-[4.375rem] h-[1.875rem]" />
        );
      case PaymentType.APPLE_PAY:
        return (
          <ApplePayIcon className="max-w-[6.25rem] max-h-[3.75rem] w-[4.375rem] h-[1.875rem]" />
        );
      case PaymentType.MADA:
        return (
          <CasaMadaIcon className="max-w-[6.25rem] max-h-[3.75rem] w-[4.375rem] h-[1.875rem]" />
        );
      case PaymentType.AMEX:
        return (
          <AmericanExpressIcon className="max-w-[6.25rem] max-h-[3.75rem] w-[4.375rem] h-[1.875rem]" />
        );
    }
  };

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
          {paymentData?.Invoice?.IsInitialPayment != null &&
          paymentData?.Invoice?.IsInitialPayment === true &&
          paymentData?.Invoice?.IsFinance != null &&
          paymentData?.Invoice?.IsFinance === false ? (
            <div className="flex justify-between w-full gap-[0.78rem] p-6">
              <div className="text-xl flex gap-1 font-normal">
                <span className="uppercase">
                  {
                    paymentData?.Items.find(
                      (x) => x.InvoiceItemType === ProductReferenceType.Vehicle
                    )?.DisplayName
                  }
                </span>
              </div>
              <div
                className="flex flex-wrap text-xl gap-2 font-normal text-right justify-end"
                dir="ltr"
              >
                <span className="inline-block">{t(LabelConstants.SAR)}</span>
                <span className="inline-block">
                  {formatNumber(paymentData?.Invoice.TotalAmount!, 2)}
                </span>
                <span className="w-3/4 inline-block text-[0.875rem] text-dark-gray2">
                  {t(LabelConstants.INCLUSIVE_VAT)}
                </span>
              </div>
            </div>
          ) : (
            <>
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
                      <>{getPaymentIcon()}</>

                      <span className="">
                        {paymentData?.Invoice.CardNumber}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <hr></hr>
              <div className="flex flex-col gap-[2.003rem] p-6 text-xl font-normal">
                {packageItems?.map((itm) => (
                  <div className="grid grid-cols-2" key={itm.PackageId}>
                    <div className="flex flex-col">
                      <div>{`${itm.DisplayName} ${
                        itm.InvoiceItemType ===
                        ProductReferenceType.B2CPackageCreditItem
                          ? t(LabelConstants.PAID_PURCHASE)
                          : ''
                      }`}</div>
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
            </>
          )}
          <div className="flex flex-col gap-6 justify-center items-center gap-x-3 mt-[1.875rem] mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  className="btn btn-primary btn-sm !min-w-[12rem] sm:!min-w-[15rem] uppercase"
                  onClick={() => router.push(`/my-orders`)}
                >
                  {t(LabelConstants.MY_ORDERS)}
                </button>
                <button
                  className="btn btn-secondary btn-sm !min-w-[12rem] sm:!min-w-[15rem] uppercase"
                  onClick={() =>
                    handleDownloadInvoice(
                      Bid,
                      paymentData?.Invoice.IsDocumentAvailable!
                    )
                  }
                >
                  {t(LabelConstants.DOWNLOAD_INVOICE)}
                </button>
              </div>
              <div className="flex gap-4">
                {itemsData?.PackageReferenceId &&
                itemsData?.SubscriptionReferenceId &&
                paymentData?.Invoice.InvoiceStatusKey === InvoiceStatus.PAID &&
                !itemsData.IsVehicleSubmitted ? (
                  <button
                    className="btn btn-secondary btn-sm !min-w-[12rem] sm:!min-w-[15rem] uppercase"
                    onClick={() => {
                      if (
                        itemsData.IsSelfListedPackage &&
                        showRestrictUserText === 'true'
                      ) {
                        setShowRestrictUserDropdown(true);
                      } else {
                        router.push({
                          pathname: `${
                            itemsData?.VehicleListingId
                              ? `/vehicle-onboard/${itemsData?.VehicleListingId}`
                              : '/vehicle-onboard'
                          }`,
                          search: `p_id=${itemsData.PackageReferenceId}&OrderItemId=${itemsData.SubscriptionReferenceId}`,
                        });
                      }
                    }}
                  >
                    {t(LabelConstants.LIST_VEHICLE)}
                  </button>
                ) : (
                  <></>
                )}
                {itemsData?.VehicleListingId &&
                itemsData?.PackageReferenceId &&
                itemsData?.SubscriptionReferenceId &&
                itemsData?.IsUpgraded &&
                itemsData?.IsUpgradedFromSelfListedPackage &&
                paymentData?.Invoice.InvoiceStatusKey === InvoiceStatus.PAID &&
                itemsData.IsVehicleSubmitted ? (
                  <button
                    className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                    onClick={() => {
                      setShowBuyInspectionPopUp(true);
                      setListingId(itemsData?.VehicleListingId!);
                    }}
                  >
                    {t(LabelConstants.BTN_BOOK_APPOINTMENT)}
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showBuyInspectionPopUp && (
        <InspectionAppointmentModal
          vehicleListingId={listingId}
          showBuyInspectionPopUp={showBuyInspectionPopUp}
          setShowBuyInspectionPopUp={setShowBuyInspectionPopUp}
          onClose={() => initialLoad()}
        />
      )}
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
