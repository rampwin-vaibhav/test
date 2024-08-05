export const getCurrentPageCanonicalUrl = (url: string) => {
  const urlObj = new URL(url, window.location.origin);
  // urlObj.searchParams.delete('filters');
  urlObj.searchParams.delete('mode');
  return `${urlObj.href}`;
};
export const getCanonicalUrlServerSide = (req: any) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const host = req.headers.host;
  let url = `${protocol}://${host}${req.url}`;

  if (url.includes('/_next/data/')) {
    url = url.replace(/\/_next\/data\/[^\/]+/, '');
  }

  const urlObj = new URL(url);
  urlObj.searchParams.delete('mode');
  return urlObj.href;
};
