import moment from 'moment';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { VehicleService } from '../../../helpers/services';
import { formatNumber, SessionUtils } from '../../../helpers/utilities';
import { PushDataToGTM } from '../../../helpers/utilities/gtm';
import {
  ConfigurationKey,
  ListingStatus,
  Locales,
  UserProfileStatus,
} from '../../../types/enums';
import { GTMEvents } from '../../../types/gtm';
import { LabelConstants } from '../../../types/i18n.labels';
import {
  SearchResultItem,
  SocialMediaPlatformItem,
} from '../../../types/models';
import {
  BookmarkIcon,
  CalendarIcon,
  CircularOrangeTickMarkIcon,
  FilledBookmarkIcon,
  FinanceRequestIcon,
  OdometerIcon,
  OwnerIcon,
  PetrolIcon,
  ShareIcon,
  SupportIcon,
  TransmissionIcon,
} from '../../icons';
import SellerDetailsModal from '../../used-cars/SellerDetailsModal';
import ShareModal from '../../used-cars/ShareModal';
import MessageBox, { MessageBoxResult, MessageBoxType } from '../MessageBox';
import Ribbon from '../Ribbon';
import { useAppContext } from '../../../provider/AppProvider';
import { SignInRedirectType } from '../../../types/constants';
import ConfigurationService from '../../../helpers/services/configuration.service';

type VehicleCardProps = {
  vehicle: SearchResultItem;
  sharingPlatform: Array<SocialMediaPlatformItem>;
  bookmarkIds: Array<number>;
  quotationIds: Array<number>;
  compareVehicleIds?: Array<string>;
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
  showCompare?: boolean;
  onCompareChange?: (VehicleListingId: string, VehicleData: any) => void;
  setSignInRequired: () => void;
  onChangeBookmark: () => void;
  isNewCarEnabled: string;
};

