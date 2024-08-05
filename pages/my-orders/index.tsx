import FileSaver from 'file-saver';
import moment from 'moment';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import {
  VisaIcon,
  MasterCardIcon,
  AmericanExpressIcon,
  ApplePayIcon,
  CasaMadaIcon,
  STCPayIcon,
  ArrowDownIcon,
} from '../../components/icons';
import { ListingService, OrderService } from '../../helpers/services';
import {
  ConfigurationKey,
  ListingStatus,
  Locales,
  PaymentType,
  ReferenceType,
} from '../../types/enums';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import { MyOrdersData } from '../../types/models';
import Spinner from '../../components/common/Spinner/spinner';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../../components/common/MessageBox';
import PackageOrderItem from '../../components/common/my-order/PackageOrderItem';
import ServiceOrderItem from '../../components/common/my-order/ServiceOrderItem';
import VehicleOrderItem from '../../components/common/my-order/VehicleOrderItem';
import { useAppContext } from '../../provider/AppProvider';
import ConfigurationService from '../../helpers/services/configuration.service';
import {
  CMSPageKey,
  DocumentTypeLabelMapping,
  OrderItemStatus,
} from '../../types/constants';
import ShowRestrictUserDropdown from '../../components/common/ShowRestrictUserDropdown';
import Popover from '../../components/common/Popover';

