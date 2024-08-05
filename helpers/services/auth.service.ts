import axios, { AxiosError } from 'axios';
import { ApplicationKey } from '../../types/constants';
import { Locales, TokenGrantType } from '../../types/enums';
import {
  AuthTokenResponse,
  LoginOTPResponse,
  AuthTokenWithOtpResponse,
} from '../../types/models';
import { CommonUtils, SessionUtils } from '../utilities';
import { axiosInstance } from '../api';

export default class AuthService {
  /**
   * This service is use to fetch user application token.
   * @param {string} code - Azure B2C Auth Code
   * @returns {Promise<AuthTokenResponse>} Returns user application token and user details.
   */
  static getApplicationToken = async (
    code?: string,
    currentLocale: Locales = Locales.EN
  ): Promise<
    AuthTokenResponse | { status: number | undefined; data: unknown }
  > => {
    try {
      const response = await axios.post<AuthTokenResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/WebAuth/token`,
        {
          code,
          GrantType: TokenGrantType.GrantType,
          Lang: CommonUtils.getLanguageId(currentLocale),
          ApplicationKey: ApplicationKey,
          IsLoginWithEmail: true,
          IsLocal: process.env.NEXT_PUBLIC_IS_LOCAL === 'true',
        }
      );
      return await response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return {
          status: (error as AxiosError)?.response?.status,
          data: (error as AxiosError)?.response?.data,
        };
      }
      const err = error as AxiosError;
      if (err.isAxiosError && err.response) {
        console.error(
          `Error in AuthService:getApplicationToken Response Status: ${err.response.status} Response Data: ${err.response.data}`
        );
      }
      throw error;
    }
  };

  /**
   * This service is use to fetch user application refresh token.
   * @param {string} refresh_token - Application Refresh Token
   * @returns {Promise<AuthTokenResponse>} Returns user application token and user details.
   */
  static getApplicationTokenByRefreshToken = async (
    refresh_token: string,
    lang: number
  ): Promise<
    AuthTokenResponse | { status: number | undefined; data: unknown }
  > => {
    try {
      const response = await axios.post<AuthTokenResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/WebAuth/token`,
        {
          Code: refresh_token,
          GrantType: TokenGrantType.RefreshTokenGrantType,
          IsLocal: process.env.NEXT_PUBLIC_IS_LOCAL === 'true',
          IsDMSTokenRequestor: false,
          IsAADSignUpSignIn: false,
          ApplicationKey: ApplicationKey,
          IsLoginWithEmail: true,
          Lang: lang,
        }
      );
      return await response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return {
          status: (error as AxiosError)?.response?.status,
          data: (error as AxiosError)?.response?.data,
        };
      }
      const err = error as AxiosError;
      if (err.isAxiosError && err.response) {
        console.error(
          `Error in AuthService:getApplicationTokenByRefreshToken Response Status: ${err.response.status} Response Data: ${err.response.data}`
        );
      }
      throw error;
    }
  };

  /**
   * This service is use to call application backend API to get user application token and create user session.
   * @param {string} code - Azure B2C Auth Code
   * @returns {Promise<AuthTokenResponse>} Returns user application token and user details.
   */
  static getAuthToken = async (
    code: string,
    currentLocale: string = Locales.EN
  ): Promise<AuthTokenResponse> => {
    try {
      const response = await axios.post(`/api/auth/token`, {
        code,
        currentLocale,
      });
      return await response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return (error as AxiosError)?.response?.data as any;
      }
      console.error(`Error in AuthService:getAuthToken`, error);
      throw error;
    }
  };

  /**
   * This service is use to call application backend API to get user application token with its refresh token and create new user session.
   * @returns {Promise<AuthTokenResponse>} Returns user application token and user details.
   */
  static getAuthTokenByRefreshToken = async (): Promise<AuthTokenResponse> => {
    try {
      const response = await axios.post(`/api/auth/refresh`);
      return await response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        const redirectURL = SessionUtils.getRedirectUrl();
        await AuthService.logout();
        SessionUtils.clearSession();
        if (redirectURL) {
          window.location.href = redirectURL;
        }

        return (error as AxiosError)?.response?.data as any;
      }
      console.error(`Error in AuthService:getAuthTokenByRefreshToken`, error);
      throw error;
    }
  };

  /**
   * This service is use to get URL of Azure B2C page to Login or Signup.
   * @returns {string} Return Azure B2C URL.
   */
  static fetchSignInUrl = async (lang: number): Promise<string> => {
    try {
      const response = await axios.get<string>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/WebAuth/authCodeUrl?pCode=SIGNUPSIGN&IsLocal=${process.env.NEXT_PUBLIC_IS_LOCAL}&lang=${lang}`
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in AuthService:fetchSignInUrl`, error);
      throw error;
    }
  };

  /**
   * This service is use to clear user session.
   */
  static logout = async () => {
    try {
      const response = await axios.post(`/api/auth/logout`);
      return await response.data;
    } catch (error) {
      console.error(`Error in AuthService:logout`, error);
      throw error;
    }
  };

  /**
   * This service is use to call application backend API to get user application token and create user session.
   * @param {string} code - Azure B2C Auth Code
   * @returns {Promise<AuthTokenWithOtpResponse>} Returns user application token and user details.
   */
  static getAuthTokenWithOTP = async (
    MobileNumber: string,
    SessionKey: string,
    OTP: string
  ): Promise<AuthTokenWithOtpResponse> => {
    try {
      const response = await axios.post(`/api/auth/login-with-otp`, {
        MobileNumber,
        SessionKey,
        OTP,
      });
      return await response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return (error as AxiosError)?.response?.data as any;
      }
      console.error(`Error in AuthService:getAuthTokenWithOTP`, error);
      throw error;
    }
  };

  /**
   * This service is use to send otp.
   * @returns {LoginOTPResponse} return the response
   */
  static sendLoginOTP = async (payload: {
    MobileNumber: string;
  }): Promise<LoginOTPResponse> => {
    try {
      const response = await axios.post<LoginOTPResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/webauth/token/sendotp`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in AuthService:sendLoginOTP`, error);
      throw error;
    }
  };

  /**
   * This service is use to verify login otp.
   * @returns {AuthTokenWithOtpResponse} return the response
   */
  static verifyLoginOTP = async (payload: {
    MobileNumber: string;
    SessionKey: string;
    OTP: string;
  }): Promise<AuthTokenWithOtpResponse> => {
    try {
      const response = await axios.post<AuthTokenWithOtpResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/webauth/token/verifyotp`,
        payload
      );
      return await response.data;
    } catch (error) {
      console.error(`Error in AuthService:verifyLoginOTP`, error);
      throw error;
    }
  };

  /**
   * This service is use to clear user session.
   */
  static signOut = async (logOutURL: string | null) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${logOutURL}`,
        {},
        {
          headers: {
            credentials: true,
          },
        }
      );
      SessionUtils.clearSession();
      return await response.data;
    } catch (error) {
      console.error(`Error in AuthService:signOut`, error);
      throw error;
    }
  };

  /**
   * This service is use to call application backend API to get user application token with its refresh token and create new user session.
   * @returns {Promise<AuthTokenResponse>} Returns user application token and user details.
   */
  static getAuthTokenByRefreshTokenOTP =
    async (): Promise<AuthTokenResponse> => {
      try {
        const response = await axios.post(`/api/auth/refresh-with-otp`);
        return await response.data;
      } catch (error) {
        if ((error as AxiosError)?.response?.status === 401) {
          const logOutUrl = SessionUtils.getRedirectUrl();
          await AuthService.signOut(logOutUrl);
          await AuthService.logout();
          if (logOutUrl) {
            window.location.href = '/sign-in';
          }

          return (error as AxiosError)?.response?.data as any;
        }
        console.error(`Error in AuthService:getAuthTokenByRefreshToken`, error);
        throw error;
      }
    };

  /**
   * This service is use to fetch user application refresh token.
   * @returns {AuthTokenWithOtpResponse} return the response
   */
  static getApplicationTokenByRefreshTokenOTP = async (
    RefreshToken: string
  ): Promise<
    AuthTokenWithOtpResponse | { status: number | undefined; data: unknown }
  > => {
    try {
      const response = await axios.post<AuthTokenWithOtpResponse>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/webauth/refresh-token`,
        { RefreshToken }
      );
      return await response.data;
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return {
          status: (error as AxiosError)?.response?.status,
          data: (error as AxiosError)?.response?.data,
        };
      }
      const err = error as AxiosError;
      if (err.isAxiosError && err.response) {
        console.error(
          `Error in AuthService:getApplicationTokenByRefreshTokenOTP Response Status: ${err.response.status} Response Data: ${err.response.data}`
        );
      }
      throw error;
    }
  };
}
