import { useRouter } from 'next/router';
import { PackageIcon } from '../../icons';
import { LabelConstants } from '../../../types/i18n.labels';
import { MyOrdersData, OrderItems } from '../../../types/models';
import { useTranslation } from 'next-i18next';
import { ListingStatus } from '../../../types/enums';
import { SetStateAction, useState } from 'react';
import {
  OrderItemStatus,
  StatusAllowedForUpgrade,
} from '../../../types/constants';
import InspectionAppointmentModal from '../../dashboard/InspectionAppointmentModal';
import { RequestRefund } from '../../../types/constants';
import InstantRefundModal from './InstantRefundModal';
import { OrderService } from '../../../helpers/services';

type PackageTypeProps = {
  item: OrderItems;
  index: number;
  initialLoad: () => Promise<void>;
  setShowRestrictUserDropdown: (value: SetStateAction<boolean>) => void;
  showRestrictUserText: string;
  orderId: number;
  setMyOrders: (value: Array<MyOrdersData>) => void;
};

const PackageOrderItem = ({
  item,
  index,
  initialLoad,
  setShowRestrictUserDropdown,
  showRestrictUserText,
  orderId,
  setMyOrders,
}: PackageTypeProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [showBuyInspectionPopUp, setShowBuyInspectionPopUp] =
    useState<boolean>(false);
  const [listingId, setListingId] = useState<number>(-1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [itemData, setItemData] = useState<OrderItems>();

  const handleRefundClick = async (item: OrderItems) => {
    const data = await OrderService.checkEligibilityForRefund(
      Number(item.OrderItemId)
    );
    setItemData(item);
    if (data.IsEligibleForFullRefund) {
      setOpenModal(true);
    } else {
      router.push({
        pathname: '/info/contact-us',
        query: `orderItemId=${item.OrderItemId}`,
      });
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 lg:hidden">
        <div className="flex gap-4 w-full">
          <div>
            {item.IconURL ? (
              <picture className="w-full">
                <img
                  src={item.IconURL}
                  alt="package icon"
                  className="w-full aspect-[16/9] object-cover"
                  onError={(event: any) => {
                    event.target.src = '/images/default-car.jpg';
                    event.onerror = null;
                  }}
                />
              </picture>
            ) : (
              <PackageIcon className="h-[8rem] w-[8rem]" />
            )}
          </div>
          <div className="flex flex-col gap-3 w-full justify-between">
            <div>
              <div className="lg:text-[1.625rem] font-bold ">
                {item.DisplayName}
              </div>
              <div>{item.Description}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex items-center flex-wrap gap-4">
            {/**Currently hided list a vehicle button button */}
            {/* {item.StatusKey === OrderItemStatus.ACTIVE &&
              (!item.VehicleListingId ||
                item.VehicleListingStatusKey === ListingStatus.Saved) && (
                <button
                  className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                  onClick={() => {
                    if (
                      item.IsSelfListedPackage &&
                      showRestrictUserText === 'true'
                    ) {
                      setShowRestrictUserDropdown(true);
                    } else {
                      router.push({
                        pathname: `${
                          item.VehicleListingId
                            ? `/vehicle-onboard/${item.VehicleListingId}`
                            : '/vehicle-onboard'
                        }`,
                        search: `p_id=${item.PackageReferenceId}&OrderItemId=${item.OrderItemId}`,
                      });
                    }
                  }}
                >
                  {t(LabelConstants.LIST_VEHICLE)}
                </button>
              )} */}
            {item.RefundStatusKey === RequestRefund.Refunded ||
            item.StatusKey === OrderItemStatus.CANCELLED ||
            item.CurrentAmount <= 0 ? (
              <></>
            ) : (
              <button
                className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                onClick={() => handleRefundClick(item)}
                disabled={
                  item.RefundStatusKey === RequestRefund.RequestRefundKey
                }
              >
                {t(LabelConstants.REQUEST_REFUND)}
              </button>
            )}
            {/* {item.StatusKey === OrderItemStatus.ACTIVE &&
              (!item.VehicleListingId ||
                StatusAllowedForUpgrade.includes(
                  item.VehicleListingStatusKey
                )) &&
              item.IsEligibleForUpgrade && (
                <button
                  className="btn bg-gradient btn-sm !w-[12.5rem] uppercase"
                  onClick={() =>
                    router.push(
                      `/select-package?CurrentPackageId=${item.PackageReferenceId}&IsUpgradePackage=true&OrderItemId=${item.OrderItemId}`
                    )
                  }
                >
                  {t(LabelConstants.UPGRADE_PACKAGE)}
                </button>
              )} */}
            {item.StatusKey === OrderItemStatus.ACTIVE &&
              item.IsVehicleSubmitted &&
              item.IsUpgradedFromSelfListedPackage &&
              item.IsAvailableForInspection && (
                <button
                  className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                  onClick={() => {
                    setShowBuyInspectionPopUp(true);
                    setListingId(item.VehicleListingId);
                  }}
                >
                  {t(LabelConstants.BTN_BOOK_APPOINTMENT)}
                </button>
              )}
            {item.RefundStatusKey === RequestRefund.RequestRefundKey && (
              <span>{t(LabelConstants.REFUND_ALREADY_REQUESTED)}</span>
            )}
            {item.StatusKey === OrderItemStatus.CANCELLED && (
              <div className="text-base">
                <div>{`${t(LabelConstants.STATUS)} : ${t(
                  LabelConstants.CANCELLED_LABEL
                )}`}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="lg:flex lg:flex-col gap-8 hidden">
          <div className="flex flex-col gap-4" key={index}>
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between">
              <div className="flex w-full">
                <div className="">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {item.IconURL ? (
                      <picture className="p-4 border">
                        <source srcSet={item.IconURL} />
                        <img
                          src={item.IconURL}
                          alt="package icon"
                          className="h-[8rem] w-[8rem]"
                          onError={(event: any) => {
                            event.target.src = '/images/default-car.jpg';
                            event.onerror = null;
                          }}
                        />
                      </picture>
                    ) : (
                      <PackageIcon className="h-[8rem] w-[8rem]" />
                    )}
                    <div className="flex flex-col justify-between gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="lg:text-[1.625rem] font-bold ">
                          {item.DisplayName}
                        </div>
                        <div className="">{item.Description}</div>
                      </div>
                      <div className="flex items-center flex-wrap gap-4">
                        {/**Currently hided list a vehicle button button */}
                        {/* {item.StatusKey === OrderItemStatus.ACTIVE &&
                          (!item.VehicleListingId ||
                            item.VehicleListingStatusKey ===
                              ListingStatus.Saved) && (
                            <button
                              className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                              onClick={() => {
                                if (
                                  item.IsSelfListedPackage &&
                                  showRestrictUserText === 'true'
                                ) {
                                  setShowRestrictUserDropdown(true);
                                } else {
                                  router.push({
                                    pathname: `${
                                      item.VehicleListingId
                                        ? `/vehicle-onboard/${item.VehicleListingId}`
                                        : '/vehicle-onboard'
                                    }`,
                                    search: `p_id=${item.PackageReferenceId}&OrderItemId=${item.OrderItemId}`,
                                  });
                                }
                              }}
                            >
                              {t(LabelConstants.LIST_VEHICLE)}
                            </button>
                          )} */}
                        {item.RefundStatusKey === RequestRefund.Refunded ||
                        item.StatusKey === OrderItemStatus.CANCELLED ||
                        item.CurrentAmount <= 0 ? (
                          <></>
                        ) : (
                          <button
                            className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                            onClick={() => handleRefundClick(item)}
                            disabled={
                              item.RefundStatusKey ===
                              RequestRefund.RequestRefundKey
                            }
                          >
                            {t(LabelConstants.REQUEST_REFUND)}
                          </button>
                        )}
                        {/* {item.StatusKey === OrderItemStatus.ACTIVE &&
                          (!item.VehicleListingId ||
                            StatusAllowedForUpgrade.includes(
                              item.VehicleListingStatusKey
                            )) &&
                          item.IsEligibleForUpgrade && (
                            <button
                              className="btn bg-gradient btn-sm !w-[12.5rem] uppercase"
                              onClick={() =>
                                router.push(
                                  `/select-package?CurrentPackageId=${item.PackageReferenceId}&IsUpgradePackage=true&OrderItemId=${item.OrderItemId}`
                                )
                              }
                            >
                              {t(LabelConstants.UPGRADE_PACKAGE)}
                            </button>
                          )} */}

                        {item.StatusKey === OrderItemStatus.ACTIVE &&
                          item.IsVehicleSubmitted &&
                          item.IsUpgradedFromSelfListedPackage &&
                          item.IsAvailableForInspection && (
                            <button
                              className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                              onClick={() => {
                                setShowBuyInspectionPopUp(true);
                                setListingId(item.VehicleListingId);
                              }}
                            >
                              {t(LabelConstants.BTN_BOOK_APPOINTMENT)}
                            </button>
                          )}
                        {item.RefundStatusKey ===
                          RequestRefund.RequestRefundKey && (
                          <span>
                            {t(LabelConstants.REFUND_ALREADY_REQUESTED)}
                          </span>
                        )}
                      </div>
                      {item.StatusKey === OrderItemStatus.CANCELLED && (
                        <div className="text-base">
                          <div>{`${t(LabelConstants.STATUS)} : ${t(
                            LabelConstants.CANCELLED_LABEL
                          )}`}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* {data.paymentMethod && (
                      <div className="grid grid-cols-2 w-1/2">
                        <div></div>
                        <div className="lg:text-[1.625rem] font-bold text-center w-[5rem] lg:w-auto ml-8">
                          {`${t(LabelConstants.SAR)} ${formatNumber(
                            item.TaxCalculatedAmount
                          )}`}
                        </div>
                      </div>
                    )} */}
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

      {openModal && (
        <InstantRefundModal
          originalInvoiceId={orderId}
          amount={itemData?.CurrentAmount!}
          itemId={itemData?.OrderItemId!}
          subscriptionReferenceType={itemData?.SubscriptionReferenceType!}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onClose={() => initialLoad()}
          setMyOrders={setMyOrders}
        />
      )}
    </div>
  );
};
export default PackageOrderItem;
