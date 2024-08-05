import {
  CheckEligibilityForFullRefundResponse,
  FinanceOrderPayload,
  FinanceOrderResponse,
  RequestRefundPayload,
  RequestRefundResponse,
} from '../../types/models';
import { axiosInstance } from '../api';

export default class OrderService {
  /**
   * This service is use to create b2csubscriptions.
   * @param {FinanceOrderPayload}-package subscription payload
   * @returns {FinanceOrderResponse}- package subscription response
   */
  static createFinanceOrder = async (
    payload: FinanceOrderPayload
  ): Promise<FinanceOrderResponse> => {
    try {
      const response = await axiosInstance.post<FinanceOrderResponse>(
        `/api/Order/createfinanceorder`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (e) {
      console.error('Error in createFinanceOrder', e);
      throw e;
    }
  };

  /**
   * This service is use to get refund.
   * @param {RequestRefundPayload}-refund request payload
   * @returns {RequestRefundResponse}-refund request response
   */
  static refundRequest = async (
    payload: RequestRefundPayload
  ): Promise<RequestRefundResponse> => {
    try {
      const response = await axiosInstance.post<RequestRefundResponse>(
        `api/paymentservice/refund`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (e) {
      console.error('Error in refundRequest', e);
      throw e;
    }
  };

  /**
   * This service is use to check eligibility for full refund.
   * @param {orderItemId}-refund payload
   * @returns {CheckEligibilityForFullRefundResponse}-refund response
   */
  static checkEligibilityForRefund = async (
    orderItemId: number
  ): Promise<CheckEligibilityForFullRefundResponse> => {
    try {
      const response =
        await axiosInstance.get<CheckEligibilityForFullRefundResponse>(
          `/api/PaymentService/checkeligibilityforfullrefund?orderItemId=${orderItemId}`,
          { headers: { credentials: true } }
        );
      return await response.data;
    } catch (error) {
      console.error(`Error in checkEligibilityForRefund`, error);
      throw error;
    }
  };

  /**
   * This service is use to download document.
   * @param {filePath}-document payload
   * @returns {Blob}-document response
   */
  static downloadDocument = async (
    filePath: string,
    containerName: string
  ): Promise<Blob> => {
    try {
      const response = await axiosInstance.get<Blob>(
        `/api/document/getdocument?filePath=${filePath}&containerName=${containerName}`,
        { headers: { credentials: true }, responseType: 'blob' }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in downloadDocument`, error);
      throw error;
    }
  };
}
