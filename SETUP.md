# SUPER AI POWERHOUSE - COMPLETE SETUP GUIDE

Last Updated: May 31, 2026
Status: All infrastructure deployed and ready
Estimated Setup Time: 5-10 minutes

## OVERVIEW

You now have a fully integrated AI powerhouse with Cloudflare, Stripe, and GitHub automation.

## QUICK START (5 Minutes)

### Step 1: Add GitHub Secrets

Go to: https://github.com/niorlusxAI/g-system/settings/secrets/actions

Add these 6 required secrets:

1. CLOUDFLARE_API_TOKEN - From Cloudflare Dashboard > My Profile > API Tokens
2. CLOUDFLARE_ACCOUNT_ID - d99b4332a5e7dfa390ef56b35d35859b
3. STRIPE_SECRET_KEY - From Stripe Dashboard > Developers > API Keys
4. STRIPE_WEBHOOK_SECRET - From Stripe Dashboard > Developers > Webhooks
5. SUPABASE_URL - Your Supabase project URL
6. SUPABASE_SERVICE_KEY - Your Supabase service key

### Step 2: Configure KV Bindings

Go to: https://dash.cloudflare.com > Workers > keyforagents-ai-assistant > Settings > Variables

Add these 4 KV namespace bindings:

1. Variable Name: API_KEYS_KV, KV Namespace: keyforagents-api-keys (Create new namespace for API key storage)
2. Variable Name: USAGE_KV, KV Namespace: keyforagents-usage (Create new namespace for usage tracking)
3. Variable Name: ANALYTICS_KV, KV Namespace: keyforagents-analytics (ID: 6c8418ff250d46509acc6e08898a8a0d)
4. Variable Name: LEADS_KV, KV Namespace: keyforagents-leads (ID: 1d726ca5dd45439ebb6293500d7c66bc)

**Important:** You need to create the API_KEYS_KV and USAGE_KV namespaces first:
- Go to Cloudflare Dashboard > Workers > KV > Create namespace
- Name: keyforagents-api-keys (for API key authentication)
- Name: keyforagents-usage (for rate limiting and usage tracking)

### Step 3: Set Up Stripe Webhook

Go to: https://dashboard.stripe.com/test/webhooks

1. Click Add endpoint
2. URL: https://keyforagents-ai-assistant.YOUR_SUBDOMAIN.workers.dev/api/stripe/webhook
3. Select events: checkout.session.completed, invoice.paid, invoice.created, customer.created, customer.updated, subscription.created, subscription.updated, subscription.deleted
4. Add endpoint
5. Copy Signing secret and add to GitHub Secrets as STRIPE_WEBHOOK_SECRET

## TEST EVERYTHING

### Test Cloudflare Worker
```bash
# Health check
curl https://keyforagents-ai-assistant.YOUR_SUBDOMAIN.workers.dev/api/health

# Get pricing information
curl https://keyforagents-ai-assistant.YOUR_SUBDOMAIN.workers.dev/api/pricing

# Get Stripe products
curl https://keyforagents-ai-assistant.YOUR_SUBDOMAIN.workers.dev/api/stripe/products

# Test chat endpoint (requires valid API key)
curl -X POST https://keyforagents-ai-assistant.YOUR_SUBDOMAIN.workers.dev/api/chat \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"messages": [{"role": "user", "content": "Hello"}]}'

# Check usage statistics (requires valid API key)
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://keyforagents-ai-assistant.YOUR_SUBDOMAIN.workers.dev/api/usage
```

### Test Payment Links (click in browser)
- Basic Plan: https://buy.stripe.com/4gM9AV3s4drBgPvfF41Fe0n
- Pro Plan: https://buy.stripe.com/8x228tgeQ3R1czfeB01Fe0o
- Enterprise Plan: https://buy.stripe.com/14A28t7IkafpdDjeB01Fe0p
- Property Valuation: https://buy.stripe.com/9B63cxaUw87h0Qx78y1Fe0q
- Lead Generation: https://buy.stripe.com/fZuaEZfaMcnx2YF8cC1Fe0r
- Setup Fee: https://buy.stripe.com/bJe5kF7IkevF9n364u1Fe0s

