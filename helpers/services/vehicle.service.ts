import { toast } from 'react-toastify';
import { Locales } from '../../types/enums';
import {
  City,
  Make,
  Budget,
  Model,
  TrendingSearch,
  Brand,
  BodyType,
  VehicleMetaData,
  ListingImageArtifact,
  VehicleListingData,
  Spec,
  CompareVehicle,
  CompareVehiclePayload,
  ConciergeList,
  FuelType,
  VehicleTracking,
  BookmarkPayload,
  ModelYearData,
  VinNumberData,
  VehicleSeller,
  BuyerTestDriveDatesResponse,
  SellerTestDriveDatesResponse,
  VehicleDescriptionData,
  VehicleDetailsResponse,
  FeaturesPayload,
  UploadImagePayload,
  DeleteImagePayload,
  VehicleType,
  FindVehiclePayload,
  BuyerTestDriveDatesRequest,
  ConfirmDetailsPayload,
  TestDriveDatePayload,
  AddAppointmentPayload,
  AddAppointmentResponseData,
  BodyTypeByVehicleTypePayload,
  ConciergeResponse,
  EMITermPayload,
  EMITerm,
  EMICalculator,
  EMI,
  MyVehicleSearchRequestPayload,
  MyVehicleResponse,
  DeletionReason,
  ModelYear,
  MyCarValuePayload,
  MyCarValueResponse,
  GetAppointmentDetailsPayload,
  SellerDocumentArtifactType,
  UserSearchResponse,
  SaveMarkAsSold,
  ConciergeSubmitPayload,
  EditConciergePayload,
  VehicleListingStatusItem,
  PetrominLocationData,
  TestDriveAvailableDetails,
  TestDriveData,
  NotifyMeResponse,
  NotifyMePayload,
  UserSavedSearch,
  SaveUserSearchPayload,
  SaveUserSearchResponse,
  BuyerDocumentResponse,
  MakeType,
  ModelType,
  SpecType,
  FinanceRequestPayload,
  FinanceRequestResponse,
  UploadMojazPayload,
  UploadMojazResponse,
  SaveUserAcknowledgementResponse,
  SaveUserAcknowledgementPayload,
  ColorVariantType,
  ImportedByDataResponse,
  FulFilledByDataResponse,
  SuppliedByDataResponse,
  ProductCatalogueData,
  StockAvailability,
  GetVariantResponse,
  GetColorVariantResponse,
  BookmarkResponse,
  WishListPayload,
  WishListResponse,
  UpdateDealStatusPayload,
  DealsResponse,
  UpdateDealStatusResponse,
  VehicleTrimsResponse,
} from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';
import { i18n } from 'next-i18next';
import { LabelConstants } from '../../types/i18n.labels';
import axios from 'axios';

