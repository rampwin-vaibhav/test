import moment from 'moment';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { formatNumber, SessionUtils } from '../../../helpers/utilities';
import {
  ConfigurationKey,
  ProductReferenceType,
  UserProfileStatus,
  VASServiceType,
} from '../../../types/enums';
import { LabelConstants } from '../../../types/i18n.labels';
import {
  AddToCartPayload,
  QuotationResultItem,
  ServiceResponse,
  VehicleDetails,
} from '../../../types/models';
import {
  CalendarIcon,
  NextIcon,
  OdometerIcon,
  OwnerIcon,
  PetrolIcon,
  PrevIcon,
  SuccessIcon,
  TransmissionIcon,
} from '../../icons';
import SellerDetailsModal from '../../used-cars/SellerDetailsModal';
import MessageBox, { MessageBoxResult, MessageBoxType } from '../MessageBox';
import Ribbon from '../Ribbon';
import { ArrowUpIcon } from '../../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../../icons/ArrowDownIcon';
import QuotationServiceSliderItem from './QuotationServiceSliderItem';
import { ListingService } from '../../../helpers/services';
import { useAppContext } from '../../../provider/AppProvider';
import ConfigurationService from '../../../helpers/services/configuration.service';

type QuotationVehicleCardProps = {
  vehicle: VehicleDetails;
  quotationsData: QuotationResultItem;
  elmConfiguration?: {
    userConfig: {
      absherVerification: boolean;
      addressVerification: boolean;
      isAbsherVerified: boolean;
      isYakeenVerified: boolean;
      status: UserProfileStatus;
      isActive: boolean;
    };
    globalConfig: { absherVerification: boolean; addressVerification: boolean };
  };
  setSignInRequired: () => void;
  isNewCarEnabled: string;
  sliderData: Array<ServiceResponse>;
  addToShoppingCart: (items: Array<AddToCartPayload>) => void;
};

