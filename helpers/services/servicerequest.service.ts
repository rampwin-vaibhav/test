import { ServiceType } from '../../types/enums';
import { ServicePayload, ServicePayloadResponse } from '../../types/models';
import { axiosInstance } from '../api';

export default class ServiceRequest {
  /**
   * This service will call api according to the payload param and return success or failure
   * @param {ServicePayload} payload request param
   * @param {ServiceType} serviceType type of service
   * @returns ServicePayloadResponse
   */
  static connect = async (
    payload: ServicePayload,
    serviceType: ServiceType
  ): Promise<ServicePayloadResponse> => {
    try {
      let url;

      switch (serviceType) {
        case ServiceType.AutoCare:
          url = `/api/support/autocarequery`;
          break;
        case ServiceType.AutoPaint:
          url = `/api/support/bodyandpaintquery`;
          break;
        case ServiceType.Tristar:
          url = `/api/support/tristarquery`;
          break;
      }

      const response = await axiosInstance.post<ServicePayloadResponse>(
        url,
        payload,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ServiceRequest:connect`, error);
      throw error;
    }
  };
}
