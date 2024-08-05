import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { VehicleService } from '../../helpers/services';
import {
  CommonUtils,
  formatNumber,
  SessionUtils,
} from '../../helpers/utilities';
import { PushDataToGTM } from '../../helpers/utilities/gtm';
import { ListingStatus, Locales, UserProfileStatus } from '../../types/enums';
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
  OwnerIcon,
  PetrolIcon,
  SpinCarIcon,
  SuccessIcon,
  TickIcon,
  VehicleDocIcon,
  VehiclePreownedIcon,
} from '../icons';
import { SignInRedirectType } from '../../types/constants';
import { ImageWithFallback } from '../common/ImageWithFallback';
import Ribbon from '../common/Ribbon';

type OutletVehicleCardProps = {
  vehicle: SearchAllResultItem;
  bookmarkIds: Array<number>;
  showCompare?: boolean;
  setSignInRequired: () => void;
  onChangeBookmark: () => void;
  location: City | null;
  bodyType: BodyType | null;
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
};

const OutletVehicleCard = ({
  vehicle,
  bookmarkIds = [],
  setSignInRequired,
  onChangeBookmark,
  location,
  bodyType,
  elmConfiguration,
}: OutletVehicleCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleButtonClick = (vehicle: SearchAllResultItem) => {
    router.push(
      `/newcars/outlet/info/${encodeURIComponent(
        vehicle.VehicleMakeKey.toLowerCase()
      )}/${encodeURIComponent(
        vehicle.VehicleModelKey.toLowerCase()
      )}?v=${CommonUtils.encode(vehicle.VehicleListingId)}`
    );
  };

  return (
    <div className="gogo-vehicle-card !flex !flex-col card-shadow">
      <div className="relative aspect-[16/9] w-full border-b-2">
        <Link
          href={`/newcars/outlet/info/${encodeURIComponent(
            vehicle.VehicleMakeKey.toLowerCase()
          )}/${encodeURIComponent(
            vehicle.VehicleModelKey.toLowerCase()
          )}?v=${CommonUtils.encode(vehicle.VehicleListingId)}`}
        >
          <a
            href={`/newcars/outlet/info/${encodeURIComponent(
              vehicle.VehicleMakeKey.toLowerCase()
            )}/${encodeURIComponent(
              vehicle.VehicleModelKey.toLowerCase()
            )}?v=${CommonUtils.encode(vehicle.VehicleListingId)}`}
          >
            <ImageWithFallback
              src={vehicle?.ThumbnailUrl! || '/images/default-car.jpg'}
              alt={`${vehicle.VehicleMake}-${vehicle.VehicleModel}-${vehicle.Spec}`}
              className="aspect-[16/9] w-full rounded-t-md object-cover"
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
        {vehicle.IsOutlet === SearchBoolean.True &&
          vehicle.IsSold !== SearchBoolean.True && (
            <div className="absolute bottom-0 left-0 bg-gradient px-2 rounded-tr-sm">
              <div className="flex gap-1 items-center justify-center">
                <TickIcon className="w-4 h-4" />
                <div>
                  <span className="text-white font-semibold text-sm tracking-wider">
                    {t(LabelConstants.OUTLET)}
                  </span>
                </div>
              </div>
            </div>
          )}

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
            href={`/newcars/outlet/info/${encodeURIComponent(
              vehicle.VehicleMakeKey.toLowerCase()
            )}/${encodeURIComponent(
              vehicle.VehicleModelKey.toLowerCase()
            )}?v=${CommonUtils.encode(vehicle.VehicleListingId)}`}
          >
            <a
              href={`/newcars/outlet/info/${encodeURIComponent(
                vehicle.VehicleMakeKey.toLowerCase()
              )}/${encodeURIComponent(
                vehicle.VehicleModelKey.toLowerCase()
              )}?v=${CommonUtils.encode(vehicle.VehicleListingId)}`}
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
            <div></div>
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
            <div className="flex items-center gap-1 justify-start whitespace-nowrap">
              <FilledTransmissionIcon className="w-4 h-4 text-dark-gray2" />
              <span>{vehicle?.Transmission || '-'}</span>
            </div>
          </div>
        </div>

        <hr className="border-light-gray my-3" />

        <div className="grid grid-rows-4 gap-2 h-[5.9rem]">
          <div className="flex text-base justify-between flex-wrap leading-[1.0625rem]">
            <div className="flex gap-2">
              <span className="text-dark-gray2">
                {t(LabelConstants.IMPORTED_BY)}
              </span>
              <span className="text-dark-gray1 whitespace-nowrap w-[8.5rem] overflow-hidden text-ellipsis">
                {vehicle?.Importer}
              </span>
            </div>
          </div>
          <div className="flex text-base justify-between flex-wrap leading-[1.0625rem]">
            <div className="flex gap-2">
              <span className="text-dark-gray2">
                {t(LabelConstants.SUPPLIED_BY)}
              </span>
              <span className="text-dark-gray1 whitespace-nowrap w-[8.5rem] overflow-hidden text-ellipsis">
                {vehicle?.Distributor ? vehicle?.Distributor : vehicle?.Dealer}
              </span>
            </div>
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
          {vehicle?.IsExtendedWarrantyApplicable === 'True' && (
            <div className="flex items-center text-base gap-2 flex-wrap leading-[1.0625rem]">
              <div>
                <SuccessIcon className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-primary text-base">
                {t(LabelConstants.ELIGIBLE_EXTENDED_WARRANTY_LABEL)}
              </span>
            </div>
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
          <div>
            <span
              className={`text-white cursor-pointer rounded-md py-4 bg-gradient uppercase whitespace-nowrap px-2 ${
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
                  handleButtonClick(vehicle);
                }
              }}
            >
              {t(LabelConstants.VIEW_DETAILS_LABEL)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutletVehicleCard;
