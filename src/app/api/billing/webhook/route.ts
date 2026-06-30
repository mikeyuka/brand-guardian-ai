import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { constructEvent } from '@/lib/services/stripe';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get('Stripe-Signature') || '';

  try {
    const event = await constructEvent(body, signature);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const { userId, tier } = session.metadata;

      console.log(`[Stripe Webhook] Payment successful for user ${userId}, tier ${tier}`);

      // Here you would update your database to reflect the new subscription
      // Example:
      // await supabase
      //   .from('profiles')
      //   .update({ subscription_tier: tier, stripe_customer_id: session.customer })
      //   .eq('id', userId);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Stripe Webhook Error]:', error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
