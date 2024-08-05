import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import FileSaver from 'file-saver';
import { formatNumber, SessionUtils } from '../../helpers/utilities';
import {
  ListingStatus,
  Locales,
  Privileges,
  ProductReferenceType,
} from '../../types/enums';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import {
  MyVehicle,
  Overview,
  SocialMediaPlatformItem,
} from '../../types/models';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import {
  CalendarIcon,
  FlagIcon,
  OdometerIcon,
  OwnerIcon,
  PetrolIcon,
  ShareIcon,
  SupportIcon,
  TransmissionIcon,
} from '../icons';
import ShareModal from '../used-cars/ShareModal';
import DeleteVehicleModal from './DeleteVehicleModal';
import MarkAsSoldVehicleModal from './MarkAsSoldVehicleModal';
import InspectionAppointmentModal from './InspectionAppointmentModal';
import UploadMojazModal from './UploadMojazModal';
import {
  ListingService,
  PackageSubscription,
  VehicleService,
} from '../../helpers/services';
import SignInModal from '../common/SignInModal';
import ShowRestrictUserDropdown from '../common/ShowRestrictUserDropdown';
import ConfigurationService from '../../helpers/services/configuration.service';
import { CMSPageKey, StatusAllowedForUpgrade } from '../../types/constants';
import { ExclamatoryIcon } from '../icons/ExclamatoryIcon';
import MojazService from '../../helpers/services/mojaz.service';

type VehicleCardProps = {
  vehicle: MyVehicle;
  sharingPlatform: Array<SocialMediaPlatformItem>;
  inspectionServiceId: number;
  handleDelete: () => void;
  loadVehicleData: () => Promise<void>;
};

