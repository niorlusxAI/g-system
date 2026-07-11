import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

const validPriceIds = [
  'price_1TcgsgP3QBBmvRlDghIckzEu',
  'price_1TcgshP3QBBmvRlD9GY1OBbZ',
  'price_1TcgsiP3QBBmvRlDgRIVIxEG',
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const priceId = body.priceId;
    const domain = body.domain || 'keyforagents.com';
    const customerEmail = body.customerEmail;
    const quantity = body.quantity || 1;

    if (!validPriceIds.includes(priceId)) {
      return NextResponse.json(
        { error: 'Invalid price ID' },
        { status: 400 }
      );
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://keyforagents.com';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: quantity,
        },
      ],
      mode: 'subscription',
      success_url: siteUrl + '/success?session_id={CHECKOUT_SESSION_ID}&domain=' + domain,
      cancel_url: siteUrl + '?canceled=true',
      customer_email: customerEmail,
      metadata: {
        domain: domain,
        product: priceId,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
