import { Locales } from '../../types/enums';
import {
  GenerateOTPPayload,
  GenerateOTPResponse,
  SendVerificationCodePayload,
  SendVerificationCodeResponse,
  UserTitleResponse,
  ValidateOTPPayload,
  ValidateOTPResponse,
  VerifyEmailOTPPayload,
  VerifyEmailOTPResponse,
} from '../../types/models';
import { axiosInstance } from '../api';
import { CommonUtils } from '../utilities';

export default class OtpService {
  /**
   * This service is use to generate otp for phone verification.
   * @returns {GenerateOTPResponse} Return generate OTP response.
   */
  static generateOTP = async (
    payload: GenerateOTPPayload
  ): Promise<GenerateOTPResponse> => {
    try {
      const response = await axiosInstance.post<GenerateOTPResponse>(
        `/api/profile/registration/sendotp`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:generateOTP`, error);
      throw error;
    }
  };

  /**
   * This service is use to validateOTP otp for phone verification.
   * @returns {ValidateOTPResponse} Return True/False.
   */
  static validateOTP = async (
    payload: ValidateOTPPayload
  ): Promise<ValidateOTPResponse> => {
    try {
      const response = await axiosInstance.post<ValidateOTPResponse>(
        `/api/profile/registration/verifyotp`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:validateOTP`, error);
      throw error;
    }
  };

  /**
   * This service is use to get Direct Line Token.
   * @returns {Promise<Array<UserTitleResponse>>} Returns user titles.
   */
  static getUserTitle = async (
    currentLocale: string = Locales.EN
  ): Promise<Array<UserTitleResponse>> => {
    try {
      const response = await axiosInstance.get<Array<UserTitleResponse>>(
        `/api/UserMasterData/getusertitle?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in GlobalService:getUserTitle`, error);
      throw error;
    }
  };
  /*
   * This service is use to generate otp for email verification.
   * @returns {SendVerificationCodeResponse} Return generate OTP response.
   */
  static sendVerificationCode = async (
    payload: SendVerificationCodePayload
  ): Promise<SendVerificationCodeResponse> => {
    try {
      const response = await axiosInstance.post<SendVerificationCodeResponse>(
        `/api/profile/sendverificationcode`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:sendVerificationCode`, error);
      throw error;
    }
  };

  /**
   * This service is use to validate email otp for email verification.
   * @returns {VerifyEmailOTPResponse}
   */
  static verifyEmailOTP = async (
    payload: VerifyEmailOTPPayload
  ): Promise<VerifyEmailOTPResponse> => {
    try {
      const response = await axiosInstance.post<VerifyEmailOTPResponse>(
        `/api/Profile/verifyemail`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:verifyEmailOTP`, error);
      throw error;
    }
  };
}
