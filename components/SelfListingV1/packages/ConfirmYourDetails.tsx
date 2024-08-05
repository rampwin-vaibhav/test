import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRightIcon } from '../../icons';
import { useTranslation } from 'next-i18next';
import { LabelConstants } from '../../../types/i18n.labels';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  SelfListingState,
  setLoader,
  updateSelfListingPromocode,
} from '../../../lib/self-listing/selfListing.slice';
import { ListingService, PackageSubscription } from '../../../helpers/services';
import { toast } from 'react-toastify';
import Spinner from '../../common/Spinner/spinner';
import { ConfigurationKey, ProductReferenceType } from '../../../types/enums';
import { CartData, CartItem } from '../../../types/models';
import { CommonUtils, SessionUtils } from '../../../helpers/utilities';
import { useRouter } from 'next/router';
import ConfigurationService from '../../../helpers/services/configuration.service';

type PromoValidityType = {
  checked: boolean;
  valid: boolean;
};

const ConfirmYourDetails = () => {
  const { t } = useTranslation();
  const selfListingSelector: SelfListingState = useAppSelector(
    ({ selfListing }) => selfListing
  );
  const cleverTap = useAppSelector(({ global }) => global.clevertap);
  const dispatch = useAppDispatch();
  const [isCheckingPromocode, setIsCheckingPromocode] =
    useState<boolean>(false);
  const [promocode, setPromocode] = useState(
    selfListingSelector.promocode || ''
  );
  const [appliedPromo, setAppliedPromo] = useState<CartItem | null>(null);
  const [shoppingCart, setShoppingCart] = useState<CartData>();
  const [promoValid, setPromoValid] = useState<PromoValidityType>({
    checked: false,
    valid: false,
  });
  const router = useRouter();
  const fetchShoppingCart = async () => {
    const cartRes = await PackageSubscription.getShoppingCart();
    setShoppingCart(cartRes.Data);
  };

  useEffect(() => {
    fetchShoppingCart();
    if (cleverTap) {
      cleverTap.event?.push('sl_confirm_details');
    }
  }, [cleverTap]);

  const handleApplyPromocode = async () => {
    setIsCheckingPromocode(true);
    let res = await PackageSubscription.validatePromoCode(promocode);
    if (!res.IsSuccess && res.MessageCode !== 'PROMOCODE_IS_INVALID') {
      toast.error(res.PromoCodeErrorMessage);
      return;
    }
    setPromoValid({
      checked: true,
      valid: res.IsSuccess,
    });
    if (res.IsSuccess) {
      if (cleverTap) {
        cleverTap.event?.push('sl_applied_promo_code');
      }
      const cartRes = await PackageSubscription.getShoppingCart();
      setShoppingCart(cartRes.Data);
      const promoItem = cartRes.Data.CartItems.find(
        (x) => x.CartItemType === ProductReferenceType.PromoCode
      );
      if (promoItem) {
        setAppliedPromo(promoItem);
      }
      dispatch(updateSelfListingPromocode(promocode));
    }
    setIsCheckingPromocode(false);
  };

  const handleRemovePromocode = async () => {
    if (appliedPromo && shoppingCart) {
      dispatch(setLoader(true));
      const removePromoRes = await PackageSubscription.removeCart({
        LanguageId: CommonUtils.getLanguageId(router.locale!),
        ShoppingCartId: shoppingCart.ShoppingCartId,
        ShoppingCartItemId: appliedPromo.ShoppingCartItemId,
      });
      dispatch(setLoader(false));
    }
    setPromoValid({
      checked: false,
      valid: false,
    });

    dispatch(updateSelfListingPromocode(null));
    setPromocode('');
  };

  const handlePayBtnClick = async () => {
    dispatch(setLoader(true));
    if (cleverTap) {
      cleverTap.event?.push('sl_pay_now_clicked');
    }
    try {
      const packageResponse = await PackageSubscription.PackageSubscription({
        ShoppingCartId: shoppingCart?.ShoppingCartId!,
      });
      if (packageResponse.IsSuccess) {
        const invoiceResponse = await PackageSubscription.generateInvoice({
          UserId: shoppingCart?.UserId!,
          ShoppingCartId: shoppingCart?.ShoppingCartId!,
        });
        if (invoiceResponse.IsSuccess) {
          const id = Buffer.from(
            String(invoiceResponse.SubscriptionInvoiceId)
          ).toString('base64');
          const paymentResponse = await PackageSubscription.getPaymentToken({
            Key: invoiceResponse.SubscriptionInvoiceId,
          });

          if (paymentResponse) {
            // if (shoppingCart?.TotalAmount === 0) {
            //   router.push(`/purchase-success/${id}`);
            // } else {
            //   const payfortConfigurationData =
            //     await ConfigurationService.fetchConfigurationValue(
            //       ConfigurationKey.IsPayfortEnabled,
            //       router.locale
            //     );
            //   if (
            //     payfortConfigurationData.ConfigurationValue.toLowerCase() ===
            //     'true'
            //   ) {
            const languageId = Buffer.from(
              String(CommonUtils.getLanguageId(router.locale!))
            ).toString('base64');
            window.location.href = `${process.env.NEXT_PUBLIC_PAYMENT_CHECKOUT_PAGE}?invoiceid=${id}&languageid=${languageId}`;
            // }
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const getFixedValue = (val: string | number | undefined) => {
    if (val === undefined) {
      return '';
    }
    return parseFloat(`${val}`).toFixed(2);
  };

  return (
    <div className="bg-[#F8F8F8] h-full overflow-y-auto pb-[90px]">
      {/* Vehicle details */}
      <div className="bg-white px-[16px] py-[10px] flex justify-between items-end ">
        <div className="flex flex-col gap-[10px] ">
          <p className="font-medium leading-[12px] text-black text-[15px]">
            {`${selfListingSelector.data.manufacture_year.year} ${selfListingSelector.data.brand.brandName} ${selfListingSelector.data.model.modelName}`}
          </p>
          <p className="text-[#757575] flex leading-[12px] items-center gap-2 font-normal text-[11px]">
            <span>{selfListingSelector.data.variant.variantName}</span> •{' '}
            <span>{selfListingSelector.data.fuel_type}</span> •{' '}
            <span>{selfListingSelector.data.transmission}</span>
          </p>
        </div>
        <button className="text-primary flex items-center font-medium underline text-[11px]">
          {t(LabelConstants.SEE_DETAILS)}
        </button>
      </div>

      {/* Pack details */}
      <div className="p-[16px] ">
        <p className="mb-[10px] text-[13px] text-black">
          {t(LabelConstants.PACKAGES)}
        </p>
        <div className="p-[14px] flex items-center gap-[10px] border rounded-[8px] border-[#E1D3EA] bg-[linear-gradient(112.26deg,rgba(255,255,255,0.5)_12%,rgba(220,204,229,0.265)_64.56%,rgba(180,159,193,0.35)_109.33%)] rtl:bg-[linear-gradient(-112.26deg,rgba(255,255,255,0.5)_12%,rgba(220,204,229,0.265)_64.56%,rgba(180,159,193,0.35)_109.33%)]">
          {/* Image */}
          <div className="flex bg-[#F8F8F8] w-[43px] aspect-square rounded-[6.86px] items-center justify-center">
            <div className="relative w-[23.72px] aspect-square">
              <Image
                alt=""
                src={'/images/crown-purple-white.png'}
                layout="fill"
              />
            </div>
          </div>
          {/* Pack */}
          <div className="flex flex-col gap-[16px]">
            <p className="text-[15px] leading-[12px] text-black font-medium">
              {selfListingSelector.package_data?.DisplayName}{' '}
              {t(LabelConstants.PACK)}
            </p>
            <button className="text-primary flex items-center font-medium underline text-[11px]">
              {t(LabelConstants.SEE_DETAILS)}
            </button>
          </div>
        </div>
      </div>

      {/* Apply promo code */}
      <div className="p-[16px] ">
        <p className="mb-[10px] text-[13px] text-black flex items-center gap-[10px]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.9167 12.0832L12.0834 7.9165M7.9167 7.9165H7.92587M12.0742 12.0832H12.0834M2.05337 7.7865C1.8467 7.7865 1.65754 7.61817 1.6667 7.399C1.72254 6.114 1.8792 5.27734 2.3167 4.61567C2.56625 4.23861 2.87921 3.90761 3.2417 3.63734C4.21254 2.9165 5.58337 2.9165 8.3267 2.9165H11.6717C14.415 2.9165 15.7859 2.9165 16.7584 3.63734C17.1175 3.904 17.4309 4.23484 17.6825 4.61567C18.12 5.27734 18.2767 6.114 18.3325 7.399C18.3417 7.61817 18.1525 7.7865 17.945 7.7865C16.79 7.7865 15.8534 8.77734 15.8534 9.99984C15.8534 11.2223 16.79 12.2132 17.945 12.2132C18.1525 12.2132 18.3417 12.3815 18.3325 12.6015C18.2767 13.8857 18.12 14.7223 17.6825 15.3848C17.4329 15.7616 17.12 16.0923 16.7575 16.3623C15.7859 17.0832 14.415 17.0832 11.6717 17.0832H8.32753C5.5842 17.0832 4.21337 17.0832 3.24087 16.3623C2.87867 16.092 2.566 15.761 2.3167 15.384C1.8792 14.7223 1.72254 13.8857 1.6667 12.6007C1.65754 12.3815 1.8467 12.2132 2.05337 12.2132C3.20837 12.2132 4.14504 11.2223 4.14504 9.99984C4.14504 8.77734 3.20837 7.7865 2.05337 7.7865Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {t(LabelConstants.APPLY_PROMO_CODE_V1)}
        </p>
        <div className="relative">
          <input
            type="text"
            disabled={promoValid.checked}
            className={`py-[14px] ${
              promoValid.checked
                ? promoValid.valid
                  ? 'text-[#038700] disabled:text-[#038700]'
                  : 'text-[#E53535] disabled:text-[#E53535]'
                : 'text-black disabled:text-black'
            } disabled:bg-white text-[15px] h-[48px] pl-[20px] pr-[60px] rtl:pl-[60px] rtl:pr-[20px] bg-white border border-black/10 rounded-[8px]`}
            placeholder="eg FIRST300"
            value={promocode}
            onChange={(e) => setPromocode(e.target.value)}
          />

          {isCheckingPromocode ? (
            <div
              className={`absolute right-[20px] left-auto rtl:right-auto rtl:left-[20px] top-1/2 -translate-y-1/2 `}
            >
              <Spinner className="!w-5 !h-5" />
            </div>
          ) : !promoValid.checked ? (
            <button
              onClick={handleApplyPromocode}
              disabled={promocode.trim().length === 0}
              className={`absolute text-[13px] disabled:text-[#C8CACA] text-primary font-medium underline right-[20px] left-auto rtl:right-auto rtl:left-[20px] top-1/2 -translate-y-1/2 `}
            >
              {t(LabelConstants.APPLY)}
            </button>
          ) : (
            <button
              onClick={handleRemovePromocode}
              className={`absolute text-[13px] text-[#E53535] font-medium underline right-[20px] left-auto rtl:right-auto rtl:left-[20px] top-1/2 -translate-y-1/2 `}
            >
              {t(LabelConstants.REMOVE)}
            </button>
          )}
        </div>
        {promoValid.checked && !promoValid.valid && (
          <span className="text-[11px] text-[#E53535] ">
            {t(LabelConstants.INCORRECT_COUPON_CODE)}
          </span>
        )}
      </div>

      {/* Amount details */}
      <div className="p-[16px] ">
        <p className="mb-[10px] text-[13px] text-black">
          {t(LabelConstants.AMOUNT_DETAILS)}
        </p>
        <div className="p-[15px] border border-black/10 rounded-[8px] flex flex-col gap-[10px] bg-white">
          <p className="flex items-center w-full justify-between">
            <span className="text-[10px] text-[#3E3E3E]">
              {selfListingSelector.package_data?.DisplayName}{' '}
              {t(LabelConstants.PLAN)}
            </span>
            <span className="text-[13px] text-black">
              {t(LabelConstants.SAR)}{' '}
              {getFixedValue(selfListingSelector.package_data?.Price)}
            </span>
          </p>
          <p className="flex items-center w-full justify-between">
            <span className="text-[10px] text-[#3E3E3E]">
              {t(LabelConstants.VATS)}
            </span>
            <span className="text-[13px] text-black">
              {t(LabelConstants.SAR)}{' '}
              {getFixedValue(
                parseFloat(selfListingSelector.package_data!.DisplayPrice) -
                  parseFloat(selfListingSelector.package_data!.Price)
              )}
            </span>
          </p>
          {appliedPromo && (
            <p className="flex items-center w-full justify-between">
              <span className="text-[10px] text-[#3E3E3E]">
                {t(LabelConstants.COUPON_OFFERS)}
              </span>
              <span className="text-[13px] text-[#038700] font-medium">
                {'- '}
                {t(LabelConstants.SAR)}{' '}
                {getFixedValue(appliedPromo.DisplayPrice)}
              </span>
            </p>
          )}
          <div className="w-full h-[1px] bg-black/10"></div>
          <p className="flex items-center !font-semibold w-full justify-between">
            <span className="text-[10px] text-[#3E3E3E]">Total cost</span>
            <span className="text-[13px] text-black">
              {t(LabelConstants.SAR)}{' '}
              {getFixedValue(
                parseFloat(selfListingSelector.package_data!.DisplayPrice) -
                  parseFloat(`${appliedPromo?.DisplayPrice || 0}`)
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div className="py-[21px] bg-white px-[16px] sm:px-0 shadow-[0px_0px_15px_0px_#0000001A]">
          <div className="flex justify-between items-center w-full sm:w-[321px] sm:mx-auto">
            <div>
              <h3 className="font-semibold text-[#272828] text-[15px]">
                {selfListingSelector.package_data?.DisplayName}{' '}
                {t(LabelConstants.PACK)}
              </h3>
              <p className="font-medium text-[13px] text-[#272828]">
                {t(LabelConstants.SAR)}{' '}
                {getFixedValue(
                  parseFloat(selfListingSelector.package_data!.DisplayPrice) -
                    parseFloat(`${appliedPromo?.DisplayPrice || 0}`)
                )}
              </p>
            </div>

            <button
              onClick={handlePayBtnClick}
              className="bg-black text-white rounded-[60px] px-[28px] py-[16px] text-[13px] font-semibold flex items-center gap-[8px] justify-center"
            >
              Pay Now
              <ArrowRightIcon className="!text-white h-[5px] rtl:-rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmYourDetails;
