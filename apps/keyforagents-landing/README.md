# KeyForAgents Landing Page

A unified Next.js landing page for all KeyForAgents domains.

## Domains Served
- keyforagents.com
- keyforagents.technology
- notion.locker

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Stripe JS SDK

## Getting Started

### Development

cd apps/keyforagents-landing
npm install
npm run dev

### Production

npm run build
npm start

## Environment Variables

Create .env.local in the app directory:

NEXT_PUBLIC_SITE_URL=https://keyforagents.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_key

## Deployment

Configure vercel.json at repo root to point to this app.

## Project Structure

apps/keyforagents-landing/
- app/           # Pages and routes
- components/    # Reusable components
- lib/           # Utilities and constants
- middleware.ts  # Domain-based routing

## Customization

Edit lib/constants.ts to update:
- Domain configurations
- Pricing tiers
- Features for each domain
