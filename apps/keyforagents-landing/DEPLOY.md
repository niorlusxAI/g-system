KeyForAgents Landing Page - Deployment Checklist

REQUIREMENTS:
- Node.js 18+
- npm
- Vercel account
- Stripe account
- Domain access

STEP 1: Install
cd apps/keyforagents-landing
npm install

STEP 2: Configure Environment
cp .env.example .env.local
Edit .env.local with your Stripe keys and site URL

STEP 3: Test Locally
npm run dev:local
Open http://localhost:3000

STEP 4: Deploy to Vercel
Option A - CLI:
vercel --prod

Option B - Dashboard:
1. Import repo in Vercel
2. Set root directory: apps/keyforagents-landing
3. Add environment variables
4. Deploy

STEP 5: Configure DNS
Add all domains in Vercel project settings:
- keyforagents.com
- www.keyforagents.com
- keyforagents.technology
- www.keyforagents.technology
- notion.locker
- www.notion.locker

STEP 6: Set Up Email (Optional)
Update app/api/capture-email/route.ts with your email service

STEP 7: Set Up Analytics (Optional)
Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env.local

STEP 8: Go Live
Switch Stripe to live mode
Update keys in .env.local
Redeploy

VERIFY:
- All domains load correctly
- Each domain shows correct content
- Stripe checkout works (test with 4242 4242 4242 4242)
- Email signup works
- Mobile responsive

STRIPE PRICE IDs:
Essential: price_1TcgsgP3QBBmvRlDghIckzEu
Professional: price_1TcgshP3QBBmvRlD9GY1OBbZ
Enterprise: price_1TcgsiP3QBBmvRlDgRIVIxEG
