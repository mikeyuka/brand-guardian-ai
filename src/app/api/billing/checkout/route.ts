import { NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/services/stripe';

export async function POST(request: Request) {
  try {
    const { tier, userId } = await request.json();

    if (!tier || !userId) {
      return NextResponse.json({ error: 'Tier and userId are required' }, { status: 400 });
    }

    const checkoutUrl = await createCheckoutSession(tier, userId);

    return NextResponse.json({ url: checkoutUrl });
  } catch (error: any) {
    console.error('[Stripe Checkout Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
