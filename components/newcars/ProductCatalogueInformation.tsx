import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import {
  ProductCatalogueData,
  GetColorVariantResponse,
  GetVariantResponse,
} from '../../types/models';
import { CMSConstants, LabelConstants } from '../../types/i18n.labels';
import { ArrowRightIcon, BookmarkIcon, FilledBookmarkIcon } from '../icons';
import {
  CommonUtils,
  SessionUtils,
  formatNumber,
} from '../../helpers/utilities';
import {
  NewCarService,
  ProfileService,
  VehicleService,
} from '../../helpers/services';
import ConfigurationService from '../../helpers/services/configuration.service';
import { ConfigurationKey, UserProfileStatus } from '../../types/enums';
import router from 'next/router';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../common/MessageBox';
import SignInModal from '../common/SignInModal';
import { CMSPageKey, SignInRedirectType } from '../../types/constants';
import moment from 'moment';
import { getColorBackground } from './ColorVariant';
import CashFinanceModal from './CashFinanceModal';
import VariantModal from './VariantModal';
import ProductCatalogueColorVariant from './ProductCatalogueColorVariant';
import { Modal, ModalBody, ModalSize } from '../common/Modal';

type VehicleInformationProps = {
  productCatalogueData: ProductCatalogueData | undefined;
  VehicleListingId: number | null;
};

