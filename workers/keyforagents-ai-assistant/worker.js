/**
 * KeyForAgents AI Assistant - Monetized Cloudflare Worker
 * Features: API Key Authentication, KV-based Rate Limiting, Stripe Pricing Endpoints
 * Domain: api.keyforagents.com
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS Headers for secure cross-origin requests
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 204, 
        headers: corsHeaders 
      });
    }

    // ------------------------------------------------------------------
    // AUTHENTICATION & RATE LIMITING MIDDLEWARE
    // ------------------------------------------------------------------
    
    /**
     * Authenticate API key from Authorization header
     * Expected KV structure: { customerId: 'cus_123', tier: 'pro', email?: string, createdAt?: string }
     */
    async function authenticate(req) {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
      }
      
      const apiKey = authHeader.replace('Bearer ', '').trim();
      
      if (!apiKey || apiKey.length < 32) {
        return null; // Invalid key format
      }
      
      try {
        // Fetch user data from API_KEYS_KV namespace
        const userData = await env.API_KEYS_KV.get(apiKey, { type: 'json' });
        
        if (!userData || !userData.customerId || !userData.tier) {
          return null; // Invalid or incomplete user data
        }
        
        return userData;
      } catch (error) {
        console.error('Authentication error:', error);
        return null;
      }
    }

    /**
     * Check and enforce rate limits based on user tier
     * Uses monthly rolling window (YYYY-MM format)
     */
    async function checkRateLimit(userId, tier) {
      const limits = {
        free: 1000,
        starter: 10000,
        pro: 50000,
        enterprise: 250000
      };
      
      const limit = limits[tier] || 1000; // Default to free tier
      const monthKey = new Date().toISOString().slice(0, 7); // Format: YYYY-MM
      const key = `usage:${userId}:${monthKey}`;
      
      try {
        const current = parseInt(await env.USAGE_KV.get(key)) || 0;
        
        if (current >= limit) {
          return { 
            allowed: false, 
            current, 
            limit,
            resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString()
          };
        }
        
        // Increment usage counter
        await env.USAGE_KV.put(key, (current + 1).toString());
        
        return { 
          allowed: true, 
          current: current + 1,
          remaining: limit - current - 1,
          limit,
          resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString()
        };
      } catch (error) {
        console.error('Rate limit check error:', error);
        // Fail open - allow request but log error
        return { 
          allowed: true, 
          current: 0,
          remaining: limit,
          limit,
          resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString()
        };
      }
    }

    /**
     * Get usage statistics for a user
     */
    async function getUsageStats(userId, tier) {
      const monthKey = new Date().toISOString().slice(0, 7);
      const key = `usage:${userId}:${monthKey}`;
      
      const current = parseInt(await env.USAGE_KV.get(key)) || 0;
      const limits = { free: 1000, starter: 10000, pro: 50000, enterprise: 250000 };
      const limit = limits[tier] || 1000;
      
      return {
        current,
        limit,
        remaining: limit - current,
        percentage: Math.round((current / limit) * 100),
        resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString()
      };
    }

    // ------------------------------------------------------------------
    // PUBLIC ENDPOINTS (No Authentication Required)
    // ------------------------------------------------------------------
    
    // GET /api/health - Health check endpoint
    if (url.pathname === '/api/health' && request.method === 'GET') {
      return new Response(JSON.stringify({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        worker: 'keyforagents-ai-assistant',
        version: '1.0.0'
      }), { 
        headers: corsHeaders 
      });
    }

    // GET /api/pricing - Returns available API tiers and pricing
    if (url.pathname === '/api/pricing' && request.method === 'GET') {
      return new Response(JSON.stringify({
        success: true,
        tiers: {
          free: {
            price: 0,
            priceFormatted: '$0.00',
            calls: 1000,
            features: ['chat', 'basic support'],
            stripePriceId: null
          },
          starter: {
            price: 2900,
            priceFormatted: '$29.00',
            calls: 10000,
            features: ['chat', 'embeddings', 'priority support'],
            stripePriceId: 'price_starter'
          },
          pro: {
            price: 9900,
            priceFormatted: '$99.00',
            calls: 50000,
            features: ['all features', 'priority support', 'analytics'],
            stripePriceId: 'price_pro'
          },
          enterprise: {
            price: 29900,
            priceFormatted: '$299.00',
            calls: 250000,
            features: ['all features', 'priority support', 'analytics', 'dedicated support'],
            stripePriceId: 'price_enterprise'
          }
        },
        payAsYouGo: {
          pricePerCall: 50,
          priceFormatted: '$0.005',
          description: 'Additional calls beyond tier limit'
        },
        currency: 'USD'
      }), { 
        headers: corsHeaders 
      });
    }

    // GET /api/stripe/products - Returns Stripe product information
    if (url.pathname === '/api/stripe/products' && request.method === 'GET') {
      return new Response(JSON.stringify({
        success: true,
        products: {
          basic: {
            name: 'Basic Plan',
            description: 'Perfect for getting started with AI assistance',
            priceId: 'price_123',
            unitAmount: 2900,
            currency: 'usd',
            interval: 'month',
            features: ['10,000 API calls/month', 'Chat functionality', 'Email support']
          },
          pro: {
            name: 'Pro Plan',
            description: 'For power users who need more capacity',
            priceId: 'price_456',
            unitAmount: 9900,
            currency: 'usd',
            interval: 'month',
            features: ['50,000 API calls/month', 'All AI models', 'Priority support']
          },
          enterprise: {
            name: 'Enterprise Plan',
            description: 'For businesses with high-volume needs',
            priceId: 'price_789',
            unitAmount: 29900,
            currency: 'usd',
            interval: 'month',
            features: ['250,000 API calls/month', 'All features', 'Dedicated support']
          }
        }
      }), { 
        headers: corsHeaders 
      });
    }

    // ------------------------------------------------------------------
    // PROTECTED AI ENDPOINTS (Authentication Required)
    // ------------------------------------------------------------------
    
    // POST /api/chat - Protected Llama 3.3 70B Endpoint
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      const user = await authenticate(request);
      
      if (!user) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Valid API key required in Authorization header',
          documentation: 'https://docs.keyforagents.com/api/authentication'
        }), { 
          status: 401, 
          headers: corsHeaders 
        });
      }
      
      const rateLimit = await checkRateLimit(user.customerId, user.tier);
      
      if (!rateLimit.allowed) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Monthly rate limit exceeded. Upgrade your tier.',
          currentUsage: rateLimit.current,
          limit: rateLimit.limit,
          resetDate: rateLimit.resetDate,
          upgradeUrl: 'https://keyforagents.com/pricing'
        }), { 
          status: 429, 
          headers: corsHeaders 
        });
      }
      
      // Request parsing
      let body;
      try {
        body = await request.json();
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body'
        }), { 
          status: 400, 
          headers: corsHeaders 
        });
      }
      
      // Validate required fields
      if (!body.messages || !Array.isArray(body.messages)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'messages array is required in request body'
        }), { 
          status: 400, 
          headers: corsHeaders 
        });
      }
      
      // -> Insert your existing AI calling logic here (Llama-3.3-70b) <- 
      // This is where you would integrate with your AI provider
      // For now, returning a mock response
      
      const mockResponse = {
        success: true,
        id: `chatcmpl-${Date.now()}`,
        model: 'llama-3.3-70b',
        choices: [{
          index: 0,
          message: {
            role: 'assistant',
            content: 'This is a mock response. Your AI integration would go here.'
          },
          finish_reason: 'stop'
        }],
        usage: {
          prompt_tokens: 25,
          completion_tokens: 10,
          total_tokens: 35
        },
        customerId: user.customerId,
        tier: user.tier,
        calls_remaining: rateLimit.remaining,
        current_usage: rateLimit.current,
        limit: rateLimit.limit
      };
      
      return new Response(JSON.stringify(mockResponse), { 
        headers: corsHeaders 
      });
    }

    // GET /api/usage - Get current usage statistics
    if (url.pathname === '/api/usage' && request.method === 'GET') {
      const user = await authenticate(request);
      
      if (!user) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Valid API key required in Authorization header'
        }), { 
          status: 401, 
          headers: corsHeaders 
        });
      }
      
      const stats = await getUsageStats(user.customerId, user.tier);
      
      return new Response(JSON.stringify({
        success: true,
        customerId: user.customerId,
        tier: user.tier,
        ...stats
      }), { 
        headers: corsHeaders 
      });
    }

    // POST /api/embeddings - Protected Embeddings Endpoint
    if (url.pathname === '/api/embeddings' && request.method === 'POST') {
      const user = await authenticate(request);
      
      if (!user) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Valid API key required in Authorization header'
        }), { 
          status: 401, 
          headers: corsHeaders 
        });
      }
      
      // Check if user's tier has access to embeddings
      const tiersWithEmbeddings = ['starter', 'pro', 'enterprise'];
      if (!tiersWithEmbeddings.includes(user.tier)) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Embeddings feature requires Starter tier or higher',
          upgradeUrl: 'https://keyforagents.com/pricing'
        }), { 
          status: 403, 
          headers: corsHeaders 
        });
      }
      
      const rateLimit = await checkRateLimit(user.customerId, user.tier);
      
      if (!rateLimit.allowed) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Monthly rate limit exceeded. Upgrade your tier.',
          currentUsage: rateLimit.current,
          limit: rateLimit.limit
        }), { 
          status: 429, 
          headers: corsHeaders 
        });
      }
      
      let body;
      try {
        body = await request.json();
      } catch (error) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Invalid JSON in request body'
        }), { 
          status: 400, 
          headers: corsHeaders 
        });
      }
      
      // Mock embeddings response
      const mockEmbeddings = {
        success: true,
        model: 'text-embedding-3-small',
        embeddings: [Array(1536).fill(0.1)],
        usage: {
          prompt_tokens: body.input?.length || 0,
          total_tokens: body.input?.length || 0
        },
        calls_remaining: rateLimit.remaining
      };
      
      return new Response(JSON.stringify(mockEmbeddings), { 
        headers: corsHeaders 
      });
    }

    // ------------------------------------------------------------------
    // STRIPE WEBHOOK ENDPOINT
    // ------------------------------------------------------------------
    
    // POST /api/stripe/webhook - Handle Stripe webhook events
    if (url.pathname === '/api/stripe/webhook' && request.method === 'POST') {
      const sig = request.headers.get('stripe-signature');
      
      if (!sig) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Missing stripe-signature header'
        }), { 
          status: 400, 
          headers: corsHeaders 
        });
      }
      
      try {
        const body = await request.text();
        
        // Verify webhook signature
        // Note: You'll need to configure STRIPE_WEBHOOK_SECRET in your Worker variables
        // For now, we'll skip verification in this template
        // In production, use: stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET)
        
        const event = JSON.parse(body);
        
        // Handle different Stripe events
        switch (event.type) {
          case 'checkout.session.completed':
            const session = event.data.object;
            // Store customer information and generate API key
            console.log('Checkout session completed:', session.id);
            break;
            
          case 'invoice.paid':
            const invoice = event.data.object;
            console.log('Invoice paid:', invoice.id);
            break;
            
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            const subscription = event.data.object;
            console.log('Subscription event:', event.type, subscription.id);
            break;
            
          default:
            console.log('Unhandled event type:', event.type);
        }
        
        return new Response(JSON.stringify({ 
          success: true, 
          received: true 
        }), { 
          headers: corsHeaders 
        });
        
      } catch (error) {
        console.error('Webhook error:', error);
        return new Response(JSON.stringify({
          success: false,
          error: 'Webhook processing failed'
        }), { 
          status: 500, 
          headers: corsHeaders 
        });
      }
    }

    // ------------------------------------------------------------------
    // DEFAULT FALLBACK
    // ------------------------------------------------------------------
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Endpoint not found or invalid method.',
      availableEndpoints: [
        'GET /api/health',
        'GET /api/pricing',
        'GET /api/stripe/products',
        'POST /api/chat',
        'POST /api/embeddings',
        'GET /api/usage',
        'POST /api/stripe/webhook'
      ],
      documentation: 'https://docs.keyforagents.com/api'
    }), { 
      status: 404, 
      headers: corsHeaders 
    });
  }
};
