import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from './error-handler';

function apiHandler(handler: {
  [key: string]: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
}) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const method = req.method!.toLowerCase();

    // check handler supports HTTP method
    if (!handler[method]) {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
      // route handler
      await handler[method](req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}

export { apiHandler };