const ListingVehicleCard = ({
  vehicle,
  sharingPlatform = [],
  bookmarkIds = [],
  quotationIds = [],
  compareVehicleIds = [],
  showCompare = true,
  onCompareChange,
  setSignInRequired,
  onChangeBookmark,
  elmConfiguration,
  isNewCarEnabled,
}: VehicleCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { dateFormat } = useAppContext();

  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [openSellerDetailsModal, setOpenSellerDetailsModal] =
    useState<boolean>(false);
  const [isFav, setIsFav] = useState<boolean>(false);
  const [isRequestedForFinanced, setIsRequestedForFinanced] =
    useState<boolean>(false);
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
    if (quotationIds && quotationIds.length > 0) {
      setIsRequestedForFinanced(
        quotationIds.some((x) => String(x) === String(vehicle.VehicleListingId))
      );
    } else {
      setIsRequestedForFinanced(false);
    }

    const user = SessionUtils.getUserDetails();
    if (user) {
      setUserId(user.UserId);
    }
  }, [quotationIds, vehicle.VehicleListingId]);

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
      if (isFav) {
        await VehicleService.deleteBookmark({
          VehicleListingID: vehicle.VehicleListingId,
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
          VehicleListingID: vehicle.VehicleListingId,
        });
      }
      onChangeBookmark();
      localStorage.removeItem('SignInRedirectOperation');
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

  useEffect(() => {
    const redirectType = localStorage.getItem('SignInRedirectOperation');
    const redirectJSON = JSON.parse(redirectType!);
    const localStorageVehicleId = redirectJSON?.OperationDetails?.vehicleId;
    const isAuthenticated = SessionUtils.isValidSession();
    if (
      redirectJSON?.RedirectOperationType ===
        SignInRedirectType.ClickedSellerDetails &&
      isAuthenticated
    ) {
      if (vehicle.VehicleListingId === localStorageVehicleId) {
        sellerDetailsClickHandler();
      }
    }
  }, [router]);

  return (
    <div className="gogo-vehicle-card card-shadow">
      <div className="frame top-frame">
        <Link
          prefetch={false}
          href={`/car-details/${vehicle.VehicleMake.toLowerCase()}/${vehicle.VehicleModel.toLowerCase()}/${
            vehicle.VehicleListingId
          }?y=${vehicle.ManufactureYear ?? ''}`}
        >
          <a>
            <div className="vehicle-image bottom-0">
              <Image
                src={
                  vehicle.DefaultWebImageThumbnailUrlPath ||
                  vehicle.DefaultWebImageUrlPath ||
                  '/images/default-car.jpg'
                }
                alt=""
                className="w-full rounded-t-md"
                onError={(event: any) => {
                  event.target.src = '/images/default-car.jpg';
                  event.onerror = null;
                }}
                width="328"
                height="185"
                loading="lazy"
                unoptimized={true}
              />
            </div>

            {((isNewCarEnabled === 'true' &&
              vehicle.IsNew.toLowerCase() === 'true') ||
              vehicle.VehicleListingStatusKey === ListingStatus.Sold) && (
              <Ribbon
                type={
                  vehicle.VehicleListingStatusKey === ListingStatus.Sold
                    ? 'Sold'
                    : 'New'
                }
              />
            )}
            {vehicle.IsOutlet.toLowerCase() === 'true' &&
              vehicle.VehicleListingStatusKey !== ListingStatus.Sold && (
                <Ribbon type="Outlet" />
              )}

            {/* {vehicle.IsGGMInspected === 'True' && (
              <GoGoInspectedIcon className="w-16 h-16 absolute bottom-2 left-2" />
            )} */}
          </a>
        </Link>
        {/* {vehicle.IsFeatured && vehicle.IsFeatured.toLowerCase() === 'true' && (
          <div className="featured bg-gradient">
            <div className="relative top-0 left-0 flex items-center justify-between rtl:pr-2 ltr:pl-2 gap-1">
              <StarIcon className="w-[0.8269rem]" />
              <span>{t(LabelConstants.FEATURED)}</span>
            </div>
          </div>
        )} */}
        <div className="share-icons">
          <div className="relative top-0 left-0 flex items-center justify-between px-1 gap-1">
            <div
              className="flex items-center justify-center cursor-pointer p-1"
              title={t(LabelConstants.CUSTOMER_SUPPORT)}
            >
              <Link href={`/support/${vehicle.VehicleListingId}`}>
                <a href={`/support/${vehicle.VehicleListingId}`}>
                  <SupportIcon className="h-4 w-4" />
                </a>
              </Link>
            </div>
            <div
              className="flex items-center justify-center cursor-pointer p-1"
              onClick={() => setOpenShareModal(true)}
              title={t(LabelConstants.SHARE_WITH)}
            >
              <ShareIcon className="h-4 w-4" />
            </div>
            <div
              className="flex items-center justify-center cursor-pointer p-1"
              onClick={() => bookmarkHandler()}
              title={!isFav ? t(LabelConstants.BOOKMARK_NOW) : ''}
            >
              {isFav ? (
                <FilledBookmarkIcon className="h-4 w-4" />
              ) : (
                <BookmarkIcon className={`h-4 w-4`} />
              )}
            </div>
          </div>
        </div>

        {vehicle.IsGGMInspected === 'True' && (
          <div className="bg-primary absolute bottom-0 left-0 flex items-center justify-center gap-1 py-1 px-[0.25rem] rounded-tr-sm">
            <CircularOrangeTickMarkIcon className="h-3 w-3" />
            <span className="text-white text-sm">
              {t(LabelConstants.INSPECTED_LBL)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col p-[0.625rem] pb-0 h-full ">
        <div className="pb-[1.0625rem] flex justify-between items-start h-[3.75rem]">
          <Link
            href={`/car-details/${vehicle.VehicleMake.toLowerCase()}/${vehicle.VehicleModel.toLowerCase()}/${
              vehicle.VehicleListingId
            }`}
          >
            <a
              href={`/car-details/${vehicle.VehicleMake.toLowerCase()}/${vehicle.VehicleModel.toLowerCase()}/${
                vehicle.VehicleListingId
              }`}
              className="text-xl font-bold leading-[1.5625rem] capitalize overflow-hidden text-dark-gray1"
            >{`${vehicle.VehicleMake ? vehicle.VehicleMake : '-'} ${
              vehicle.VehicleModel ? vehicle.VehicleModel : '-'
            } ${vehicle.Spec ? vehicle.Spec : ''}`}</a>
          </Link>
          <div
            className="flex items-center justify-center px-1"
            title={
              isRequestedForFinanced ? t(LabelConstants.FINANCE_REQUESTED) : ''
            }
          >
            {isRequestedForFinanced && <FinanceRequestIcon className="w-6" />}
          </div>
        </div>
        <>
          <div className="flex flex-col gap-[1.125rem]">
            <div className="flex justify-between text-dark-gray2 text-sm leading-[1.0625rem]">
              <div className="flex items-center">{`${t(LabelConstants.ID)} - ${
                vehicle.VehicleListingId
                  ? String(vehicle.VehicleListingId).padStart(8, '0')
                  : '-'
              }`}</div>
              {showCompare && onCompareChange && (
                <div className="text-dark-gray2">
                  <div className="flex items-center gap-1">
                    <input
                      className="!w-3 !h-3 cursor-pointer"
                      type="checkbox"
                      checked={compareVehicleIds.includes(
                        vehicle.VehicleListingId
                      )}
                      onChange={(e) => {
                        onCompareChange(vehicle.VehicleListingId, vehicle);
                      }}
                      id={`checkbox${vehicle.VehicleListingId}`}
                    />
                    <label
                      className="text-sm cursor-pointer"
                      htmlFor={`checkbox${vehicle.VehicleListingId}`}
                    >
                      {t(LabelConstants.COMPARE)}
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex text-sm text-dark-gray2 justify-between flex-wrap leading-[1.0625rem]">
              {vehicle.IsNew === 'False' && vehicle.IsOutlet === 'False' && (
                <div className="flex items-center gap-1 w-[6.25rem]">
                  <OdometerIcon />
                  {`${vehicle.Mileage ? formatNumber(vehicle.Mileage) : 0} ${t(
                    LabelConstants.KM
                  )}`}
                </div>
              )}
              <div className="flex items-center gap-1">
                <PetrolIcon />
                {`${vehicle.FuelType ? vehicle.FuelType : '-'}`}
              </div>
              <div className="flex items-center gap-1">
                <CalendarIcon />
                {`${vehicle.ManufactureYear ? vehicle.ManufactureYear : '-'}`}
              </div>
              {vehicle.IsNew === 'False' && vehicle.IsOutlet === 'False' && (
                <div className="flex items-center gap-1">
                  <OwnerIcon />
                  {`${vehicle.Ownership ? vehicle.Ownership : '-'}`}
                </div>
              )}
            </div>

            <div className="flex text-sm text-dark-gray2 justify-between flex-wrap leading-[1.0625rem]">
              <div className="flex items-center gap-1">
                <TransmissionIcon />
                {`${vehicle.Transmission ? vehicle.Transmission : '-'}`}
              </div>
              <div>
                {`${t(LabelConstants.LISTING_DATE)} - ${
                  vehicle.ListedDate
                    ? moment(vehicle.ListedDate).format(dateFormat)
                    : ` -`
                }`}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-1 pt-7 pb-[0.8125rem] text-base">
            <div className="grid grid-cols-[auto_auto] gap-x-2 items-center">
              <span>{t(LabelConstants.PRICE)}</span>
              <div className="flex items-center leading-[1.5625rem] gap-1 font-bold text-primary">
                <div className="inline-block">{t(LabelConstants.SAR)}</div>
                <div className="whitespace-nowrap" dir="ltr">
                  {`${
                    vehicle.AskingPrice
                      ? formatNumber(vehicle.AskingPrice)
                      : '-'
                  }`}
                </div>
              </div>
              <span>{t(LabelConstants.EMI_LABEL)}</span>
              <div className="flex items-center text-gradient gap-1 leading-[1.5625rem] font-bold">
                <div className="inline-block">{t(LabelConstants.SAR)}</div>
                <div className="whitespace-nowrap" dir="ltr">
                  {vehicle.MonthlyEMI ? formatNumber(vehicle.MonthlyEMI) : '-'}
                </div>
              </div>
            </div>
            <div
              id="seller-details"
              className={`flex items-center bg-gradient cursor-pointer text-base rounded p-2 whitespace-nowrap uppercase font-medium ${
                userId === vehicle.SellerId ||
                vehicle.VehicleListingStatusKey === ListingStatus.Sold
                  ? 'invisible'
                  : ''
              }`}
              onClick={() => {
                if (
                  userId !== vehicle.SellerId &&
                  vehicle.VehicleListingStatusKey !== ListingStatus.Sold
                ) {
                  sellerDetailsClickHandler();
                }
              }}
            >
              <div>{t(LabelConstants.SELLER_DETAILS)}</div>
            </div>
          </div>
        </>
      </div>

      {/* Share Modal */}
      <ShareModal
        show={openShareModal}
        listingId={vehicle.VehicleListingId}
        sharingPlatform={sharingPlatform}
        onClose={() => setOpenShareModal(false)}
        shareUrl={
          router.locale === Locales.EN
            ? `${window.location.origin}/car-details/${vehicle.VehicleListingId}`
            : `${window.location.origin}/ar/car-details/${vehicle.VehicleListingId}`
        }
      />

      {/* Seller Details Modal */}
      <SellerDetailsModal
        show={openSellerDetailsModal}
        onClose={() => setOpenSellerDetailsModal(false)}
        listingId={vehicle.VehicleListingId}
      />
    </div>
  );
};

export default ListingVehicleCard;