const ProductCatalogueInformation = ({
  productCatalogueData,
  VehicleListingId,
}: VehicleInformationProps) => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState<string>();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
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
  const [isWishList, setIsWishList] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [disclaimerText, setDisclaimerText] = useState<{
    [x: string]: string;
  }>({});

  const [openCashFinanceModal, setOpenCashFinanceModal] =
    useState<boolean>(false);
  const [openVariantModal, setOpenVariantModal] = useState<boolean>(false);
  const [colorVariantData, setColorVariantData] = useState<
    Array<GetColorVariantResponse> | []
  >([]);
  const [variantData, setVariantData] = useState<
    Array<GetVariantResponse> | []
  >([]);

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
          bookmark?.ProductCatalogueIds?.some(
            (x) =>
              String(x) ===
              String(productCatalogueData?.ProductCatalogueId || '')
          )
        );
      } else {
        setIsFav(false);
      }

      const variants = await VehicleService.getProductCatalogueVariants(
        productCatalogueData?.ProductCatalogueId
      );
      setVariantData(variants);

      const colorData = await VehicleService.getProductCatalogueColorVariants(
        router.locale!,
        productCatalogueData?.ProductCatalogueId!
      );
      setColorVariantData(colorData);

      const discData = await ConfigurationService.fetchCMSCLabelConstant(
        CMSPageKey.Disclaimer,
        null,
        router.locale
      );
      setDisclaimerText(discData);
      const wishList = await VehicleService.fetchWishList();
      setIsWishList(
        wishList?.ProductCatalogueIds?.some(
          (x) =>
            String(x) === String(productCatalogueData?.ProductCatalogueId || '')
        )
      );
    };
    initialLoad();
  }, [VehicleListingId, productCatalogueData?.ProductCatalogueId]);

  useEffect(() => {
    if (productCatalogueData) {
      const redirectType = localStorage.getItem('SignInRedirectOperation');
      const redirectJSON = JSON.parse(redirectType!);
      const localStorageVehicleId = redirectJSON?.OperationDetails?.vehicleId;
      const isAuthenticated = SessionUtils.isValidSession();
      if (
        redirectJSON?.RedirectOperationType === SignInRedirectType.BookMark &&
        isAuthenticated
      ) {
        if (
          productCatalogueData?.ProductCatalogueId === localStorageVehicleId ||
          VehicleListingId === localStorageVehicleId
        ) {
          bookmarkHandler();
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

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
          const stockAvailability = await VehicleService.stockAvailability(
            productCatalogueData?.ProductCatalogueId
          );
          if (stockAvailability) {
            setOpenCashFinanceModal(true);
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
            vehicleId: VehicleListingId,
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
          vehicleId: VehicleListingId,
        },
      };
      localStorage.setItem(
        'SignInRedirectOperation',
        JSON.stringify(SignInRedirectOperationObj)
      );
    }
  };

  const bookmarkHandler = async () => {
    if (SessionUtils.isValidSession()) {
      if (isFav) {
        await VehicleService.deleteBookmark({
          ProductCatalogueId: String(
            productCatalogueData?.ProductCatalogueId || ''
          ),
        });
        //Added GTM event for Removed BookMark Click
        // PushDataToGTM(GTMEvents.RemovedBookmark, {
        //   vehicleListingId:
        //     process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + VehicleListingId,
        //   userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + userId,
        //   languageId: router.locale,
        // });
      } else {
        //Added GTM event for Add BookMark Click
        // PushDataToGTM(GTMEvents.AddBookmark, {
        //   vehicleListingId:
        //     process.env.NEXT_PUBLIC_GTM_ASSET_ENV_PREFIX! + VehicleListingId,
        //   userId: process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + userId,
        //   languageId: router.locale,
        // });
        await VehicleService.addBookmark({
          ProductCatalogueId: String(
            productCatalogueData?.ProductCatalogueId || ''
          ),
        });
      }
      const bookmark = await VehicleService.fetchBookmark();
      setIsFav(
        bookmark?.ProductCatalogueIds?.some(
          (x) =>
            String(x) === String(productCatalogueData?.ProductCatalogueId || '')
        )
      );
      localStorage.removeItem('SignInRedirectOperation');
    } else {
      setShowLogin(true);
      const SignInRedirectOperationObj = {
        RedirectOperationType: SignInRedirectType.BookMark,
        OperationDetails: {
          vehicleId: productCatalogueData?.ProductCatalogueId,
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
            VehicleListingId!,
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
      ProductCatalogueId: String(productCatalogueData?.ProductCatalogueId),
    });
    setShowAvailabilityModal(false);
  };

  const addWishList = async () => {
    setIsDisabled(true);
    await VehicleService.addWishList({
      ProductCatalogueId: String(
        productCatalogueData?.ProductCatalogueId || ''
      ),
    });
    const wishList = await VehicleService.fetchWishList();
    setIsDisabled(false);
    setIsWishList(
      wishList?.ProductCatalogueIds?.some(
        (x) =>
          String(x) === String(productCatalogueData?.ProductCatalogueId || '')
      )
    );
  };

  return (
    <>
      <div className="p-6 border rounded">
        <div className="flex justify-between">
          {/**Currently we have hided this label from product catalogue page */}
          {/* <div className="flex items-center outline outline-1 rounded outline-orange-500 px-2 text-orange-400">
            <span className="uppercase">
              {VehicleListingId
                ? t(LabelConstants.IN_STOCK)
                : t(LabelConstants.OUT_OF_STOCK_LABEL)}
            </span>
          </div> */}
          <div></div>
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
          {`${productCatalogueData?.Make} ${productCatalogueData?.Model} ${productCatalogueData?.Trim} ${productCatalogueData?.Year}`}
        </div>
        <div className="text-gray-400 py-5 pt-2 border-b">
          <ul className="flex list-inside gap-3 list-disc">
            {productCatalogueData?.FuelType ? (
              <li className="list-disc first:list-none">
                {productCatalogueData?.FuelType || '-'}
              </li>
            ) : (
              <></>
            )}
            {productCatalogueData?.Transmission ? (
              <li className="list-disc first:list-none">
                {productCatalogueData?.Transmission || '-'}
              </li>
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div className="flex justify-between items-center border-b w-full">
          <div className="w-full flex items-center">
            <div className="w-full">
              <div className="text-gray-400 pt-5">
                {t(LabelConstants.VARIANT)}
              </div>
              <div className="py-5 pt-2 flex items-center">
                <div>{productCatalogueData?.Trim || '-'}</div>
              </div>
            </div>
            {variantData && variantData.length > 1 ? (
              <div
                onClick={() => setOpenVariantModal(true)}
                className="flex w-full justify-end"
              >
                <ArrowRightIcon className="h-4 w-4 cursor-pointer !text-primary" />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="text-gray-400 pt-5 pb-1">{t(LabelConstants.COLOR)}</div>

        {colorVariantData && colorVariantData.length > 0 ? (
          <ProductCatalogueColorVariant
            productCatalogueData={productCatalogueData}
            colorVariantData={colorVariantData}
          />
        ) : (
          <div className="flex flex-col gap-3">
            <span>{productCatalogueData?.ColorVariantName}</span>
            <div className="flex pb-7 border-b">
              <div className="rounded-full bg-white border border-primary">
                <div
                  className="w-9 h-9 rounded-full border border-lighter-gray"
                  style={{
                    background: getColorBackground(
                      productCatalogueData?.ColorVariantHexCode!
                    ),
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between pt-5">
          <div>
            <div>{t(LabelConstants.PRICE)}</div>
            <span className="text-primary text-3xl font-bold">
              {`${t(LabelConstants.SAR)} ${
                formatNumber(String(productCatalogueData?.DisplayPrice)) || '-'
              }`}
            </span>
            <span className="pl-2 text-sm">
              {t(LabelConstants.INCLUSIVE_VAT)}
            </span>
          </div>
        </div>
        {!VehicleListingId && (
          <div className="text-gradient text-base">
            {t(LabelConstants.STOCK_AVAILABILITY_MSG)}
          </div>
        )}
        <div className="flex justify-between pt-5 border-b py-3">
          <div>
            <div>{t(LabelConstants.EMI_LABEL)}</div>
            <div className="flex">
              <div className="text-[#F49927]">
                {`${t(LabelConstants.SAR)} ${formatNumber(
                  productCatalogueData?.Emi || 0
                )}`}
              </div>
              <span className="text-primary">{`/${t(
                LabelConstants.LBL_MONTH
              ).toLowerCase()}*`}</span>
            </div>
          </div>
          {VehicleListingId ? (
            <div className="place-self-end flex gap-1 cursor-pointer items-center">
              <div
                className="text-sm text-primary"
                onClick={() =>
                  router.push(
                    `/newcars/new/leads?p=${CommonUtils.encode(
                      String(productCatalogueData?.ProductCatalogueId)
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
          ) : (
            <></>
          )}
        </div>
        {productCatalogueData?.EMIUpdatedDate &&
        moment(productCatalogueData?.EMIUpdatedDate).isValid() ? (
          <span className="text-sm block mt-5 text-dark-gray2">
            {t(LabelConstants.INDICATIVE_EMI, {
              date: moment(productCatalogueData?.EMIUpdatedDate).format(
                'DD/MM/YYYY, HH:mm A'
              ),
            })}
          </span>
        ) : (
          <></>
        )}
        <div className="text-gray-400 text-sm pt-2">
          {`* ${disclaimerText[CMSConstants.EMI_DISCLAIMER]}`}
        </div>
        {!VehicleListingId ? (
          <div className="text-dark-gray1 text-base mt-5">
            {t(LabelConstants.VEHICLE_UNAVAILABLE_MSG)}
          </div>
        ) : (
          <></>
        )}
        {/* {VehicleListingId ? (
          <button
            className="w-full btn btn-primary rounded mt-4 mb-3"
            onClick={handleBookNowBtnClick}
          >
            {t(LabelConstants.BOOK_NOW)}
          </button>
        ) : isWishList ? (
          <></>
        ) : (
          <div
            className={`cursor-pointer w-full mt-4 mb-3 border-gradient text-xl min-w-[17.188rem] min-h-[3.5rem] leading-[1.563rem] rounded-[0.25rem] px-2 flex items-center justify-center ${
              isDisabled
                ? 'bg-gray-300 pointer-events-none opacity-70 cursor-not-allowed'
                : ''
            }`}
            onClick={addWishList}
          >
            <div className="text-gradient font-bold uppercase">
              {t(LabelConstants.WISHLIST_IT_BTN)}
            </div>
          </div>
        )} */}
        <div
          className={`cursor-pointer w-full mt-4 mb-3 border-gradient text-xl min-w-[17.188rem] min-h-[3.5rem] leading-[1.563rem] rounded-[0.25rem] px-2 flex items-center justify-center 
          `}
          onClick={() => {
            router.push(
              `/newcars/new/leads?p=${CommonUtils.encode(
                String(productCatalogueData?.ProductCatalogueId)
              )}`
            );
          }}
        >
          <div className="text-gradient font-bold uppercase">
            {t(LabelConstants.IM_INTERESTED)}
          </div>
        </div>
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
      </div>

      <CashFinanceModal
        openCashFinanceModal={openCashFinanceModal}
        setOpenCashFinanceModal={setOpenCashFinanceModal}
        vehicleId={VehicleListingId!}
      />
      <VariantModal
        openVariantModal={openVariantModal}
        setOpenVariantModal={setOpenVariantModal}
        productCatalogueData={productCatalogueData!}
        variantData={variantData}
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

export default ProductCatalogueInformation;
