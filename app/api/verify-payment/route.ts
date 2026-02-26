import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ paid: false }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json({
      paid: session.payment_status === 'paid',
      email: session.customer_details?.email,
      os: session.metadata?.os,
    });
  } catch {
    return NextResponse.json({ paid: false }, { status: 500 });
  }
}
