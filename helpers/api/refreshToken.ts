import mem from 'mem';
import { AuthTokenResponse } from '../../types/models';
import { AuthService } from '../services';

/**
 * maxAge in Milliseconds.
 * @type {const}
 * */
const maxAge: number = 10000;

/**
 * This function is use to fetch new application token using refresh token.
 * We are using it with axios interceptor with memoized for 10000 Milliseconds to avoid multiple request.
 * @returns {Promise<AuthTokenResponse>} Returns user application token and user details.
 */
const refreshTokenFn = async (): Promise<AuthTokenResponse> => {
  try {
    const response = await AuthService.getAuthTokenByRefreshToken();
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * memoized refresh token method for 10000 Milliseconds.
 */
export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
