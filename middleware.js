import { next, rewrite } from '@vercel/edge';

export const config = {
  matcher: ['/', '/about.html', '/contact.html', '/privacy.html', '/terms.html'],
};

const UM_IP_PREFIXES = [
  '137.120.',
  '145.94.',
];

const MAASTRICHT_POSTAL_PREFIXES = ['6211', '6212', '6213', '6214', '6215', '6216', '6217', '6218', '6219', '6221', '6222', '6223', '6224', '6225', '6226', '6227', '6228', '6229'];

export default function middleware(request) {
  const url = new URL(request.url);

  if (url.searchParams.get('preview') === '1') {
    return next();
  }

  if (url.searchParams.get('maintenance') === '1') {
    return rewrite(new URL('/maintenance.html', request.url));
  }

  const city = decodeURIComponent(request.headers.get('x-vercel-ip-city') || '').toLowerCase();
  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const region = (request.headers.get('x-vercel-ip-country-region') || '').toLowerCase();
  const postal = request.headers.get('x-vercel-ip-postal-code') || '';
  const ip = (request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || '').split(',')[0].trim();

  const isUMNetwork = UM_IP_PREFIXES.some((prefix) => ip.startsWith(prefix));
  const isMaastrichtCity = city.includes('maastricht');
  const isLimburgRegion = country === 'NL' && (region === 'li' || region.includes('limburg'));
  const isMaastrichtPostal = country === 'NL' && MAASTRICHT_POSTAL_PREFIXES.some((p) => postal.startsWith(p));

  if (isUMNetwork || isMaastrichtCity || isLimburgRegion || isMaastrichtPostal) {
    const response = rewrite(new URL('/maintenance.html', request.url));
    response.headers.set('x-coast-geo-block', '1');
    response.headers.set('x-coast-match', JSON.stringify({ isUMNetwork, isMaastrichtCity, isLimburgRegion, isMaastrichtPostal }));
    return response;
  }

  return next();
}
