import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Trigger revalidation
      if (req.query.path) {
        await res.revalidate(req.query.path as string);
      } else {
        const paths = getPaths();
        for (const path of paths) {
          await res.revalidate(path);
        }
      }

      return res.json({ revalidated: true });
    } catch (error) {
      return res.status(500).json({ message: 'Error revalidating', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

const getPaths = () => {
  return [
    '/',
    '/info/about-us',
    '/info/contact-us',
    '/info/faq',
    '/info/privacy-policy',
    '/info/terms-and-conditions',
    '/newcars/new',
    '/newcars/outlet/intro',
    '/mycar-value',
    '/support',
    '/outlet-intro',
    '/vehicle-wizard',
  ];
};
