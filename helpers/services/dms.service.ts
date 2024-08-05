import {
  DealerApplicationPayload,
  DealerApplicationResponse,
  InspectionReportData,
} from '../../types/models';
import { axiosInstance } from '../api';

export default class DMSService {
  /**
   * This service is use to save Dealer Application.
   * @param {DealerApplicationPayload}  [payload] - Dealer application payload.
   * @returns {Promise <DealerApplicationResponse>} Returns response
   */
  static saveDealerApplication = async (
    payload: DealerApplicationPayload
  ): Promise<DealerApplicationResponse> => {
    try {
      const response = await axiosInstance.post<DealerApplicationResponse>(
        `/api/dms/saveDealerApplication`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in InspectionService:saveDealerApplication`, error);
      throw error;
    }
  };
}
