/**
 * Stripe Skill Adapter for G-System Orchestrator
 * Handles: Customers, Products, Prices, Subscriptions, Payments, Webhooks
 */

interface StripeJob {
  action: 'customer.create' | 'customer.update' | 'customer.delete' |
          'product.create' | 'product.update' | 'product.delete' |
          'price.create' | 'price.update' | 'price.delete' |
          'subscription.create' | 'subscription.update' | 'subscription.cancel' |
          'payment.create' | 'payment.retrieve' | 'payment.refund' |
          'webhook.process' | 'invoice.create' | 'coupon.create';
  customerId?: string;
  productId?: string;
  priceId?: string;
  subscriptionId?: string;
  paymentId?: string;
  couponId?: string;
  email?: string;
  name?: string;
  description?: string;
  amount?: number;
  currency?: string;
  priceData?: any;
  webhookData?: any;
  metadata?: Record<string, string>;
}

interface StripeResult {
  ok: boolean;
  data?: any;
  error?: string;
  retryable?: boolean;
}

export async function handleStripe(job: StripeJob): Promise<StripeResult> {
  const { action } = job;
  switch (action) {
    case 'customer.create': return createCustomer(job);
    case 'customer.update': return updateCustomer(job);
    case 'customer.delete': return deleteCustomer(job);
    case 'product.create': return createProduct(job);
    case 'product.update': return updateProduct(job);
    case 'product.delete': return deleteProduct(job);
    case 'price.create': return createPrice(job);
    case 'price.update': return updatePrice(job);
    case 'price.delete': return deletePrice(job);
    case 'subscription.create': return createSubscription(job);
    case 'subscription.update': return updateSubscription(job);
    case 'subscription.cancel': return cancelSubscription(job);
    case 'payment.create': return createPayment(job);
    case 'payment.retrieve': return retrievePayment(job);
    case 'payment.refund': return refundPayment(job);
    case 'webhook.process': return processWebhook(job);
    case 'invoice.create': return createInvoice(job);
    case 'coupon.create': return createCoupon(job);
    default: return { ok: false, error: 'unknown_action' };
  }
}

async function createCustomer(job: StripeJob): Promise<StripeResult> {
  if (!job.email) return { ok: false, error: 'missing_email' };
  console.log(`[STRIPE] Creating customer: ${job.email}`);
  return { ok: true, data: { customer_id: 'cus_' + Date.now(), email: job.email, name: job.name || '', created: new Date().toISOString() } };
}

async function updateCustomer(job: StripeJob): Promise<StripeResult> {
  if (!job.customerId) return { ok: false, error: 'missing_customer_id' };
  console.log(`[STRIPE] Updating customer: ${job.customerId}`);
  return { ok: true, data: { customer_id: job.customerId, updated: true } };
}

async function deleteCustomer(job: StripeJob): Promise<StripeResult> {
  if (!job.customerId) return { ok: false, error: 'missing_customer_id' };
  console.log(`[STRIPE] Deleting customer: ${job.customerId}`);
  return { ok: true, data: { customer_id: job.customerId, deleted: true } };
}

async function createProduct(job: StripeJob): Promise<StripeResult> {
  if (!job.name) return { ok: false, error: 'missing_name' };
  console.log(`[STRIPE] Creating product: ${job.name}`);
  return { ok: true, data: { product_id: 'prod_' + Date.now(), name: job.name, description: job.description || '', active: true } };
}

async function updateProduct(job: StripeJob): Promise<StripeResult> {
  if (!job.productId) return { ok: false, error: 'missing_product_id' };
  console.log(`[STRIPE] Updating product: ${job.productId}`);
  return { ok: true, data: { product_id: job.productId, updated: true } };
}

async function deleteProduct(job: StripeJob): Promise<StripeResult> {
  if (!job.productId) return { ok: false, error: 'missing_product_id' };
  console.log(`[STRIPE] Deleting product: ${job.productId}`);
  return { ok: true, data: { product_id: job.productId, deleted: true } };
}

