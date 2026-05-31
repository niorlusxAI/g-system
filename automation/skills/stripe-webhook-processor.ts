/**
 * Stripe Webhook Processor for G-System
 * Handles incoming Stripe webhook events
 */

import Stripe from 'stripe';
import { handleStripe } from './automation/skills/stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-01-30'
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function processWebhook(request: Request) {
  const sig = request.headers.get('stripe-signature')!;
  const body = await request.text();
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 400 });
  }
  
  // Process the event
  const result = await handleStripe({
    action: 'webhook.process',
    webhookData: {
      type: event.type,
      data: event.data
    }
  });
  
  if (!result.ok) {
    console.error('Webhook processing failed:', result.error);
    return new Response(JSON.stringify({ error: result.error }), { status: 500 });
  }
  
  console.log('Webhook processed successfully:', event.type);
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}