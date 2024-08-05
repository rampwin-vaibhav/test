import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from 'cookies-next';
import { apiHandler } from '../../../helpers/server/api-handler';

async function logoutUser(req: NextApiRequest, res: NextApiResponse) {
  deleteCookie('token', { res, req });
  deleteCookie('refresh-token', { res, req });
  deleteCookie('login-with-language', { req, res });

  // return auth token response
  res.status(200).json({});
}

export default apiHandler({
  post: logoutUser,
});
