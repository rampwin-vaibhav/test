import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { LabelConstants } from '../../../types/i18n.labels';
import {
  AddIcon,
  DeleteCartIcon,
  EditIcon,
  GrayIcon,
  SuccessIcon,
} from '../../icons';
import { ArrowUpIcon } from '../../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import { useTranslation } from 'next-i18next';
import {
  AddToCartPayload,
  CartData,
  CartItem,
  DeliveryServiceResponse,
  ExtendedWarrantyArray,
  RemoveCartPayload,
  VasResponse,
} from '../../../types/models';
import {
  CommonUtils,
  SessionUtils,
  formatNumber,
} from '../../../helpers/utilities';
import { ProductReferenceType } from '../../../types/enums';
import { PackageSubscription } from '../../../helpers/services';
import { useRouter } from 'next/router';
import { PricingMethod, ServiceName } from '../../../types/constants';

type VehicleCartItemProps = {
  cartItem: CartItem;
  vasServiceData: Array<VasResponse>;
  handleAddVAS: (payload: AddToCartPayload) => void;
  handleRemoveVAS: (payload: RemoveCartPayload) => void;
  callBack: (cartItemId: number, cartId: number, name: string) => void;
  setLoader: (value: SetStateAction<boolean>) => void;
  cartItemsData: CartData;
  setExtendedWarrantyData: Dispatch<SetStateAction<ExtendedWarrantyArray[]>>;
  extendedWarrantyData: Array<ExtendedWarrantyArray>;
  reloadShoppingCart: () => void;
};

