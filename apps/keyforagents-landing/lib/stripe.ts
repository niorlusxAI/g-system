import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

export const STRIPE_PRICE_IDS = {
  essential: process.env.NEXT_PUBLIC_STRIPE_PRICE_ESSENTIAL || '',
  professional: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || '',
  enterprise: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || '',
};
