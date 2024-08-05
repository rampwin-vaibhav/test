import { useRouter } from 'next/router';
import { CircularOrangeTickMarkIcon } from '../../icons';
import { LabelConstants } from '../../../types/i18n.labels';
import { OrderItems } from '../../../types/models';
import { useTranslation } from 'next-i18next';

type VehicleTypeProps = {
  item: OrderItems;
  index: number;
  BalanceAmount: number;
  BookingAmount: number;
  VehicleStatus: string | null;
  orderId: number;
  totalAmount: number;
};

const VehicleOrderItem = ({
  item,
  index,
  BalanceAmount,
  BookingAmount,
  VehicleStatus,
  orderId,
  totalAmount,
}: VehicleTypeProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div>
      <div>
        <div className="lg:flex lg:flex-col gap-8">
          <div className="flex flex-col gap-4" key={index}>
            <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between">
              <div className="flex w-full">
                <div className="w-full flex md:flex-row flex-col">
                  <div className="flex md:w-[50%] w-full flex-row gap-3">
                    <div className="w-1/2">
                      <picture className="">
                        <source srcSet={item.VehicleProfileImageUrl} />
                        <img
                          src={
                            item.VehicleProfileImageUrl ||
                            '/images/default-car.jpg'
                          }
                          alt="vehicle image"
                          className="aspect-[16/9] w-[20.5rem] rounded-md object-cover"
                          onError={(event: any) => {
                            event.target.src = '/images/default-car.jpg';
                            event.onerror = null;
                          }}
                        />
                      </picture>
                    </div>
                    <div className="flex w-1/2 flex-col justify-between gap-2">
                      <div className="flex flex-col gap-10 h-full">
                        <div className="flex flex-col gap-8">
                          <div className="flex flex-col gap-2">
                            <div className="lg:text-[1.625rem] font-bold ">
                              {item.DisplayName}
                            </div>
                            <div className="flex items-center flex-wrap gap-5 text-dark-gray2">
                              <span>{`${t(LabelConstants.LBL_VEHICLE_ID)} - ${
                                item.ProductReferenceId
                                  ? String(item.ProductReferenceId).padStart(
                                      8,
                                      '0'
                                    )
                                  : ''
                              }`}</span>
                              <span>{`${t(LabelConstants.BOOKING_ID)} - ${
                                item.VehicleBookingId
                                  ? String(item.VehicleBookingId).padStart(
                                      8,
                                      '0'
                                    )
                                  : ''
                              }`}</span>
                            </div>
                          </div>

                          <div className="flex text-base">
                            <span className="text-dark-gray1 font-normal">{`${t(
                              LabelConstants.STATUS
                            )}- `}</span>
                            {VehicleStatus && (
                              <span className="text-primary font-bold">
                                {VehicleStatus}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center flex-wrap gap-2 text-primary font-bold">
                          {item?.VehicleServices?.map((item, id) => {
                            return (
                              <div key={id} className="flex items-center gap-1">
                                <span>
                                  <CircularOrangeTickMarkIcon
                                    className="h-4 w-4"
                                    fill="#00AF07"
                                  />
                                </span>
                                {item.DisplayName}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-[50%] w-full flex flex-col justify-between">
                    <div className="w-full flex justify-end">
                      <div className="flex w-[25.875rem] flex-col gap-3">
                        <div className="flex justify-end font-bold text-2xl text-dark-gray1">{`${t(
                          LabelConstants.SAR
                        )} ${totalAmount}`}</div>
                        {!item?.IsFinance ? (
                          <div className="flex justify-between">
                            <span className="text-dark-gray1 font-normal text-base">
                              {t(LabelConstants.BOOKING_AMOUNT)}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-dark-gray1 font-normal text-base">{`(${t(
                                LabelConstants.SAR
                              )} ${BookingAmount})`}</span>
                              <span className="text-dark-gray2 text-end font-normal text-sm">
                                {t(LabelConstants.INCLUSIVE_VAT)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        <hr className="my-2" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 justify-end">
                      <div className="w-full flex justify-end">
                        <div className="flex justify-between w-[25.875rem]">
                          <span className="text-primary font-bold text-large">
                            {t(LabelConstants.BALANCE_AMOUNT)}
                          </span>
                          <div className="flex flex-col">
                            <span className="text-primary font-bold text-large">{`${t(
                              LabelConstants.SAR
                            )} ${BalanceAmount}`}</span>
                            <span className="text-dark-gray2 text-end font-normal text-sm">
                              {t(LabelConstants.INCLUSIVE_VAT)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row flex-wrap gap-2 justify-end items-center">
                        {item?.BookingPeriod ? (
                          <>
                            <div className="flex gap-3 justify-end items-center w-auto">
                              <div className="color-border-box">
                                <div className="text-red-600 text-lg font-black">
                                  {item?.BookingPeriod}
                                </div>
                              </div>
                              <div className="leading-0 text-sm font-semibold w-[12rem]">
                                {t(
                                  LabelConstants.DAYS_REMAINING_TO_COMPLETE_PAYMENT
                                )}
                              </div>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        <button
                          className="btn btn-secondary sm:btn-sm btn-auto uppercase"
                          onClick={() => {
                            router.push({
                              pathname: `/view-breakup/${item?.PackageSubscriptionId}`,
                            });
                          }}
                        >
                          {t(LabelConstants.VIEW_BREAK_UP)}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VehicleOrderItem;
