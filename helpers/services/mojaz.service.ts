import { Locales } from '../../types/enums';
import { MojazLiteResponse } from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';

export default class MojazService {
  /**
   * This service is use to fetch details regarding mojaz.
  
   * @returns {Promise<MojazLiteResponse>} Returns search result.
   */
  static mojazLiteReport = async (
    vin: string,
    currentLocale: string = Locales.EN
  ): Promise<MojazLiteResponse> => {
    const response = await axiosInstance.get<MojazLiteResponse>(
      `api/mojaz/mojazlitereport?vin=${vin}&languageId=${CommonUtils.getLanguageId(
        currentLocale
      )}`,

      { headers: { credentials: true } }
    );
    return response.data;
  };
}
