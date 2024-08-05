'use client';
import React, { useEffect, useState } from 'react';
import type {
  NextPage,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  ConfigurationKey,
  Locales,
  ProductReferenceType,
  ReferenceType,
} from '../types/enums';
import { useRouter } from 'next/router';
import { LabelConstants } from '../types/i18n.labels';
import { CommonUtils, SessionUtils } from '../helpers/utilities';
import { ListingService, PackageSubscription } from '../helpers/services';
import {
  AddToCartPayload,
  CartData,
  ExtendedWarrantyArray,
  RemoveCartPayload,
  RemoveCartResponse,
  VasResponse,
} from '../types/models';
import { toast } from 'react-toastify';
import MessageBox, {
  MessageBoxResult,
  MessageBoxType,
} from '../components/common/MessageBox';
import Spinner from '../components/common/Spinner/spinner';
import {
  B2CPackageCartItem,
  B2CServiceCartItem,
  OrderSummary,
  VehicleCartItem,
} from '../components/common/ShoppingCart';
import { PushDataToGTM } from '../helpers/utilities/gtm';
import { GTMEvents } from '../types/gtm';
import { VASPurchaseMethod } from '../types/constants';

type CartPageProps = {};

const CartPage: NextPage<CartPageProps> = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const router = useRouter();
  const { t } = useTranslation();

  const [cartItemsData, setCartItemsData] = useState<CartData>();
  const [promoCode, setPromoCode] = useState('');
  const [displayInvalidPromo, setDisplayInvalidPromo] =
    useState<boolean>(false);
  const [disablePromo, setDisablePromo] = useState<boolean>(false);
  const [promoErrorMessage, setPromoErrorMessage] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const [vasServiceData, setVASServiceData] = useState<Array<VasResponse>>();
  const [shoppingCartCount, setShoppingCartCount] = useState<number>(0);
  const isPromoCode = cartItemsData?.CartItems.filter(
    (data) => data.IsPromoCode
  );
  const [extendedWarrantyData, setExtendedWarrantyData] = useState<
    Array<ExtendedWarrantyArray>
  >([]);
  const shoppingCartId = cartItemsData?.CartItems?.find(
    (x) => x.CartItemType === ProductReferenceType.B2CPackage
  )?.ProductReferenceId;

  useEffect(() => {
    const initialLoad = async () => {
      const isAuthenticated = SessionUtils.isValidSession();
      if (!isAuthenticated) {
        router.push('/');
      } else {
        const cartData = await PackageSubscription.getShoppingCart(
          router.locale
        );
        setCartItemsData(cartData.Data);
        const vehicleItem = cartData?.Data?.CartItems?.find(
          (x) => x.CartItemType === ReferenceType.Vehicle
        );
        if (vehicleItem) {
          const vasServiceData = await PackageSubscription.getVASServices(
            router.locale,
            vehicleItem?.MarkedForFinance
              ? VASPurchaseMethod?.Finance
              : VASPurchaseMethod?.Cash,
            vehicleItem?.VehicleListingId!
          );
          setVASServiceData(vasServiceData);
        }
        const shoppingCount = await PackageSubscription.getShoppingCartCount();
        setShoppingCartCount(shoppingCount);
      }
    };
    initialLoad();
  }, [router]);

  useEffect(() => {
    if (
      localStorage.getItem(
        ConfigurationKey.SelfListPromotionCodeForCampaignUser
      ) != null &&
      localStorage.getItem(
        ConfigurationKey.SelfListPackageIdForCampaignUser
      ) === String(shoppingCartId)
    ) {
      setPromoCode(
        localStorage.getItem(
          ConfigurationKey.SelfListPromotionCodeForCampaignUser
        )!
      );
    } else if (
      localStorage.getItem(ConfigurationKey.PromotionCodeForCampaignUser) !==
      null
    ) {
      setPromoCode(
        localStorage.getItem(ConfigurationKey.PromotionCodeForCampaignUser)!
      );
    }
  }, [shoppingCartId]);

  const reloadShoppingCart = async () => {
    const user = SessionUtils.getUserDetails();
    const cartData = await PackageSubscription.getShoppingCart(router.locale);
    const cartItem = cartData?.Data?.CartItems.find(
      (x) => x.CartItemType === ProductReferenceType.Vehicle
    );
    setCartItemsData(cartData.Data);
    const shoppingCount = await PackageSubscription.getShoppingCartCount();
    setShoppingCartCount(shoppingCount);
    const extendedWarrantyRes = await PackageSubscription.getWarrantyService(
      cartItem?.ShoppingCartId!,
      cartItem?.VehicleListingId!,
      user?.UserId!
    );
    setExtendedWarrantyData(extendedWarrantyRes);
  };

  const handleDelete = async (
    ShoppingCartItemId: number,
    ShoppingCartId: number,
    name: string,
    isPromoCode: boolean = false
  ) => {
    const response = await MessageBox.open({
      content: (
        <div className="flex flex-col">
          <span className="text-base">
            {isPromoCode
              ? t(LabelConstants.CONFIRM_DELETE_PROMO_CODE)
              : t(LabelConstants.CONFIRMATION_ITEM)}
          </span>
          <span className="text-base font-bold" dir="ltr">{`${name} ?`}</span>
        </div>
      ),
      type: MessageBoxType.Confirmation,
    });
    if (response === MessageBoxResult.Yes) {
      const payload: RemoveCartPayload = {
        ShoppingCartId: ShoppingCartId,
        ShoppingCartItemId: ShoppingCartItemId,
        LanguageId: CommonUtils.getLanguageId(router.locale!),
      };
      const res: RemoveCartResponse = await PackageSubscription.removeCart(
        payload
      );
      if (res.IsSuccess) {
        router.push('/cart');
        await reloadShoppingCart();
      } else {
        toast.error(t(LabelConstants.ERROR_REMOVE_ITEM));
      }
    }
  };

  const handleApply = async () => {
    if (promoCode !== '' && !disablePromo) {
      const promoData = await PackageSubscription.validatePromoCode(
        promoCode,
        router.locale
      );

      if (!promoData.IsSuccess) {
        setDisplayInvalidPromo(true);
        if (promoData.MessageCode === 'PROMOCODE_IS_INVALID') {
          setPromoErrorMessage(t(LabelConstants.INVALID_PROMO_CODE));
        } else if (promoData.MessageCode === 'PROMOCODE_COUNT_IS_EXHAUSTED') {
          setPromoErrorMessage(t(LabelConstants.EXHAUSTED_PROMO_CODE));
        } else {
          setPromoErrorMessage('');
        }
      } else {
        const user = SessionUtils.getUserDetails();

        //Added GTM event for Apply Promotion Click
        PushDataToGTM(GTMEvents.ApplyPromotion, {
          promoCode: promoCode,
          userId: user?.UserId
            ? process.env.NEXT_PUBLIC_GTM_ENV_PREFIX! + user?.UserId
            : null,
          languageId: router.locale,
        });
        const cartData = await PackageSubscription.getShoppingCart(
          router.locale
        );
        setCartItemsData(cartData.Data);
        setDisplayInvalidPromo(false);
        setDisablePromo(true);
      }
      if (
        localStorage.getItem(
          ConfigurationKey.SelfListPromotionCodeForCampaignUser
        ) != null &&
        localStorage.getItem(
          ConfigurationKey.SelfListPackageIdForCampaignUser
        ) == String(shoppingCartId)
      ) {
        localStorage.removeItem(
          ConfigurationKey.SelfListPromotionCodeForCampaignUser
        );
        localStorage.removeItem(
          ConfigurationKey.SelfListPackageIdForCampaignUser
        );
        setPromoCode('');
      } else if (
        localStorage.getItem(ConfigurationKey.PromotionCodeForCampaignUser) !==
        null
      ) {
        localStorage.removeItem(ConfigurationKey.PromotionCodeForCampaignUser);
        setPromoCode('');
      }
    }
  };

  const addToCart = async (payload: AddToCartPayload) => {
    setLoader(true);
    const res = await ListingService.addToCart(payload);
    setLoader(false);
    if (res.IsSuccess) {
      await reloadShoppingCart();
    }
  };

  const removeFromCart = async (payload: RemoveCartPayload) => {
    setLoader(true);
    const res: RemoveCartResponse = await PackageSubscription.removeCart(
      payload
    );
    setLoader(false);
    if (res.IsSuccess) {
      await reloadShoppingCart();
    }
  };

  return (
    <div className={`w-full ${loader ? 'relative' : ''}`}>
      {loader && (
        <div className="absolute bg-lighter-gray opacity-50 top-0 left-0 h-full w-full flex justify-center items-center">
          <Spinner />
        </div>
      )}
      {cartItemsData?.CartItems.length === 0 || cartItemsData === null ? (
        <div className="absolute top-0 left-0 w-full h-full font-bold text-3xl flex flex-col gap-8 items-center justify-center">
          {t(LabelConstants.EMPTY_CART)}
          <button
            className="btn btn-primary btn-sm uppercase"
            onClick={() => router.push('/')}
          >
            {t(LabelConstants.CONTINUE_SHOPPING)}
          </button>
        </div>
      ) : (
        <div className="container py-10">
          <span className="font-bold text-3xl text-dark-gray1">
            {t(LabelConstants.SHOPPING_CART)}
          </span>
          <div className="flex flex-col lg:flex-row w-full h-full mt-10 gap-10">
            <div className="flex flex-col gap-[1.313rem] min-[1920px]:w-[73.75rem] lg:w-[70%] w-full ">
              {cartItemsData?.CartItems.map((x, index) => (
                <div key={index}>
                  {x.CartItemType === ReferenceType.B2CPackage && (
                    <B2CPackageCartItem
                      cartItem={x}
                      callBack={(ShoppingCartItemId, ShoppingCartId, Name) =>
                        handleDelete(ShoppingCartItemId, ShoppingCartId, Name)
                      }
                    />
                  )}
                  {x.CartItemType === ReferenceType.Vehicle && (
                    <VehicleCartItem
                      cartItem={x}
                      vasServiceData={vasServiceData!}
                      handleAddVAS={(payload: AddToCartPayload) =>
                        addToCart(payload)
                      }
                      handleRemoveVAS={(payload) => removeFromCart(payload)}
                      callBack={(ShoppingCartItemId, ShoppingCartId, Name) =>
                        handleDelete(ShoppingCartItemId, ShoppingCartId, Name)
                      }
                      setLoader={setLoader}
                      cartItemsData={cartItemsData}
                      reloadShoppingCart={async () =>
                        await reloadShoppingCart()
                      }
                      setExtendedWarrantyData={setExtendedWarrantyData}
                      extendedWarrantyData={extendedWarrantyData}
                    />
                  )}
                  {x.CartItemType === ReferenceType.B2CService && (
                    <B2CServiceCartItem
                      cartItem={x}
                      callBack={(ShoppingCartItemId, ShoppingCartId, Name) =>
                        handleDelete(ShoppingCartItemId, ShoppingCartId, Name)
                      }
                    />
                  )}
                </div>
              ))}
            </div>
            {cartItemsData?.CartItems.length! > 0 && (
              <OrderSummary
                cartItemsData={cartItemsData}
                isPromoCode={isPromoCode}
                callBack={() => handleApply()}
                handleDelete={(
                  ShoppingCartItemId,
                  ShoppingCartId,
                  Name,
                  isPromoCode
                ) =>
                  handleDelete(
                    ShoppingCartItemId,
                    ShoppingCartId,
                    Name,
                    isPromoCode
                  )
                }
                setPromoCode={setPromoCode}
                promoCode={promoCode}
                setDisplayInvalidPromo={setDisplayInvalidPromo}
                displayInvalidPromo={displayInvalidPromo}
                promoErrorMessage={promoErrorMessage}
                setDisablePromo={setDisablePromo}
                setLoader={setLoader}
                reloadShoppingCart={async () => await reloadShoppingCart()}
                shoppingCartCount={shoppingCartCount}
                handleRemoveVAS={(payload) => removeFromCart(payload)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;

export const getStaticProps: GetStaticProps<CartPageProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || Locales.EN, ['common'])),
    },
  };
};
