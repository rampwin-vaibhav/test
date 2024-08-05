import {
  ChangeEmailPayload,
  ChangeEmailResponse,
  UserProfileStatus,
  ProfileData,
  UpdateProfilePayload,
  UpdateProfileResponse,
  DeactivateProfileResponse,
  ActivateProfileResponse,
  GenerateAbsherCodeResponse,
  GenerateAbsherCodePayload,
  VerifyAbsherCodePayload,
  VerifyAbsherCodeResponse,
  VerifyYakeenPayload,
  VerifyYakeenResponse,
  VerifyEmailResponse,
  VerifyEmailPayload,
  ValidateEmailResponse,
  ValidateEmailPayload,
  GetUserDetailsResponse,
  CreateUserAccountResponse,
  CreateUserAccountPayload,
  ChangeMobileResponse,
  GetUserTrackingResponse,
  VerifyOTPResponse,
  VerifyOTPPayload,
  SendOTPResponse,
  SendOTPPayload,
  oldMobileOTPPayload,
} from '../../types/models';
import { axiosInstance } from '../api';
import { Locales } from '../../types/enums';
import { CommonUtils } from '../utilities';
import MessageBox from '../../components/common/MessageBox';
import { LabelConstants } from '../../types/i18n.labels';
import { i18n } from 'next-i18next';

