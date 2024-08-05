import axios from 'axios';
import { Locales } from '../../types/enums';
import {
  ListingImageArtifact,
  ListingResponse,
  SearchRequestPayload,
  B2CPackages,
  AddToCartPayload,
  AddToCartResponse,
  MyOrders,
  PackageSubscriptionDetailsResponse,
  SearchAllResponse,
  ViewBreakUp,
  VehicleImageVerificationResponse,
} from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';

export default class ListingService {
  /**
   * This service is use to fetch all vehicles details based on filter parameters.
   * @param {SearchRequestPayload} payload - filter params
   * @returns {Promise<ListingResponse>} Returns search result.
   */
  static searchVehicle = async (
    payload: SearchRequestPayload
  ): Promise<ListingResponse> => {
    const response = await axiosInstance.post<ListingResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/search`,
      payload
    );
    return response.data;
  };

  /**
   * This service is use to fetch all product catalogue and vehicles listings based on filter parameters.
   * @param {SearchRequestPayload} payload - filter params
   * @returns {Promise<SearchAllResponse>} Returns search result.
   */
  static searchAllVehicle = async (
    payload: SearchRequestPayload
  ): Promise<SearchAllResponse> => {
    const response = await axiosInstance.post<SearchAllResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/searchall`,
      payload
    );
    return response.data;
  };

  /**
   * This service is use to fetch listing images.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ListingImageArtifact>>} Returns list of make
   */
  static fetchListingImages = async (
    vehicleListingId: number | null,
    currentLocale: string = Locales.EN,
    bodyTypeCode: number | null
  ): Promise<Array<ListingImageArtifact>> => {
    try {
      const response = await axiosInstance.get<Array<ListingImageArtifact>>(
        `/api/vehicle/listingimages?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&vehicleListingId=${vehicleListingId}`,
        {
          headers: { credentials: true },
          params: {
            bodyTypeCode: bodyTypeCode !== 0 ? bodyTypeCode : null,
          },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchListingImages`, error);
      throw error;
    }
  };

  /**
   * This service is used to verify is given image is of a vehicle.
   * @param {string}  [imageUrl] - imageUrl.
   * @returns {Promise<VehicleImageVerificationResponse>} Returns list of make
   */
  static verifyVehicleImage = async (
    imageUrl: string | null
  ): Promise<VehicleImageVerificationResponse> => {
    try {
      const response = await axios.post(
        'https://centralservices.gogomotor.com/backend-api/vision/analyze-image-for-vehicle',
        {
          url: imageUrl,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchListingImages`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch listing Documents.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ListingImageArtifact>>} Returns list of make
   */
  static fetchListingDocuments = async (
    vehicleListingId: number | null,
    currentLocale: string = Locales.EN
  ): Promise<Array<ListingImageArtifact>> => {
    try {
      const response = await axiosInstance.get<Array<ListingImageArtifact>>(
        `/api/Vehicle/listingdocuments?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchListingDocuments`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch B2C Packages.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<B2CPackages>>} Returns list of B2C packages
   */
  static fetchB2CPackages = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<B2CPackages>> => {
    try {
      const response = await axiosInstance.get<Array<B2CPackages>>(
        `/api/b2cpackage/getpackageservice?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchB2CPackages`, error);
      throw error;
    }
  };

  /**
   * This service is use to add packages to cart.
   * @param {AddToCartPayload} payload - add to cart params
   * @returns {Promise<AddToCartResponse>} Returns result.
   */
  static addToCart = async (
    payload: AddToCartPayload
  ): Promise<AddToCartResponse> => {
    const response = await axiosInstance.post<AddToCartResponse>(
      `api/ShoppingCart/add`,
      payload,
      { headers: { credentials: true } }
    );
    return response.data;
  };

  /**
   * This service is use to fetch My Orders.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<MyOrders>} Returns list of My Orders
   */
  static fetchMyOrders = async (
    currentLocale: string = Locales.EN
  ): Promise<MyOrders> => {
    try {
      const response = await axiosInstance.get<MyOrders>(
        `/api/PackageSubscription/GetMyOrders?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in Listing Service:fetchMyOrders`, error);
      throw error;
    }
  };

  /**
   * This service is use to get package subscription details.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<MyOrders>} Returns list of My Orders
   */
  static getPackageSubscription = async (
    currentLocale: string = Locales.EN,
    packageSubscriptionId: string | string[]
  ): Promise<PackageSubscriptionDetailsResponse> => {
    try {
      const response =
        await axiosInstance.get<PackageSubscriptionDetailsResponse>(
          `/api/PackageSubscription/${packageSubscriptionId}?languageId=${CommonUtils.getLanguageId(
            currentLocale
          )}`,
          { headers: { credentials: true } }
        );
      return await response.data;
    } catch (error) {
      console.error(`Error in Listing Service:getPackageSubscription`, error);
      throw error;
    }
  };

  /**
   * This service is use to get package subscription details.
   * @returns {Promise<MyOrders>} Returns list of My Orders
   */
  static getValidatePurchaseEligibility =
    async (): Promise<PackageSubscriptionDetailsResponse> => {
      try {
        const response =
          await axiosInstance.get<PackageSubscriptionDetailsResponse>(
            `api/Vehicle/validatepurchaseeligibility`,
            { headers: { credentials: true } }
          );
        return await response.data;
      } catch (error) {
        console.error(`Error in Listing Service:getPackageSubscription`, error);
        throw error;
      }
    };

  /**
   * This service is use to get package subscription details.
   * @returns {Promise<[index: string]>} Returns hash data.
   */
  static saveFinanceRequest = async (payload: {
    BuyerId: string;
    ShoppingCartId: number;
    VehicleListingId: number;
  }): Promise<[index: string]> => {
    try {
      const response = await axiosInstance.post<Promise<[index: string]>>(
        `api/Vehicle/savefinancerequest`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in Listing Service:getPackageSubscription`, error);
      throw error;
    }
  };

  /**
   * This service is use to check availability of vehicle.
   * @returns {Promise<MyOrders>} Returns list of My Orders
   */
  static checkAvailability = async (
    vehicleListingId: number
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.get<boolean>(
        `/api/Vehicle/checkavailability?vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in Listing Service:getPackageSubscription`, error);
      throw error;
    }
  };
  /**
   * This service is use to get view breakup.
   * @param {number}  [B2COrderId] - B2COrderId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ViewBreakUp>>} Returns list of make
   */
  static getViewBreakUp = async (
    B2COrderId: string | string[],
    currentLocale: string = Locales.EN
  ): Promise<Array<ViewBreakUp>> => {
    try {
      const response = await axiosInstance.get<Array<ViewBreakUp>>(
        `api/ShoppingCart/vieworderbreckup?B2COrderId=${B2COrderId}&languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchListingDocuments`, error);
      throw error;
    }
  };
}