const MyOrders = () => {
  const { dateFormat } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();
  const [myOrders, setMyOrders] = useState<Array<MyOrdersData>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [disclaimerText, setDisclaimerText] = useState<{ [x: string]: string }>(
    {}
  );
  const [showRestrictUserDropdown, setShowRestrictUserDropdown] =
    useState<boolean>(false);
  const [showRestrictUserText, setShowRestrictUserText] = useState<string>('');
  const initialLoad = useCallback(async () => {
    let packagesData = await ListingService.fetchMyOrders(router.locale);
    setMyOrders(packagesData.Data);
    setLoading(false);
    moment.locale('en');
    const disclaimerTextData =
      await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Information,
        null,
        router.locale
      );
    setDisclaimerText(disclaimerTextData);
    const configurationValue =
      await ConfigurationService.fetchConfigurationValue(
        ConfigurationKey.IsRestrictOnBoardingFromWebForSelfListed,
        router.locale
      );
    setShowRestrictUserText(configurationValue.ConfigurationValue);
  }, [router.locale]);

  useEffect(() => {
    initialLoad();
  }, [router.locale, initialLoad]);

  if (loading) {
    return (
      <>
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      </>
    );
  }

  const getPaymentIcon = (paymentMethod: string) => {
    switch (paymentMethod) {
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

  const handelClickedData = async (data: string) => {
    const res = await OrderService.downloadDocument(
      data,
      process?.env?.NEXT_PUBLIC_DOCUMENT_CONTAINER!
    );
    if (res) {
      FileSaver.saveAs(res, 'Document');
    } else {
      const result = await MessageBox.open({
        content: `${t(LabelConstants.INVOICE_NOT_GENERATE_MSG)}`,
        type: MessageBoxType.Message,
      });

      if (result === MessageBoxResult.OK || result === MessageBoxResult.Nope) {
        initialLoad();
      }
    }
  };

  return (
    <>
      {myOrders.length === 0 ? (
        <div className="absolute top-0 left-0 w-full h-full font-bold text-3xl flex flex-col items-center justify-center">
          <div className="flex justify-center items-center font-bold text-3xl">
            {t(LabelConstants.EMPTY_ORDER_LIST)}
          </div>
          <div className="flex justify-center items-center p-3 mt-4">
            <button
              className="btn btn-primary !h-[3.5rem] uppercase"
              onClick={() => router.push('/')}
            >
              {t(LabelConstants.GO_GET_STARTED)}
            </button>
          </div>
        </div>
      ) : (
        <div className="my-10 container">
          <>
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold">
                {t(LabelConstants.MY_ORDERS)}
              </div>
            </div>

            {myOrders &&
              myOrders.map((data, i) => (
                <div className="mt-8 border" key={i}>
                  <div className="p-5">
                    <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center justify-between">
                      <div className="flex md:flex-row flex-col justify-between gap-4 md:items-center w-full">
                        <div className="grid grid-cols-2 lg:flex items-center gap-3 sm:gap-8">
                          <div className="flex items-center bg-light-gray rounded-sm">
                            <div className="px-4 py-1 flex gap-1 text-[1.125rem]">
                              <div className="whitespace-nowrap">
                                {t(LabelConstants.ORDER_NO)}:
                              </div>
                              <div className="font-bold">
                                {data.OrderNumber}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 sm:gap-4 text-[1.125rem]">
                            <div className="whitespace-nowrap">
                              {t(LabelConstants.ORDER_DATE)}:
                            </div>
                            <div className="font-bold">
                              {moment(data.OrderDate).format(dateFormat)}
                            </div>
                          </div>
                          {data.PaymentMethod && (
                            <div className="flex items-center gap-1 text-[1.125rem]">
                              {data.CardNumber && (
                                <div className="flex flex-row gap-3 w-full  items-center">
                                  <div className="w-full text-[1.25rem] whitespace-nowrap">
                                    {`${t(LabelConstants.PAYMENT_METHOD)} :`}
                                  </div>
                                  <div className="w-full flex gap-2 items-center text-lg font-normal">
                                    <>{getPaymentIcon(data.PaymentMethod)}</>
                                    <span className="font-bold">
                                      {data.CardNumber}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        {data.Documents && data.Documents.length > 0 ? (
                          <Popover>
                            <Popover.Trigger>
                              {({ visible, setVisible }) => (
                                <div
                                  className="flex gap-2 items-center cursor-pointer"
                                  onClick={() => {
                                    setVisible(!visible);
                                  }}
                                >
                                  <div className="text-primary underline">
                                    {t(LabelConstants.DOWNLOAD_INVOICE)}
                                  </div>
                                  <div className="">
                                    <ArrowDownIcon className="h-4 w-4 cursor-pointer text-primary" />
                                  </div>
                                </div>
                              )}
                            </Popover.Trigger>
                            <Popover.Body>
                              {({ setVisible }) => (
                                <ul className="flex flex-col gap-2 list-inside">
                                  {data.Documents.map((x, i) => (
                                    <li className="px-1" key={i}>
                                      <span
                                        className="hover:underline hover:decoration-[#4c0055] cursor-pointer"
                                        onClick={() => {
                                          handelClickedData(x.DocumentUrl);
                                          setVisible(false);
                                        }}
                                      >
                                        {t(
                                          DocumentTypeLabelMapping[
                                            x.DocumentType
                                          ]
                                        )}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </Popover.Body>
                          </Popover>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <hr className="my-8 lg:mt-5"></hr>
                    <div className="flex flex-col gap-8">
                      {data.Items.map((itm, index) => (
                        <div
                          className="justify-between lg:flex lg:flex-col gap-8"
                          key={index}
                        >
                          {itm.ReferenceType !== ReferenceType.Vehicle && (
                            <div className="flex w-full">
                              <div className="lg:text-[1.375rem] font-bold w-1/2">
                                {t(LabelConstants.ITEMS)}
                              </div>
                            </div>
                          )}
                          {(itm.ReferenceType === ReferenceType.B2BPackage ||
                            itm.ReferenceType === ReferenceType.B2CPackage) && (
                            <PackageOrderItem
                              item={itm}
                              index={index}
                              initialLoad={initialLoad}
                              showRestrictUserText={showRestrictUserText}
                              setShowRestrictUserDropdown={
                                setShowRestrictUserDropdown
                              }
                              orderId={data?.OrderId}
                              setMyOrders={setMyOrders}
                            />
                          )}
                          {itm.ReferenceType === ReferenceType.B2CService && (
                            <ServiceOrderItem
                              item={itm}
                              index={index}
                              initialLoad={initialLoad}
                            />
                          )}
                          {itm.ReferenceType === ReferenceType.Vehicle && (
                            <VehicleOrderItem
                              item={itm}
                              index={index}
                              BalanceAmount={data.BalanceAmount}
                              BookingAmount={data.MinimumPaymentAmount}
                              VehicleStatus={data.OrderStatusChangeReason}
                              orderId={data.OrderId}
                              totalAmount={data.TotalAmount}
                            />
                          )}
                          {data.Items.length !== index + 1 && (
                            <hr className="my-4 lg:my-0" />
                          )}
                          {itm.StatusKey === OrderItemStatus.ACTIVE &&
                            itm.IsVehicleSubmitted &&
                            itm.IsUpgradedFromSelfListedPackage &&
                            itm.IsAvailableForInspection && (
                              <h1 className="my-5 text-base text-primary leading-5">
                                {
                                  disclaimerText[
                                    CMSConstants.UPGRADE_PACKAGE_SCHEDULE
                                  ]
                                }
                              </h1>
                            )}

                          {itm.StatusKey === OrderItemStatus.ACTIVE &&
                            itm.IsUpgraded &&
                            itm.VehicleListingStatusKey ===
                              ListingStatus.Saved && (
                              <h1 className="my-5 text-base text-primary leading-5">
                                {
                                  disclaimerText[
                                    CMSConstants.UPGRADE_PACKAGE_SUCCESS
                                  ]
                                }
                              </h1>
                            )}

                          {itm.StatusKey !== OrderItemStatus.CANCELLED &&
                            itm.ReferenceType !== ReferenceType.Vehicle && (
                              <div className="text-[#FF8300] mt-8">
                                {t(LabelConstants.SERVICE_NOTE)}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </>
          {showRestrictUserDropdown && (
            <ShowRestrictUserDropdown
              showDropdown={showRestrictUserDropdown}
              setShowDropdown={setShowRestrictUserDropdown}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MyOrders;

export const getStaticProps: GetStaticProps = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