## VERIFY INTEGRATIONS

### Cloudflare Resources
npx wrangler whoami
npx wrangler d1 list
npx wrangler kv:namespace list
npx wrangler r2 bucket list

### GitHub Workflows
Check: https://github.com/niorlusxAI/g-system/actions
- Cloudflare Deploy workflow
- Stripe Webhook workflow
- Test & Validate workflow

## DEPLOYMENT

### Auto-Deployment
Your GitHub Actions workflows will automatically deploy Workers when you push to main.

### Manual Deployment
```bash
npm install -g wrangler
wrangler login
cd workers/keyforagents-ai-assistant
wrangler deploy
```

## DNS ROUTING SETUP

To route traffic to api.keyforagents.com through Cloudflare:

### Step 1: Update Domain Nameservers
1. Log into your Domain Registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Locate the "DNS Management" or "Nameservers" section
3. Select "Custom Nameservers" and replace with:
   - Primary: ns1.cloudflare.com
   - Secondary: ns2.cloudflare.com
4. Save changes (propagation takes 15 minutes to a few hours)

### Step 2: Configure Custom Domain in Cloudflare
1. Go to Cloudflare Dashboard > Workers > keyforagents-ai-assistant
2. Click **Triggers** > **Custom Domains**
3. Add: api.keyforagents.com
4. Wait for SSL certificate provisioning (usually instant)

### Step 3: Verify DNS Propagation
```bash
# Check DNS resolution
dig api.keyforagents.com

# Test the API through custom domain
curl https://api.keyforagents.com/api/health
```

**Note:** Once DNS is configured, update the `routes` section in `wrangler.json` to include your custom domain.

## API KEY MANAGEMENT & RATE LIMITING

### Tier Limits
- **Free**: 1,000 calls/month
- **Starter**: 10,000 calls/month ($29)
- **Pro**: 50,000 calls/month ($99)
- **Enterprise**: 250,000 calls/month ($299)
- **Pay-as-you-go**: $0.005 per additional call

### Managing API Keys
Store API keys in the API_KEYS_KV namespace with this structure:
```json
{
  "customerId": "cus_123abc",
  "tier": "pro",
  "email": "user@example.com",
  "createdAt": "2024-01-01T00:00:00Z",
  "stripeSubscriptionId": "sub_123abc"
}
```

### Usage Tracking
The USAGE_KV namespace tracks monthly usage with keys like:
- `usage:cus_123abc:2024-01` (January 2024 usage for customer cus_123abc)

### Rate Limit Headers
All authenticated responses include:
- `X-RateLimit-Limit`: Monthly limit
- `X-RateLimit-Remaining`: Calls remaining
- `X-RateLimit-Reset`: Reset date (first of next month)

## MAKING MONEY

### Revenue Projections
- 10 customers: $449.83/month
- 100 customers: $4,498.30/month
- 1,000 customers: $44,983.00/month

### Conversion Flow
Visitor > Payment Link > Stripe Checkout > Webhook > KV/Leads Storage > API Key Generation > You Get Paid

## TROUBLESHOOTING

### Worker not deploying
Error: Authentication failed
Solution: Run wrangler login and authenticate with Cloudflare

### Stripe webhook not working
Solution: Verify webhook URL, verify webhook secret matches, check worker logs with wrangler tail

### KV bindings not working
Solution: Verify binding name matches exactly, verify namespace ID, redeploy worker

## RESOURCES

- Cloudflare Workers Docs: https://developers.cloudflare.com/workers/
- Cloudflare D1 Docs: https://developers.cloudflare.com/d1/
- Stripe API Docs: https://stripe.com/docs/api
- GitHub Actions Docs: https://docs.github.com/en/actions

## NEXT STEPS

1. Share your payment links on website, social media, email
2. Monitor revenue in Stripe Dashboard
3. Track analytics in Cloudflare KV namespaces
4. Scale up by adding more products and features
5. Automate marketing using the orchestrator

YOUR SUPER AI POWERHOUSE IS NOW LIVE!
