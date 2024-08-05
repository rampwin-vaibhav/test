import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { AuthService } from '../../../helpers/services';
import { apiHandler } from '../../../helpers/server/api-handler';
import { AuthTokenResponse } from '../../../types/models';

async function getWebTokenWithRefreshToken(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const refreshToken = getCookie('refresh-token', { res, req });
  if (refreshToken) {
    // send request and get user application token and user details
    const response = (await AuthService.getApplicationTokenByRefreshTokenOTP(
      refreshToken.toString()
    )) as any;

    if (response.status === 401) {
      // clear user session
      deleteCookie('token', { req, res });
      deleteCookie('refresh-token', { req, res });
      deleteCookie('login-with-language', { req, res });

      // return unauthorized response
      res.status(401).json(response);
    } else {
      const tokenData = response as AuthTokenResponse;
      // set http cookies to manage user session
      setCookie('token', tokenData.Token, {
        req,
        res,
        path: '/',
        sameSite: 'lax',
        maxAge: 31536000,
      });
      setCookie('login-with-language', tokenData.LanguageForLogin, {
        req,
        res,
        path: '/',
        sameSite: 'lax',
        maxAge: 31536000,
      });

      // return auth token response
      res.status(200).json(tokenData);
    }
  } else {
    // clear user session
    deleteCookie('token', { req, res });
    deleteCookie('refresh-token', { req, res });
    deleteCookie('login-with-language', { req, res });

    // return unauthorized response
    res.status(401).json(null);
  }
}

export default apiHandler({
  post: getWebTokenWithRefreshToken,
});
