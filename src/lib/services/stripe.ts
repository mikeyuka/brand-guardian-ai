import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-02-24-preview' as any,
});

export const PRICE_IDS: Record<string, string> = {
  Starter: process.env.STRIPE_PRICE_STARTER || 'price_starter_placeholder',
  Professional: process.env.STRIPE_PRICE_PRO || 'price_pro_placeholder',
  Enterprise: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise_placeholder',
};

export async function createCheckoutSession(tier: string, userId: string) {
  const priceId = PRICE_IDS[tier];

  if (!priceId) {
    throw new Error(`Invalid tier: ${tier}`);
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    metadata: {
      userId,
      tier,
    },
  });

  return session.url;
}

export async function constructEvent(payload: string, signature: string) {
  return stripe.webhooks.constructEvent(
    payload,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET || 'whsec_placeholder'
  );
}
