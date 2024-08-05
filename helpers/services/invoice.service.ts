import {
  QuotationResponse,
  SaveQuotationPayload,
  SaveQuotationResponse,
} from '../../types/models';
import { axiosInstance } from '../api';
import { Locales, ProductReferenceType } from '../../types/enums';
import { PaymentStatusResponse } from '../../types/models';
import { CommonUtils } from '../utilities';
import { InvoiceStatus } from '../../types/constants';

export default class InvoiceService {
  /**
   * This service is use to save new quotation.
   * @param  {SaveQuotationPayload} [payload] - payload data
   * @returns {Promise<SaveUserSearchResponse>} Returns response object
   */
  static saveQuotation = async (
    payload: SaveQuotationPayload
  ): Promise<SaveQuotationResponse> => {
    try {
      const response = await axiosInstance.post<SaveQuotationResponse>(
        `/api/invoice/quotation`,
        payload,
        {
          headers: { credentials: true },
        }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in InvoiceService:saveQuotation`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch list of vehicle Id which are requested for quotation by user.
   * @returns {Promise<Array<number>>} Returns list of vehicle Ids.
   */
  static fetchListingIdByQuotation = async (): Promise<Array<number>> => {
    try {
      const response = await axiosInstance.get<Array<number>>(
        `/api/invoice/vehicleidsbyquotation`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in InvoiceService:fetchListingIdByQuotation`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch payment status.
   * @param {number} [invoiceId] -invoice Id.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<PaymentStatusResponse>} Returns payment status.
   */
  static getPaymentStatus = async (
    invoiceId: number,
    currentLocale: string = Locales.EN
  ): Promise<PaymentStatusResponse> => {
    try {
      const response = await axiosInstance.get<PaymentStatusResponse>(
        `/api/Invoice/${invoiceId}?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in GlobalService:getPaymentStatus`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch list of quotations which are requested for quotation by user.
   * @returns {Promise<QuotationResponse>} Returns list of quotations.
   */
  static getQuotations = async (
    currentLocale: string = Locales.EN
  ): Promise<QuotationResponse> => {
    try {
      const response = await axiosInstance.get<QuotationResponse>(
        `/api/invoice/quotationsbyuserid?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in InvoiceService:getQuotations`, error);
      throw error;
    }
  };

  /**
   * This service is use to fetch payment status.
   * @param {number} [invoiceId] -invoice Id.
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<PaymentStatusResponse>} Returns payment status.
   */
  static getPaymentDetails = async (
    invoiceId: number,
    currentLocale: string = Locales.EN
  ): Promise<PaymentStatusResponse | null> => {
    function delay(ms: any) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    try {
      let responseData: PaymentStatusResponse | null = null;
      //for (let i = 0; i < 5; i++) {
      const response = await axiosInstance.get<PaymentStatusResponse | null>(
        `/api/Invoice/${invoiceId}?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      responseData = response.data;
      // if (response.data?.Invoice.InvoiceStatusKey === InvoiceStatus.PAID) {
      //   break;
      // }
      // await delay(2000);
      // }
      return responseData;
    } catch (error) {
      console.error(`Error in GlobalService:getPaymentStatus`, error);
      throw error;
    }
  };
}
