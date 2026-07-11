/**
 * G-System Integration Test Script
 * Tests all Cloudflare + Stripe integrations
 */

import { handleCloudflare } from './automation/skills/cloudflare';
import { handleStripe } from './automation/skills/stripe';

async function runTests() {
  console.log('=== G-System Integration Tests ===
');
  
  // Test Cloudflare skill
  console.log('Testing Cloudflare Skill...');
  const cloudflareTests = [
    { name: 'Worker Deploy', input: { action: 'worker.deploy', workerName: 'test-worker', code: 'export default {}' } },
    { name: 'D1 Query', input: { action: 'd1.query', databaseId: 'b416db32-c9fa-4b52-a997-2ff2c15f40e9', query: 'SELECT * FROM clients LIMIT 1' } },
    { name: 'KV Put', input: { action: 'kv.put', namespaceId: '134f42cb694945a69bbf83cf037287d6', key: 'test', value: 'data' } },
    { name: 'R2 Upload', input: { action: 'r2.upload', bucketName: 'analytics-logs', fileName: 'test.txt', fileContent: 'test' } }
  ];
  
  for (const test of cloudflareTests) {
    const result = await handleCloudflare(test.input);
    console.log(`  ${test.name}: ${result.ok ? '✅ PASS' : '❌ FAIL'}`);
    if (!result.ok) console.log(`    Error: ${result.error}`);
  }
  
  // Test Stripe skill
  console.log('
Testing Stripe Skill...');
  const stripeTests = [
    { name: 'Create Customer', input: { action: 'customer.create', email: 'test@example.com', name: 'Test User' } },
    { name: 'Create Product', input: { action: 'product.create', name: 'Test Product', description: 'Test' } },
    { name: 'Create Price', input: { action: 'price.create', productId: 'prod_test', priceData: { unit_amount: 999, currency: 'usd' } } },
    { name: 'Create Subscription', input: { action: 'subscription.create', customerId: 'cus_test', priceId: 'price_test' } },
    { name: 'Process Webhook', input: { action: 'webhook.process', webhookData: { type: 'checkout.session.completed', data: {} } } }
  ];
  
  for (const test of stripeTests) {
    const result = await handleStripe(test.input);
    console.log(`  ${test.name}: ${result.ok ? '✅ PASS' : '❌ FAIL'}`);
    if (!result.ok) console.log(`    Error: ${result.error}`);
  }
  
  console.log('
=== Tests Complete ===');
}

runTests().catch(console.error);