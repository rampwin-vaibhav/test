import { Locales } from '../../types/enums';
import { UserInterestPayload } from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';

export default class LeadService {
  /**
   * This service is use to save User Interest Form.
   * @param {UserInterestPayload}  [payload] - Interest application payload.
   */
  static saveUserInterestApplication = async (payload: UserInterestPayload) => {
    try {
      const response = await axiosInstance.post(
        `/api/Lead/vehiclelead`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in InspectionService:saveDealerApplication`, error);
      throw error;
    }
  };

  /**
   * This service is use to save User Interest Form.
   * @param languageId - Interest application payload.
   */
  static getPurchasePlanDuration = async (
    currentLocale: string = Locales.EN
  ) => {
    try {
      const response = await axiosInstance.get(
        `/api/Lead/getPurchasePlanDuration?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in InspectionService:getPurchasePlanDuration`,
        error
      );
      throw error;
    }
  };
}