export default class ProfileService {
  /**
   * This service is use to fetch user data
   * @param {string} [currentLocale="en"] - i18n locale. `@default - "en"`
   * @returns {Promise<ProfileData>}
   */
  static fetchUserData = async (
    currentLocale: string = Locales.EN
  ): Promise<ProfileData> => {
    try {
      const response = await axiosInstance.get<ProfileData>(
        `/api/Profile/user?languageId=${CommonUtils.getLanguageId(
          currentLocale
        )}`,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ProfileService:fetchUserData`, error);
      throw error;
    }
  };

  /**
   * This service is use to update profile data.
   * @param {UpdateProfilePayload} payload - update params
   * @returns {Promise<UpdateProfileResponse>} Returns response.
   */
  static updateProfileData = async (
    payload: UpdateProfilePayload
  ): Promise<UpdateProfileResponse> => {
    const response = await axiosInstance.put<UpdateProfileResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Profile/user`,
      payload,
      { headers: { credentials: true } }
    );
    return response.data;
  };

  /**
   * This service is use to get auth code url
   * @param {string} pCode - code.
   * @param {boolean} IsLocal - isLocal.
   * @returns {Promise<string>}
   */
  static getAuthUrlCode = async (
    pCode: string,
    IsLocal: boolean,
    lang: number
  ): Promise<string> => {
    try {
      const response = await axiosInstance.get<string>(
        `api/WebAuth/authCodeUrl?pCode=${pCode}&IsLocal=${IsLocal}&lang=${lang}`,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ProfileService:getAuthUrlCode`, error);
      throw error;
    }
  };

  /**
   * This service is use to change email.
   * @param {ChangeEmailPayload} payload - change email payload
   * @returns {Promise<ChangeEmailResponse>} Returns response.
   */
  static changeEmail = async (
    payload: ChangeEmailPayload
  ): Promise<ChangeEmailResponse> => {
    const response = await axiosInstance.post<ChangeEmailResponse>(
      `/api/profile/sendverificationlink`,
      payload
    );
    return response.data;
  };

  /**
   * This service is use to get user profile status
   * @param {string} identifierKey - identifierKey.
   * @returns {Promise<UserProfileStatus>}
   */
  static fetchUserProfileStatus = async (
    identifierKey: string
  ): Promise<UserProfileStatus> => {
    try {
      const response = await axiosInstance.get<UserProfileStatus>(
        `api/profile/validateuserprofile?identifierKey=${identifierKey}`,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ProfileService:getUserProfileStatus`, error);
      throw error;
    }
  };

  /**
   * This service is use to deactivate user profile status

   * @returns {Promise<DeactivateProfileResponse>}
   */
  static deactivateUserProfile =
    async (): Promise<DeactivateProfileResponse> => {
      try {
        const response = await axiosInstance.get<DeactivateProfileResponse>(
          `api/profile/deactivateaccount?accountStatus=false`,
          { headers: { credentials: true } }
        );
        return response.data;
      } catch (error) {
        console.error(`Error in ProfileService:deactivateUserProfile`, error);
        throw error;
      }
    };

  /**
   * This service is use to activate user profile status
   * @returns {Promise<ActivateProfileResponse>}
   */
  static activateUserProfile = async (): Promise<ActivateProfileResponse> => {
    try {
      const response = await axiosInstance.get<ActivateProfileResponse>(
        `api/profile/activateaccount?accountStatus=true`,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ProfileService:activateUserProfile`, error);
      throw error;
    }
  };

  /**
   * This service is use to generate absher verification code.
   * @param {GenerateAbsherCodePayload} payload - generate absher verification code payload
   * @returns {Promise<GenerateAbsherCodeResponse>} Returns response.
   */
  static generateAbsherVerificationCode = async (
    payload: GenerateAbsherCodePayload
  ): Promise<GenerateAbsherCodeResponse> => {
    const response = await axiosInstance.post<GenerateAbsherCodeResponse>(
      `/api/profile/generateabsherverificationCode`,
      payload
    );
    return response.data;
  };

  /**
   * This service is use to verify absher code.
   * @param {VerifyAbsherCodePayload} payload - verify absher code payload
   * @returns {Promise<VerifyAbsherCodeResponse>} Returns response.
   */
  static verifyAbsherVerificationCode = async (
    payload: VerifyAbsherCodePayload
  ): Promise<VerifyAbsherCodeResponse> => {
    try {
      const response = await axiosInstance.post<VerifyAbsherCodeResponse>(
        `/api/profile/verifyAbsherVerificationCode`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error(
        `Error in ProfileService:verifyAbsherVerificationCode`,
        error
      );
      await MessageBox.open({
        content: `${i18n?.t(LabelConstants.ABSHER_VERIFICATION_FAILED)}`,
      });
      throw error;
    }
  };

  /**
   * This service is use to verify yakeen information.
   * @param {VerifyYakeenPayload} payload - verify yakeen information payload
   * @returns {Promise<VerifyYakeenResponse>} Returns response.
   */
  static verifyYakeenInformation = async (
    payload: VerifyYakeenPayload
  ): Promise<VerifyYakeenResponse> => {
    try {
      const response = await axiosInstance.post<VerifyYakeenResponse>(
        `/api/profile/verifyyakeeninformation`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ProfileService:verifyYakeenInformation`, error);
      await MessageBox.open({
        content: `${i18n?.t(LabelConstants.YAKEEN_FAILED_MESSAGE)}`,
      });
      throw error;
    }
  };

  /**
   * This service is use to delete users profile.
   * @returns {Promise<boolean>} Returns True/False.
   */

  static deleteAccount = async (): Promise<boolean> => {
    try {
      const response = await axiosInstance.delete<boolean>(
        `/api/Profile/deleteuser`,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:deleteAccount`, error);
      throw error;
    }
  };

  /**
   * This service is use to verify email.
   * @returns {Promise<VerifyEmailResponse>} Returns response.
   */

  static verifyAndSendVerificationLink = async (
    payload: VerifyEmailPayload
  ): Promise<VerifyEmailResponse> => {
    try {
      const response = await axiosInstance.post<VerifyEmailResponse>(
        `/api/profile/signupwithemail`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in ProfileService:verifyAndSendVerificationLink`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to validate email.
   * @returns {Promise<ValidateEmailResponse>} Returns response.
   */

  static validateEmailVerificationLink = async (
    payload: ValidateEmailPayload
  ): Promise<ValidateEmailResponse> => {
    try {
      const response = await axiosInstance.post<ValidateEmailResponse>(
        `/api/profile/verifyemaillink`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in ProfileService:validateEmailVerificationLink`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to get user details.
   * @returns {Promise<GetUserDetailsResponse>}
   */
  static getUserDetails = async (
    registrationId: number
  ): Promise<GetUserDetailsResponse> => {
    try {
      const response = await axiosInstance.get<GetUserDetailsResponse>(
        `/api/Profile/registration/${registrationId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ProfileService:getUserDetails`, error);
      throw error;
    }
  };

  /**
   * This service is use to create user account.
   * @returns {Promise<CreateUserAccountResponse>} Returns response.
   */

  static createCustomerAccount = async (
    payload: CreateUserAccountPayload
  ): Promise<CreateUserAccountResponse> => {
    try {
      const response = await axiosInstance.post<CreateUserAccountResponse>(
        `/api/Profile/createCustomerAccount`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:createCustomerAccount`, error);
      throw error;
    }
  };

  /**
   * This service is use to change Mobile.
   * @returns {Promise<ChangeMobileResponse>} Returns response.
   */

  static changeMobile = async (): Promise<ChangeMobileResponse> => {
    try {
      const response = await axiosInstance.post<ChangeMobileResponse>(
        `/api/Profile/changemobile`,
        null,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:changeMobile`, error);
      throw error;
    }
  };

  /**
   * This service is use to send verification code to old mobile.
   * @returns {Promise<SendOTPResponse>} Returns response.
   */

  static sendOldMobileVerificationCode = async (
    payload: oldMobileOTPPayload
  ): Promise<SendOTPResponse> => {
    try {
      const response = await axiosInstance.post<SendOTPResponse>(
        `/api/profile/changemobile/sendotp`,
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
   * This service is use to send verification code to new mobile.
   * @returns {Promise<SendOTPResponse>} Returns response.
   */

  static sendNewMobileVerificationCode = async (
    payload: SendOTPPayload
  ): Promise<SendOTPResponse> => {
    try {
      const response = await axiosInstance.post<SendOTPResponse>(
        `/api/Profile/newmobile/sendotp`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(
        `Error in ProfileService:sendNewMobileVerificationCode`,
        error
      );
      throw error;
    }
  };

  /**
   * This service is use to verify otp for old mobile.
   * @returns {Promise<VerifyOTPResponse>} Returns response.
   */

  static verifyOldMobileNumber = async (
    payload: VerifyOTPPayload
  ): Promise<VerifyOTPResponse> => {
    try {
      const response = await axiosInstance.post<VerifyOTPResponse>(
        `/api/Profile/changemobile/verifyotp`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:verifyOldMobileNumber`, error);
      throw error;
    }
  };

  /**
   * This service is use to verify otp for new mobile.
   * @returns {Promise<VerifyOTPResponse>} Returns response.
   */

  static verifyNewMobileNumber = async (
    payload: VerifyOTPPayload
  ): Promise<VerifyOTPResponse> => {
    try {
      const response = await axiosInstance.post<VerifyOTPResponse>(
        `/api/Profile/newmobile/verifyotp`,
        payload,
        { headers: { credentials: true } }
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in ProfileService:verifyNewMobileNumber`, error);
      throw error;
    }
  };

  /**
   * This service is use to get user tracking details.
   * @returns {Promise<GetUserTrackingResponse>}
   */
  static getUserTrackingDetails = async (
    changePhoneNumberTrackingId: number
  ): Promise<GetUserTrackingResponse> => {
    try {
      const response = await axiosInstance.get<GetUserTrackingResponse>(
        `/api/Profile/changeNumberTrackingDetails?changePhoneNumberTrackingId=${changePhoneNumberTrackingId}`,
        { headers: { credentials: true } }
      );
      return response.data;
    } catch (error) {
      console.error(`Error in ProfileService:getUserTrackingDetails`, error);
      throw error;
    }
  };
}
