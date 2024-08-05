import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'cookies-next';
import { AuthService } from '../../../helpers/services';
import { apiHandler } from '../../../helpers/server/api-handler';
import { AuthTokenWithOtpResponse } from '../../../types/models';

async function getTokenOtp(req: NextApiRequest, res: NextApiResponse) {
  // read azure b2c authorization code
  const {
    MobileNumber,
    SessionKey,
    OTP,
  }: { MobileNumber: string; SessionKey: string; OTP: string } = req.body;

  // send request and get user application token and user details
  const response = (await AuthService.verifyLoginOTP({
    MobileNumber,
    SessionKey,
    OTP,
  })) as any;

  if (response.status === 401) {
    // return unauthorized response
    res.status(401).json(response);
  } else {
    const tokenData = response as AuthTokenWithOtpResponse;

    // set http cookies to manage user session
    setCookie('token', tokenData.Token, {
      req,
      res,
      path: '/',
      sameSite: 'lax',
      maxAge: 31536000,
    });
    setCookie('refresh-token', tokenData.RefreshToken, {
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
}

export default apiHandler({
  post: getTokenOtp,
});
