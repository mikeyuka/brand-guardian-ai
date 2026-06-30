import { NextResponse } from 'next/server';
import { getMockRisk } from '@/lib/services/mockCache';

export async function POST(request: Request) {
  try {
    const { asin, turnstileToken } = await request.json();

    if (!asin) {
      return NextResponse.json({ error: 'ASIN is required' }, { status: 400 });
    }

    // In production, verify turnstileToken here
    // const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { ... });

    const riskSummary = getMockRisk(asin);

    return NextResponse.json({
      asin,
      ...riskSummary,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
