import { getCookie, removeCookies } from 'cookies-next';
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { Privileges } from '../../types/enums';
import {
  AuthTokenResponse,
  AuthTokenWithOtpResponse,
} from '../../types/models';
import { UserPreference } from '../../types/constants';

export class SessionUtils {
  /**
   * This utility method use to fetch user application token/auth Bearer token from current session.
   * @returns {string|undefined} This return access token for API request.
   */
  static getAccessToken = (): string | undefined => {
    const value = getCookie('token');
    if (value) {
      return value.toString();
    }
    return;
  };

  /**
   * This utility method is use to check whether user session is active or not.
   * It is checking only current user token. It is not checking token validity.
   * @returns {boolean}
   */
  static isValidSession = (): boolean => {
    const data = localStorage.getItem('session');
    if (data) {
      const value = getCookie('token');
      return value ? true : false;
    }
    return false;
  };

  /**
   * This utility method is use to check whether user session is active or not.
   * It is checking only current user token. It is not checking token validity.
   * @returns {boolean}
   */
  static isValidServerSession = (
    req: IncomingMessage & {
      cookies: NextApiRequestCookies;
    },
    res: ServerResponse
  ): boolean => {
    const value = getCookie('token', { res, req });
    return value ? true : false;
  };

  /**
   * This utility method is use to get user data from current session.
   * @returns {AuthTokenResponse|undefined}
   */
  static getUserDetails = (): AuthTokenResponse | undefined => {
    if (this.isValidSession()) {
      const data = localStorage.getItem('session');
      const result: AuthTokenResponse = JSON.parse(data!);
      return result;
    }
    return;
  };

  /**
   * This utility method is use to store user data to localStorage.
   */
  static setUserDetails = (
    user: AuthTokenResponse | AuthTokenWithOtpResponse
  ) => {
    localStorage.setItem('session', JSON.stringify(user));
  };

  /**
   * This utility method is use clear session.
   */
  static clearSession = () => {
    removeCookies('token');
    removeCookies('refresh-token');
    SessionUtils.getLocalKeys().forEach((x) => {
      if (!x.includes(UserPreference)) {
        localStorage.removeItem(x);
      }
    });
  };

  static getLocalKeys = () => {
    return Object.entries(localStorage).map((x) => x[0]);
  };

  /**
   * This utility method is use to check user privilege
   */
  static hasPrivileges = (privilege: Privileges): boolean => {
    const user = this.getUserDetails();
    if (user && user.UserPrivileges) {
      return user.UserPrivileges.includes(privilege);
    }
    return false;
  };

  /**
   * This utility method is use to fetch logout url.
   */
  static getRedirectUrl = () => {
    const user = localStorage.getItem('session') || '{}';
    const tokenData = JSON.parse(user) as AuthTokenResponse;
    return tokenData.LogoutUrl || null;
  };

  /**
   * This utility method is use to fetch logout url.
   */
  static getLogoutURL = () => {
    return process.env.NEXT_PUBLIC_LOG_OUT_URL || '';
  };
}
