import { Locales, ServiceStatus } from '../../types/enums';
import {
  cartResponse,
  DeliveryServiceResponse,
  ExtendedWarrantyArray,
  ExtendedWarrantyResponse,
  GenerateInvoicePayload,
  GenerateInvoiceResponse,
  HomeDeliveryAddressPayload,
  PackageResponse,
  PackageSubscriptionPayload,
  PackageSubscriptionResponse,
  PaymentTokenPayload,
  promoResponse,
  RemoveCartPayload,
  RemoveCartResponse,
  ServiceResponse,
  TintingResponse,
  UpdateRefundResponse,
  UpdateRefundStatus,
  VasResponse,
} from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';

export default class PackageSubscription {
  /**
   * This service is use to fetch cart items.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<cartResponse>} Returns list of cart items
   */
  static getShoppingCart = async (
    currentLocale: string = Locales.EN
  ): Promise<cartResponse> => {
    try {
      const response = await axiosInstance.get<cartResponse>(
        `/api/ShoppingCart/get?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:getShoppingCart`, error);
      throw error;
    }
  };

  /**
   * This service is use to remove cart.
   * @param {RemoveCartPayload}-remove cart payload
   * @returns {RemoveCartResponse}- remove cart response
   */
  static removeCart = async (
    payload: RemoveCartPayload
  ): Promise<RemoveCartResponse> => {
    const response = await axiosInstance.post<RemoveCartResponse>(
      `/api/ShoppingCart/remove`,
      payload,
      { headers: { credentials: true } }
    );
    return response.data;
  };

  /**
   * This service is use to create b2csubscriptions.
   * @param {PackageSubscriptionPayload}-package subscription payload
   * @returns {PackageSubscriptionResponse}- package subscription response
   */
  static PackageSubscription = async (
    payload: PackageSubscriptionPayload
  ): Promise<PackageSubscriptionResponse> => {
    const response = await axiosInstance.post<PackageSubscriptionResponse>(
      `/api/PackageSubscription/createorder`,
      payload,
      { headers: { credentials: true } }
    );
    return response.data;
  };

  /**
   * This service is use to create invoice.
   * @param {GenerateInvoicePayload}-generate invoice payload
   * @returns {GenerateInvoiceResponse}- generate invoice Response
   */
  static generateInvoice = async (
    payload: GenerateInvoicePayload
  ): Promise<GenerateInvoiceResponse> => {
    const response = await axiosInstance.post<GenerateInvoiceResponse>(
      `/api/Invoice/generateinvoice`,
      payload,
      { headers: { credentials: true } }
    );
    return response.data;
  };

  /**
   * This service is use to create invoice.
   * @param {PaymentTokenPayload}-generate invoice payload
  
   */
  static getPaymentToken = async (
    payload: PaymentTokenPayload
  ): Promise<true> => {
    const response = await axiosInstance.post<true>(
      `api/paymentservice/token`,
      payload,
      { headers: { credentials: true } }
    );
    return response.data;
  };