const ListingVehicleCard = ({
  vehicle,
  sharingPlatform = [],
  inspectionServiceId,
  loadVehicleData,
  handleDelete,
}: VehicleCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [currentStatus, setCurrentStatus] = useState<string>();
  const [openDeleteVehicleModal, setOpenDeleteVehicleModal] =
    useState<boolean>(false);
  const [openMarkAsSoldVehicleModal, setOpenMarkAsSoldVehicleModal] =
    useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showBuyInspectionPopUp, setShowBuyInspectionPopUp] =
    useState<boolean>(false);
  const [openSignInModal, setOpenSignInModal] = useState<boolean>(false);
  const [showUploadMojaz, setShowUploadMojaz] = useState<boolean>(false);
  const [vehicleData, setVehicleData] = useState<Overview | undefined>();
  const [showRestrictUserDropdown, setShowRestrictUserDropdown] =
    useState<boolean>(false);

  const [disclaimerText, setDisclaimerText] = useState<{ [x: string]: string }>(
    {}
  );
  const [noteText, setNoteText] = useState<{ [x: string]: string }>({});

  useEffect(() => {
    const initialLoad = async () => {
      const listingData = await VehicleService.fetchVehicleListingData(
        vehicle.VehicleListingId,
        router.locale
      );
      setVehicleData(listingData?.Overview);
      const disclaimerTextData =
        await ConfigurationService.fetchCMSCLabelConstant(
          CMSPageKey.Information,
          null,
          router.locale
        );
      setDisclaimerText(disclaimerTextData);

      const textData = await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Information,
        null,
        router.locale
      );
      setNoteText(textData);
    };
    initialLoad();
  }, [router.locale, vehicle.VehicleListingId]);

  useEffect(() => {
    vehicle && setCurrentStatus(vehicle.VehicleListingStatus);

    if (SessionUtils.hasPrivileges(Privileges.EditVehicle)) {
      setShowEdit(true);
    }
    if (SessionUtils.hasPrivileges(Privileges.DeleteVehicle)) {
      setShowDelete(true);
    }
  }, [vehicle.Statuses, vehicle.VehicleListingStatus]);

  const handleDeleteVehicle = async () => {
    const response = await MessageBox.open({
      content: t(LabelConstants.DELETION_CONFIRMATION),
      type: MessageBoxType.Confirmation,
    });
    if (response === MessageBoxResult.Yes) {
      setOpenDeleteVehicleModal(true);
    }
  };

  const handleMarkAsSoldVehicle = async () => {
    setOpenMarkAsSoldVehicleModal(true);
  };

  const handleBuyInspection = async () => {
    if (!SessionUtils.isValidSession()) {
      setOpenSignInModal(true);
    } else {
      if (inspectionServiceId) {
        const cartData = await PackageSubscription.getShoppingCart(
          router.locale
        );
        const index = cartData?.Data?.CartItems.findIndex((x) => {
          return (
            x.VehicleListingId === vehicle.VehicleListingId &&
            x.CartItemType === ProductReferenceType.B2CService
          );
        });
        if (index > -1) {
          const result = await MessageBox.open({
            content: (
              <div className="text-lg">
                {t(LabelConstants.SERVICE_EXIST_CART)}
              </div>
            ),
            type: MessageBoxType.Confirmation,
          });
          if (result === MessageBoxResult.Yes) {
            router.push('/cart');
          }
        } else {
          const payload = {
            ProductReferenceType: ProductReferenceType.B2CService,
            ProductReferenceId: inspectionServiceId,
            VehicleListingId: vehicle.VehicleListingId,
          };
          const res = await ListingService.addToCart(payload);
          if (res.MessageCode === 'DUPLICATE_ITEM_FOUND') {
            await MessageBox.open({
              content: `${t(LabelConstants.ERR_DUPLICATE_SHOPPING_CART_ITEM)}`,
              type: MessageBoxType.Message,
            });
          }
          if (res.MessageCode === 'NOT_ABLE_TO_ADD_ITEM') {
            await MessageBox.open({
              content: `${t(LabelConstants.ERR_ZERO_PRICE_SHOPPING_CART_ITEM)}`,
              type: MessageBoxType.Message,
            });
          }
          if (res.IsSuccess) {
            router.push({
              pathname: '/cart',
            });
          } else {
            toast.warning(t(LabelConstants.SOMETHING_WENT_WRONG_ERROR));
          }
        }
      } else {
        await MessageBox.open({
          content: (
            <div className="flex flex-col gap-3 items-center">
              <span className="text-lg text-dark-gray1 font-bold">{`${t(
                LabelConstants.BUY_INSPECTION_NO_SERVICE_MSG
              )}`}</span>
            </div>
          ),
        });
      }
    }
  };

  const handleDownloadMojazReport = async () => {
    const fileData = await VehicleService.downloadMojazVehicleReport(
      vehicle.VehicleListingId
    );
    FileSaver.saveAs(fileData, 'VehicleHistory');
  };

  const handleBuyReport = async () => {
    let url = null;
    if (vehicleData?.VerifiedVin) {
      const reportData = await MojazService.mojazLiteReport(
        vehicleData?.VerifiedVin!,
        router.locale
      );
      url = reportData && reportData.MojazBuyFullReportUrl;
    }
    if (!url) {
      url = process.env.NEXT_PUBLIC_BUY_MOJAZ_REPORT_LINK!;
    }
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-white rounded-md card-shadow relative">
        <div className="flex w-full gap-2 flex-wrap sm:flex-nowrap">
          <div className="w-[21.875rem] h-[11.6875rem] sm:!w-[21.875rem] sm:!h-[11.6875rem]">
            <Link
              href={`/car-details/${vehicle.VehicleMake.toLowerCase()}/${vehicle.VehicleModel.toLowerCase()}/${
                vehicle.VehicleListingId
              }?y=${vehicle.ManufactureYear ?? ''}`}
            >
              <a
                href={`/car-details/${vehicle.VehicleMake.toLowerCase()}/${vehicle.VehicleModel.toLowerCase()}/${
                  vehicle.VehicleListingId
                }?y=${vehicle.ManufactureYear ?? ''}`}
              >
                <picture className="relative w-[21.875rem] h-[11.6875rem] sm:w-[21.875rem] sm:h-[11.6875rem] rounded-md">
                  <img
                    src={
                      vehicle.ArtifactThumbnailUrlPath ||
                      vehicle.ArtifactUrlPath ||
                      '/images/default-car.jpg'
                    }
                    alt={`${vehicle.VehicleMake} ${vehicle.VehicleModel}`}
                    className="vehicle w-[21.875rem] h-[11.6875rem] sm:w-[21.875rem] sm:h-[11.6875rem] rounded-md border border-lighter-gray -mt-[1px]"
                    onError={(event: any) => {
                      event.target.src = '/images/default-car.jpg';
                      event.onerror = null;
                    }}
                  />
                </picture>
              </a>
            </Link>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex gap-2 justify-between items-center w-full">
              <div className="w-[15rem] sm:w-full">
                <h3 className="text-xl font-bold leading-[1.5625rem] capitalize text-ellipsis overflow-hidden whitespace-nowrap over text-dark-gray1">{`${vehicle.VehicleMake} ${vehicle.VehicleModel} ${vehicle.Spec}`}</h3>
              </div>
              {vehicle.VehicleListingStatusKey !== ListingStatus.Deleted && (
                <div className="flex">
                  <div
                    className="flex items-center justify-center cursor-pointer rounded-full p-1"
                    title={t(LabelConstants.CUSTOMER_SUPPORT)}
                  >
                    <Link href={`/support/${vehicle.VehicleListingId}`}>
                      <a href={`/support/${vehicle.VehicleListingId}`}>
                        <SupportIcon className="h-5 w-5" />
                      </a>
                    </Link>
                  </div>
                  <div
                    className="flex items-center justify-center cursor-pointer rounded-full p-1"
                    onClick={() => setOpenShareModal(true)}
                    title={t(LabelConstants.SHARE_WITH)}
                  >
                    <ShareIcon className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-base">{`${t(LabelConstants.ID)} - ${String(
                vehicle.VehicleListingId
              ).padStart(8, '0')}`}</div>
              <div className="font-bold text-dark-gray1 text-xl sm:hidden">
                {currentStatus}
              </div>
            </div>
            <div className="flex gap-3 text-sm flex-wrap">
              <div className="flex gap-2 items-center">
                <OdometerIcon />
                {`${vehicle.Mileage ? formatNumber(vehicle.Mileage) : 0} ${t(
                  LabelConstants.KM
                )}`}
              </div>
              <div className="flex gap-2 items-center">
                <PetrolIcon />
                {`${vehicle.FuelType ? vehicle.FuelType : '-'}`}
              </div>
              <div className="flex gap-2 items-center">
                <CalendarIcon className="text-dark-gray2" />
                {`${vehicle.ManufactureYear ? vehicle.ManufactureYear : '-'}`}
              </div>
              <div className="flex gap-2 items-center">
                <OwnerIcon />
                {`${vehicle.Ownership ? vehicle.Ownership : '-'}`}
              </div>
              <div className="flex gap-2 items-center">
                <TransmissionIcon />
                {`${vehicle.Transmission ? vehicle.Transmission : '-'}`}
              </div>
            </div>
            <div className="h-full w-full"></div>
            <div className="flex flex-col gap-2 justify-between items-center">
              <div className="flex w-full flex-col gap-2 items-start">
                <div
                  className="text-xl leading-[1.5625rem] font-bold text-primary whitespace-nowrap"
                  dir="ltr"
                >
                  <span className="inline-block mr-1">
                    {`${t(LabelConstants.SAR)}`}
                  </span>
                  {`${formatNumber(vehicle.AskingPrice)}`}
                </div>
                <div className="flex text-xl gap-1">
                  <span>{`${t(LabelConstants.STATUS)} -`}</span>
                  {vehicle.VehicleListingStatusKey ===
                    ListingStatus.QCRequestForAChange ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedQCRequestForAChangeForUpgrade ? (
                    <div className="flex items-center justify-center  gap-2">
                      <span className="text-gradient font-bold">
                        {vehicle.VehicleListingStatusCategory}
                      </span>
                      <ExclamatoryIcon className="w-6 h-6" />
                    </div>
                  ) : (
                    <span className="text-dark-gray1 font-bold">
                      {vehicle.VehicleListingStatusCategory}
                    </span>
                  )}
                </div>
                {(vehicle.VehicleListingStatusKey ===
                  ListingStatus.QCRequestForAChange ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedQCRequestForAChangeForUpgrade) && (
                  <div className="text-dark-gray1">
                    {`${t(LabelConstants.NOTE)} - ${
                      noteText[CMSConstants.QCRequestForChangeEdit]
                    }`}
                  </div>
                )}
              </div>

              <div className="flex gap-4 w-full justify-end items-center">
                {(vehicle.VehicleListingStatusKey === ListingStatus.Listed ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedInitiatedForUpgrade ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedSurveyReadyForUpgrade ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedSurveyRejectedForUpgrade ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedQCReadyForUpgrade ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedQCRequestForAChangeForUpgrade ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedQCRejectedForUpgrade ||
                  vehicle.VehicleListingStatusKey ===
                    ListingStatus.ListedReadyForRV) && (
                  <span
                    className="cursor-pointer bg-gradient text-base leading-5 rounded-md px-[0.625rem] py-[0.3125rem] font-bold whitespace-nowrap uppercase"
                    onClick={handleMarkAsSoldVehicle}
                  >
                    {t(LabelConstants.MARK_AS_SOLD)}
                  </span>
                )}
                {showDelete &&
                vehicle.VehicleListingStatusKey !== ListingStatus.Deleted ? (
                  <span
                    className="cursor-pointer bg-white !border-primary border text-primary text-base leading-5 rounded-md px-[0.625rem] py-[0.3125rem] font-bold whitespace-nowrap uppercase"
                    onClick={handleDeleteVehicle}
                  >
                    {t(LabelConstants.DELETE)}
                  </span>
                ) : null}
                {showEdit &&
                vehicle.VehicleListingStatusKey !== ListingStatus.Deleted ? (
                  <span
                    className="cursor-pointer bg-primary text-white text-base leading-5 rounded-md px-[0.625rem] py-[0.3125rem] font-bold whitespace-nowrap uppercase"
                    onClick={() => {
                      // if (
                      //   vehicle.IsSelfListedVehicle &&
                      //   vehicle?.VehicleListingStatusKey ===
                      //     ListingStatus?.Saved
                      // ) {
                      //   setShowRestrictUserDropdown(true);
                      // }
                      // else {
                      router.push(
                        `/vehicle-onboard/${vehicle.VehicleListingId}`
                      );
                      // }
                    }}
                  >
                    {t(LabelConstants.EDIT)}
                  </span>
                ) : null}
              </div>

              {vehicle.VehicleListingStatusKey === ListingStatus.Listed && (
                <>
                  {/* Task 12340: Hide BUY Inspection button from My Vehicles page for Silver Package flow */}
                  {/* {vehicle.IsAvailableForInspection &&
                        !vehicle.IsAvailableForBookInspection && (
                          <button
                            type="button"
                            className="btn btn-primary uppercase !text-sm !min-w-min !min-h-min !py-1 !px-2"
                            onClick={() => handleBuyInspection()}
                          >
                            {t(LabelConstants.BTN_BUY_INSPECTION)}
                          </button>
                        )} */}
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-4 justify-end w-full flex-wrap">
            {!(
              vehicle.VehicleListingStatusKey === ListingStatus.QCRejected ||
              vehicle.VehicleListingStatusKey ===
                ListingStatus.ListedQCRejectedForUpgrade ||
              vehicle.VehicleListingStatusKey === ListingStatus.Sold ||
              vehicle.VehicleListingStatusKey === ListingStatus.Deleted ||
              vehicle.VehicleListingStatusKey === ListingStatus.Delisted
            ) && (
              <>
                <button onClick={() => handleBuyReport()}>
                  <span className="cursor-pointer bg-gradient text-white text-base leading-5 rounded-md px-[0.625rem] py-[0.3125rem] font-bold whitespace-nowrap uppercase">
                    {t(LabelConstants.BUY_FULL_MOJAZ_REPORT)}
                  </span>
                </button>
                <span
                  className="cursor-pointer bg-primary text-white text-base leading-5 rounded-md px-[0.625rem] py-[0.3125rem] font-bold whitespace-nowrap uppercase"
                  onClick={() => setShowUploadMojaz(true)}
                >
                  {t(LabelConstants.UPLOAD_MOJAZ_REPORT)}
                </span>
              </>
            )}

            {vehicle.IsMojazReportAvailable &&
              !(
                vehicle.VehicleListingStatusKey === ListingStatus.QCRejected ||
                vehicle.VehicleListingStatusKey ===
                  ListingStatus.ListedQCRejectedForUpgrade ||
                vehicle.VehicleListingStatusKey === ListingStatus.Sold ||
                vehicle.VehicleListingStatusKey === ListingStatus.Deleted ||
                vehicle.VehicleListingStatusKey === ListingStatus.Delisted
              ) && (
                <span
                  className="cursor-pointer bg-white !border-primary border text-primary text-base leading-5 rounded-md px-[0.625rem] py-[0.3125rem] font-bold whitespace-nowrap uppercase"
                  onClick={() => handleDownloadMojazReport()}
                >
                  {t(LabelConstants.VEHICLE_HISTORY)}
                </span>
              )}

            {/* {vehicle.IsEligibleForUpgrade &&
              StatusAllowedForUpgrade.includes(
                vehicle.VehicleListingStatusKey
              ) && (
                <span
                  className="cursor-pointer bg-gradient text-white text-base leading-5 rounded-md px-[0.625rem] py-[0.3125rem] font-bold whitespace-nowrap uppercase"
                  onClick={() =>
                    router.push(
                      `/select-package?CurrentPackageId=${vehicleData?.PackageReferenceId!}&IsUpgradePackage=true&OrderItemId=${vehicleData?.OrderItemId!}`
                    )
                  }
                >
                  {t(LabelConstants.UPGRADE_PACKAGE)}
                </span>
              )} */}
          </div>
        </div>

        {/* hide the status bar */}

        {/* <div className="hidden sm:grid grid-cols-8 px-3 pb-3">
          {vehicle.Statuses.map((x, i) => (
            <Fragment key={i}>
              {x.Display === 'true' ? (
                <div className="w-full">
                  <div className="w-auto flex items-center">
                    {x.Color === 'green' && x.Sign === 'Y' ? (
                      <div className="flex flex-col gap-[0.3125rem] w-full">
                        <div className="flex items-center">
                          {i === 0 ? (
                            <div className="w-full"></div>
                          ) : (
                            <div className="w-full border-b border-b-dark-gray2 border-dashed"></div>
                          )}
                          <div className="text-success w-6 h-6 rounded-full flex items-center justify-center">
                            <SuccessIcon className="w-6 h-6" />
                          </div>
                          {vehicle.Statuses.length === i + 1 ? (
                            <div className="w-full"></div>
                          ) : (
                            <div className="w-full border-b border-b-dark-gray2 border-dashed"></div>
                          )}
                        </div>
                        <div className="w-full whitespace-pre-wrap text-success text-xs px-2 text-center">
                          {x.StatusName}
                        </div>
                      </div>
                    ) : x.Color === 'green' && x.Sign === 'X' ? (
                      <div className="flex flex-col gap-[0.3125rem] w-full">
                        <div className="flex items-center">
                          {i === 0 ? (
                            <div className="w-full"></div>
                          ) : (
                            <div className="w-full border-b border-b-dark-gray2 border-dashed"></div>
                          )}
                          <div className="bg-error flex items-center justify-center min-w-[1.5rem] min-h-[1.5rem] rounded-full">
                            <CircleCloseIcon className="w-4" />
                          </div>
                          {vehicle.Statuses.length === i + 1 ? (
                            <div className="w-full"></div>
                          ) : (
                            <div className="w-full border-b border-b-dark-gray2 border-dashed"></div>
                          )}
                        </div>
                        <div className="w-full whitespace-pre-wrap text-error text-xs px-2 text-center">
                          {x.StatusName}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[0.3125rem] w-full">
                        <div className="flex items-center">
                          {i === 0 ? (
                            <div className="w-full"></div>
                          ) : (
                            <div className="w-full border-b border-b-dark-gray2 border-dashed"></div>
                          )}
                          <div className="text-light-gray w-6 h-6 rounded-full flex items-center justify-center">
                            <SuccessIcon className="w-6 h-6" tickFill="none" />
                          </div>
                          {vehicle.Statuses.length === i + 1 ? (
                            <div className="w-full"></div>
                          ) : (
                            <div className="w-full border-b border-b-dark-gray2 border-dashed"></div>
                          )}
                        </div>
                        <div className="w-full whitespace-pre-wrap font-bold text-dark-gray2 text-xs px-2 text-center">
                          {x.StatusName}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </Fragment>
          ))}
        </div> */}
        {vehicle.VehicleListingStatusKey !== ListingStatus.Deleted && (
          <div className="absolute top-3 ltr:left-5 rtl:right-5">
            <div className="h-14">
              {vehicle.ListedDays <= 30 ? (
                <FlagIcon className="h-full fill-[#48bc00]" />
              ) : vehicle.ListedDays <= 45 ? (
                <FlagIcon className="h-full fill-[#f29232]" />
              ) : (
                <FlagIcon className="h-full fill-[#dc323a]" />
              )}
              <div className="absolute top-0 flex flex-col items-center w-full h-full text-xs text-white pt-1">
                <span>{vehicle.ListedDays}</span>
                <span>{t(LabelConstants.DAYS)}</span>
              </div>
            </div>
          </div>
        )}
        {vehicle.IsSubmitted &&
          vehicle.IsAvailableForInspection &&
          vehicle.IsUpgradedFromSelfListedPackage && (
            <div className="flex gap-2 justify-center p-3 items-center">
              <h1 className="my-5 text-base text-primary leading-5">
                {disclaimerText[CMSConstants.UPGRADE_PACKAGE_SCHEDULE]}
              </h1>
              <button
                type="button"
                className="btn btn-primary uppercase !text-sm !min-w-min !min-h-min !py-1 !px-2"
                onClick={() => setShowBuyInspectionPopUp(true)}
              >
                {t(LabelConstants.BTN_BOOK_APPOINTMENT)}
              </button>
            </div>
          )}

        {/* Booking inspection model */}
        {showBuyInspectionPopUp && (
          <InspectionAppointmentModal
            vehicleListingId={vehicle.VehicleListingId}
            showBuyInspectionPopUp={showBuyInspectionPopUp}
            setShowBuyInspectionPopUp={setShowBuyInspectionPopUp}
            onClose={() => loadVehicleData()}
          />
        )}
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

      {/* Delete Vehicle Modal */}
      <DeleteVehicleModal
        show={openDeleteVehicleModal}
        listingId={vehicle.VehicleListingId}
        onClose={(isDeleted: boolean) => {
          if (isDeleted) handleDelete();
          setOpenDeleteVehicleModal(false);
        }}
      />

      {/* Delete Vehicle Modal */}
      <MarkAsSoldVehicleModal
        show={openMarkAsSoldVehicleModal}
        listingId={vehicle.VehicleListingId}
        onClose={(isMarkedAsSold: boolean) => {
          if (isMarkedAsSold) handleDelete();
          setOpenMarkAsSoldVehicleModal(false);
        }}
      />

      {/* Upload Mojaz Report Modal */}
      <UploadMojazModal
        show={showUploadMojaz}
        hide={setShowUploadMojaz}
        listingId={vehicle.VehicleListingId}
        loadVehicleData={loadVehicleData}
      />

      {/* Sign In Modal */}
      <SignInModal
        show={openSignInModal}
        onClose={() => {
          setOpenSignInModal(false);
          router.push('/');
        }}
      />

      {showRestrictUserDropdown && (
        <ShowRestrictUserDropdown
          showDropdown={showRestrictUserDropdown}
          setShowDropdown={setShowRestrictUserDropdown}
        />
      )}
    </>
  );
};

export default ListingVehicleCard;
