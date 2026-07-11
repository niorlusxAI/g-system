import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getDomainConfig, isValidDomain } from '@/lib/utils';

// Domain to route mapping
const DOMAIN_ROUTES: Record<string, string> = {
  'keyforagents.com': '/(keyforagents.com)',
  'www.keyforagents.com': '/(keyforagents.com)',
  'keyforagents.technology': '/(keyforagents.technology)',
  'www.keyforagents.technology': '/(keyforagents.technology)',
  'notion.locker': '/(notion.locker)',
  'www.notion.locker': '/(notion.locker)',
};

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const domain = hostname.split(':')[0].toLowerCase();

  // Check if this is a valid domain we handle
  if (isValidDomain(domain)) {
    // Get the route for this domain
    const route = DOMAIN_ROUTES[domain];
    
    if (route && request.nextUrl.pathname === '/') {
      // Rewrite to the domain-specific page
      return NextResponse.rewrite(new URL(route, request.url));
    }
  }

  // For all other cases, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
