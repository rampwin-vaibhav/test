import {
  FAQResponse,
  FetchEmailFeedbackResponse,
  PostEmailFeedbackPayload,
  PostFeedbackPayload,
  PostFeedbackResponse,
  UploadFeedbackArtifactPayload,
  PostEmailFeedbackResponse,
  SupportQueryTypeResponse,
  PostSupportQueryPayload,
  PostSupportQueryResponse,
  VASPageDetailsResponse,
  TestimonialsDataResponse,
  MediaConfigurationDataResponse,
} from '../../types/models';
import { axiosInstance } from '../api';
import { Locales } from '../../types/enums';
import { CommonUtils } from '../utilities';

export default class SupportService {
  /**
   * This service is use to fetch faq's
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<Array<FAQResponse>}
   */
  static getFAQs = async (
    currentLocale: string = Locales.EN,
    isMediaPage: boolean = false
  ): Promise<Array<FAQResponse>> => {
    const response = await axiosInstance.get<Array<FAQResponse>>(
      `/api/support/faq?languageId=${CommonUtils.getLanguageId(
        currentLocale
      )}&isMediaPage=${isMediaPage}`
    );
    return response.data;
  };

  /**
   * This service is to save feedback's
   * @param {PostFeedbackPayload} payload - feedback params
   * @returns {Promise<PostFeedbackResponse>} returns response message.
   */
  static postFeedback = async (
    payload: PostFeedbackPayload
  ): Promise<PostFeedbackResponse> => {
    try {
      const response = await axiosInstance.post<PostFeedbackResponse>(
        `/api/support/feedback`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in SupportService:postFeedback`, error);
      throw error;
    }
  };

  /**
   *
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @param {string} feedbackId
   * @returns {FetchEmailFeedbackResponse} fetches feedback data
   */
  static fetchEmailFeedback = async (
    currentLocale: string = Locales.EN,
    feedbackId: string
  ): Promise<FetchEmailFeedbackResponse> => {
    try {
      const response = await axiosInstance.get<FetchEmailFeedbackResponse>(
        `/api/support/feedback?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&feedbackId=${feedbackId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in SupportService:fetchEmailFeedback`, error);
      throw error;
    }
  };

  /**
   *
   * @param {UploadFeedbackArtifactPayload} payload - upload feedback artifact params
   * @returns {number}- returns number
   */
  static uploadFeedbackArtifact = async (
    payload: UploadFeedbackArtifactPayload
  ): Promise<number> => {
    try {
      const response = await axiosInstance.post<number>(
        `/api/support/uploadfeedbackartifact`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error(`Error in SupportService:uploadFeedbackArtifact`, error);
      throw error;
    }
  };

  /**
   *
   * @param {PostEmailFeedbackPayload} payload post email feed back params
   * @returns {DeleteFeedbackArtifactResponse} returns response
   */
  static postEmailFeedback = async (
    payload: PostEmailFeedbackPayload
  ): Promise<PostEmailFeedbackResponse> => {
    try {
      const response = await axiosInstance.post<PostEmailFeedbackResponse>(
        `/api/support/feedbackbybuyerorseller`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error(`Error in SupportService:postEmailFeedback`, error);
      throw error;
    }
  };

  /* * This service is use to fetch SupportQueryType's
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<SupportQueryTypeResponse>}
   */
  static fetchSupportQueryType = async (
    currentLocale: string = Locales.EN
  ): Promise<SupportQueryTypeResponse> => {
    try {
      const response = await axiosInstance.get<SupportQueryTypeResponse>(
        `/api/support/supportquerytype?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in SupportService:fetchSupportQueryType`, error);
      throw error;
    }
  };

  /** This service is to save support queries
   * @param {PostSupportQueryPayload} payload - support query params
   * @returns {Promise<PostSupportQueryResponse>} returns response message.
   */
  static postSupportQuery = async (
    payload: PostSupportQueryPayload
  ): Promise<PostSupportQueryResponse> => {
    try {
      const response = await axiosInstance.post<PostSupportQueryResponse>(
        `/api/support/supportquery`,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in SupportService:postSupportQuery`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all vas related data.
   * @returns {Promise<VASPageDetailsResponse>} Returns all vas related data.
   */
  static fetchVASDetails = async (
    mediaPageKey: string,
    currentLocale: string = Locales.EN,
    platform: string
  ): Promise<VASPageDetailsResponse> => {
    try {
      const response = await axiosInstance.get<VASPageDetailsResponse>(
        `api/ValueAddedService/warrantyvaspagedetails?mediaPageKey=${mediaPageKey}&languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&platform=${platform}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:warrantyvaspagedetails`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch all rating related data.
   * @returns {Promise<TestimonialsDataResponse>} Returns all rating related data.
   */
  static fetchTestimonials = async (
    mediaPageKey: string,
    currentLocale: string = Locales.EN,
    platform: string
  ): Promise<TestimonialsDataResponse> => {
    try {
      const response = await axiosInstance.get<TestimonialsDataResponse>(
        `api/ValueAddedService/getmediapagetestimonialdetails?sectionKey=${mediaPageKey}&languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}&platform=${platform}`
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in GlobalService:getmediapagetestimonialdetails`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to fetch all configuration data.
   * @returns {Promise<TestimonialsDataResponse>} Returns all configuration data.
   */
  static fetchMediaPageConfiguration = async (
    mediaPageKey: string
  ): Promise<Array<MediaConfigurationDataResponse>> => {
    try {
      const response = await axiosInstance.get<
        Array<MediaConfigurationDataResponse>
      >(
        `api/ValueAddedService/mediapageconfigurationbymediapagekey?mediaPageKey=${mediaPageKey}`
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in GlobalService:mediapageconfigurationbymediapagekey`,
        error
      );
      throw error;
    }
  };
}
