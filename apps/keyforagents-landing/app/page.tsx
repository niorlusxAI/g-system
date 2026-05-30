import { redirect } from 'next/navigation';
import { DOMAIN_CONFIG, DOMAINS } from '@/lib/constants';
import { getDomainConfig } from '@/lib/utils';
import HomePage from './(main)/page';

// This is the fallback page that redirects or renders based on domain
// In production, use middleware for domain-based routing

export default function Home() {
  // For static rendering, show the main domain
  return <HomePage />;
}
