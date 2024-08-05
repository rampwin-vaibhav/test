import { ConfigurationKey, Locales } from '../../types/enums';
import {
  AllConfigurationResponse,
  CMSConfigurationResponse,
  ConfigurationResponse,
} from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';

export default class ConfigurationService {
  /**
   * This service is use to fetch all configuration details based on filter parameters.
   * @param {ConfigurationKey} configurationKey value of configuration key
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<ConfigurationResponse>} Returns configuration result.
   */
  static fetchConfigurationValue = async (
    configurationKey: ConfigurationKey,
    currentLocale: string = Locales.EN
  ): Promise<ConfigurationResponse> => {
    try {
      const response = await axiosInstance.get<ConfigurationResponse>(
        `/api/configuration/configurationdata?configurationKey=${configurationKey}&languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in GlobalService:fetchConfigurationValue`, error);
      throw error;
    }
  };

  /**
   * This service return cms configuration values based on paramters
   * @param {string} pagekey value of pagekey
   * @param {string} configurationkey value of configurationkey
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<CMSConfigurationResponse>>} Returns CMSconfiguration result.
   */
  static fetchCMSConfigurationValue = async (
    pagekey: string | null,
    configurationkey: string | null,
    currentLocale: string = Locales.EN
  ): Promise<Array<CMSConfigurationResponse>> => {
    const response = await axiosInstance.get<Array<CMSConfigurationResponse>>(
      `/api/configuration/getCMSConfiguration?${
        pagekey ? `pagekey=${pagekey}&` : ''
      }${
        configurationkey ? `configurationkey=${configurationkey}&` : ''
      }languageId=${CommonUtils.getLanguageId(currentLocale)}`
    );
    return response.data;
  };

  /**
   * This service return cms configuration values based on paramters
   * @param {string} pagekey value of pagekey
   * @param {string} configurationkey value of configurationkey
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<{ [x: string]: string }>} Returns CMSconfiguration result.
   */
  static fetchCMSCLabelConstant = async (
    pagekey: string | null,
    configurationkey: string | null,
    currentLocale: string = Locales.EN
  ): Promise<{ [x: string]: string }> => {
    const response = await axiosInstance.get<Array<CMSConfigurationResponse>>(
      `/api/configuration/getCMSConfiguration?${
        pagekey ? `pagekey=${pagekey}&` : ''
      }${
        configurationkey ? `configurationkey=${configurationkey}&` : ''
      }languageId=${CommonUtils.getLanguageId(currentLocale)}`
    );

    let data: { [x: string]: string } = {};
    data = (response.data || []).reduce((x: any, y) => {
      x[y.ConfigurationKey] = y.ConfigurationValue;
      return x;
    }, {});
    return data;
  };

  /**
   * This service is use to fetch all configuration details.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<AllConfigurationResponse>} Returns configuration result.
   */
  static getConfigurationData = async (
    currentLocale: string = Locales.EN
  ): Promise<AllConfigurationResponse> => {
    try {
      const response = await axiosInstance.get<AllConfigurationResponse>(
        `/api/Configuration/allconfiguration?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in GlobalService:allconfiguration`, error);
      throw error;
    }
  };
}