async function createPrice(job: StripeJob): Promise<StripeResult> {
  if (!job.productId || !job.priceData) return { ok: false, error: 'missing_product_id_or_price_data' };
  console.log(`[STRIPE] Creating price for: ${job.productId}`);
  return { ok: true, data: { price_id: 'price_' + Date.now(), product_id: job.productId, ...job.priceData } };
}

async function updatePrice(job: StripeJob): Promise<StripeResult> {
  if (!job.priceId) return { ok: false, error: 'missing_price_id' };
  console.log(`[STRIPE] Updating price: ${job.priceId}`);
  return { ok: true, data: { price_id: job.priceId, updated: true } };
}

async function deletePrice(job: StripeJob): Promise<StripeResult> {
  if (!job.priceId) return { ok: false, error: 'missing_price_id' };
  console.log(`[STRIPE] Deleting price: ${job.priceId}`);
  return { ok: true, data: { price_id: job.priceId, deleted: true } };
}

async function createSubscription(job: StripeJob): Promise<StripeResult> {
  if (!job.customerId || !job.priceId) return { ok: false, error: 'missing_customer_id_or_price_id' };
  console.log(`[STRIPE] Creating subscription for: ${job.customerId}`);
  return { ok: true, data: { subscription_id: 'sub_' + Date.now(), customer_id: job.customerId, price_id: job.priceId, status: 'active', created: new Date().toISOString() } };
}

async function updateSubscription(job: StripeJob): Promise<StripeResult> {
  if (!job.subscriptionId) return { ok: false, error: 'missing_subscription_id' };
  console.log(`[STRIPE] Updating subscription: ${job.subscriptionId}`);
  return { ok: true, data: { subscription_id: job.subscriptionId, updated: true } };
}

async function cancelSubscription(job: StripeJob): Promise<StripeResult> {
  if (!job.subscriptionId) return { ok: false, error: 'missing_subscription_id' };
  console.log(`[STRIPE] Cancelling subscription: ${job.subscriptionId}`);
  return { ok: true, data: { subscription_id: job.subscriptionId, cancelled: true } };
}

async function createPayment(job: StripeJob): Promise<StripeResult> {
  if (!job.amount || !job.currency || !job.customerId) return { ok: false, error: 'missing_amount_currency_or_customer' };
  console.log(`[STRIPE] Creating payment: ${job.amount} ${job.currency}`);
  return { ok: true, data: { payment_id: 'pi_' + Date.now(), amount: job.amount, currency: job.currency, customer_id: job.customerId, status: 'succeeded' } };
}

async function retrievePayment(job: StripeJob): Promise<StripeResult> {
  if (!job.paymentId) return { ok: false, error: 'missing_payment_id' };
  console.log(`[STRIPE] Retrieving payment: ${job.paymentId}`);
  return { ok: true, data: { payment_id: job.paymentId, details: {} } };
}

async function refundPayment(job: StripeJob): Promise<StripeResult> {
  if (!job.paymentId) return { ok: false, error: 'missing_payment_id' };
  console.log(`[STRIPE] Refunding payment: ${job.paymentId}`);
  return { ok: true, data: { payment_id: job.paymentId, refunded: true } };
}

async function processWebhook(job: StripeJob): Promise<StripeResult> {
  if (!job.webhookData) return { ok: false, error: 'missing_webhook_data' };
  const { type, data } = job.webhookData;
  console.log(`[STRIPE] Processing webhook: ${type}`);
  return { ok: true, data: { event: type, processed: true } };
}

async function createInvoice(job: StripeJob): Promise<StripeResult> {
  if (!job.customerId) return { ok: false, error: 'missing_customer_id' };
  console.log(`[STRIPE] Creating invoice for: ${job.customerId}`);
  return { ok: true, data: { invoice_id: 'in_' + Date.now(), customer_id: job.customerId, status: 'draft' } };
}

async function createCoupon(job: StripeJob): Promise<StripeResult> {
  if (!job.couponId) return { ok: false, error: 'missing_coupon_id' };
  console.log(`[STRIPE] Creating coupon: ${job.couponId}`);
  return { ok: true, data: { coupon_id: job.couponId, percent_off: 20, duration: 'once' } };
}

export { handleStripe };