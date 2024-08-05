import { useTranslation } from 'next-i18next';
import { CMSConstants, LabelConstants } from '../../../types/i18n.labels';
import { SetStateAction, useEffect, useState } from 'react';
import {
  CommonUtils,
  SessionUtils,
  formatNumber,
} from '../../../helpers/utilities';
import { DeleteCartIcon } from '../../icons';
import {
  CartData,
  FinanceOrderResponse,
  GenerateInvoiceResponse,
  PackageSubscriptionResponse,
  RemoveCartPayload,
} from '../../../types/models';
import {
  ListingService,
  OrderService,
  PackageSubscription,
  VehicleService,
} from '../../../helpers/services';
import { useRouter } from 'next/router';
import ConfigurationService from '../../../helpers/services/configuration.service';
import { ConfigurationKey, ProductReferenceType } from '../../../types/enums';
import MessageBox, { MessageBoxResult, MessageBoxType } from '../MessageBox';
import { CMSPageKey } from '../../../types/constants';
import FinanceVehicleOrderItem from './FinanceVehicleOrderItem';
import CashVehicleOrderItem from './CashVehicleOrderItem';
import { useAppContext } from '../../../provider/AppProvider';
import { Modal, ModalBody, ModalSize } from '../Modal';

type OrderSummaryProps = {
  cartItemsData: CartData | undefined;
  isPromoCode: any;
  callBack: () => void;
  handleDelete: (
    cartItemId: number,
    cartId: number,
    name: string,
    value: boolean
  ) => void;
  setPromoCode: (value: SetStateAction<string>) => void;
  promoCode: string;
  setDisplayInvalidPromo: (value: SetStateAction<boolean>) => void;
  displayInvalidPromo: boolean;
  promoErrorMessage: string;
  setDisablePromo: (value: SetStateAction<boolean>) => void;
  setLoader: (value: SetStateAction<boolean>) => void;
  reloadShoppingCart: () => void;
  shoppingCartCount: number;
  handleRemoveVAS: (payload: RemoveCartPayload) => void;
};

