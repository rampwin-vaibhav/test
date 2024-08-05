import moment from 'moment';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InvoiceService, VehicleService } from '../../../helpers/services';
import { formatNumber, SessionUtils } from '../../../helpers/utilities';
import { PushDataToGTM } from '../../../helpers/utilities/gtm';
import { Locales, UserProfileStatus } from '../../../types/enums';
import { GTMEvents } from '../../../types/gtm';
import { CMSConstants, LabelConstants } from '../../../types/i18n.labels';
import {
  SearchResultItem,
  SocialMediaPlatformItem,
} from '../../../types/models';
import {
  CalendarIcon,
  OdometerIcon,
  OwnerIcon,
  PetrolIcon,
  TransmissionIcon,
} from '../../icons';
import SellerDetailsModal from '../../used-cars/SellerDetailsModal';
import ShareModal from '../../used-cars/ShareModal';
import MessageBox, { MessageBoxResult, MessageBoxType } from '../MessageBox';
import Ribbon from '../Ribbon';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '../Modal';
import { DeleteIcon } from '../../icons/DeleteIcon';
import ConfigurationService from '../../../helpers/services/configuration.service';
import { CMSConfigurationKey, CMSPageKey } from '../../../types/constants';
import { useAppContext } from '../../../provider/AppProvider';