const QuotationItemVehicleCard = ({
  vehicle,
  setSignInRequired,
  elmConfiguration,
  isNewCarEnabled,
  quotationsData,
  sliderData,
  addToShoppingCart,
}: QuotationVehicleCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const sRef = React.useRef<any>();
  const [openSellerDetailsModal, setOpenSellerDetailsModal] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const [vehicleId, setVehicleId] = useState<number>(0);
  const [scrollX, setScrollX] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState<Array<number>>([]);
  const { dateFormat } = useAppContext();

  useEffect(() => {
    const user = SessionUtils.getUserDetails();
    if (user) {
      setUserId(user.UserId);
    }
  }, []);

  useEffect(() => {
    const handleAuth = () => {
      const isPageActive = !document.hidden;
      if (isPageActive) {
        const isAuthenticated = SessionUtils.isValidSession();
        if (!isAuthenticated && openSellerDetailsModal) {
          setSignInRequired();
          setOpenSellerDetailsModal(false);
        }
      }
    };
    document.addEventListener('visibilitychange', handleAuth);
    return () => {
      document.removeEventListener('visibilitychange', handleAuth);
    };
  }, [setSignInRequired, openSellerDetailsModal]);

  const groupByKey = <T extends unknown>(
    list: Array<T>,
    key: keyof T
  ): { [x: string]: Array<T> } =>
    list.reduce(
      (hash: any, obj: any) => ({
        ...hash,
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      }),
      {}
    );

  const getSelectedServiceVariant = (
    list: Array<ServiceResponse>
  ): ServiceResponse | undefined => {
    let selectedVariant: ServiceResponse | undefined;
    if (list && list.length > 0) {
      selectedVariant = list.find(
        (y) =>
          quotationsData.Services.findIndex(
            (x) => x.ServiceId === y.ServiceId
          ) !== -1
      );
      if (!selectedVariant) {
        selectedVariant = list.find((x) =>
          selectedServiceId.includes(x.ServiceId)
        );
      }
      if (!selectedVariant) {
        selectedVariant = list.find((x) => x.IsDefaultVariant);
      }

      if (!selectedVariant) {
        selectedVariant = list[0];
      }
    }
    return selectedVariant;
  };

  const slide = (shift: any, ref: any) => {
    ref.current.scrollLeft += shift;
    setScrollX(scrollX + shift);
  };

  const sellerDetailsClickHandler = async () => {
    if (SessionUtils.isValidSession() && elmConfiguration) {
      const identityVerificationCheckData =
        await ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.BypassIdentityVerificationCheckToViewSellerDetails,
          router.locale
        );
      if (
        identityVerificationCheckData.ConfigurationValue.toLowerCase() ===
        'true'
      ) {
        localStorage.removeItem('SignInRedirectOperation');
        return setOpenSellerDetailsModal(true);
      }
      if (!elmConfiguration.userConfig.isActive) {
        /**
         * check user identity verification with global and user level validation
         */
        await MessageBox.open({
          content: `${t(LabelConstants.PROFILE_INACTIVE_ACTIVATE_TO_PROCEED)}`,
        });
        router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status == UserProfileStatus.YetToCreate
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        const result = await MessageBox.open({
          content: `${t(LabelConstants.PROFILE_TO_CONTACT_SELLER)}`,
          type: MessageBoxType.Confirmation,
        });
        if (result === MessageBoxResult.Yes) router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status === UserProfileStatus.Draft
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        const result = await MessageBox.open({
          content: `${t(LabelConstants.VERIFY_PROFILE)}`,
          type: MessageBoxType.Confirmation,
        });
        if (result === MessageBoxResult.Yes) router.replace('/profile');
      } else if (
        elmConfiguration.userConfig.status === UserProfileStatus.Validated
      ) {
        /**
         * check user identity verification with global and user level validation
         */
        if (
          (!(
            !elmConfiguration.globalConfig.absherVerification ||
            !elmConfiguration.userConfig.absherVerification
          ) &&
            !elmConfiguration.userConfig.isAbsherVerified) ||
          (!(
            !elmConfiguration.globalConfig.addressVerification ||
            !elmConfiguration.userConfig.addressVerification
          ) &&
            !elmConfiguration.userConfig.isYakeenVerified)
        ) {
          /**
           * Show message to complete identity verification to view seller details.
           */
          const result = await MessageBox.open({
            content: `${t(
              LabelConstants.PLEASE_COMPLETE_IDENTITY_VERIFICATION
            )}`,
          });
          if (result === MessageBoxResult.OK) {
            router.push(
              `/identity-verification?redirectUrl=${router.asPath}`,
              undefined,
              {
                shallow: true,
              }
            );
          }
        } else {
          setOpenSellerDetailsModal(true);
        }
      }
    } else {
      setSignInRequired();
    }
  };

  const showCollapse = (vehicleId: number, value: boolean) => {
    if (value) {
      setVehicleId(vehicleId);
    } else {
      setVehicleId(0);
    }
  };

  const handleAddToCart = () => {
    addToShoppingCart(
      selectedServiceId.map((x) => ({
        ProductReferenceType: ProductReferenceType.B2CService,
        ProductReferenceId: x,
        VehicleListingId: vehicle.VehicleListingId,
      }))
    );
  };

  const updateSelectedServices = async (serviceId: Array<number>) => {
    // Added validation to avoid add MotorInsurance service, if ExtendedWarranty service already added to the cart for finance vehicle.

    const motorInsuranceService = sliderData.find(
      (x) =>
        serviceId.includes(x.ServiceId) &&
        x.ServiceType === VASServiceType.MotorInsurance
    );
    if (motorInsuranceService) {
      const extendedWarrantyService = quotationsData.Services.find(
        (x) =>
          sliderData.findIndex(
            (y) =>
              y.ServiceId === x.ServiceId &&
              y.ServiceType === VASServiceType.WarrantyService
          ) !== -1
      );
      if (extendedWarrantyService) {
        await MessageBox.open({
          content: t(LabelConstants.MOTOR_INSURANCE_WITH_FINANCE_WARNING_MSG),
        });
        return;
      }
    }
    setSelectedServiceId(serviceId);
  };

  return (
    <div className="rounded-md bg-white card-border">
      <div className="p-[1.25rem] flex flex-col sm:flex-row gap-[1.25rem]">
        <div className="relative">
          <Link
            href={`/car-details/${vehicle.Make.toLowerCase()}/${vehicle.Model.toLowerCase()}/${
              vehicle.VehicleListingId
            }?y=${vehicle.ModelYear ?? ''}`}
          >
            <a
              href={`/car-details/${vehicle.Make.toLowerCase()}/${vehicle.Model.toLowerCase()}/${
                vehicle.VehicleListingId
              }?y=${vehicle.ModelYear ?? ''}`}
            >
              <picture className="vehicle-image">
                <img
                  src={
                    vehicle.DefaultWebImageThumbnailUrlPath ||
                    vehicle.DefaultWebImageUrlPath ||
                    '/images/default-car.jpg'
                  }
                  alt=""
                  className="aspect-[16/9] rounded-lg object-cover w-full sm:w-[23.75rem]"
                  onError={(event: any) => {
                    event.target.src = '/images/default-car.jpg';
                    event.onerror = null;
                  }}
                />
              </picture>
              {isNewCarEnabled === 'true' && vehicle.IsNew && (
                <div className="absolute top-0 rtl:right-0 ltr:left-0">
                  <Ribbon />
                </div>
              )}
            </a>
          </Link>
        </div>
        <div className="w-full">
          <div className="pb-2 flex justify-between flex-wrap items-center">
            <Link
              href={`/car-details/${vehicle.Make.toLowerCase()}/${vehicle.Model.toLowerCase()}/${
                vehicle.VehicleListingId
              }?y=${vehicle.ModelYear ?? ''}`}
            >
              <a
                href={`/car-details/${vehicle.Make.toLowerCase()}/${vehicle.Model.toLowerCase()}/${
                  vehicle.VehicleListingId
                }?y=${vehicle.ModelYear ?? ''}`}
                className="text-[1.875rem] font-bold capitalize overflow-hidden text-dark-gray1"
              >{`${vehicle.Make ? vehicle.Make : '-'} ${
                vehicle.Model ? vehicle.Model : '-'
              } ${vehicle.Spec ? vehicle.Spec : ''}`}</a>
            </Link>
            <div className="text-[1.875rem] text-dark-gray1">
              <span className="inline-block mr-1 font-bold">
                {`${t(LabelConstants.SAR)}`}
              </span>
              <span className="font-bold">
                {`${
                  vehicle.DisplayPrice
                    ? formatNumber(vehicle.DisplayPrice, 2)
                    : '-'
                }`}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex text-base flex-wrap">
              <div className="flex items-center mb-1 sm:mb-0 pr-5 text-dark-gray2">
                {`${t(LabelConstants.VEHICLE_ID)} - ${
                  vehicle.VehicleListingId
                    ? String(vehicle.VehicleListingId).padStart(8, '0')
                    : '-'
                }`}
              </div>
              <div className="flex gap-5 text-primary leading-[1.0625rem]">
                <div className="flex items-center">{`${t(
                  LabelConstants.QUOTATION
                )} - ${
                  quotationsData.QuotationNumber
                    ? String(quotationsData.QuotationNumber)
                    : '-'
                }`}</div>
                <div className="flex items-center">
                  {`${t(LabelConstants.DATE)} - ${
                    quotationsData.QuotationDate
                      ? moment(quotationsData.QuotationDate).format(dateFormat)
                      : '-'
                  }`}
                </div>
              </div>
            </div>
            <div className="text-primary text-[1rem]">
              {`${t(LabelConstants.STATUS)} - ${
                quotationsData.QuotationStatusForUser
                  ? quotationsData.QuotationStatusForUser
                  : ''
              }`}
            </div>
            <div className="flex sm:text-[1.125rem] text-dark-gray2 gap-4 md:gap-[3.806rem] flex-wrap">
              <div className="flex items-center gap-1">
                <OdometerIcon />
                {`${vehicle.Mileage ? formatNumber(vehicle.Mileage) : 0} ${t(
                  LabelConstants.KM
                )}`}
              </div>
              <div className="flex items-center gap-1">
                <PetrolIcon />
                {`${vehicle.FuelType ? vehicle.FuelType : '-'}`}
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon />
                {`${vehicle.ModelYear ? vehicle.ModelYear : '-'}`}
              </div>
              <div className="flex items-center gap-1">
                <OwnerIcon />
                {`${vehicle.OwnerShip ? vehicle.OwnerShip : '-'}`}
              </div>
              <div className="flex items-center gap-1">
                <TransmissionIcon />
                {`${vehicle.Transmission ? vehicle.Transmission : '-'}`}
              </div>
            </div>
          </div>
          <div className="mt-5">
            {quotationsData.Services.map((x, i) => (
              <div className="flex justify-between items-center" key={i}>
                <div className="flex items-center gap-[0.6rem]">
                  <div>
                    <SuccessIcon className="h-4 w-4 text-selection" />
                  </div>
                  <div className="text-[1.125rem] text-primary font-bold w-[15rem] sm:w-[auto]">
                    {x.DisplayName}
                  </div>
                </div>
                <div>
                  <span className="inline-block mr-1 font-bold">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  <span className="font-bold">
                    {`${
                      x.DisplayPrice ? formatNumber(x.DisplayPrice, 2) : '-'
                    }`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <div className="p-[1.25rem] flex flex-col sm:flex-row gap-[1.25rem]">
        {userId !== String(quotationsData.SellerId) && (
          <div
            id="seller-details"
            className="cursor-pointer bg-gradient text-base leading-5 rounded-md px-[0.625rem] text-center py-4 md:py-[1rem] uppercase md:w-[23.75rem] font-bold whitespace-nowrap"
            onClick={sellerDetailsClickHandler}
          >
            {t(LabelConstants.SELLER_DETAILS)}
          </div>
        )}
        <div className="w-full">
          <div className="flex justify-between">
            <div className="font-bold text-primary md:text-[1.625rem]">
              {t(LabelConstants.TOTAL_QUOTATION_AMOUNT)}
            </div>
            <div
              className="md:text-[1.875rem] leading-[1.5625rem] text-primary whitespace-nowrap flex flex-row gap-2"
              dir="ltr"
            >
              <div>
                <div>
                  <span className="inline-block mr-1 font-bold">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  <span className="font-bold">
                    {`${
                      quotationsData.QuotationAmount
                        ? formatNumber(quotationsData.QuotationAmount, 2)
                        : '-'
                    }`}
                  </span>
                </div>
                <div className="text-sm md:text-[1.125rem] text-dark-gray2 px-1 flex justify-end mt-1">
                  {t(LabelConstants.INCLUSIVE_VAT)}
                </div>
              </div>
              {quotationsData.IsVASPurchaseAvailable && (
                <div>
                  {vehicleId === vehicle.VehicleListingId ? (
                    <div
                      onClick={() =>
                        showCollapse(vehicle.VehicleListingId, false)
                      }
                    >
                      <ArrowUpIcon className="h-4 w-4 cursor-pointer text-primary" />
                    </div>
                  ) : (
                    <div
                      onClick={() =>
                        showCollapse(vehicle.VehicleListingId, true)
                      }
                    >
                      <ArrowDownIcon className="h-4 w-4 cursor-pointer text-primary" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {quotationsData.IsVASPurchaseAvailable &&
        vehicleId === vehicle.VehicleListingId && (
          <div className="flex min-[1148px]:flex-row flex-col gap-4 justify-between p-3">
            <div className="flex flex-row items-center justify-between gap-1 lg:w-[71.75rem] w-full">
              <div className="bg-white w-[2.063rem] h-[2.063rem] rounded-full flex items-center justify-center shadow-md">
                <button
                  className=" text-princeton-orange text-center disabled:opacity-95 disabled:cursor-not-allowed"
                  onClick={() => {
                    if (scrollX !== 0) {
                      slide(-300, sRef);
                    }
                  }}
                >
                  <PrevIcon className="w-4 h-4" />
                </button>
              </div>
              <div ref={sRef} className="shopping-slider w-full">
                {Object.values(groupByKey(sliderData || [], 'ServiceType')).map(
                  (list: Array<ServiceResponse>, i: any) => {
                    const service: ServiceResponse | undefined =
                      getSelectedServiceVariant(list);
                    const isSelected: boolean =
                      quotationsData.Services.findIndex(
                        (x) => x.ServiceId === service?.ServiceId
                      ) !== -1;
                    if (!service) return <></>;
                    return (
                      <div key={i}>
                        <QuotationServiceSliderItem
                          service={service}
                          list={list}
                          isSelected={isSelected}
                          // isDisabled={false}
                          cartItem={quotationsData}
                          selectedServiceId={selectedServiceId}
                          updateSelectedServices={(x) =>
                            updateSelectedServices(x)
                          }
                        />
                      </div>
                    );
                  }
                )}
              </div>
              <div className="bg-white w-[2.063rem] h-[2.063rem] rounded-full flex items-center justify-center shadow-md">
                <button
                  className="left-0 text-princeton-orange text-center disabled:opacity-95 disabled:cursor-not-allowed"
                  onClick={() => slide(+300, sRef)}
                >
                  <NextIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              className="flex items-center justify-center"
              onClick={() => handleAddToCart()}
            >
              <button
                className="btn btn-primary"
                disabled={selectedServiceId.length === 0}
              >
                {t(LabelConstants.ADD_TO_CART)}
              </button>
            </div>
          </div>
        )}
      {/* Seller Details Modal */}
      <SellerDetailsModal
        show={openSellerDetailsModal}
        onClose={() => setOpenSellerDetailsModal(false)}
        listingId={vehicle.VehicleListingId}
      />
    </div>
  );
};

export default QuotationItemVehicleCard;
