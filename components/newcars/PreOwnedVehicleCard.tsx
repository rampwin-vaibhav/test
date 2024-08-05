import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { VehicleService } from '../../helpers/services';
import { formatNumber, SessionUtils } from '../../helpers/utilities';
import { PushDataToGTM } from '../../helpers/utilities/gtm';
import {
  ConfigurationKey,
  ListingStatus,
  Locales,
  UserProfileStatus,
} from '../../types/enums';
import { GTMEvents } from '../../types/gtm';
import { LabelConstants } from '../../types/i18n.labels';
import {
  BodyType,
  City,
  SearchAllResultItem,
  SearchBoolean,
  ProductType,
} from '../../types/models';
import {
  BookmarkIcon,
  FilledBookmarkIcon,
  FilledLocationIcon,
  FilledTransmissionIcon,
  MojazIcon,
  OdometerIcon,
  OwnerIcon,
  PetrolIcon,
  SpinCarIcon,
  SuccessIcon,
  TickIcon,
  VehicleDocIcon,
  VehiclePreownedIcon,
} from '../icons';
import SellerDetailsModal from '../used-cars/SellerDetailsModal';
import { useAppContext } from '../../provider/AppProvider';
import { SignInRedirectType } from '../../types/constants';
import Ribbon from '../common/Ribbon';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import { ImageWithFallback } from '../common/ImageWithFallback';
import ConfigurationService from '../../helpers/services/configuration.service';

type PreOwnedVehicleCardProps = {
  vehicle: SearchAllResultItem;
  bookmarkIds: Array<number>;
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
  onChangeBookmark: () => void;
  location: City | null;
  bodyType: BodyType | null;
};