  /**
   * This service is use to get shopping cart count.
   */
  static getShoppingCartCount = async (): Promise<number> => {
    try {
      const response = await axiosInstance.get<number>(
        `/api/ShoppingCart/itemscount`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in getShoppingCartCount`, error);
      throw error;
    }
  };

  /**
   * This service is use to download invoice.
   * @param {invoiceId} string invoice id.
   * @returns {Blob} invoice.
   */
  static downloadInvoice = async (invoiceId: number): Promise<Blob> => {
    try {
      const response = await axiosInstance.get(
        `api/Invoice/${invoiceId}/document`,
        { headers: { credentials: true }, responseType: 'blob' }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in Package Subscription Service:downloadInvoice`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to get promo code details.
   * @returns {Promise<promoResponse>} Returns promo code details
   */
  static validatePromoCode = async (
    promoData: string,
    currentLocale: string = Locales.EN
  ): Promise<promoResponse> => {
    try {
      const response = await axiosInstance.get<promoResponse>(
        `/api/Promotion/validate?promocode=${promoData}&languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in PackageSubscription:validatePromoCode`, error);
      throw error;
    }
  };

  /**
   * This service is use to get Package details by PackageId.
   * @returns {Promise<promoResponse>} Returns promo code details
   */
  static getPackageByPackageId = async (
    currentLocale: string = Locales.EN,
    packageId: string | string[] | number
  ): Promise<PackageResponse> => {
    try {
      const response = await axiosInstance.get<PackageResponse>(
        `/api/B2CPackage/getb2cpackagesnapshot?LanguageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&OrderItemId=${packageId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in PackageSubscription:getPackageByPackageId`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to get all services.
   * @returns {Promise<Array<ServiceResponse>>} Returns service details
   */
  static getAllServices = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<ServiceResponse>> => {
    try {
      const response = await axiosInstance.get<Array<ServiceResponse>>(
        `/api/Service/all?LanguageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      const services = (await response.data) || [];
      return services
        .sort((a, b) => a.ServiceId - b.ServiceId)
        .filter((x) => x.StatusKey === ServiceStatus.Active);
    } catch (error) {
      console.error(`Error in PackageSubscription:getAllServices`, error);
      throw error;
    }
  };

  /**
   * This service is use to update refund status.
   * @param {UpdateRefundStatus} payload Object to update refund status
   * @returns {Promise<UpdateRefundResponse>} updated refund status response.
   */
  static updateRefundStatus = async (
    payload: UpdateRefundStatus
  ): Promise<UpdateRefundResponse> => {
    try {
      const response = await axiosInstance.put<UpdateRefundResponse>(
        `/api/paymentservice/orderitemrefundstatus`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in PaymentService:updateRefundStatus`, error);
      throw error;
    }
  };

  /**
   * This service is use to get all services.
   * @returns {Promise<Array<ServiceResponse>>} Returns service details
   */
  static getVASServices = async (
    currentLocale: string = Locales.EN,
    purchaseMethod: string,
    vehicleListingId: number
  ): Promise<Array<VasResponse>> => {
    try {
      const response = await axiosInstance.get<Array<VasResponse>>(
        `/api/Service/vasservices?LanguageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&purchaseMethod=${purchaseMethod}&vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      const services = (await response.data) || [];
      return services.filter((x) => !x.IsHide);
    } catch (error) {
      console.error(`Error in PackageSubscription:getAllServices`, error);
      throw error;
    }
  };

  /**
   * This service is use to get tinting service.
   * @returns {Promise<Array<TintingResponse>>} Returns service details
   */
  static getTintingServices = async (
    shoppingCartId: number,
    vehicleListingId: number
  ): Promise<TintingResponse> => {
    try {
      const response = await axiosInstance.get<TintingResponse>(
        `api/shoppingcart/tintingservice?shoppingCartId=${shoppingCartId}&vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: true } }
      );

      return response.data;
    } catch (error) {
      console.error(`Error in PackageSubscription:getTintingServices`, error);
      throw error;
    }
  };

  /**
   * This service is use to get home delivery service.
   * @returns {Promise<Array<TintingResponse>>} Returns service details
   */
  static getHomeDeliveryServices = async (
    shoppingCartId: string | string[] | number,
    vehicleListingId: string | string[] | number,
    currentLocale: string = Locales.EN,
    CityId: number | null = null
  ): Promise<DeliveryServiceResponse> => {
    try {
      const response = await axiosInstance.get<DeliveryServiceResponse>(
        `api/shoppingcart/homedeliveryservice`,
        {
          params: {
            shoppingCartId: shoppingCartId,
            vehicleListingId: vehicleListingId,
            toCityId: CityId ? CityId : null,
            languageId: CommonUtils.getLanguageId(currentLocale),
          },
          headers: { credentials: true },
        }
      );

      return response.data;
    } catch (error) {
      console.error(`Error in PackageSubscription:getTintingServices`, error);
      throw error;
    }
  };

  /**
   * This service is use to get tinting service.
   * @returns {Promise<Array<ExtendedWarrantyResponse>>} Returns service details
   */
  static getWarrantyService = async (
    shoppingCartId: number,
    vehicleListingId: number,
    UserId: string
  ): Promise<Array<ExtendedWarrantyArray>> => {
    try {
      const response = await axiosInstance.get<ExtendedWarrantyResponse>(
        `api/Warranty/getpolicyquote?shoppingCartId=${shoppingCartId}&vehicleListingId=${vehicleListingId}&userId=${UserId}`,
        { headers: { credentials: true } }
      );

      return response.data.ResponseData;
    } catch (error) {
      console.error(`Error in PackageSubscription:getTintingServices`, error);
      throw error;
    }
  };

  /**
   * This service is use to save home delivery address.
   * @param {HomeDeliveryAddressPayload}-remove cart payload
   * @returns {RemoveCartResponse}- remove cart response
   */
  static saveHomeDeliveryAddress = async (
    payload: HomeDeliveryAddressPayload
  ): Promise<RemoveCartResponse> => {
    const response = await axiosInstance.post<RemoveCartResponse>(
      `api/shoppingcart/addhomedeliveryaddress`,
      payload,
      { headers: { credentials: true } }
    );
    return response.data;
  };
}