const OrderSummary = ({
  cartItemsData,
  isPromoCode,
  callBack,
  handleDelete,
  setPromoCode,
  setDisplayInvalidPromo,
  displayInvalidPromo,
  promoCode,
  promoErrorMessage,
  setDisablePromo,
  setLoader,
  reloadShoppingCart,
  shoppingCartCount,
  handleRemoveVAS,
}: OrderSummaryProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [financeItMessages, setFinanceItMessages] = useState<{
    [x: string]: string;
  }>({});
  const [hasFinanceItem, setHasFinanceItem] = useState<boolean>(false);
  const [hasNonFinanceItem, setHasNonFinanceItem] = useState<boolean>(false);
  const [btnDisabled, setBtnDisable] = useState<boolean>(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const { setShoppingCartCount } = useAppContext();
  useEffect(() => {
    const hasItem =
      cartItemsData?.CartItems.findIndex((x) => x.MarkedForFinance) !== -1;
    setHasFinanceItem(hasItem);
    const hasNonFinItem =
      cartItemsData?.CartItems.findIndex((x) => !x.MarkedForFinance) !== -1;
    setHasNonFinanceItem(hasNonFinItem);
  }, [cartItemsData]);

  useEffect(() => {
    setShoppingCartCount(shoppingCartCount);
  }, [setShoppingCartCount, shoppingCartCount]);

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

  const handleCheckout = async (ShoppingCartId: number) => {
    if (hasFinanceItem) {
      const result = await MessageBox.open({
        content: <>{financeItMessages[CMSConstants.FinanceItAlert]}</>,
        type: MessageBoxType.Confirmation,
      });
      if (result === MessageBoxResult.Yes) {
        setLoader(true);
        const response: FinanceOrderResponse =
          await OrderService.createFinanceOrder({
            ShoppingCartId,
          });
        setLoader(false);
        if (response.IsSuccess) {
          await MessageBox.open({
            content: (
              <div className="flex flex-col">
                <h1 className=" text-lg">
                  {financeItMessages[CMSConstants.FinanceItSuccessMessage1]}
                </h1>
                <h1 className="mt-4 text-lg">
                  {financeItMessages[CMSConstants.FinanceItSuccessMessage2]}
                </h1>
              </div>
            ),
            positiveButton: t(LabelConstants.DONE),
            showHeader: true,
            title: t(LabelConstants.LBL_THANK_YOU),
            showGrid: true,
          });
        }
        reloadShoppingCart();
      }
    } else {
      const VATGroupRegistrationNumber =
        await ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.VATGroupRegistrationNumber,
          router.locale
        );
      if (
        VATGroupRegistrationNumber?.ConfigurationValue !== '' &&
        VATGroupRegistrationNumber?.ConfigurationValue !== null
      ) {
        setLoader(true);
        try {
          const response = true; //await ListingService.getValidatePurchaseEligibility();
          if (response) {
            localStorage.removeItem(
              ConfigurationKey.PromotionCodeForCampaignUser
            );
            setBtnDisable(true);
            const payload = {
              ShoppingCartId: ShoppingCartId,
            };
            const packageResponse: PackageSubscriptionResponse =
              await PackageSubscription.PackageSubscription(payload);
            if (packageResponse.IsSuccess) {
              const payload = {
                UserId: cartItemsData?.UserId!,
                ShoppingCartId: ShoppingCartId,
              };
              const invoiceResponse: GenerateInvoiceResponse =
                await PackageSubscription.generateInvoice(payload);
              if (invoiceResponse.IsSuccess) {
                const id = Buffer.from(
                  String(invoiceResponse.SubscriptionInvoiceId)
                ).toString('base64');
                const payload = { Key: invoiceResponse.SubscriptionInvoiceId };
                const paymentResponse =
                  await PackageSubscription.getPaymentToken(payload);

                if (paymentResponse) {
                  if (cartItemsData?.TotalAmount === 0) {
                    router.push(`/purchase-success/${id}`);
                  } else {
                    const payfortConfigurationData =
                      await ConfigurationService.fetchConfigurationValue(
                        ConfigurationKey.IsPayfortEnabled,
                        router.locale
                      );
                    if (
                      payfortConfigurationData.ConfigurationValue.toLowerCase() ===
                      'true'
                    ) {
                      const languageId = Buffer.from(
                        String(CommonUtils.getLanguageId(router.locale!))
                      ).toString('base64');
                      window.location.href = `${process.env.NEXT_PUBLIC_PAYMENT_CHECKOUT_PAGE}?invoiceid=${id}&languageid=${languageId}`;
                    } else {
                      setLoader(false);
                      await MessageBox.open({
                        content: `${t(
                          LabelConstants.COULD_NOT_PROCESS_PAYMENT
                        )}`,
                      });
                      setBtnDisable(false);
                    }
                  }
                } else {
                  setLoader(false);
                }
              }
            } else {
              setLoader(false);
              await MessageBox.open({
                content: `${t(LabelConstants.CANNOT_PROCESS_REQUEST)}`,
              });
            }
          } else {
            setLoader(false);
            const result = await MessageBox.open({
              content: (
                <div className="text-lg">
                  {t(LabelConstants.ELIGIBILITY_TEXT)}
                </div>
              ),
              type: MessageBoxType.Confirmation,
            });
            if (result === MessageBoxResult.Yes) {
              router.push('/my-orders');
            }
          }
        } catch {
          setLoader(false);
        }
      } else {
        await MessageBox.open({
          content: `${t(LabelConstants.CANNOT_PROCESS_REQUEST)}`,
        });
      }
    }
  };

  const removeService = (serviceId: number) => {
    const cartItem = cartItemsData?.CartItems.find(
      (x) => x.CartItemType === ProductReferenceType?.Vehicle
    );
    const shoppingCartItem = cartItem?.Services.find(
      (x) => x.ServiceId === serviceId
    );
    if (shoppingCartItem) {
      const payload: RemoveCartPayload = {
        ShoppingCartItemId: shoppingCartItem.ShoppingCartItemId,
        ShoppingCartId: cartItem?.ShoppingCartId!,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
      };
      handleRemoveVAS(payload);
    }
  };

  const handleFinanceIt = async () => {
    const vehicleListingId = cartItemsData?.CartItems.find(
      (x) => x.CartItemType === ProductReferenceType.Vehicle
    )?.VehicleListingId;
    const isAvailable = await ListingService.checkAvailability(
      vehicleListingId!
    );
    if (isAvailable) {
      const user = SessionUtils.getUserDetails();
      setLoader(true);
      const response: FinanceOrderResponse =
        await OrderService.createFinanceOrder({
          ShoppingCartId: cartItemsData?.ShoppingCartId!,
        });

      if (response.IsSuccess) {
        const item = cartItemsData?.CartItems.find(
          (x) => x.CartItemType === ProductReferenceType.Vehicle
        );
        const payload = {
          BuyerId: user?.UserId!,
          ShoppingCartId: cartItemsData?.ShoppingCartId!,
          VehicleListingId: item?.VehicleListingId!,
        };
        const hashData = await ListingService.saveFinanceRequest(payload);
        const configData = await ConfigurationService.fetchConfigurationValue(
          ConfigurationKey.FinanceItURL,
          router.locale
        );
        setLoader(false);
        if (hashData && configData.ConfigurationValue) {
          router.push('/finance-success');
          window.open(
            `${configData.ConfigurationValue}${hashData}`,
            '',
            'toolbar=yes,scrollbars=yes,resizable=yes,fullscreen=yes'
          );
        }
      }
      setLoader(false);
    } else {
      setShowAvailabilityModal(true);
    }
  };

  const handleProceed = async (
    ShoppingCartId: number,
    PayFullAmount: boolean
  ) => {
    const vehicleListingId = cartItemsData?.CartItems.find(
      (x) => x.CartItemType === ProductReferenceType.Vehicle
    )?.VehicleListingId;
    const isAvailable = await ListingService.checkAvailability(
      vehicleListingId!
    );

    if (isAvailable) {
      const PackagePayload = {
        ShoppingCartId: ShoppingCartId,
      };
      setLoader(true);
      const packageResponse: PackageSubscriptionResponse =
        await PackageSubscription.PackageSubscription(PackagePayload);
      if (packageResponse.IsSuccess) {
        const payload = {
          UserId: cartItemsData?.UserId!,
          ShoppingCartId: ShoppingCartId,
          PayFullAmount: PayFullAmount,
        };
        const invoiceResponse: GenerateInvoiceResponse =
          await PackageSubscription.generateInvoice(payload);
        if (invoiceResponse.IsSuccess) {
          const id = Buffer.from(
            String(invoiceResponse.SubscriptionInvoiceId)
          ).toString('base64');
          const payload = { Key: invoiceResponse.SubscriptionInvoiceId };
          const paymentResponse = await PackageSubscription.getPaymentToken(
            payload
          );

          if (paymentResponse) {
            if (cartItemsData?.TotalAmount === 0) {
              router.push(`/purchase-success/${id}`);
            } else {
              const languageId = Buffer.from(
                String(CommonUtils.getLanguageId(router.locale!))
              ).toString('base64');
              window.location.href = `${process.env.NEXT_PUBLIC_PAYMENT_CHECKOUT_PAGE}?invoiceid=${id}&languageid=${languageId}`;
            }
          } else {
            setLoader(false);
          }
        }
      } else {
        setLoader(false);
        await MessageBox.open({
          content: `${t(LabelConstants.CANNOT_PROCESS_REQUEST)}`,
        });
      }
    } else {
      setShowAvailabilityModal(true);
    }
  };

  const handleRemove = async () => {
    const cartdata = cartItemsData?.CartItems?.find(
      (x) => x.CartItemType === ProductReferenceType.Vehicle
    );

    const payload = {
      ShoppingCartId: cartdata?.ShoppingCartId!,
      ShoppingCartItemId: cartdata?.ShoppingCartItemId!,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
    };
    const res = await PackageSubscription.removeCart(payload);
    if (res.IsSuccess) {
      router.push('/cart');
      setShowAvailabilityModal(true);
    }
  };

  const handleWishList = async () => {
    const cartdata = cartItemsData?.CartItems?.find(
      (x) => x.CartItemType === ProductReferenceType.Vehicle
    );
    await VehicleService.addWishList({
      VehicleListingID: String(cartdata?.VehicleListingId!),
    });
    const payload = {
      ShoppingCartId: cartdata?.ShoppingCartId!,
      ShoppingCartItemId: cartdata?.ShoppingCartItemId!,
      LanguageId: CommonUtils.getLanguageId(router.locale!),
    };
    const res = await PackageSubscription.removeCart(payload);
    if (res.IsSuccess) {
      router.push('/cart');
      setShowAvailabilityModal(false);
    }
  };

  return (
    <div className="flex flex-col gap-[1.75rem] lg:w-[30%] w-full">
      <div className="border border-gray-300 w-full">
        <div className="text-xl text-primary font-bold py-[0.938rem] px-[1.75rem]">
          <p>
            <span>{t(LabelConstants.ORDER_SUMMARY)}</span>

            {` (${shoppingCartCount} ${
              shoppingCartCount && shoppingCartCount > 1
                ? t(LabelConstants.ITEMS)
                : t(LabelConstants.ITEM)
            })`}
          </p>
        </div>

        <hr />

        <div className="py-[0.938rem] px-[1.75rem]">
          <>
            <div className="font-bold">{t(LabelConstants.APPLY_PROMO)}</div>
            <div className="flex h-11 w-full mt-1 relative">
              <input
                type="text"
                className="border border-gray-300 ltr:rounded-l-[0.25rem] rtl:rounded-r-[0.25rem] ltr:rounded-r-none rtl:rounded-l-none w-full h-full py-2 px-4"
                disabled={isPromoCode && isPromoCode?.length > 0}
                onChange={(e) => {
                  setPromoCode(e.target.value);

                  setDisplayInvalidPromo(false);
                }}
                value={isPromoCode && isPromoCode?.length > 0 ? '' : promoCode}
                placeholder={t(LabelConstants.ENTER_APPLY_PROMO)}
              />

              <div
                className={`bg-primary ${
                  (promoCode !== '' && isPromoCode?.length === 0) ||
                  (localStorage.getItem(
                    ConfigurationKey.PromotionCodeForCampaignUser
                  ) &&
                    localStorage.getItem(
                      ConfigurationKey.PromotionCodeForCampaignUser
                    ) !== '')
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed'
                } flex items-center ltr:rounded-r-[0.25rem] rtl:rounded-l-[0.25rem] text-center py-[0.875rem] px-[1.281rem] text-white h-full`}
                onClick={() => {
                  setPromoCode('');
                  callBack();
                }}
              >
                {t(LabelConstants.APPLY)}
              </div>
            </div>

            {displayInvalidPromo && (
              <div className=" text-error mt-2">{promoErrorMessage}</div>
            )}

            <div
              className={
                isPromoCode && isPromoCode?.length > 0
                  ? 'hidden'
                  : 'text-base text-dark-gray2 font-semibold mt-2'
              }
            >
              {t(LabelConstants.CLICK_APPLY)}
            </div>
          </>

          {cartItemsData?.CartItems.filter((x) => !x.MarkedForFinance).map(
            (x, i, row) => (
              <>
                <div
                  className="flex pt-[1.813rem] gap-2 justify-between"
                  key={i}
                >
                  <div className="max-w-[10.625rem] text-dark-gray1 ">
                    {x.CartItemType === ProductReferenceType.B2CPackage && (
                      <>{x.Name}</>
                    )}
                    {x.CartItemType === ProductReferenceType.B2CService && (
                      <>{x.Name}</>
                    )}
                    {x.CartItemType ===
                      ProductReferenceType.B2CPackageCreditItem && (
                      <>{`${x.Name} ${t(LabelConstants.PAID_PURCHASE)}`}</>
                    )}
                    {x.CartItemType === ProductReferenceType.PromoCode && (
                      <div className="flex flex-row gap-2">
                        <span className="font-bold">{x.Name}</span>
                        <button
                          onClick={() => {
                            handleDelete(
                              isPromoCode[0]?.ShoppingCartItemId,
                              isPromoCode[0]?.ShoppingCartId,
                              isPromoCode[0]?.Name,
                              true
                            );
                            setDisablePromo(false);
                          }}
                        >
                          <DeleteCartIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  {(x.CartItemType === ProductReferenceType.PromoCode ||
                    x.CartItemType === ProductReferenceType.B2CPackage ||
                    x.CartItemType ===
                      ProductReferenceType.B2CPackageCreditItem) && (
                    <div
                      className="text-dark-gray1 whitespace-nowrap flex gap-2"
                      dir="ltr"
                    >
                      <span>{t(LabelConstants.SAR)}</span>
                      <span>
                        {x.CartItemType === ProductReferenceType.B2CPackage
                          ? formatNumber(x.Price || 0, 2)
                          : `(${formatNumber(x.Price || 0, 2)})`}
                      </span>
                    </div>
                  )}
                </div>
                {row.length !== i + 1 && <hr className="mt-[0.813rem]" />}
              </>
            )
          )}
          {cartItemsData?.CartItems?.filter(
            (x) => x?.CartItemType !== ProductReferenceType.Vehicle
          ).length! > 0 && (
            <div className="flex justify-between pt-[1.73rem]">
              <div>
                {t(LabelConstants.VAT)}
                <span
                  className="mx-1"
                  dir="ltr"
                >{`(${cartItemsData?.VATTaxPercentage}%)`}</span>
              </div>
              <div
                className="text-dark-gray1 whitespace-nowrap flex gap-2"
                dir="ltr"
              >
                <span>{t(LabelConstants.SAR)}</span>
                <span>{formatNumber(cartItemsData?.VATTaxAmount || 0, 2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* For Cash */}
        {hasNonFinanceItem && (
          <CashVehicleOrderItem
            cartItemsData={cartItemsData}
            removeService={(id) => removeService(id)}
            handleProceed={(id, payFullAmount) =>
              handleProceed(id, payFullAmount)
            }
          />
        )}

        {/* For finnace  */}
        {hasFinanceItem && (
          <FinanceVehicleOrderItem
            cartItemsData={cartItemsData}
            removeService={(id) => removeService(id)}
            handleFinanceIt={() => handleFinanceIt()}
          />
        )}

        {cartItemsData?.CartItems?.map((x, i) => (
          <div key={i}>
            {x.CartItemType === ProductReferenceType.B2CPackage && (
              <div className="flex flex-col gap-3 py-[0.938rem] px-[1.75rem]">
                <hr />
                <div>
                  <div className="flex justify-between font-semibold text-lg">
                    <p className="text-right">{`${t(
                      LabelConstants.TOTAL_AMOUNT
                    )}`}</p>
                    <p
                      className="text-right pl-1 text-primary whitespace-nowrap flex gap-2"
                      dir="ltr"
                    >
                      <span>{t(LabelConstants.SAR)}</span>
                      <span>
                        {formatNumber(cartItemsData?.TotalAmount || 0, 2)}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end text-[0.875rem] text-dark-gray2">
                    {t(LabelConstants.INCLUSIVE_VAT)}
                  </div>
                </div>
                <button
                  className="btn btn-primary w-full !h-[3.5rem] uppercase"
                  onClick={() => handleCheckout(cartItemsData?.ShoppingCartId!)}
                  disabled={btnDisabled}
                >
                  {t(LabelConstants.PROCEED)}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

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
                onClick={() => handleRemove()}
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
    </div>
  );
};
export default OrderSummary;
