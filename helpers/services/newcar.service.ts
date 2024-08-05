import { Locales } from '../../types/enums';
import {
  Features,
  ProfileArtifact,
  SpecificationData,
  SpecificationItem,
  VehicleBrand,
  FeatureData,
  ColorVariantType,
} from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';

export default class NewCarService {
  /**
   * This service is use to get list of new car make.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<VehicleBrand>>} Returns list of make.
   */
  static fetchNewCarsMake = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<VehicleBrand>> => {
    try {
      const response = await axiosInstance.get<Array<VehicleBrand>>(
        `/api/VehicleProfile/getnewcarmakes?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in NewCarService:getnewcarmakes`, error);
      throw error;
    }
  };

  /**
   * This service is use to get list of new car make.
   * @param {number} [id] - vehicle profile id`
   * @param {string} [type] - type`
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<Features>>} Returns list of make.
   */
  static fetchFeatures = async (
    currentLocale: string = Locales.EN,
    id: number,
    type: string
  ): Promise<Array<Features>> => {
    try {
      const response = await axiosInstance.get<Array<FeatureData>>(
        `api/vehicleprofile/features?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&id=${id}&type=${type}`
      );

      const filteredFeatures = response.data
        .filter((x) => x.Id && x.IsAvailable)
        .reduce((result: Array<Features>, currentVal: FeatureData) => {
          const index = result.findIndex(
            (x: any) => x.FeatureCategoryId === currentVal.FeatureCategoryId
          );
          if (index != -1) {
            result[index].FeatureList.push({
              Feature: currentVal.Feature,
              FeatureId: currentVal.FeatureId,
              IsAvailable: currentVal.IsAvailable,
            });
          } else {
            result.push({
              FeatureCategoryId: currentVal.FeatureCategoryId,
              FeatureCategory: currentVal.FeatureCategory,
              FeatureList: [
                {
                  Feature: currentVal.Feature,
                  FeatureId: currentVal.FeatureId,
                  IsAvailable: currentVal.IsAvailable,
                },
              ],
            });
          }
          return result;
        }, []);

      return (await filteredFeatures) || [];
    } catch (error) {
      console.error(`Error in NewCarService:getnewcarmakes`, error);
      throw error;
    }
  };

  /**
   * This service is use to get list of new car make.
   * @param {number} [id] - vehicle profile id`
   * @param {string} [type] - type`
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<SpecificationItem>>} Returns list of make.
   */
  static fetchSpecification = async (
    currentLocale: string = Locales.EN,
    id: number,
    type: string
  ): Promise<Array<SpecificationItem>> => {
    try {
      const response = await axiosInstance.get<SpecificationData>(
        `/api/vehicleprofile/specifications?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&id=${id}&type=${type}`
      );
      return (await response.data.Specifications) || [];
    } catch (error) {
      console.error(`Error in NewCarService:getnewcarmakes`, error);
      throw error;
    }
  };

  /**
   * This service is use to get list of new car make.
   * @param {number} [id] - vehicle profile id`
   * @param {string} [type] - type`
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ProfileArtifact>>} Returns list of make.
   */
  static fetchProfileArtifactData = async (
    currentLocale: string = Locales.EN,
    id: number,
    type: string
  ): Promise<Array<ProfileArtifact>> => {
    try {
      const response = await axiosInstance.get<Array<ProfileArtifact>>(
        `api/VehicleProfile/getartifacts?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&id=${id}&type=${type}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in NewCarService:getnewcarmakes`, error);
      throw error;
    }
  };

  /**
   * This service is use to get color variant.
   * @param {number} [vehicleListingId] - vehicle listing id`
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<ColorVariantType>>} Returns list of color variant.
   * Important: Will not use this API to get color variant details for listings
   */
  static getColorVariant = async (
    currentLocale: string = Locales.EN,
    vehicleListingId: number
  ): Promise<Array<ColorVariantType>> => {
    try {
      const response = await axiosInstance.get<Array<ColorVariantType>>(
        `api/vehicle/getcolorvariants?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&vehicleListingId=${vehicleListingId}`
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in NewCarService:getColorVariant`, error);
      throw error;
    }
  };

  /**
   * This service is use to get emi hash data.
   * @param {number} [vehicleListingId] - vehicle listing id`
   * @param {number} [buyerId] - buyer d`
   * @returns {Promise<[index: string]>} Returns hash data.
   */
  static saveEMIRequest = async (
    vehicleListingId: number,
    buyerId: number
  ): Promise<[index: string]> => {
    try {
      const response = await axiosInstance.post<[index: string]>(
        `/api/Vehicle/saveemirequest`,
        {
          VehicleListingId: vehicleListingId,
          BuyerId: buyerId,
        },
        { headers: { credentials: true } }
      );
      return (await response.data) || [];
    } catch (error) {
      console.error(`Error in NewCarService:saveEMIRequest`, error);
      throw error;
    }
  };
}
