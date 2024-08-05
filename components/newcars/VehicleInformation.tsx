import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import {
  SocialMediaPlatformItem,
  VehicleListingData,
} from '../../types/models';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import {
  ArrowRightIcon,
  BookmarkIcon,
  FilledBookmarkIcon,
  ShareIcon,
} from '../icons';
import {
  CommonUtils,
  SessionUtils,
  formatNumber,
} from '../../helpers/utilities';
import {
  GlobalService,
  ListingService,
  NewCarService,
  ProfileService,
  VehicleService,
} from '../../helpers/services';
import ConfigurationService from '../../helpers/services/configuration.service';
import {
  ConfigurationKey,
  Locales,
  UserProfileStatus,
  VehicleListingStatus,
} from '../../types/enums';
import router, { useRouter } from 'next/router';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import DisclaimerModal from './DisclaimerModal';
import SignInModal from '../common/SignInModal';
import { CMSPageKey, SignInRedirectType } from '../../types/constants';
import moment from 'moment';
import { PushDataToGTM } from '../../helpers/utilities/gtm';
import { GTMEvents } from '../../types/gtm';
import { getColorBackground } from './ColorVariant';
import ShareModal from '../used-cars/ShareModal';
import CashFinanceModal from './CashFinanceModal';
import { Modal, ModalBody, ModalSize } from '../common/Modal';

type VehicleInformationProps = {
  vehicleListingData: VehicleListingData;
};

