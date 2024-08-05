import axios from 'axios';
import { Locales } from '../../types/enums';
import {
  HeaderMenu,
  StateCities,
  PrivacyResponse,
  AboutUsResponse,
  TermsAndConditions,
  CitiesResponse,
  SocialMediaResponse,
  DirectLineToken,
  SocialMediaPlatformItem,
  CountryStateCItyResponse,
  District,
  ProvinceCities,
  CountryProvinceCityResponse,
  CitiesResponseV1,
} from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';

export default class GlobalService {
  /**
   * This service is use to fetch all States & Cities.
   * @returns {Promise<StateCities>} Returns list of state & cities.
   */
  static fetchStateCities = async (
    stateId: number,
    currentLocale: string = Locales.EN
  ): Promise<StateCities> => {
    try {
      const response = await axiosInstance.get<StateCities>(
        `/api/globaldata/statecities?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&stateId=${stateId}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchStateCities`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch header menus.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<HeaderMenu>>} Returns header menus.
   */
  static getHeaderMenu = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<HeaderMenu>> => {
    const response = await axiosInstance.get<Array<HeaderMenu>>(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL
      }/api/globaldata/siteheadermenu?languageId=${CommonUtils.getLanguageId(
        currentLocale
      )}`,
      { headers: { credentials: true } }
    );
    return await response.data;
  };

  /**
   * This service is use to fetch privacy policy.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<PrivacyResponse>>} Returns privacy policy.
   */
  static fetchPrivacyPolicy = async (
    currentLocale: string = Locales.EN
  ): Promise<PrivacyResponse> => {
    try {
      const response = await axiosInstance.get<PrivacyResponse>(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/globaldata/privacypolicy?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchPrivacyPolicy`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch terms and conditions
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<TermsConditions>}
   */
  static fetchTermsAndConditions = async (
    currentLocale: string = Locales.EN
  ): Promise<TermsAndConditions> => {
    try {
      const response = await axiosInstance.get<TermsAndConditions>(
        `/api/globaldata/termsandconditions?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchTermsAndConditions`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch about us data.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<AboutUsResponse>>} Returns about us data.
   */
  static fetchAboutUs = async (
    currentLocale: string = Locales.EN
  ): Promise<AboutUsResponse> => {
    try {
      const response = await axiosInstance.get<AboutUsResponse>(
        `${
          process.env.NEXT_PUBLIC_API_BASE_URL
        }/api/globaldata/aboutus?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchAboutUs`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all Cities.
   * @returns {Promise<Array<Cities>>} Returns list of cities.
   */
  static fetchCities = async (
    currentLocale: string = Locales.EN
  ): Promise<CitiesResponse> => {
    try {
      const response = await axiosInstance.get<CitiesResponse>(
        `/api/globaldata/cities?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchCities`, error);
      throw error;
    }
  };

  /**   * This service is use to fetch social media data.
   * @returns {Promise<Array<SocialMediaResponse>>} Returns social media data.
   */
  static fetchSocialMedia = async (): Promise<SocialMediaResponse> => {
    try {
      const response = await axiosInstance.get<SocialMediaResponse>(
        `/api/GlobalData/socialmedia`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchSocialMedia`, error);
      throw error;
    }
  };

  /**
   * This service is use to get Direct Line Token.
   * @param {string | number} userId - loggedIn or anonymous userId.
   * @returns {Promise<DirectLineToken>} Returns Direct Line Token.
   */
  static getDirectLineToken = async (
    userId: string | number
  ): Promise<DirectLineToken> => {
    try {
      const response = await axiosInstance.get<DirectLineToken>(
        `/api/getdirectlinetoken?userId=${userId}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:getDirectLineToken`, error);
      throw error;
    }
  };

  /**   * This service is use to fetch social media data.
   * @returns {Promise<Array<SocialMediaPlatformItem>>} Returns social media data.
   */
  static fetchSocialMediaPlatform = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<SocialMediaPlatformItem>> => {
    try {
      const response = await axiosInstance.get<Array<SocialMediaPlatformItem>>(
        `/api/globaldata/socialmediaplatform`,
        { params: { languageId: CommonUtils.getLanguageId(currentLocale) } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchSocialMediaPlatform`, error);
      throw error;
    }
  };

  /**
   * This service is use to automatically detect city.
   * @returns {Promise<string>} Returns city name.
   */
  static getAutoDetectCity = async (
    lan: number,
    lat: any,
    long: any
  ): Promise<string> => {
    try {
      const response = await axiosInstance.get<string>(
        `/api/globaldata/cityname`,
        {
          params: {
            languageId: lan,
            latitude: lat,
            longitude: long,
          },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:getAutoDetectCity`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all cities in both english and arabic.
   * @returns {Promise<CitiesResponseV1>} Returns all cities.
   */
  static fetchAllCitiesEnAr = async (): Promise<CitiesResponseV1> => {
    try {
      const response = await axios.get<CitiesResponseV1>(
        `https://centralservices.gogomotor.com/backend-api/common/cities`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:getAutoDetectCity`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch country state city.
   * @returns {Promise<CountryStateCItyResponse>} Returns country state city.
   */

  static getCountryStateCity = async (
    currentLocale: string = Locales.EN,
    countryId: number,
    stateId: number
  ): Promise<CountryStateCItyResponse> => {
    try {
      const response = await axiosInstance.get<CountryStateCItyResponse>(
        `/api/GlobalData/countrystatecity`,
        {
          params: {
            languageId: CommonUtils.getLanguageId(currentLocale),
            countryId: countryId,
            stateId: stateId,
          },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:getCountryStateCity`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch districts.
   * @returns {Promise<Array<District>>} Returns districts.
   */

  static getDistricts = async (
    currentLocale: string = Locales.EN,
    cityId: number
  ): Promise<Array<District>> => {
    try {
      const response = await axiosInstance.get<Array<District>>(
        `/api/GlobalData/districts`,
        {
          params: {
            languageId: CommonUtils.getLanguageId(currentLocale),
            cityId: cityId,
          },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:getDistricts`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all Provinces & Cities.
   * @returns {Promise<ProvinceCities>} Returns list of state & cities.
   */
  static fetchProvinceCities = async (
    provinceId: number,
    currentLocale: string = Locales.EN
  ): Promise<ProvinceCities> => {
    try {
      const response = await axiosInstance.get<ProvinceCities>(
        `/api/globaldata/provincecities?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&provinceId=${provinceId}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchProvinceCities`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch country province city.
   * @returns {Promise<CountryProvinceCityResponse>} Returns country province city.
   */

  static getCountryProvinceCity = async (
    currentLocale: string = Locales.EN,
    countryId: number,
    provinceId: number
  ): Promise<CountryProvinceCityResponse> => {
    try {
      const response = await axiosInstance.get<CountryProvinceCityResponse>(
        `/api/GlobalData/countryprovincecity`,
        {
          params: {
            languageId: CommonUtils.getLanguageId(currentLocale),
            countryId: countryId,
            provinceId: provinceId,
          },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:getCountryProvinceCity`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all inspection Cities.
   * @returns {Promise<Array<Cities>>} Returns list of cities.
   */
  static fetchInspectionCities = async (
    currentLocale: string = Locales.EN
  ): Promise<CitiesResponse> => {
    try {
      const response = await axiosInstance.get<CitiesResponse>(
        `/api/globaldata/inspectioncities?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchInspectionCities`, error);
      throw error;
    }
  };
}
