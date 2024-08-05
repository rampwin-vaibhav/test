import { useRouter } from 'next/router';
import { ServiceIcon } from '../../icons';
import { LabelConstants } from '../../../types/i18n.labels';
import { OrderItems } from '../../../types/models';
import { useTranslation } from 'next-i18next';
import InspectionAppointmentModal from '../../dashboard/InspectionAppointmentModal';
import { useState } from 'react';
import { ListingStatus } from '../../../types/enums';

type ServiceTypeProps = {
  item: OrderItems;
  index: number;
  initialLoad: () => Promise<void>;
};

const ServiceOrderItem = ({ item, index, initialLoad }: ServiceTypeProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [showBuyInspectionPopUp, setShowBuyInspectionPopUp] =
    useState<boolean>(false);
  const [listingId, setListingId] = useState<number>(-1);

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
              <ServiceIcon className="h-[8rem] w-[8rem]" />
            )}
          </div>
          <div className="flex flex-col gap-3 w-full justify-between">
            <div>
              <div className="lg:text-[1.625rem] font-bold ">
                {item.DisplayName}
              </div>
              <div>{item.Description}</div>
            </div>
            <div className="flex justify-between"></div>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="flex items-center flex-wrap gap-4">
            {/* Task 12340: Hide BUY Inspection button from My Vehicles page for Silver Package flow */}
            {/* {item.VehicleListingStatusKey !== ListingStatus.Delisted &&
              item.VehicleListingStatusKey !== ListingStatus.Sold &&
              item.VehicleListingStatusKey !== ListingStatus.Deleted &&
              !item.IsBookingCompleted &&
              item.IsInspectionService && (
                <button
                  className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                  onClick={() => {
                    setShowBuyInspectionPopUp(true);
                    setListingId(item.VehicleListingId);
                  }}
                >
                  {t(LabelConstants.BTN_BOOK_APPOINTMENT)}
                </button>
              )} */}

            <button
              className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
              onClick={() => router.push('/info/contact-us')}
            >
              {t(LabelConstants.REQUEST_REFUND)}
            </button>
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
                      <ServiceIcon className="h-[8rem] w-[8rem]" />
                    )}

                    <div className="flex flex-col justify-between gap-2">
                      <div className="flex flex-col gap-2">
                        <div className="lg:text-[1.625rem] font-bold ">
                          {item.DisplayName}
                        </div>
                        <div className="">{item.Description}</div>
                        <div className="flex items-center">{`${t(
                          LabelConstants.VEHICLE_ID
                        )} - ${
                          item.OrderItemVehicleListingId
                            ? String(item.OrderItemVehicleListingId).padStart(
                                8,
                                '0'
                              )
                            : '-'
                        }`}</div>
                      </div>
                      <div className="flex items-center flex-wrap gap-4">
                        {/* Task 12340: Hide BUY Inspection button from My Vehicles page for Silver Package flow */}
                        {/* {item.VehicleListingStatusKey !==
                          ListingStatus.Delisted &&
                          item.VehicleListingStatusKey !== ListingStatus.Sold &&
                          item.VehicleListingStatusKey !==
                            ListingStatus.Deleted &&
                          !item.IsBookingCompleted &&
                          item.IsInspectionService && (
                            <button
                              className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                              onClick={() => {
                                setShowBuyInspectionPopUp(true);
                                setListingId(item.OrderItemVehicleListingId);
                              }}
                            >
                              {t(LabelConstants.BTN_BOOK_APPOINTMENT)}
                            </button>
                          )} */}
                        <button
                          className="btn btn-primary btn-sm !w-[12.5rem] uppercase"
                          onClick={() => router.push('/info/contact-us')}
                        >
                          {t(LabelConstants.REQUEST_REFUND)}
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
      {showBuyInspectionPopUp && (
        <InspectionAppointmentModal
          vehicleListingId={listingId}
          showBuyInspectionPopUp={showBuyInspectionPopUp}
          setShowBuyInspectionPopUp={setShowBuyInspectionPopUp}
          onClose={() => initialLoad()}
        />
      )}
    </div>
  );
};
export default ServiceOrderItem;