type VehicleCardProps = {
  vehicle: SearchResultItem;
  sharingPlatform: Array<SocialMediaPlatformItem>;
  quotationIds: Array<number>;
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
  fetchFinanceRequest: () => void;
  isNewCarEnabled: string;
  handelDelete: (VehicleListingId: string) => void;
  handelFinanceIt: (vehicle: any) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

const ShoppingItemVehicleCard = ({
  vehicle,
  sharingPlatform = [],
  quotationIds = [],
  setSignInRequired,
  elmConfiguration,
  isNewCarEnabled,
  handelDelete,
  fetchFinanceRequest,
  handelFinanceIt,
  showModal,
  setShowModal,
}: VehicleCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { dateFormat } = useAppContext();
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [openSellerDetailsModal, setOpenSellerDetailsModal] =
    useState<boolean>(false);
  const [, setIsRequestedForFinanced] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const [openConfirmationModal, setOpenConfirmationModal] =
    useState<boolean>(false);

  const [financeItMessages, setFinanceItMessages] = useState<{
    [x: string]: string;
  }>({});

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
    const financeItMessages = async () => {
      const data = await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.FinanceIt,
        null,
        router.locale
      );
      setFinanceItMessages(data);
    };
    financeItMessages();
  }, [router.locale]);

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

  const fianceItClickHandler = async () => {
    if (SessionUtils.isValidSession() && elmConfiguration) {
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
          //Add quotation
          handelFinanceIt(vehicle);
        }
      }
    } else {
      setSignInRequired();
    }
  };

  const onCloseModel = () => {
    setShowModal(false);
    fetchFinanceRequest();
  };

  return (
    <div className="gogo-shopping-cart-item-vehicle-card mx-auto max-w-[20.5rem] space-y-1 sm:space-y-0 sm:max-w-none">
      <div className="frame top-frame">
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
            <picture className="vehicle-image">
              <img
                src={
                  vehicle.DefaultWebImageThumbnailUrlPath ||
                  vehicle.DefaultWebImageUrlPath ||
                  '/images/default-car.jpg'
                }
                alt=""
                className="lg:w-[19.5rem] w-[17.5rem] aspect-[16/9] rounded-sm"
                onError={(event: any) => {
                  event.target.src = '/images/default-car.jpg';
                  event.onerror = null;
                }}
              />
            </picture>
            {isNewCarEnabled === 'true' &&
              vehicle.IsNew &&
              vehicle.IsNew.toLowerCase() === 'true' && <Ribbon />}
          </a>
        </Link>
      </div>
      <div className="flex flex-col pb-0 h-auto sm:h-full justify-start w-full ltr:lg:!ml-6 ltr:sm:!ml-3 rtl:sm:!mr-3 rtl:lg:!mr-6">
        <div className="pb-[1.0625rem] flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-start">
          <Link
            href={`/car-details/${vehicle.VehicleMake.toLowerCase()}/${vehicle.VehicleModel.toLowerCase()}/${
              vehicle.VehicleListingId
            }?y=${vehicle.ManufactureYear ?? ''}`}
          >
            <a
              href={`/car-details/${vehicle.VehicleMake.toLowerCase()}/${vehicle.VehicleModel.toLowerCase()}/${
                vehicle.VehicleListingId
              }?y=${vehicle.ManufactureYear ?? ''}`}
              className="flex justify-start w-full text-xl font-bold leading-[1.5625rem] capitalize overflow-hidden text-dark-gray1"
            >{`${vehicle.VehicleMake} ${vehicle.VehicleModel}`}</a>
          </Link>
          <div className="flex w-full justify-end items-center gap-6">
            <div>{t(LabelConstants.TOTAL_AMOUNT)}</div>
            <div
              className="md:text-xl text-base leading-[1.5625rem] font-bold text-primary whitespace-nowrap"
              dir="ltr"
            >
              <span className="inline-block mr-1">
                {`${t(LabelConstants.SAR)}`}
              </span>
              {`${
                vehicle.AskingPrice ? formatNumber(vehicle.AskingPrice, 2) : '-'
              }`}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[1.125rem]">
          <div className="flex flex-col-reverse gap-4 md:gap-0  md:flex-row items-center justify-between">
            <div className="flex text-sm text-dark-gray2  flex-wrap gap-4 md:gap-[3.504rem] leading-[1.0625rem]">
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
                {`${vehicle.ManufactureYear ? vehicle.ManufactureYear : '-'}`}
              </div>
              <div className="flex items-center gap-1">
                <OwnerIcon />
                {`${vehicle.Ownership ? vehicle.Ownership : '-'}`}
              </div>
              <div className="flex items-center gap-1">
                <TransmissionIcon />
                {`${vehicle.Transmission ? vehicle.Transmission : '-'}`}
              </div>
            </div>
            <div className="flex justify-end w-full md:w-auto">
              {t(LabelConstants.INCLUSIVE_VAT)}
            </div>
          </div>
          <div className="flex text-sm text-dark-gray2 justify-between flex-wrap leading-[1.0625rem]">
            <div>
              {`${t(LabelConstants.LISTING_DATE)} - `}
              <span className="font-medium">
                {vehicle.ListedDate
                  ? moment(vehicle.ListedDate).format(dateFormat)
                  : '-'}
              </span>
            </div>
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handelDelete(vehicle?.VehicleListingId)}
            >
              <DeleteIcon className="h-4 w-4" />
              <div className="text-error underline text-sm">
                {t(LabelConstants.REMOVE)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end items-center gap-1 pt-7 sm:pb-[0.8125rem]">
          {userId !== vehicle.SellerId && (
            <button
              onClick={() => setOpenConfirmationModal(true)}
              className="btn btn-primary uppercase"
            >
              {t(LabelConstants.BTN_FINANCE_IT)}
            </button>
          )}
        </div>
      </div>
      <div></div>

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
      {/* Confirmation Modal */}
      <Modal
        show={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        size={ModalSize.SMALL}
      >
        <>
          <ModalHeader>
            <div className="justify-start border-b-2 pb-4">
              <h1 className="text-2xl text-gray-700 font-bold">
                {t(LabelConstants.LBL_CONFIRMATION)}
              </h1>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="justify-center">
              <h1 className=" text-start text-lg font-normal">
                {financeItMessages[CMSConstants.FinanceItAlert]}
              </h1>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end gap-1 sm:gap-5 border-t-2 pt-4">
              <button
                className="btn btn-secondary btn-auto !w-32 text-center uppercase"
                onClick={() => setOpenConfirmationModal(false)}
              >
                {t(LabelConstants.NO)}
              </button>
              <button
                className="btn btn-primary btn-auto !w-32 text-center uppercase"
                onClick={() => {
                  fianceItClickHandler();
                  setOpenConfirmationModal(false);
                }}
              >
                {t(LabelConstants.YES)}
              </button>
            </div>
          </ModalFooter>
        </>
      </Modal>
      {/* Success Modal */}
      <Modal
        show={showModal}
        onClose={() => onCloseModel()}
        containerClassName="w-[40rem]"
      >
        <>
          <ModalHeader>
            <div className="justify-start border-b-2 pb-4">
              <h1 className="text-2xl text-gray-700 font-bold">
                {t(LabelConstants.LBL_THANK_YOU)}
              </h1>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4 justify-center">
              <h1 className=" text-lg">
                {financeItMessages[CMSConstants.FinanceItSuccessMessage1]}
              </h1>
              <h1 className="mt-4 text-lg">
                {financeItMessages[CMSConstants.FinanceItSuccessMessage2]}
              </h1>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-end border-t-2 pt-4 ">
              <button
                className="btn btn-primary btn-auto !w-32 text-center uppercase"
                onClick={() => onCloseModel()}
              >
                {t(LabelConstants.OK)}
              </button>
            </div>
          </ModalFooter>
        </>
      </Modal>
    </div>
  );
};

export default ShoppingItemVehicleCard;