export default class VehicleService {
  /**
   * This service is use to fetch all Budget.
   * @returns {Promise<Array<Budget>>} Returns list of budget.
   */
  static fetchAllBudget = async (): Promise<Array<Budget>> => {
    try {
      const response = await axiosInstance.get<Array<Budget>>(
        'api/filterMetaData/budgettypes'
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchAllBudget`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all cities.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<City>>} Returns list of cities.
   */
  static fetchAllCities = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<City>> => {
    try {
      const response = await axiosInstance.get<Array<City>>(
        `/api/vehicle/browsebycity?languageid=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchAllCities`, error);
      throw error;
    }
  };

  /**
   * This service is use to get list of top cities.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<City>>} Returns list of cities.
   */
  static fetchTopCities = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<City>> => {
    try {
      const response = await axiosInstance.get<Array<City>>(
        `/api/vehicle/topcities?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in VehicleService:fetchTopCities`, error);
      throw error;
    }
  };

  /**
   * This service is use to get list of popular brands.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<Brand>>} Returns list of brands.
   */
  static fetchPopularBrands = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<Brand>> => {
    try {
      const response = await axiosInstance.get<Array<Brand>>(
        `/api/vehicle/popularbrands?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in VehicleService:fetchPopularBrands`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all Make.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<Make>>} Returns list of make
   */
  static fetchAllMake = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<Make>> => {
    try {
      const response = await axiosInstance.get<Array<Make>>(
        `/api/vehicle/makes?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchAllMake`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all Mode my make code.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @param {number} [makeCode] - Make Id
   * @returns {Promise<Array<Model>>} Returns list of model on the basis of make id.
   */
  static fetchModelByMake = async (
    makeCode: number,
    currentLocale: string = Locales.EN
  ): Promise<Array<Model>> => {
    try {
      const response = await axiosInstance.get<Array<Model>>(
        `/api/Vehicle/modelsbymakeId?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&makeId=${makeCode}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchModelByMake`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all specs/trim for make and model.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @param {number} [makeCode] - Make Id
   * @param {number} [modelCode] - Model Id
   * @returns {Promise<Array<Model>>} Returns list of model on the basis of make id.
   */
  static fetchVehicleSpecs = async (
    makeCode: number,
    modelCode: number,
    currentLocale: string = Locales.EN
  ): Promise<Array<Spec>> => {
    try {
      const response = await axiosInstance.get<Array<Spec>>(
        `/api/Vehicle/trimsbymodelIdmakeId?modelId=${modelCode}&makeId=${makeCode}&languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleSpecs`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all specs/trim for make and model.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @param {number} [modelCode] - Model Id
   * @returns {Promise<VehicleTrimsResponse>} Returns list of trims on the basis of model id.
   */
  static fetchVehicleTrims = async (
    modelCode: number,
    currentLocale: string = Locales.EN
  ): Promise<VehicleTrimsResponse> => {
    try {
      const response = await axios.get<VehicleTrimsResponse>(
        `https://centralservices.gogomotor.com/backend-api/vehicle/trim?model_id=${modelCode}&language_id=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleTrims`, error);
      throw error;
    }
  };

  /**
   * This service is use to get list of trending searches.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<TrendingSearch>>} Returns list of trending searches.
   */
  static fetchTrendingSearches = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<TrendingSearch>> => {
    try {
      const response = await axiosInstance.get<Array<TrendingSearch>>(
        `/api/vehicle/trendingsearches?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchTrendingSearches`, error);
      throw error;
    }
  };

  /**
   * This service is use to get list of Body Types.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<BodyType>>} Returns list of body types.
   */
  static fetchBodyTypes = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<BodyType>> => {
    try {
      const response = await axiosInstance.get<Array<BodyType>>(
        `/api/vehicle/bodytype?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in VehicleService:fetchBodyTypes`, error);
      throw error;
    }
  };

  /**
   * This service is use to get list of Fuel Types.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<FuelType>>} Returns list of fuel types.
   */
  static fetchFuelTypes = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<FuelType>> => {
    try {
      const response = await axiosInstance.get<Array<FuelType>>(
        `/api/vehicle/fueltype?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in VehicleService:fetchFuelTypes`, error);
      throw error;
    }
  };

  /**
   * This service is use to get all vehicle related parameters like colors, mileage, etc..
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<VehicleMetaData>} Returns object of vehicle metadata.
   */
  static fetchFilterMetadata = async (
    currentLocale: string = Locales.EN
  ): Promise<VehicleMetaData> => {
    try {
      const response = await axiosInstance.get<VehicleMetaData>(
        `/api/filtermetadata/vehicleparameters?languageid=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ListingService:fetchFilterMetadata`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch listing image artifact.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ListingImageArtifact>>} Returns list of make
   */
  static fetchListingImageArtifacts = async (
    vehicleListingId: number,
    currentLocale: string = Locales.EN
  ): Promise<Array<ListingImageArtifact>> => {
    try {
      const response = await axiosInstance.get<Array<ListingImageArtifact>>(
        `/api/vehicle/listingimagesartifacts?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchListingImageArtifacts`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch vehicle data.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise <VehicleListingData>} Returns list of make
   */
  static fetchVehicleListingData = async (
    vehicleListingId: number | null,
    currentLocale: string = Locales.EN,
    hasToken: boolean = true
  ): Promise<VehicleListingData> => {
    try {
      const response = await axiosInstance.get<VehicleListingData>(
        `/api/vehicle/vehiclelisting?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: hasToken } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleListingData`, error);
      throw error;
    }
  };

  /**
   * This service is use to get details of vehicles to be compared.
   * @param {CompareVehiclePayload}-vehicle ids and languageid
   * @returns {CompareVehicle}- vehicle comparision object
   */
  static compareVehicle = async (
    payload: CompareVehiclePayload
  ): Promise<CompareVehicle> => {
    const response = await axiosInstance.post<CompareVehicle>(
      `/api/vehicle/compare`,
      payload
    );
    return response.data;
  };

  /**
   * This service is use to fetch concierge list.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ConciergeList>>} Returns list of concierge
   */
  static fetchConciergeList = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<ConciergeList>> => {
    try {
      const response = await axiosInstance.get<Array<ConciergeList>>(
        `/api/vehicle/myconcierge?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchConciergeList`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch list of vehicle Id which are bookmarked by user.
   * @returns {Promise<BookmarkResponse>} Returns list of vehicle Ids.
   */
  static fetchBookmark = async (): Promise<BookmarkResponse> => {
    try {
      const response = await axiosInstance.get<BookmarkResponse>(
        `/api/vehicle/bookmarks`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchBookmark`, error);
      throw error;
    }
  };

  /**
   * This service is use to add vehicle to user's bookmark/favorite list.
   * @param {BookmarkPayload} payload Payload object to add vehicle to bookmark.
   * @returns {Promise<boolean>} Returns True/False.
   */
  static addBookmark = async (payload: BookmarkPayload): Promise<boolean> => {
    try {
      const response = await axiosInstance.post<boolean>(
        `/api/vehicle/addbookmark`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:addBookmark`, error);
      throw error;
    }
  };

  /**
   * This service is use to remove vehicle from user's bookmark/favorite list.
   * @param {BookmarkPayload} payload Payload object to remove vehicle from bookmark.
   * @returns {Promise<boolean>} Returns True/False.
   */
  static deleteBookmark = async (
    payload: BookmarkPayload
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `/api/vehicle/deletebookmark`,
        { data: payload, headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:deleteBookmark`, error);
      throw error;
    }
  };

  /**
   * This service is use to track vehicle events like - sharing on social media.
   * @param {VehicleTracking} payload The object of vehicle tracking
   * @returns {Promise<boolean>} Returns True/False
   */
  static track = async (payload: VehicleTracking): Promise<boolean> => {
    try {
      const response = await axiosInstance.put<boolean>(
        `/api/vehicle/track`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:track`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch vehicle seller details.
   * @param {string|number} vehicleListingId The Vehicle Listing Id.
   * @returns {Promise<VehicleSeller>} Object of Vehicle Seller Details.
   */
  static fetchSellerDetails = async (
    vehicleListingId: string | number
  ): Promise<VehicleSeller> => {
    try {
      const response = await axiosInstance.get<VehicleSeller>(
        `/api/vehicle/sellerdetails?&vehiclelistingid=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchSellerDetails`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch buyer's selected test drive dates.
   * @param {string|number} vehicleListingId The Vehicle Listing Id.
   * @returns {Promise<VehicleSeller>} Object of Buyer Test Drive Dates.
   */
  static fetchBuyerTestDriveDates = async (
    vehicleListingId: string | number
  ): Promise<Array<BuyerTestDriveDatesResponse>> => {
    try {
      const response = await axiosInstance.get<Array<any>>(
        `/api/vehicle/buyertestdriveavailabledates?&vehiclelistingid=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchBuyerTestDriveDates`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch seller's suggested test drive dates.
   * @param {string|number} vehicleListingId The Vehicle Listing Id.
   * @returns {Promise<VehicleSeller>} Object of Seller Test Drive Dates.
   */
  static fetchSellerTestDriveDates = async (
    vehicleListingId: string | number
  ): Promise<Array<SellerTestDriveDatesResponse>> => {
    try {
      const response = await axiosInstance.get<Array<any>>(
        `/api/vehicle/sellertestdriveavailabledates?&vehiclelistingid=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchSellerTestDriveDates`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all make by model year code.
   * @param {number}  [modelYearCode] - modelYearCode.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<MakeType>>} Returns list of all make
   */
  static fetchMakebyModelYearCode = async (
    modelYearCode: number,
    currentLocale: string = Locales.EN
  ): Promise<Array<MakeType>> => {
    try {
      const response = await axiosInstance.get<Array<MakeType>>(
        `api/vehicle/makesbymodelyearcode?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&modelYearCode=${modelYearCode}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchMakebyModelCode`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all model by model year code and make code.
   * @param {number}  [modelYearCode] - modelYearCode.
   * @param {number}  [makeCode] - makeCode.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ModelType>>} Returns list of all model
   */
  static fetchModelByModelYearCodeMakeCode = async (
    modelYearCode: number,
    makeCode: number,
    currentLocale: string = Locales.EN
  ): Promise<Array<ModelType>> => {
    try {
      const response = await axiosInstance.get<Array<ModelType>>(
        `api/vehicle/modelsbymodelyearcodemakecode?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&modelYearCode=${modelYearCode}&makeCode=${makeCode}`
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchModelByModelYearCodeMakeCode`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch all years.
   * @returns {Promise<Array<ModelYearData>>} Returns list of concierge
   */
  static fetchModelYear = async (): Promise<Array<ModelYearData>> => {
    try {
      const response = await axiosInstance.get<Array<ModelYearData>>(
        `/api/vehicle/modelyear`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchModelYear`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all years.
   * @returns {Promise<Array<ModelYearData>>} Returns list of concierge
   */
  static fetchModelYearAutoData = async (): Promise<Array<ModelYearData>> => {
    try {
      const response = await axiosInstance.get<Array<ModelYearData>>(
        `/api/vehicle/modelyears`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchModelYearAutoData`, error);
      throw error;
    }
  };
  /**
   * This service is use to find vehicle support.
   * @param {FindVehiclePayload} payload Payload object to find vehicle support.
   * @returns {Promise<boolean>} Returns True/False.
   */
  static findCarSupport = async (
    payload: FindVehiclePayload
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.post<boolean>(
        `/api/vehicle/findcarsupport`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:findCarSupport`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch vehicle type.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<VehicleType>>} Returns list of vehicle type
   */
  static fetchVehicleType = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<VehicleType>> => {
    try {
      const response = await axiosInstance.get<Array<VehicleType>>(
        `/api/vehicle/vehicletype?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleType`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch vehicle details by vin number.
   * @param {string} [vinNumber] - vinNumber`
   * @returns {Promise<Array<VinNumberData>>} Returns list of test drive
   */
  static fetchVehicleDetailsByVinNumber = async (
    vinNumber: string
  ): Promise<Array<VinNumberData>> => {
    try {
      const response = await axiosInstance.get<Array<VinNumberData>>(
        `/api/vehicle/vin?vin=${vinNumber}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchVehicleDetailsByVinNumber`,
        error
      );
      throw error;
    }
  };
  /**
   * This service is use to fetch body type By vehicle type.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<BodyType>>} Returns list of body type By vehicle type
   */
  static fetchBodyTypeByVehicleType = async (
    payload: BodyTypeByVehicleTypePayload
  ): Promise<Array<BodyType>> => {
    try {
      const response = await axiosInstance.put<Array<BodyType>>(
        `/api/vehicle/bodytypesbyvehicletypeids`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchBodyTypeByVehicleType`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch spec details.
   * @param {number} [modelYearCode] - modelYearCode`
   * @param {number} [makeCode] - makeCode`
   * @param {number} [modelCode] - modelCode`
   * @returns {Promise<Array<SpecType>>} Returns list of specs
   */
  static fetchSpecByYearMakeAndModelCode = async (
    modelYearCode: number,
    makeCode: number,
    modelCode: number
  ): Promise<Array<SpecType>> => {
    try {
      const response = await axiosInstance.get<Array<SpecType>>(
        `/api/vehicle/spec?modelYearCode=${modelYearCode}&makeCode=${makeCode}&modelCode=${modelCode}`
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchSpecByYearMakeAndModelCode`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch vehicle description.
   * @param {string} [modelYearCode] - modelYearCode`
   * @param {string} [makeCode] - makeCode`
   * @param {string} [modelCode] - modelCode`
   * @param {string} [specCode] - specCode`
   * @returns {Promise<Array<VehicleDescriptionData>>} Returns vehicle description
   */
  static fetchVehicleDescription = async (
    modelYearCode: number,
    makeCode: number,
    modelCode: number,
    specCode: number
  ): Promise<Array<VehicleDescriptionData>> => {
    try {
      const response = await axiosInstance.get<Array<VehicleDescriptionData>>(
        `/api/vehicle/descriptionbymymmt?modelYearCode=${modelYearCode}&makeCode=${makeCode}&modelCode=${modelCode}&specCode=${specCode}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleDescription`, error);
      throw error;
    }
  };

  /**
   * This service is use to add vehicle details.
   * @param {Object} [payload] - payload data
   * @returns {VehicleDetailsResponse}- vehicle details object
   */
  static addVehicleDetails = async (
    payload: any
  ): Promise<VehicleDetailsResponse> => {
    try {
      const response = await axiosInstance.post<VehicleDetailsResponse>(
        `/api/vehicle/vehicledetails`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      toast.error(String(i18n?.t(LabelConstants.SOMETHING_WENT_WRONG_ERROR)));
      console.error(`Error in VehicleService:addVehicleDetails`, error);
      throw error;
    }
  };

  /**
   * This service is use to add features.
   * @param {FeaturesPayload} [payload] - array of feature data and vehicle listing id
   * @returns {boolean}- true or false
   */
  static addFeatures = async (payload: FeaturesPayload): Promise<boolean> => {
    try {
      const response = await axiosInstance.post<boolean>(
        `/api/vehicle/feature`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:addFeatures`, error);
      throw error;
    }
  };

  /**
   * This service is use to add additional information.
   * @param {Object} [payload] - payload data
   * @returns {boolean}- true or false
   */
  static addAdditionalInformation = async (payload: any): Promise<boolean> => {
    try {
      const response = await axiosInstance.put<boolean>(
        `/api/vehicle/additionalinformation`,
        payload,
        { headers: { credentials: true, 'api-Version': '2' } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:addAdditionalInformation`, error);
      throw error;
    }
  };

  /**
   * This service is use to upload image.
   * @param {UploadImagePayload} [payload] - payload data
   * @returns {number}- number
   */
  static uploadImage = async (payload: UploadImagePayload): Promise<number> => {
    try {
      const response = await axiosInstance.post<number>(
        `/api/vehicle/uploadlistingartifact
        `,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:uploadImage`, error);
      throw error;
    }
  };

  /**
   * This service is use to save buyer test drive dates.
   * @param {BuyerTestDriveDatesRequest} payload - object to save buyer test drive dates.
   * @returns {boolean} Returns True/False
   */
  static saveBuyerTestDriveDates = async (
    payload: BuyerTestDriveDatesRequest
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.post<boolean>(
        `/api/vehicle/buyertestdriveavailabledates`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:saveBuyerTestDriveDates`, error);
      throw error;
    }
  };

  /**
   * This service is use to add confirm details.
   * @param {ConfirmDetailsPayload} [payload] - payload data
   * @returns {boolean}- true or false
   */
  static addConfirmDetails = async (
    payload: ConfirmDetailsPayload
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.put<boolean>(
        `/api/vehicle/confirmdetails`,
        payload,
        { headers: { credentials: true, 'api-Version': '2' } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:addConfirmDetails`, error);
      throw error;
    }
  };

  /**
   * This service is use to add  test drive dates.
   * @param {TestDriveDatePayload} [payload] - payload data
   * @returns {boolean}- true or false
   */
  static addTestDriveDates = async (
    payload: TestDriveDatePayload
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.put<boolean>(
        `/api/vehicle/preferredtestdrivedate`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:addTestDriveDates`, error);
      throw error;
    }
  };

  /**
   * This service is use to submit concierge.
   * @returns {Promise<ConciergeResponse>} Returns response of concierge success or failed.
   */
  static submitConcierge = async (
    payload: ConciergeSubmitPayload
  ): Promise<ConciergeResponse> => {
    try {
      const response = await axiosInstance.post<ConciergeResponse>(
        `/api/vehicle/conciergerequest`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:submitConcierge`, error);
      throw error;
    }
  };

  /* This service is use to fetch EMI Terms.
   * @param {EMITermPayload} payload emi term payload.
   * @returns {Promise<Array<EMITerm>>} EMI term object.
   */
  static fetchEmiTerms = async (payload: EMITermPayload): Promise<EMITerm> => {
    try {
      const response = await axiosInstance.get<EMITerm>(
        `/api/vehicle/emiterms?languageId=${payload.LanguageID}&vehiclePrice=${payload.VehiclePrice}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchEmiTerms`, error);
      throw error;
    }
  };

  // /**
  //  * This service is use to fetch EMI calculation.
  //  * @param {EMICalculator} payload emi calculation param.
  //  * @returns {Promise<EMI>} EMI amount.
  //  */
  // static fetchEMIAmount = async (payload: EMICalculator): Promise<EMI> => {
  //   try {
  //     const response = await axiosInstance.get<EMI>(
  //       `/api/vehicle/emicalculator?vehiclePrice=${payload.VehiclePrice}&interestRate=${payload.InterestRate}&term=${payload.Terms}&downPayment=${payload.DownPayment}`,
  //       { headers: { credentials: true } }
  //     );
  //     return await response.data;
  //   } catch (error) {
  //     console.error(`Error in VehicleService:fetchEMIAmount`, error);
  //     throw error;
  //   }
  // };

  /**
   * This service is use to fetch EMI calculation.
   * @param {EMICalculator} payload emi calculation param.
   * @returns {Promise<number>} EMI amount.
   */
  static calculateEMIAmount = async (
    payload: EMICalculator
  ): Promise<number> => {
    try {
      const response = await axiosInstance.post<number>(
        `/api/vehicle/calculateemifordetails`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:calculateEMIAmount`, error);
      throw error;
    }
  };

  /**
   * This service is use to download MojazVehicleReport.
   * @param {listingId} number vehicle listing id.
   * @returns {Blob} vehicle history report.
   */
  static downloadMojazVehicleReport = async (
    listingId: number
  ): Promise<Blob> => {
    try {
      const response = await axiosInstance.get(
        `/api/vehicle/downloadmojazvehiclereport?vehicleListingId=${listingId}`,
        { headers: { credentials: true }, responseType: 'blob' }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:downloadMojazVehicleReport`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch all my vehicles details based on filter parameters.
   * @param {MyVehicleSearchRequestPayload} payload - filter params
   * @returns {Promise<MyVehicleResponse>} Returns my vehicles.
   */
  static searchMyVehicle = async (
    payload: MyVehicleSearchRequestPayload
  ): Promise<MyVehicleResponse> => {
    try {
      const response = await axiosInstance.post<MyVehicleResponse>(
        `/api/vehicle/myvehicles`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:searchMyVehicle`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch list of vehicle deletion reasons.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<Make>>} Returns list of reasons
   */
  static fetchVehicleDeletionReasons = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<DeletionReason>> => {
    try {
      const response = await axiosInstance.get<Array<DeletionReason>>(
        `/api/vehicle/deletionreasons?languageid=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchVehicleDeletionReasons`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch list of seller document artifacts.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<SellerDocumentArtifactType>>} Returns list of artifacts
   */
  static fetchSellerDocumentArtifactTypes = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<SellerDocumentArtifactType>> => {
    try {
      const response = await axiosInstance.get<
        Array<SellerDocumentArtifactType>
      >(
        `/api/vehicle/sellerdocumentartifacttypes?languageid=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchSellerDocumentArtifactTypes`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to search user by mobile number.
   * @param {string} searchKey User's Mobile number
   * @returns Returns User Search Response Object
   */
  static userSearch = async (
    searchKey: string
  ): Promise<UserSearchResponse> => {
    try {
      const response = await axiosInstance.get<UserSearchResponse>(
        `/api/vehicle/usersearch?searchKey=${encodeURIComponent(searchKey)}`,
        {
          headers: { credentials: true },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:userSearch`, error);
      throw error;
    }
  };

  /**
   * This service is use to update vehicle mark as sold.
   * @param {SaveMarkAsSold} payload Object to update vehicle mark as sold
   * @returns Returns True/False
   */
  static updateMarkAsSold = async (
    payload: SaveMarkAsSold
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.put<boolean>(
        `/api/vehicle/savesoldto`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:updateMarkAsSold`, error);
      throw error;
    }
  };

  /**
   * This service is use to delete vehicle by its Ids with deletion reason.
   * @param {number | string} vehicleListingId - Id of Vehicle Listing.
   * @param {number} deletionReasonId - Id for deletion reason
   * @param {string} summary - additional info or summary
   * @returns {Promise<boolean>} Returns True/False
   */
  static deleteVehicleById = async (
    vehicleListingId: number | string,
    deletionReasonId: number,
    summary: string | null
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `/api/vehicle/vehicle?vehicleListingId=${vehicleListingId}&deletionReasonId=${deletionReasonId}&deletionSummary=${summary}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:deleteVehicleById`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all my vehicles details based on filter parameters.
   * @param {MyCarValuePayload} payload - payload to evaluate car value
   * @returns {Promise<MyCarValueResponse>} Returns my car value.
   */
  static getMyCarValue = async (
    payload: MyCarValuePayload
  ): Promise<MyCarValueResponse> => {
    try {
      const response = await axiosInstance.post<MyCarValueResponse>(
        `/api/vehicle/mycarvalue`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:getMyCarValue`, error);
      throw error;
    }
  };

  /**
   * This service is use to get inspection appointment details.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise <VehicleListingData>} Returns list of make
   */
  static getInspectionAppointmentDetails = async (
    vehicleListingId: number | null,
    currentLocale: string = Locales.EN
  ): Promise<GetAppointmentDetailsPayload> => {
    try {
      const response = await axiosInstance.get<GetAppointmentDetailsPayload>(
        `api/vehicle/inspectionappointmentdetails?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:getInspectionAppointmentDetails`,
        error
      );
      throw error;
    }
  };
  /**
   * This service is use to delete concierge by its ConciergeRequestId.
   * @param {number} ConciergeRequestId - ConciergeRequestId of concierge.
   * @returns {Promise<boolean>} Returns True/False
   */
  static deleteConcierge = async (payload: {
    ConciergeRequestId: number;
  }): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `/api/vehicle/conciergerequest`,
        { data: payload, headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:deleteConcierge`, error);
      throw error;
    }
  };

  /**
   * This service is use to edit concierge by ConciergeRequestId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`.
   * @param {number} conciergeId - ConciergeRequestId of concierge.
   * @returns {Promise<EditConciergePayload>} Returns list of conciergeRequest and userDetails.
   */
  static fetchEditConcierge = async (
    currentLocale: string = Locales.EN,
    conciergeId: number | string
  ): Promise<EditConciergePayload> => {
    try {
      const response = await axiosInstance.get<EditConciergePayload>(
        `/api/vehicle/concierge`,
        {
          params: {
            languageid: CommonUtils.getLanguageId(currentLocale),
            conciergeRequestId: conciergeId,
          },
          headers: { credentials: true },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchEditConcierge`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all vehicle listing status.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<VehicleListingStatusItem>>} Returns list of listing statue
   */
  static fetchVehicleListingStatus = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<VehicleListingStatusItem>> => {
    try {
      const response = await axiosInstance.get<Array<VehicleListingStatusItem>>(
        `/api/vehicle/vehiclelistingstatus?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleListingStatus`, error);
      throw error;
    }
  };

  /**
   * This service is use to delete image.
   * @param {Object} [payload] - payload data
   * @returns {boolean}- true or false
   */
  static deleteImage = async (
    payload: DeleteImagePayload
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `/api/vehicle/deletelistingartifact`,
        { data: payload, headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:deleteImage`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch seller Documents.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ListingImageArtifact>>} Returns list of make
   */
  static getSellerDocumentsForUpload = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<ListingImageArtifact>> => {
    try {
      const response = await axiosInstance.get<Array<ListingImageArtifact>>(
        `api/vehicle/sellerdocumentartifacttypes?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:getSellerDocumentsForUpload`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch all petromin locations.
   * @param {number}  [cityId] - cityId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<PetrominLocationData>>} Returns list of petromin locations
   */
  static fetchPetrominLocation = async (
    cityId: number,
    addressType: string,
    currentLocale: string = Locales.EN
  ): Promise<Array<PetrominLocationData>> => {
    try {
      const response = await axiosInstance.get<Array<PetrominLocationData>>(
        `/api/vehicle/petrominlocations?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&cityId=${cityId}&addressType=${addressType}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchPetrominLocation`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch test drive available details.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<TestDriveAvailableDetails>} Returns list of test drive available details
   */
  static fetchTestDriveAvailableDetails = async (
    vehicleListingId: number | null,
    currentLocale: string = Locales.EN
  ): Promise<TestDriveAvailableDetails> => {
    try {
      const response = await axiosInstance.get<TestDriveAvailableDetails>(
        `/api/vehicle/testdriveavailabledetails?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchTestDriveAvailableDetails`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch test drive data.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<TestDriveData>>} Returns list of test drive
   */
  static fetchTestDriveAvailabilities = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<TestDriveData>> => {
    try {
      const response = await axiosInstance.get<Array<TestDriveData>>(
        `/api/vehicle/testdriveavailabilities?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:fetchTestDriveAvailabilities`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to notify user about vehicle.
   * @param  {NotifyMePayload} [payload] - payload data
   * @returns {Promise<NotifyMeResponse>} Returns response object
   */
  static notifyMe = async (
    payload: NotifyMePayload
  ): Promise<NotifyMeResponse> => {
    try {
      const response = await axiosInstance.post<NotifyMeResponse>(
        `/api/vehicle/conciergerequest`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:notifyMe`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch list of user searches.
   * @param  {NotifyMePayload} [payload] - payload data
   * @returns {Promise<NotifyMeResponse>} Returns response object
   */
  static listingSearch = async (): Promise<Array<UserSavedSearch>> => {
    try {
      const response = await axiosInstance.get<Array<UserSavedSearch>>(
        `/api/vehicle/listingsearch`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:listingSearch`, error);
      throw error;
    }
  };

  /**
   * This service is use to save new user search.
   * @param  {SaveUserSearchPayload} [payload] - payload data
   * @returns {Promise<SaveUserSearchResponse>} Returns response object
   */
  static saveSearch = async (
    payload: SaveUserSearchPayload
  ): Promise<SaveUserSearchResponse> => {
    try {
      const response = await axiosInstance.post<SaveUserSearchResponse>(
        `/api/vehicle/listingsearch`,
        payload,
        {
          headers: { credentials: true },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:saveSearch`, error);
      throw error;
    }
  };

  /**
   * This service is use to delete user search.
   * @param  {number|string} [searchID] - user saved search item id.
   * @returns {Promise<boolean>} Returns True/False
   */
  static removeSaveSearch = async (
    searchID: number | string
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `/api/vehicle/listingsearch`,
        {
          data: { UserVehicleSearchID: searchID },
          headers: { credentials: true },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:removeSaveSearch`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch test drive available details.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<BuyerDocumentResponse>>} Returns list of test drive available details
   */
  static getBuyerDocuments = async (
    vehicleListingId: number | null,
    currentLocale: string = Locales.EN
  ): Promise<Array<BuyerDocumentResponse>> => {
    try {
      const response = await axiosInstance.get<Array<BuyerDocumentResponse>>(
        `/api/Vehicle/buyerdocuments?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&vehicleListingId=${vehicleListingId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:getBuyerDocuments`, error);
      throw error;
    }
  };

  /**
   * This service is use to save new quotation.
   * @param  {SaveQuotationPayload} [payload] - payload data
   * @returns {Promise<SaveUserSearchResponse>} Returns response object
   */
  static financeRequest = async (
    payload: FinanceRequestPayload
  ): Promise<FinanceRequestResponse> => {
    try {
      const response = await axiosInstance.post<FinanceRequestResponse>(
        `/api/vehicle/financerequest`,
        payload,
        {
          headers: { credentials: true },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:financeRequest`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch list of vehicle Id which are requested for finance by user.
   * @returns {Promise<Array<number>>} Returns list of vehicle Ids.
   */
  static fetchFinanceRequest = async (): Promise<Array<number>> => {
    try {
      const response = await axiosInstance.get<Array<number>>(
        `/api/vehicle/financerequest`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchFinanceRequest`, error);
      throw error;
    }
  };

  /**
   * This service is use to remove finance request.
   * @returns {Promise<boolean>} Returns True/False.
   */
  static deleteFinanceRequest = async (vehicleId: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `/api/vehicle/deletevehiclefinancerequest?vehicleListingId=${vehicleId}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:deleteFinanceRequest`, error);
      throw error;
    }
  };

  /**
   * This service is use to get vehicle cart count.
   * @returns {Promise<boolean>} Returns True/False.
   */
  static getVehicleCartCunt = async (): Promise<number> => {
    try {
      const response = await axiosInstance.get<number>(
        `/api/Vehicle/vehiclecartcount`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:getVehicleCartCunt`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all my vehicles details based on filter parameters on vehicle onboard.
   * @param {MyCarValuePayload} payload - payload to evaluate car value
   * @returns {Promise<MyCarValueResponse>} Returns my car value.
   */
  static getMyCarValueVehicleListing = async (
    payload: MyCarValuePayload
  ): Promise<MyCarValueResponse> => {
    try {
      const response = await axiosInstance.post<MyCarValueResponse>(
        `/api/Vehicle/mycarvaluewithlocalcodes`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:getMyCarValueVehicleListing`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to upload mojaz report.
   * @param {UploadMojazPayload} [payload] - payload data
   * @returns {Promise<UploadMojazResponse>}- Upload Mojaz Response
   */
  static uploadMojazDocument = async (
    payload: UploadMojazPayload
  ): Promise<UploadMojazResponse> => {
    try {
      const response = await axiosInstance.post<UploadMojazResponse>(
        `/api/vehicle/uploadmojazfullreport`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:uploadMojazDocument`, error);
      throw error;
    }
  };

  /**
   * This service is use to download the document
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {number} [vehicleListingArtifactId] - vehicleListingArtifactId
   * @returns {Promise<Blob>} Returns Blob content of document file.
   */
  static downloadDocument = async (
    vehicleListingId: number,
    vehicleListingArtifactId: number
  ): Promise<Blob> => {
    try {
      const response = await axiosInstance.get(
        `/api/Vehicle/downloaddocumentartifact`,
        {
          params: { vehicleListingId, vehicleListingArtifactId },
          headers: { credentials: true },
          responseType: 'blob',
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:downloadDocument`, error);
      throw error;
    }
  };

  /**
   * This service is use to download MojazLiteVehicleReport.
   * @param {listingId} number vehicle listing id.
   * @returns {Blob} vehicle history report.
   */
  static downloadMojazLiteVehicleReport = async (
    listingId: number,
    currentLocale: string = Locales.EN
  ): Promise<Blob> => {
    try {
      const response = await axiosInstance.get(
        `/api/vehicle/DownloadMojazliteVehicleReport?vehicleListingId=${listingId}&languageid=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true }, responseType: 'blob' }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:DownloadMojazliteVehicleReport`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to save User Acknowledgement.
   * @param {SaveUserSearchPayload} [payload] - payload data
   * @returns {Promise<SaveUserAcknowledgementResponse>}- Save User Acknowledgement Response
   */
  static saveUserAcknowledgement = async (
    payload: SaveUserAcknowledgementPayload
  ): Promise<SaveUserAcknowledgementResponse> => {
    try {
      const response = await axiosInstance.post<UploadMojazResponse>(
        `/api/vehicle/saveuseracknowledgement`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in VehicleService:uploadMojazDocument`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch documents by artifact category.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ListingImageArtifact>>} Returns list of make
   */
  static fetchVehicleDocuments = async (
    vehicleListingId: number,
    currentLocale: string = Locales.EN
  ): Promise<Array<ListingImageArtifact>> => {
    try {
      const response = await axiosInstance.get<Array<ListingImageArtifact>>(
        `/api/vehicle/customerdocuments`,
        {
          params: {
            languageId: CommonUtils.getLanguageId(currentLocale),
            vehicleListingId,
          },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleDocuments`, error);
      throw error;
    }
  };
  /**
   * This service is use to fetch outlet vehicle documents by artifact category.
   * @param {number}  [vehicleListingId] - vehicleListingId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ListingImageArtifact>>} Returns list of make
   */
  static fetchOutletVehicleDocuments = async (
    vehicleListingId: number,
    currentLocale: string = Locales.EN
  ): Promise<Array<ListingImageArtifact>> => {
    try {
      const response = await axiosInstance.get<Array<ListingImageArtifact>>(
        `/api/vehicle/customerdocuments`,
        {
          params: {
            languageId: CommonUtils.getLanguageId(currentLocale),
            vehicleListingId,
          },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleDocuments`, error);
      throw error;
    }
  };

  /**
   * This service is use to get imported by data.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   */
  static getImportedByData = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<ImportedByDataResponse>> => {
    try {
      const response = await axiosInstance.get<Array<ImportedByDataResponse>>(
        `/api/Vehicle/importers?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in NewCarService:getImportedByData`, error);
      throw error;
    }
  };
  /**
   * This service is use to get fulfilled by data.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   */
  static getFulfilledByData = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<FulFilledByDataResponse>> => {
    try {
      const response = await axiosInstance.get<Array<FulFilledByDataResponse>>(
        `/api/Vehicle/fulfilledby?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in NewCarService:getFulfilledByData`, error);
      throw error;
    }
  };
  /**
   * This service is use to get supplied by data.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   */
  static getSuppliedByData = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<SuppliedByDataResponse>> => {
    try {
      const response = await axiosInstance.get<Array<SuppliedByDataResponse>>(
        `/api/Vehicle/distributors?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in NewCarService:getSuppliedByData`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch vehicle data.
   * @param {number}  [productCatalogueId] - productCatalogueId.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise <ProductCatalogueData>} Returns list of make
   */
  static fetchProductCatalogueData = async (
    productCatalogueId: number | null,
    currentLocale: string = Locales.EN
  ): Promise<ProductCatalogueData> => {
    try {
      const response = await axiosInstance.get<ProductCatalogueData>(
        `/api/productcatalogue/productcatalogue?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&productCatalogueId=${productCatalogueId}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchVehicleListingData`, error);
      throw error;
    }
  };

  /**
   * This service is use to check stock availability.
   * @param {number}  [productCatalogueId] - productCatalogueId.
   * @returns {Promise <StockAvailability>} Returns vehicleListingId or null
   */
  static stockAvailability = async (
    productCatalogueId: number | undefined
  ): Promise<StockAvailability> => {
    try {
      const response = await axiosInstance.get<StockAvailability>(
        `/api/productcatalogue/stockavailability?productCatalogueId=${productCatalogueId}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:stockAvailability`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch variant data.
   * @param {number}  [productCatalogueId] - productCatalogueId.
   * @returns {Promise <GetVariantResponse>} Returns list of variant
   */
  static getProductCatalogueVariants = async (
    productCatalogueId: number | undefined,
    currentLocale: string = Locales.EN
  ): Promise<Array<GetVariantResponse>> => {
    try {
      const response = await axiosInstance.get<Array<GetVariantResponse>>(
        `/api/ProductCatalogue/getvariants?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&productCatalogueId=${productCatalogueId}`
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:getProductCatalogueVariants`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch color variant data.
   * @param {number}  [productCatalogueId] - productCatalogueId.
   * @returns {Promise <GetColorVariantResponse>} Returns list of color variant
   */
  static getProductCatalogueColorVariants = async (
    currentLocale: string = Locales.EN,
    productCatalogueId: number | null
  ): Promise<Array<GetColorVariantResponse>> => {
    try {
      const response = await axiosInstance.get<Array<GetColorVariantResponse>>(
        `/api/ProductCatalogue/getcolorvariants?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&productCatalogueId=${productCatalogueId}`
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in VehicleService:getProductCatalogueColorVariants`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to add vehicle to the wishlist.
   * @param {WishListPayload} payload Payload object to add vehicle to bookmark.
   * @returns {Promise<boolean>} Returns True/False.
   */
  static addWishList = async (payload: WishListPayload): Promise<boolean> => {
    try {
      const response = await axiosInstance.post<boolean>(
        `api/Vehicle/addwishlist`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:addWishList`, error);
      throw error;
    }
  };

  /**
   * This service is use to remove vehicle from WishList.
   * @param {WishListPayload} payload Payload object to remove vehicle from bookmark.
   * @returns {Promise<boolean>} Returns True/False.
   */
  static deleteWishList = async (
    payload: WishListPayload
  ): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `api/Vehicle/deletewishlist`,
        { data: payload, headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:deleteWishList`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch list of vehicle Id which are bookmarked by user.
   * @returns {Promise<WishListResponse>} Returns list of vehicle Ids.
   */
  static fetchWishList = async (): Promise<WishListResponse> => {
    try {
      const response = await axiosInstance.get<WishListResponse>(
        `api/Vehicle/wishlist`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:fetchWishList`, error);
      throw error;
    }
  };

  /**
   * This service is use to add vehicle to the wishlist.
   * @param {UpdateDealStatusPayload} payload Payload object to add vehicle to bookmark.
   * @returns {Promise<UpdateDealStatusResponse>} Returns True/False.
   */
  static updateDealStatus = async (
    payload: UpdateDealStatusPayload
  ): Promise<UpdateDealStatusResponse> => {
    try {
      const response = await axiosInstance.put<UpdateDealStatusResponse>(
        `/api/vehicle/deal`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:addWishList`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch color variant data.
   * @param {number}  [vehicleDeadId] - vehicleDeadId.
   * @returns {Promise <DealsResponse>} Returns list of color variant
   */
  static getVehicleDeal = async (
    vehicleDeadId: number | null,
    currentLocale: string = Locales.EN
  ): Promise<DealsResponse> => {
    try {
      const response = await axiosInstance.get<DealsResponse>(
        `api/vehicle/vehicledealbyid?vehicleDealId=${vehicleDeadId}&languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in VehicleService:getVehicleDeal`, error);
      throw error;
    }
  };
}