const VehicleInformation = ({
  vehicleListingData,
}: VehicleInformationProps) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  const [openDisclaimerModal, setOpenDisclaimerModal] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<string>();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [elmConfiguration, setELMConfiguration] = useState<{
    userConfig: {
      absherVerification: boolean;
      addressVerification: boolean;
      isAbsherVerified: boolean;
      isYakeenVerified: boolean;
      status: UserProfileStatus;
      isActive: boolean;
    };
    globalConfig: { absherVerification: boolean; addressVerification: boolean };
  }>();
  const [isFav, setIsFav] = useState<boolean>(false);
  const [disclaimerText, setDisclaimerText] = useState<{
    [x: string]: string;
  }>({});
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [sharingPlatform, setSharingPlatform] = useState<
    Array<SocialMediaPlatformItem>
  >([]);
  const [openCashFinanceModal, setOpenCashFinanceModal] =
    useState<boolean>(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  useEffect(() => {
    const isAuthenticated = SessionUtils.isValidSession();
    const user = SessionUtils.getUserDetails();
    setUserId(user?.UserId);
    // fetch ELM details
    const initialLoad = async () => {
      if (isAuthenticated && user?.UserId) {
        const [profile, absherVerification, addressVerification] =
          await Promise.all([
            ProfileService.fetchUserData(router.locale),
            ConfigurationService.fetchConfigurationValue(
              ConfigurationKey.IsAbsherVerificationRequired,
              router.locale
            ),
            ConfigurationService.fetchConfigurationValue(
              ConfigurationKey.IsUserAddressVerificationRequired,
              router.locale
            ),
          ]);

        setELMConfiguration({
          userConfig: {
            isAbsherVerified: profile.IsAbsherVerified,
            isYakeenVerified: profile.IsYakeenVerified,
            absherVerification: profile.IsAbsherVerificationRequired,
            addressVerification: profile.IsAddressVerificationRequired,
            status: profile.UserProfileStatusKey as UserProfileStatus,
            isActive: profile.IsActive,
          },
          globalConfig: {
            absherVerification:
              absherVerification.ConfigurationValue === 'true',
            addressVerification:
              addressVerification.ConfigurationValue === 'true',
          },
        });

        // fetch bookmark data
        const bookmark = await VehicleService.fetchBookmark();
        setIsFav(
          bookmark?.VehicleListingIds?.some(
            (x) =>
              String(x) ===
              String(vehicleListingData?.Overview?.VehicleListingId || '')
          )
        );
      } else {
        setIsFav(false);
      }
      const discData = await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Disclaimer,
        null,
        router.locale
      );
      setDisclaimerText(discData);
      const platformData = await GlobalService.fetchSocialMediaPlatform(
        router.locale
      );
      setSharingPlatform(platformData);
    };
    initialLoad();
  }, [vehicleListingData]);

  useEffect(() => {
    if (vehicleListingData) {
      const redirectType = localStorage.getItem('SignInRedirectOperation');
      const redirectJSON = JSON.parse(redirectType!);
      const localStorageVehicleId = redirectJSON?.OperationDetails?.vehicleId;
      const isAuthenticated = SessionUtils.isValidSession();
      if (
        redirectJSON?.RedirectOperationType === SignInRedirectType.BookMark &&
        isAuthenticated
      ) {
        if (
          vehicleListingData?.Overview?.VehicleListingId ===
          localStorageVehicleId
        ) {
          bookmarkHandler();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, vehicleListingData]);

  const handleBookNowBtnClick = async () => {
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
          const isAvailable = await ListingService.checkAvailability(
            vehicleListingData?.Overview?.VehicleListingId
          );
          if (isAvailable) {
            if (
              !vehicleListingData?.Overview.IsOutletAcknowledged &&
              vehicleListingData?.Overview.IsOutlet
            ) {
              setOpenDisclaimerModal(true);
            } else {
              setOpenCashFinanceModal(true);
            }
          } else {
            setShowAvailabilityModal(true);
          }
        }
        localStorage.removeItem('SignInRedirectOperation');
      } else {
        setShowLogin(true);
        const SignInRedirectOperationObj = {
          RedirectOperationType: SignInRedirectType.ClickedSellerDetails,
          OperationDetails: {
            vehicleId: vehicleListingData?.Overview?.VehicleListingId,
          },
        };
        localStorage.setItem(
          'SignInRedirectOperation',
          JSON.stringify(SignInRedirectOperationObj)
        );
      }
    } else {
      setShowLogin(true);
      const SignInRedirectOperationObj = {
        RedirectOperationType: SignInRedirectType.ClickedSellerDetails,
        OperationDetails: {
          vehicleId: vehicleListingData?.Overview?.VehicleListingId,
        },
      };
      localStorage.setItem(
        'SignInRedirectOperation',
        JSON.stringify(SignInRedirectOperationObj)
      );
    }
  };

  const handleUserAcknowledgement = async (isSelected: boolean) => {
    try {
      const isAcknowledge = await VehicleService.saveUserAcknowledgement({
        UserID: userId,
        VehicleListingID: vehicleListingData?.Overview?.VehicleListingId,
        IsAccepted: isSelected,
      });
      if (isAcknowledge) {
        setOpenCashFinanceModal(true);
      }
    } catch (error) {
      console.error('Error while saving user acknowledgement:', error);
    }
  };

  const bookmarkHandler = async () => {
    if (SessionUtils.isValidSession()) {
      if (isFav) {
        await VehicleService.deleteBookmark({
          VehicleListingID: String(
            vehicleListingData?.Overview?.VehicleListingId || ''
          ),
        });
        //Added GTM event for Removed BookMark Click
        PushDataToGTM(GTMEvents.RemovedBookmark, {
          vehicleListingId:
            process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! +
            vehicleListingData?.Overview?.VehicleListingId,
          userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + userId,
          languageId: router.locale,
        });
      } else {
        //Added GTM event for Add BookMark Click
        PushDataToGTM(GTMEvents.AddBookmark, {
          vehicleListingId:
            process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! +
            vehicleListingData?.Overview?.VehicleListingId,
          userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + userId,
          languageId: router.locale,
        });
        await VehicleService.addBookmark({
          VehicleListingID: String(
            vehicleListingData?.Overview?.VehicleListingId || ''
          ),
        });
      }
      const bookmark = await VehicleService.fetchBookmark();
      setIsFav(
        bookmark?.VehicleListingIds?.some(
          (x) =>
            String(x) ===
            String(vehicleListingData?.Overview?.VehicleListingId || '')
        )
      );
      localStorage.removeItem('SignInRedirectOperation');
    } else {
      setShowLogin(true);
      const SignInRedirectOperationObj = {
        RedirectOperationType: SignInRedirectType.BookMark,
        OperationDetails: {
          vehicleId: vehicleListingData?.Overview?.VehicleListingId,
        },
      };
      localStorage.setItem(
        'SignInRedirectOperation',
        JSON.stringify(SignInRedirectOperationObj)
      );
    }
  };

  const handlePersonalizedOffer = async () => {
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
          const hashData = await NewCarService.saveEMIRequest(
            vehicleListingData?.Overview?.VehicleListingId,
            parseInt(userId!)
          );
          const configData = await ConfigurationService.fetchConfigurationValue(
            ConfigurationKey.EMICalculatorURL,
            router.locale
          );
          if (hashData && configData.ConfigurationValue) {
            window.open(
              `${configData.ConfigurationValue}${hashData}`,
              '',
              'toolbar=yes,scrollbars=yes,resizable=yes,fullscreen=yes'
            );
          }
        }
      } else {
        setShowLogin(true);
      }
    }
  };

  const handleWishList = async () => {
    await VehicleService.addWishList({
      VehicleListingID: String(vehicleListingData?.Overview?.VehicleListingId!),
    });
    setShowAvailabilityModal(false);
  };

  return (
    <>
      <div className="p-6 border rounded">
        <div className="flex justify-between">
          {vehicleListingData?.Overview?.VehicleListingStatusID ===
          VehicleListingStatus.Booked ? (
            <div className="flex items-center outline outline-1 rounded outline-orange-500 px-2 text-orange-400">
              <span className="uppercase"> {t(LabelConstants.BOOKED)}</span>
            </div>
          ) : vehicleListingData?.Overview?.VehicleListingStatusID ===
            VehicleListingStatus.Sold ? (
            <div className="flex items-center outline outline-1 rounded outline-orange-500 px-2 text-orange-400">
              <span className="uppercase"> {t(LabelConstants.SOLD)}</span>
            </div>
          ) : (
            <div></div>
          )}
          {/** hided this label
           t(LabelConstants.IN_STOCK) */}
          <div
            onClick={bookmarkHandler}
            className="flex items-center justify-center cursor-pointer p-2 rounded-full bg-lighter-gray w-9 h-9"
            title={isFav ? '' : t(LabelConstants.BOOKMARK_NOW)}
          >
            {isFav ? (
              <FilledBookmarkIcon className="w-6 mt-[1px] ml-[1px]" />
            ) : (
              <BookmarkIcon className="w-6 mt-[1px] ml-[1px]" />
            )}
          </div>
        </div>
        <div className="pt-5 text-2xl font-semibold leading-8 uppercase">
          {`${vehicleListingData?.Overview?.Make} ${vehicleListingData?.Overview?.Model} ${vehicleListingData?.Overview?.Spec} ${vehicleListingData?.Overview?.ModelYear}`}
        </div>
        <div className="text-gray-400 py-5 pt-2 border-b">
          <ul className="flex list-inside gap-3 list-disc">
            {vehicleListingData?.Overview?.FuelType ? (
              <li className="list-disc first:list-none">
                {vehicleListingData?.Overview?.FuelType || '-'}
              </li>
            ) : (
              <></>
            )}
            {vehicleListingData?.Overview?.Transmission ? (
              <li className="list-disc first:list-none">
                {vehicleListingData?.Overview?.Transmission || '-'}
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="flex justify-between items-center border-b">
          <div>
            <div className="text-gray-400 pt-5">
              {t(LabelConstants.VARIANT)}
            </div>
            <div className="py-5 pt-2">
              {vehicleListingData?.Overview?.Spec || '-'}
            </div>
          </div>
        </div>
        <div className="text-gray-400 pt-5 pb-1">{t(LabelConstants.COLOR)}</div>
        <div className="flex flex-col gap-3">
          <span>
            {vehicleListingData?.Overview?.ColorVariantName
              ? vehicleListingData?.Overview?.ColorVariantName
              : vehicleListingData?.Overview?.Color}
          </span>
          <div className="flex pb-7 border-b">
            <div className="rounded-full bg-white border border-primary">
              <div
                className="w-9 h-9 rounded-full border border-lighter-gray"
                style={{
                  background: getColorBackground(
                    vehicleListingData?.Overview?.ColorVariantHexCode
                      ? vehicleListingData?.Overview?.ColorVariantHexCode
                      : vehicleListingData?.Overview?.ExteriorColorHex
                  ),
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between pt-5">
          <div>
            <div>{t(LabelConstants.PRICE)}</div>
            <span className="text-primary text-3xl font-bold">
              {`${vehicleListingData?.Overview?.CurrencySymbol} ${
                formatNumber(vehicleListingData?.Overview?.AskingPrice) || '-'
              }`}
            </span>
            <span className="pl-2 text-sm">
              {t(LabelConstants.INCLUSIVE_VAT)}
            </span>
          </div>
        </div>
        <div className="flex justify-between pt-5 border-b py-3">
          <div>
            <div>{t(LabelConstants.EMI_LABEL)}</div>
            <div className="flex">
              <div className="text-[#F49927]">
                {`${vehicleListingData.Overview?.CurrencySymbol} ${formatNumber(
                  vehicleListingData.Overview?.MonthlyEMI || 0
                )}`}
              </div>
              <span className="text-primary">{`/${t(
                LabelConstants.LBL_MONTH
              ).toLowerCase()}*`}</span>
            </div>
          </div>
          <div className="place-self-end flex gap-1 cursor-pointer items-center">
            <div
              className="text-sm text-primary"
              onClick={() =>
                router.push(
                  `/newcars/new/leads?v=${CommonUtils.encode(
                    String(vehicleListingData?.Overview?.VehicleListingId)
                  )}`
                )
              }
            >
              {t(LabelConstants.CHECK_YOUR_PERSONALIZED_OFFER)}
            </div>
            <div>
              <ArrowRightIcon className="h-3 w-3 !text-primary" />
            </div>
          </div>
        </div>
        {vehicleListingData?.Overview?.EMICalculationDate &&
        moment(vehicleListingData?.Overview?.EMICalculationDate).isValid() ? (
          <span className="text-sm block mt-5 text-dark-gray2">
            {t(LabelConstants.INDICATIVE_EMI, {
              date: moment(
                vehicleListingData?.Overview?.EMICalculationDate
              ).format('DD/MM/YYYY, HH:mm A'),
            })}
          </span>
        ) : (
          <></>
        )}
        <div className="text-gray-400 text-sm pt-2">
          {`* ${disclaimerText[CMSConstants.EMI_DISCLAIMER]}`}
        </div>
        {/* {vehicleListingData?.Overview?.VehicleListingStatusID ===
          VehicleListingStatus.Booked ||
        vehicleListingData?.Overview?.VehicleListingStatusID ===
          VehicleListingStatus.Sold ? (
          <></>
        ) : (
          <button
            className="w-full btn btn-primary rounded mt-4 mb-3 cursor-pointer"
            onClick={() => {
              if (
                vehicleListingData?.Overview?.VehicleListingStatusID !==
                  VehicleListingStatus.Booked &&
                vehicleListingData?.Overview?.VehicleListingStatusID !==
                  VehicleListingStatus.Sold
              ) {
                handleBookNowBtnClick();
              }
            }}
          >
            {t(LabelConstants.BOOK_NOW)}
          </button>
        )} */}
        <div
          className={`cursor-pointer w-full mt-5 mb-3 border-gradient text-xl min-w-[17.188rem] min-h-[3.5rem] leading-[1.563rem] rounded-[0.25rem] px-2 flex items-center justify-center 
         `}
          onClick={() => {
            router.push(
              `/newcars/new/leads?v=${CommonUtils.encode(
                String(vehicleListingData?.Overview?.VehicleListingId)
              )}`
            );
          }}
        >
          <div className="text-gradient font-bold uppercase">
            {t(LabelConstants.IM_INTERESTED)}
          </div>
        </div>
        <DisclaimerModal
          show={openDisclaimerModal}
          onClose={() => setOpenDisclaimerModal(false)}
          configurationKey={ConfigurationKey.OutletVehiclePurchaseDisclaimer}
          handleUserAcknowledgement={handleUserAcknowledgement}
        />
        <SignInModal
          show={showLogin}
          onClose={() => {
            if (String(router.query.tab).toLowerCase() === 'doc') {
              router.replace('/');
            }
            setShowLogin(false);
            localStorage.removeItem('SignInRedirectOperation');
          }}
        />
        <div className="flex pt-5">
          <div className="flex items-center gap-4">
            <div>{t(LabelConstants.SHARE)}</div>
            <span
              className="cursor-pointer flex justify-center items-center w-9 h-9 rounded-full bg-[#eee]"
              title={t(LabelConstants.SHARE_WITH)}
              onClick={() => setOpenShareModal(true)}
            >
              <ShareIcon className="w-[1rem] h-[1rem]" />
            </span>
          </div>
        </div>
      </div>
      <ShareModal
        show={openShareModal}
        listingId={vehicleListingData?.Overview?.VehicleListingId}
        sharingPlatform={sharingPlatform}
        onClose={() => setOpenShareModal(false)}
        shareUrl={
          router.locale === Locales.EN
            ? `${origin}${asPath}`
            : `${origin}/ar${asPath}`
        }
      />
      <CashFinanceModal
        openCashFinanceModal={openCashFinanceModal}
        setOpenCashFinanceModal={setOpenCashFinanceModal}
        vehicleId={vehicleListingData?.Overview?.VehicleListingId}
      />
      <Modal
        show={showAvailabilityModal}
        onClose={() => {
          setShowAvailabilityModal(false);
        }}
        size={ModalSize.MEDIUM}
      >
        <ModalBody>
          <div className="flex flex-col flex-wrap gap-8">
            <h1 className="text-large leading-7">{`${t(
              LabelConstants.BOOKING_UNAVAILABLE
            )}`}</h1>
            <div className="flex items-center justify-center gap-4">
              <button
                className="btn btn-secondary uppercase btn-modal"
                onClick={() => setShowAvailabilityModal(false)}
              >
                {t(LabelConstants.OK)}
              </button>
              <button
                className="btn btn-primary uppercase btn-modal"
                onClick={() => handleWishList()}
              >
                {t(LabelConstants.WISHLIST_IT_BTN)}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default VehicleInformation;
