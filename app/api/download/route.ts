import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const DOWNLOAD_URLS: Record<string, string> = {
  windows: process.env.NEXT_PUBLIC_WINDOWS_URL || '#',
  macos: process.env.NEXT_PUBLIC_MAC_URL || '#',
  linux: process.env.NEXT_PUBLIC_LINUX_URL || '#',
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');
  const os = searchParams.get('os') || 'windows';

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Not paid' }, { status: 403 });
    }

    return NextResponse.redirect(DOWNLOAD_URLS[os] || DOWNLOAD_URLS.windows);
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 500 });
  }
}