const ShoppingCartVehicleCard = ({
  cartItem,
  vasServiceData,
  handleAddVAS,
  handleRemoveVAS,
  callBack,
  setLoader,
  cartItemsData,
  reloadShoppingCart,
  setExtendedWarrantyData,
  extendedWarrantyData,
}: VehicleCartItemProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [vehicleIndex, setVehicleIndex] = useState<number>();
  const [collapse, setCollapse] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [tintingPrice, setTintingPrice] = useState(0);
  const [hour, setHour] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const [homeAddressData, setHomeAddressData] =
    useState<DeliveryServiceResponse | null>(null);
  const user = SessionUtils.getUserDetails();

  const getHoursAndMins = useCallback(() => {
    const currentUtCTime = new Date().toISOString();
    const expiryUtcTime = cartItemsData?.CartExpiryDate;
    const timeDifferenceMs =
      new Date(`${expiryUtcTime}Z`).getTime() -
      new Date(currentUtCTime).getTime();
    if (timeDifferenceMs > 0) {
      const hoursDifference: number = Math.floor(
        timeDifferenceMs / (1000 * 60 * 60)
      );
      const minutesDifference: number = Math.floor(
        (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const secondDifference: number = Math.floor(
        (timeDifferenceMs % (1000 * 60)) / 1000
      );
      setHour(hoursDifference);
      setMins(minutesDifference);
      setSec(secondDifference);
    } else {
      setHour(0);
      setMins(0);
      setSec(0);
      reloadShoppingCart();
    }
  }, [cartItemsData?.CartExpiryDate, reloadShoppingCart]);

  useEffect(() => {
    let interval: NodeJS.Timer | null = null;
    if (cartItemsData.CartExpiryDate) {
      getHoursAndMins();
      interval = setInterval(() => {
        getHoursAndMins();
      }, 60000);
    } else {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [cartItemsData.CartExpiryDate, getHoursAndMins]);

  const showCollapse = async (vehicle: any, vid: number, item: VasResponse) => {
    if (collapse) {
      if (
        collapse
          ?.map((allCar: any) => allCar.VehicleListingId)
          .includes(vehicle.VehicleListingId)
      ) {
        const filteredVehicle = collapse?.filter(
          (allCar: any) =>
            allCar.VehicleListingId === vehicle.VehicleListingId &&
            !allCar.showEmpty
        );

        setCollapse([...filteredVehicle]);
      } else {
        const filteredVehicle: any =
          collapse && collapse.length
            ? collapse.filter((allCar: any) => !allCar.showEmpty)
            : [];
        filteredVehicle?.push(vehicle);
        setCollapse([...filteredVehicle]);
      }
    }
    if (vid === vehicleIndex) {
      setOpen(!open);
    } else {
      setOpen(true);
    }
    setVehicleIndex(item?.ServiceId);
    if (item.ServiceName === ServiceName?.ExtendedWarranty) {
      if (extendedWarrantyData && extendedWarrantyData.length === 0) {
        setLoader(true);
        const extendedWarrantyRes =
          await PackageSubscription.getWarrantyService(
            cartItem.ShoppingCartId,
            cartItem?.VehicleListingId,
            user?.UserId!
          );
        setLoader(false);
        setExtendedWarrantyData(extendedWarrantyRes);
      }
    }
    if (item.ServiceName === ServiceName?.TintingServices) {
      if (tintingPrice === 0) {
        setLoader(true);
        const data = await PackageSubscription.getTintingServices(
          cartItem?.ShoppingCartId,
          cartItem?.VehicleListingId
        );
        setLoader(false);
        setTintingPrice(data?.DisplayPrice || 0);
      }
    }
    if (item.ServiceName === ServiceName?.HomeDelivery) {
      if (!homeAddressData) {
        setLoader(true);
        const homeAddressData =
          await PackageSubscription.getHomeDeliveryServices(
            cartItem?.ShoppingCartId,
            cartItem?.VehicleListingId,
            router.locale!
          );
        setLoader(false);
        setHomeAddressData(homeAddressData);
      }
    }
  };

  const addService = async (
    serviceId: number,
    referenecId: string | null = null
  ) => {
    const payload: AddToCartPayload = {
      ProductReferenceType: ProductReferenceType.B2CService,
      ProductReferenceId: serviceId,
      MarkedForFinance: cartItem?.MarkedForFinance,
      ParentId: cartItem.ShoppingCartItemId,
      VehicleListingId: cartItem?.VehicleListingId,
      ReferenceId: referenecId ? referenecId : null,
    };
    if (referenecId) {
      setLoader(true);
      await handleAddVAS(payload);
      const extendedWarrantyRes = await PackageSubscription.getWarrantyService(
        cartItem.ShoppingCartId,
        cartItem?.VehicleListingId,
        user?.UserId!
      );
      setLoader(false);
      setExtendedWarrantyData(extendedWarrantyRes);
    } else {
      handleAddVAS(payload);
    }
  };

  const removeService = async (
    serviceId: number,
    referenecId: string | null = null
  ) => {
    const shoppingCartItem = cartItem.Services.find(
      (x) => x.ServiceId === serviceId
    );
    if (shoppingCartItem) {
      const payload: RemoveCartPayload = {
        ShoppingCartItemId: shoppingCartItem.ShoppingCartItemId,
        ShoppingCartId: cartItem.ShoppingCartId,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
      };
      if (referenecId) {
        setLoader(true);
        await handleRemoveVAS(payload);
        const extendedWarrantyRes =
          await PackageSubscription.getWarrantyService(
            cartItem.ShoppingCartId,
            cartItem?.VehicleListingId,
            user?.UserId!
          );
        setLoader(false);
        setExtendedWarrantyData(extendedWarrantyRes);
      } else {
        handleRemoveVAS(payload);
      }
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="border rounded-[0.25rem] border-gray-300 min-[1920px]:w-[73.75rem]  w-full">
        <div className="p-[1.563rem] flex gap-6">
          <picture className="vehicle-image">
            <source srcSet={cartItem?.IconURL || '/images/default-car.jpg'} />
            <img
              src={cartItem?.IconURL || '/images/default-car.jpg'}
              alt="vehicle image"
              className="aspect-[16/9] w-[22.5rem] rounded-md object-cover"
              onError={(event: any) => {
                event.target.src = '/images/default-car.jpg';
                event.onerror = null;
              }}
            />
          </picture>

          <div className="w-full flex flex-col gap-1 justify-between">
            <div className="flex items-center justify-between">
              <div className="flex justify-start text-2xl font-bold leading-[1.5625rem] capitalize overflow-hidden text-dark-gray1">
                {`${cartItem?.Make ? cartItem?.Make : ''} ${
                  cartItem?.Model ? cartItem?.Model : ''
                }  ${cartItem?.Spec ? cartItem?.Spec : ''} ${
                  cartItem?.ModelYear ? cartItem?.ModelYear : ''
                }`}
              </div>
              <div className="text-primary font-bold whitespace-nowrap text-2xl">
                <span>{`${t(LabelConstants.SAR)} ${formatNumber(
                  cartItem.DisplayPrice,
                  2
                )}`}</span>
              </div>
            </div>
            <div className="flex items-center justify-between"></div>
            <div className="flex flex-col gap-4">
              <ul className="flex text-sm list-disc text-dark-gray2  flex-wrap gap-4 md:gap-[2.438rem] leading-[1.0625rem]">
                {cartItem?.BodyType ? (
                  <li className="list-disc first:list-none">
                    {cartItem?.BodyType}
                  </li>
                ) : (
                  <></>
                )}
                {cartItem?.FuelType ? (
                  <li className="list-disc first:list-none">
                    {cartItem?.FuelType}
                  </li>
                ) : (
                  <></>
                )}
                {cartItem?.Transmission ? (
                  <li className="list-disc first:list-none">
                    {cartItem?.Transmission}
                  </li>
                ) : (
                  <></>
                )}
              </ul>
            </div>
            <div className="flex gap-8 justify-between items-center pt-3">
              {hour > 0 || mins > 0 || sec > 0 ? (
                <div className="flex gap-4 items-center">
                  <div className="color-border-box w-16 !p-10 ">
                    <div className="text-red-600 absolute top-0 right-0 w-full h-full flex flex-col items-center justify-center text-lg font-black">
                      <div className="flex flex-col items-center">
                        <span>
                          {`${String(hour).padStart(2, '0')}:${String(
                            mins
                          ).padStart(2, '0')}`}
                        </span>
                        <div className="flex gap-3 h-1 items-center">
                          <span className="text-dark-gray2 text-[0.438rem]">
                            {t(LabelConstants.HOURS_LABEL)}
                          </span>
                          <span className="text-dark-gray2 text-[0.438rem]">
                            {t(LabelConstants.MINUTE_LABEL)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[18.938rem]">
                    <span className="text-sm flex flex-col text-primary font-bold">
                      {`${t(LabelConstants.TIME_TICKING_LABEL)}:`}
                    </span>
                    <span className="text-sm text-primary font-bold">
                      {t(LabelConstants.COMPLETE_YOUR_VEHICLE_PURCHASE)}
                    </span>
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div
                className="flex flex-row items-center justify-end gap-[0.313rem] cursor-pointer"
                onClick={() =>
                  callBack(
                    cartItem.ShoppingCartItemId,
                    cartItem.ShoppingCartId,
                    `${cartItem.Make ? cartItem.Make : ''} ${
                      cartItem.Model ? cartItem.Model : ''
                    } ${cartItem.Spec ? cartItem.Spec : ''} ${
                      cartItem.ModelYear ? cartItem.ModelYear : ''
                    }`
                  )
                }
              >
                <DeleteCartIcon className="w-5 h-8 " />
                <span className="underline text-lg text-error">
                  {t(LabelConstants.REMOVE)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {vasServiceData
        ?.filter((x) => x?.IsMandatory)
        ?.map((x, i) => (
          <div
            key={i}
            className={`border flex flex-col py-6 px-5 rounded-md  min-[1920px]:w-[73.75rem] border-gray-300 w-full`}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-primary font-bold text-large">
                {x?.DisplayName}
              </h1>
              {x.PricingMethod === PricingMethod.Free ? (
                <div className="flex gap-3 items-center">
                  <span className="text-primary font-bold text-large">
                    {t(LabelConstants.FREE)}
                  </span>
                </div>
              ) : x.Description === null && x.Disclaimer === null ? (
                <div className="flex gap-3 items-center">
                  <span className="text-primary font-bold text-large">{`${x.CurrencySymbol} ${x.DisplayPrice}`}</span>
                  {cartItem?.Services?.find(
                    (service) => service?.ServiceId === x.ServiceId
                  ) ? (
                    <SuccessIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <GrayIcon className="w-5 h-5" />
                  )}
                </div>
              ) : (
                <div className="flex gap-3 items-center">
                  <div
                    className="flex text-primary underline items-center gap-1 cursor-pointer"
                    onClick={() => showCollapse(cartItem, x?.ServiceId, x)}
                  >
                    <div>{t(LabelConstants.VIEW_DETAILS_LABEL)}</div>
                    <div className="flex flex-col justify-end">
                      <div>
                        {collapse
                          .map((car: any) => car.VehicleListingId)
                          .includes(cartItem?.VehicleListingId) &&
                        open &&
                        x?.ServiceId === vehicleIndex ? (
                          <ArrowUpIcon className="h-4 w-4 cursor-pointer text-primary" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 cursor-pointer text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                  {cartItem?.Services?.find(
                    (service) => service?.ServiceId === x.ServiceId
                  ) ? (
                    <SuccessIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <GrayIcon className="w-5 h-5" />
                  )}
                </div>
              )}
            </div>
            <div
              className={
                collapse
                  .map((car: any) => car.VehicleListingId)
                  .includes(cartItem?.VehicleListingId) &&
                open &&
                x.ServiceId === vehicleIndex
                  ? ''
                  : 'hidden'
              }
            >
              {x.ServiceName === ServiceName?.VehicleRegistration &&
                (x.DisplayPrice ? (
                  <div className="flex flex-col mt-3 gap-4">
                    <div className="flex w-full justify-between gap-4 items-center">
                      <span className="w-[80%]">{x?.Description}</span>

                      {x?.PricingMethod === PricingMethod.Static && (
                        <span className="text-primary font-bold w-[20%] text-large text-end">{` ${
                          x.CurrencySymbol
                        } ${formatNumber(x.DisplayPrice, 2)}`}</span>
                      )}
                    </div>
                    {x.Disclaimer && (
                      <span className="text-dark-gray2 text-sm">
                        {`${t(LabelConstants.DISCLAIMER)}: ${x.Disclaimer}`}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    {t(LabelConstants.VAS_SERVICE_ERROR_MESSAGE)}
                  </div>
                ))}
              {x.ServiceName === ServiceName?.RoadsideAssistance &&
                (x.DisplayPrice ? (
                  <div className="flex flex-col mt-3 gap-4">
                    <div className="flex w-full justify-between gap-4 items-center">
                      <span className="w-[80%]">{x?.Description}</span>

                      {x?.PricingMethod === PricingMethod.Static && (
                        <span className="text-primary font-bold w-[20%] text-large">{` ${
                          x.CurrencySymbol
                        } ${formatNumber(x.DisplayPrice, 2)}`}</span>
                      )}
                    </div>
                    {x.Disclaimer && (
                      <span className="text-dark-gray2 text-sm">
                        {`${t(LabelConstants.DISCLAIMER)}: ${x.Disclaimer}`}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    {t(LabelConstants.VAS_SERVICE_ERROR_MESSAGE)}
                  </div>
                ))}
            </div>
          </div>
        ))}
      {vasServiceData?.filter((x) => !x?.IsMandatory).length > 0 && (
        <span className="text-dark-gray1 text-large">
          {t(LabelConstants.CONSIDER_FOLLOWING_TEXT)}
        </span>
      )}
      {vasServiceData
        ?.filter((x) => !x?.IsMandatory)
        ?.map((x, i) => (
          <div
            key={i}
            className={`border flex flex-col py-6 px-5 rounded-md  min-[1920px]:w-[73.75rem]  w-full ${
              collapse
                .map((car: any) => car.VehicleListingId)
                .includes(cartItem?.VehicleListingId) &&
              open &&
              x?.ServiceId === vehicleIndex
                ? 'border-primary'
                : 'border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-primary font-bold text-large">
                {x?.DisplayName}
              </h1>
              {x.PricingMethod === PricingMethod.Free ? (
                <div className="flex gap-3 items-center">
                  <span className="text-primary font-bold text-large">
                    {t(LabelConstants.FREE)}
                  </span>
                </div>
              ) : (
                <div className="flex gap-3 items-center">
                  <div
                    className="flex text-primary underline cursor-pointer items-center gap-1"
                    onClick={() => showCollapse(cartItem, x?.ServiceId, x)}
                  >
                    <div>{t(LabelConstants.VIEW_DETAILS_LABEL)}</div>
                    <div className="flex flex-col justify-end">
                      <div>
                        {collapse
                          .map((car: any) => car.VehicleListingId)
                          .includes(cartItem?.VehicleListingId) &&
                        open &&
                        x?.ServiceId === vehicleIndex ? (
                          <ArrowUpIcon className="h-4 w-4 cursor-pointer text-primary" />
                        ) : (
                          <ArrowDownIcon className="h-4 w-4 cursor-pointer text-primary" />
                        )}
                      </div>
                    </div>
                  </div>
                  {cartItem?.Services?.find(
                    (service) => service?.ServiceId === x.ServiceId
                  ) ? (
                    <SuccessIcon className="w-5 h-5 text-green-600" />
                  ) : (
                    <GrayIcon className="w-5 h-5" />
                  )}
                </div>
              )}
            </div>
            <div
              className={
                collapse
                  .map((car: any) => car.VehicleListingId)
                  .includes(cartItem?.VehicleListingId) &&
                open &&
                vehicleIndex === x?.ServiceId
                  ? ''
                  : 'hidden'
              }
            >
              {x.ServiceName === ServiceName?.RoadsideAssistance &&
                (x.DisplayPrice ? (
                  <div className="flex flex-col mt-3 gap-4">
                    <div className="flex w-full justify-between gap-4 items-center">
                      <span className="w-[80%]">{x?.Description}</span>

                      {x?.PricingMethod === PricingMethod.Static && (
                        <span className="text-primary font-bold w-[20%] text-large text-end">{` ${
                          x.CurrencySymbol
                        } ${formatNumber(x.DisplayPrice, 2)}`}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-end">
                      {cartItem?.Services?.find(
                        (service) => service?.ServiceId === x.ServiceId
                      ) ? (
                        <div
                          className="flex cursor-pointer bg-primary gap-1 rounded-md text-white items-center justify-center px-3 py-2 w-36"
                          onClick={() => removeService(x.ServiceId)}
                        >
                          <DeleteCartIcon className="w-4 h-4" fill="#ffffff" />
                          <span className="uppercase text-sm font-bold">
                            {t(LabelConstants.REMOVE)}
                          </span>
                        </div>
                      ) : (
                        <div
                          className="flex cursor-pointer bg-primary gap-1 rounded-md text-white items-center justify-center px-3 py-2 w-36"
                          onClick={() => addService(x.ServiceId)}
                        >
                          <AddIcon className="w-4 h-4" fill="#ffffff" />
                          <span className="uppercase text-sm font-bold">
                            {t(LabelConstants.ADD)}
                          </span>
                        </div>
                      )}
                    </div>
                    {x.Disclaimer && (
                      <span className="text-dark-gray2 text-sm">
                        {`${t(LabelConstants.DISCLAIMER)}: ${x.Disclaimer}`}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    {t(LabelConstants.VAS_SERVICE_ERROR_MESSAGE)}
                  </div>
                ))}

              {x.ServiceName === ServiceName?.ExtendedWarranty &&
                (extendedWarrantyData && extendedWarrantyData.length > 0 ? (
                  <div className="flex flex-col mt-3 gap-4">
                    <span>{x?.Description}</span>
                    <div className="grid grid-cols-5 gap-3">
                      {extendedWarrantyData?.map((y, i) => (
                        <div key={i}>
                          <div className="border-2 border-light-gray rounded-b-none border-b-0 rounded-md">
                            <div className="flex flex-col gap-1 p-4 items-center justify-center">
                              <span className="font-bold text-center text-sm min-h-[5rem] text-dark-gray1">
                                {y?.ExtensionName}
                              </span>
                              <span className="font-bold text-large text-center text-dark-gray1">
                                <span>{`${t(LabelConstants.SAR)} ${formatNumber(
                                  y?.DisplayPrice,
                                  2
                                )}`}</span>
                              </span>
                              <span className="text-sm text-dark-gray1">
                                {t(LabelConstants.INCLUSIVE_VAT)}
                              </span>
                            </div>
                          </div>
                          {extendedWarrantyData.filter((x) => x.IsSelected)
                            .length > 0 && y.IsSelected ? (
                            <div
                              className={`flex items-center cursor-pointer gap-2 p-2 justify-center border-2 border-t border-primary rounded-b-md ${
                                extendedWarrantyData.filter((x) => x.IsSelected)
                                  .length > 0 && !y.IsSelected
                                  ? 'bg-gray-300 pointer-events-none opacity-70 cursor-not-allowed'
                                  : 'bg-primary'
                              }`}
                              onClick={() =>
                                removeService(x.ServiceId, y.ReferenceNumber)
                              }
                            >
                              <DeleteCartIcon className="w-5 h-5" />
                              <span className="text-white text-lg uppercase font-bold">
                                {t(LabelConstants.REMOVE)}
                              </span>
                            </div>
                          ) : (
                            <div
                              className={`flex items-center cursor-pointer gap-2 p-2 justify-center border-2 border-t border-primary rounded-b-md ${
                                extendedWarrantyData.filter((x) => x.IsSelected)
                                  .length > 0 && !y.IsSelected
                                  ? 'bg-gray-300 pointer-events-none opacity-70 cursor-not-allowed'
                                  : ''
                              }`}
                              onClick={() =>
                                addService(x.ServiceId, y.ReferenceNumber)
                              }
                            >
                              <AddIcon className="w-5 h-5" />
                              <span className="text-primary text-lg uppercase font-bold">
                                {t(LabelConstants.ADD)}
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    {x.Disclaimer && (
                      <span className="text-dark-gray2 text-sm">
                        {`${t(LabelConstants.DISCLAIMER)}: ${x.Disclaimer}`}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    {t(LabelConstants.VAS_SERVICE_ERROR_MESSAGE)}
                  </div>
                ))}
              {x.ServiceName === ServiceName?.TintingServices &&
                (tintingPrice ? (
                  <div className="flex flex-col mt-3 gap-4">
                    <div className="flex justify-between items-center">
                      <span>{x?.Description}</span>

                      {tintingPrice > 0 && (
                        <span className="text-primary font-bold text-large">{` ${
                          x.CurrencySymbol
                        } ${formatNumber(tintingPrice, 2)}`}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-end">
                      {cartItem?.Services?.find(
                        (service) => service?.ServiceId === x.ServiceId
                      ) ? (
                        <div
                          className="flex cursor-pointer bg-primary gap-1 rounded-md text-white items-center justify-center px-3 py-2 w-36"
                          onClick={() => removeService(x.ServiceId)}
                        >
                          <DeleteCartIcon className="w-4 h-4" fill="#ffffff" />
                          <span className="uppercase text-sm font-bold">
                            {t(LabelConstants.REMOVE)}
                          </span>
                        </div>
                      ) : (
                        <div
                          className="flex cursor-pointer bg-primary gap-1 rounded-md text-white items-center justify-center px-3 py-2 w-36"
                          onClick={() => addService(x.ServiceId)}
                        >
                          <AddIcon className="w-4 h-4" fill="#ffffff" />
                          <span className="uppercase text-sm font-bold">
                            {t(LabelConstants.ADD)}
                          </span>
                        </div>
                      )}
                      <div className="text-lg text-dark-gray1">
                        <span>
                          {`${t(LabelConstants.PROVIDED_BY_LABEL)}: `}{' '}
                        </span>
                        <span className="font-bold">Xpel SCA Retail</span>
                      </div>
                    </div>
                    {x.Disclaimer && (
                      <span className="text-dark-gray2 text-sm">
                        {`${t(LabelConstants.DISCLAIMER)}: ${x.Disclaimer}`}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="mt-2">
                    {t(LabelConstants.VAS_SERVICE_ERROR_MESSAGE)}
                  </div>
                ))}
              {x.ServiceName === ServiceName?.HomeDelivery && (
                <div className="flex flex-col mt-3 gap-4">
                  <div className="flex items-center justify-between w-full">
                    <span className="w-[80%]">{x?.Description}</span>
                    {cartItem?.Services?.find(
                      (service) => service?.ServiceId === x.ServiceId
                    ) ? (
                      homeAddressData?.DisplayPrice && (
                        <span className="text-primary font-bold text-large w-[20%] text-end">{` ${
                          x.CurrencySymbol
                        } ${formatNumber(
                          homeAddressData?.DisplayPrice,
                          2
                        )}`}</span>
                      )
                    ) : (
                      <></>
                    )}
                  </div>

                  {cartItem?.Services?.find(
                    (service) => service?.ServiceId === x.ServiceId
                  ) ? (
                    <div className="flex flex-col gap-5">
                      {homeAddressData && (
                        <div className="flex gap-1 items-center">
                          <div className="text-dark-gray1 flex break-all text-base font-bold">
                            {`${homeAddressData?.StreatAddress}, ${homeAddressData.DistrictName}, ${homeAddressData.ToCityName}`}
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(
                                `/home-delivery?shoppingCartId=${cartItem?.ShoppingCartId}&vehicleListingId=${cartItem?.VehicleListingId}&serviceId=${x.ServiceId}&shoppingCartItemId=${cartItem?.ShoppingCartItemId}&cityId=${homeAddressData?.ToCityId}`
                              )
                            }
                          >
                            <EditIcon className="w-5 h-5" />
                          </div>
                        </div>
                      )}
                      <div
                        className="flex cursor-pointer bg-primary gap-1 rounded-md text-white items-center justify-center px-3 py-2 w-36"
                        onClick={() => removeService(x?.ServiceId)}
                      >
                        <DeleteCartIcon className="w-4 h-4" fill="#ffffff" />
                        <span className="uppercase text-sm font-bold">
                          {t(LabelConstants.REMOVE)}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-5">
                      <span className="text-dark-gray1 font-bold">
                        {t(LabelConstants.ADD_DELIVERY_ADDRESS)}
                      </span>
                      <div
                        className="flex cursor-pointer bg-primary gap-1 rounded-md text-white items-center justify-center px-3 py-2 w-36"
                        onClick={() =>
                          router.push(
                            `/home-delivery?shoppingCartId=${cartItem?.ShoppingCartId}&vehicleListingId=${cartItem?.VehicleListingId}&serviceId=${x.ServiceId}&shoppingCartItemId=${cartItem?.ShoppingCartItemId}`
                          )
                        }
                      >
                        <AddIcon className="w-4 h-4" fill="#ffffff" />
                        <span className="uppercase text-sm font-bold">
                          {t(LabelConstants.ADD_ADDRESS)}
                        </span>
                      </div>
                    </div>
                  )}
                  {x.Disclaimer && (
                    <span className="text-dark-gray2 text-sm">
                      {`${t(LabelConstants.DISCLAIMER)}: ${x.Disclaimer}`}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShoppingCartVehicleCard;