const PreOwnedVehicleCard = ({
  vehicle,
  bookmarkIds = [],
  setSignInRequired,
  onChangeBookmark,
  elmConfiguration,
  location,
  bodyType,
}: PreOwnedVehicleCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { dateFormat } = useAppContext();
  const [openSellerDetailsModal, setOpenSellerDetailsModal] =
    useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    if (bookmarkIds && bookmarkIds.length > 0) {
      setIsFav(
        bookmarkIds.some((x) => String(x) === String(vehicle.VehicleListingId))
      );
    } else {
      setIsFav(false);
    }

    const user = SessionUtils.getUserDetails();
    if (user) {
      setUserId(user.UserId);
    }
  }, [bookmarkIds, vehicle.VehicleListingId]);

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

  const bookmarkHandler = async () => {
    if (SessionUtils.isValidSession()) {
      if (vehicle.Type === ProductType.VehicleListing) {
        if (isFav) {
          await VehicleService.deleteBookmark({
            VehicleListingID: vehicle.VehicleListingId!,
          });
          //Added GTM event for Removed BookMark Click
          PushDataToGTM(GTMEvents.RemovedBookmark, {
            vehicleListingId:
              process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! +
              vehicle.VehicleListingId,
            userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + userId,
            languageId: router.locale,
          });
        } else {
          //Added GTM event for Add BookMark Click
          PushDataToGTM(GTMEvents.AddBookmark, {
            vehicleListingId:
              process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! +
              vehicle.VehicleListingId,
            userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + userId,
            languageId: router.locale,
          });
          await VehicleService.addBookmark({
            VehicleListingID: vehicle.VehicleListingId!,
          });
        }
        onChangeBookmark();
        localStorage.removeItem('SignInRedirectOperation');
      }
    } else {
      setSignInRequired();
      const SignInRedirectOperationObj = {
        RedirectOperationType: SignInRedirectType.BookMark,
        OperationDetails: { vehicleId: vehicle.VehicleListingId },
      };
      localStorage.setItem(
        'SignInRedirectOperation',
        JSON.stringify(SignInRedirectOperationObj)
      );
    }
  };

  useEffect(() => {
    const redirectType = localStorage.getItem('SignInRedirectOperation');
    const redirectJSON = JSON.parse(redirectType!);
    const localStorageVehicleId = redirectJSON?.OperationDetails?.vehicleId;
    const isAuthenticated = SessionUtils.isValidSession();
    if (
      redirectJSON?.RedirectOperationType === SignInRedirectType.BookMark &&
      isAuthenticated
    ) {
      if (vehicle.VehicleListingId === localStorageVehicleId) {
        bookmarkHandler();
      }
    }

    if (
      redirectJSON?.RedirectOperationType ===
        SignInRedirectType.ClickedSellerDetails &&
      isAuthenticated
    ) {
      if (vehicle.VehicleListingId === localStorageVehicleId) {
        sellerDetailsClickHandler();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
      localStorage.removeItem('SignInRedirectOperation');
    } else {
      setSignInRequired();
      const SignInRedirectOperationObj = {
        RedirectOperationType: SignInRedirectType.ClickedSellerDetails,
        OperationDetails: { vehicleId: vehicle.VehicleListingId },
      };
      localStorage.setItem(
        'SignInRedirectOperation',
        JSON.stringify(SignInRedirectOperationObj)
      );
    }
  };

  return (
    <div className="gogo-vehicle-card !flex !flex-col card-shadow">
      <div className="relative aspect-[16/9] w-full border-b-2">
        <Link
          href={`/car-details/${vehicle.VehicleMakeKey.toLowerCase()}/${vehicle.VehicleModelKey.toLowerCase()}/${
            vehicle.VehicleListingId
          }?y=${vehicle.ManufactureYear ?? ''}`}
        >
          <a
            href={`/car-details/${vehicle.VehicleMakeKey.toLowerCase()}/${vehicle.VehicleModelKey.toLowerCase()}/${
              vehicle.VehicleListingId
            }y=${vehicle.ManufactureYear ?? ''}`}
          >
            <ImageWithFallback
              src={vehicle?.ThumbnailUrl! || '/images/default-car.jpg'}
              alt={`${vehicle.VehicleMake}-${vehicle.VehicleModel}-${vehicle.Spec}`}
              className="aspect-[16/9] w-full  rounded-t-md object-cover"
              onErrorRender={() => (
                <div className="aspect-[16/9] w-full uppercase flex justify-center items-center">{`${vehicle.VehicleMake}-${vehicle.VehicleModel}-${vehicle.Spec}`}</div>
              )}
              onError={(event: any) => {
                event.target.src = '/images/default-car.jpg';
                event.onerror = null;
              }}
              containerClassName="flex justify-center items-center"
            />
          </a>
        </Link>
        <div
          className={`absolute top-0 ${
            router.locale === Locales.EN ? 'left-0' : 'right-0'
          } z-10`}
        >
          {vehicle?.VehicleListingStatusKey === ListingStatus.Booked ? (
            <Ribbon type="Booked" />
          ) : vehicle.IsSold === SearchBoolean.True ? (
            <Ribbon type="Sold" />
          ) : (
            <></>
          )}
        </div>

        <div className="absolute bottom-0 left-0 bg-gradient px-2 rounded-tr-sm">
          <div className="flex gap-1 items-center justify-center">
            <TickIcon className="w-4 h-4" />
            <div>
              <span className="text-white font-semibold text-sm tracking-wider">
                {vehicle?.IsSelfListedVehicle === 'True'
                  ? t(LabelConstants.SELF_LISTED)
                  : t(LabelConstants.PRE_OWNED)}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-0 p-4 ${
            router.locale === Locales.EN ? 'right-0' : 'left-0'
          } `}
        >
          <div className="flex flex-col gap-1">
            <div
              className="flex items-center justify-center cursor-pointer p-2 rounded-full bg-lighter-gray"
              onClick={() => bookmarkHandler()}
              title={!isFav ? t(LabelConstants.BOOKMARK_NOW) : ''}
            >
              {isFav ? (
                <FilledBookmarkIcon className="h-4 w-4" />
              ) : (
                <BookmarkIcon className="h-4 w-4" />
              )}
            </div>
            {vehicle?.IsMojazFacilityApplicable === 'True' && (
              <MojazIcon className="w-8 h-8" />
            )}
            {vehicle?.IsFinanceApplicable === 'True' && (
              <VehicleDocIcon className="w-8 h-8" />
            )}
            {vehicle?.Is360DegreeApplicable === 'True' && (
              <SpinCarIcon className="w-8 h-8" />
            )}
            {vehicle?.IsAssistedSellingApplicable === 'True' && (
              <VehiclePreownedIcon className="w-8 h-8" />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col p-6 pt-0 h-full ">
        <div className="min-h-[4.5rem] mt-2 flex justify-between items-start">
          <Link
            href={`/car-details/${vehicle.VehicleMakeKey.toLowerCase()}/${vehicle.VehicleModelKey.toLowerCase()}/${
              vehicle.VehicleListingId
            }y=${vehicle.ManufactureYear ?? ''}`}
          >
            <a
              href={`/car-details/${vehicle.VehicleMakeKey.toLowerCase()}/${vehicle.VehicleModelKey.toLowerCase()}/${
                vehicle.VehicleListingId
              }y=${vehicle.ManufactureYear ?? ''}`}
              className="text-2xl uppercase overflow-hidden text-dark-gray1"
            >{`${vehicle.VehicleMake ? vehicle.VehicleMake : '-'} ${
              vehicle.VehicleModel ? vehicle.VehicleModel : '-'
            } ${vehicle.Spec ? vehicle.Spec : ''} ${
              vehicle.ManufactureYear ? vehicle.ManufactureYear : ''
            }`}</a>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1 justify-between">
            <div className="flex items-center gap-1 justify-start whitespace-nowrap">
              <FilledLocationIcon className="w-4 h-4 text-dark-gray2" />
              <span>{location?.City || '-'}</span>
            </div>
            <div className="flex items-center gap-1 justify-start whitespace-nowrap">
              <OdometerIcon className="w-5 h-5 text-dark-gray2" />
              <span className="whitespace-nowrap">{`${
                vehicle?.Mileage ? formatNumber(vehicle?.Mileage) : 0
              } ${t(LabelConstants.KM)}`}</span>
            </div>
            <div></div>
          </div>
          <div className="flex gap-1 justify-between">
            <div className="flex items-center gap-1 justify-start whitespace-nowrap">
              <OwnerIcon className="w-4 h-4 text-dark-gray2" />
              <span>{bodyType?.BodyType || '-'}</span>
            </div>
            <div className="flex items-center gap-1 justify-start whitespace-nowrap">
              <PetrolIcon className="w-4 h-4 text-dark-gray2" />
              <span>{vehicle?.FuelType || '-'}</span>
            </div>
            <div className="flex items-center gap-1 justify-start">
              <FilledTransmissionIcon className="w-4 h-4 text-dark-gray2" />
              <span>{vehicle?.Transmission || '-'}</span>
            </div>
          </div>
        </div>

        <hr className="border-light-gray my-3" />

        <div className="grid grid-rows-4 gap-2 h-[5.9rem]">
          {vehicle.IsSelfListedVehicle !== 'True' ? (
            <>
              <div></div>
              <div className="flex text-base justify-between flex-wrap leading-[1.0625rem]">
                {vehicle?.DealerId || vehicle?.Distributor ? (
                  <div className="flex gap-2">
                    <span className="text-dark-gray2">
                      {t(LabelConstants.SUPPLIED_BY)}
                    </span>
                    <span className="text-dark-gray1 whitespace-nowrap w-[8.5rem] overflow-hidden text-ellipsis">
                      {vehicle?.Distributor}
                    </span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="flex text-base justify-between flex-wrap leading-[1.0625rem]">
                <div className="flex gap-2">
                  <span className="text-dark-gray2">
                    {t(LabelConstants.FULFILLED_BY)}
                  </span>
                  <span className="text-dark-gray1 whitespace-nowrap w-[8.5rem] overflow-hidden text-ellipsis">
                    {vehicle?.FulfilledBy}
                  </span>
                </div>
              </div>
              {vehicle?.IsExtendedWarrantyApplicable === 'True' ? (
                <div className="flex items-center text-base gap-2 flex-wrap leading-[1.0625rem]">
                  <div>
                    <SuccessIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-primary text-base">
                    {t(LabelConstants.ELIGIBLE_EXTENDED_WARRANTY_LABEL)}
                  </span>
                </div>
              ) : (
                <div></div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <hr className="border-light-gray my-3" />
        <div className="flex justify-between gap-2 items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-dark-gray1 w-[2.313rem]">
                {t(LabelConstants.PRICE)}
              </span>
              {vehicle.AskingPrice ? (
                <div className="text-lg flex items-center justify-center gap-1 text-primary">
                  <span className="inline-block mr-1 font-bold">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  <div
                    className="text-lg leading-[1.5625rem] font-bold whitespace-nowrap flex gap-1"
                    dir="ltr"
                  >
                    {`${
                      vehicle.AskingPrice
                        ? formatNumber(vehicle.AskingPrice)
                        : '-'
                    }`}
                  </div>
                </div>
              ) : (
                '-'
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-dark-gray1 w-[2.313rem]">
                {t(LabelConstants.EMI_LABEL)}
              </span>
              {vehicle.MonthlyEMI && vehicle.MonthlyEMI > 0 ? (
                <div className="text-lg text-gradient flex items-center justify-center gap-1 text-primary">
                  <span className="inline-block mr-1 font-bold">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  <div
                    className="text-lg leading-[1.5625rem] font-bold whitespace-nowrap flex gap-1"
                    dir="ltr"
                  >
                    {`${
                      vehicle.MonthlyEMI
                        ? formatNumber(vehicle.MonthlyEMI)
                        : '-'
                    }`}
                  </div>
                </div>
              ) : (
                '-'
              )}
            </div>
          </div>
          {userId !== vehicle.SellerId && (
            <div>
              <span
                className={`text-white rounded-md py-4 px-2 bg-gradient uppercase whitespace-nowrap ${
                  vehicle?.VehicleListingStatusKey === ListingStatus.Booked ||
                  vehicle?.VehicleListingStatusKey === ListingStatus.Sold
                    ? 'bg-gray-500 pointer-events-none  opacity-50'
                    : 'cursor-pointer'
                }`}
                onClick={() => {
                  if (
                    vehicle?.VehicleListingStatusKey !== ListingStatus.Booked &&
                    vehicle?.VehicleListingStatusKey !== ListingStatus.Sold
                  ) {
                    sellerDetailsClickHandler();
                  }
                }}
              >
                {t(LabelConstants.SELLER_DETAILS)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Seller Details Modal */}
      <SellerDetailsModal
        show={openSellerDetailsModal}
        onClose={() => setOpenSellerDetailsModal(false)}
        listingId={vehicle.VehicleListingId!}
      />
    </div>
  );
};

export default PreOwnedVehicleCard;
