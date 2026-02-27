import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

interface TestResult {
  success: boolean;
  error?: string;
  data?: Record<string, unknown>;
}

// ─── Binance ───────────────────────────────────────────────────────────────────
async function testBinance(creds: { apiKey: string; apiSecret: string }): Promise<TestResult> {
  const { apiKey, apiSecret } = creds;
  if (!apiKey || !apiSecret) {
    return { success: false, error: 'apiKey and apiSecret are required' };
  }

  const timestamp = Date.now();
  const queryString = `timestamp=${timestamp}`;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex');

  const url = `https://api.binance.com/api/v3/account?${queryString}&signature=${signature}`;

  const res = await fetch(url, {
    headers: { 'X-MBX-APIKEY': apiKey },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return { success: false, error: body.msg || `Binance API returned ${res.status}` };
  }

  const data = await res.json();
  return { success: true, data: { balances: data.balances?.length ?? 0 } };
}

// ─── Coinbase ──────────────────────────────────────────────────────────────────
async function testCoinbase(creds: { apiKey: string }): Promise<TestResult> {
  const { apiKey } = creds;
  if (!apiKey) {
    return { success: false, error: 'apiKey is required' };
  }

  const res = await fetch('https://api.coinbase.com/v2/user', {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'CB-VERSION': '2024-01-01',
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      success: false,
      error: body.errors?.[0]?.message || `Coinbase API returned ${res.status}`,
    };
  }

  const data = await res.json();
  return { success: true, data: { name: data.data?.name } };
}

// ─── TradingView ───────────────────────────────────────────────────────────────
async function testTradingView(): Promise<TestResult> {
  // TradingView uses webhook URLs — generate a unique one for the user
  const webhookId = crypto.randomUUID();
  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://openclaw.ai'}/api/webhook/tradingview/${webhookId}`;

  return {
    success: true,
    data: { webhookUrl, webhookId },
  };
}

// ─── OpenAI ────────────────────────────────────────────────────────────────────
async function testOpenAI(creds: { apiKey: string }): Promise<TestResult> {
  const { apiKey } = creds;
  if (!apiKey) {
    return { success: false, error: 'apiKey is required' };
  }

  const res = await fetch('https://api.openai.com/v1/models', {
    headers: { 'Authorization': `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      success: false,
      error: body.error?.message || `OpenAI API returned ${res.status}`,
    };
  }

  const data = await res.json();
  return { success: true, data: { models: data.data?.length ?? 0 } };
}

// ─── Anthropic ─────────────────────────────────────────────────────────────────
async function testAnthropic(creds: { apiKey: string }): Promise<TestResult> {
  const { apiKey } = creds;
  if (!apiKey) {
    return { success: false, error: 'apiKey is required' };
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1,
      messages: [{ role: 'user', content: 'ping' }],
    }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    // 400 with "message too short" or similar still means the key is valid
    // Only auth errors (401, 403) mean invalid key
    if (res.status === 401 || res.status === 403) {
      return {
        success: false,
        error: body.error?.message || `Anthropic API returned ${res.status}`,
      };
    }
  }

  return { success: true };
}

// ─── Google AI ─────────────────────────────────────────────────────────────────
async function testGoogle(creds: { apiKey: string }): Promise<TestResult> {
  const { apiKey } = creds;
  if (!apiKey) {
    return { success: false, error: 'apiKey is required' };
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      success: false,
      error: body.error?.message || `Google AI API returned ${res.status}`,
    };
  }

  const data = await res.json();
  return { success: true, data: { models: data.models?.length ?? 0 } };
}

// ─── Instagram ─────────────────────────────────────────────────────────────────
async function testInstagram(creds: { accessToken: string }): Promise<TestResult> {
  const { accessToken } = creds;
  if (!accessToken) {
    return { success: false, error: 'accessToken is required' };
  }

  const res = await fetch(
    `https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}`
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      success: false,
      error: body.error?.message || `Instagram API returned ${res.status}`,
    };
  }

  const data = await res.json();
  return { success: true, data: { username: data.username } };
}

// ─── Twitter / X ───────────────────────────────────────────────────────────────
async function testTwitter(creds: { bearerToken: string }): Promise<TestResult> {
  const { bearerToken } = creds;
  if (!bearerToken) {
    return { success: false, error: 'bearerToken is required' };
  }

  const res = await fetch('https://api.twitter.com/2/users/me', {
    headers: { 'Authorization': `Bearer ${bearerToken}` },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      success: false,
      error: body.detail || body.errors?.[0]?.message || `Twitter API returned ${res.status}`,
    };
  }

  const data = await res.json();
  return { success: true, data: { username: data.data?.username } };
}

// ─── Facebook ──────────────────────────────────────────────────────────────────
async function testFacebook(creds: { accessToken: string }): Promise<TestResult> {
  const { accessToken } = creds;
  if (!accessToken) {
    return { success: false, error: 'accessToken is required' };
  }

  const res = await fetch(
    `https://graph.facebook.com/v19.0/me?access_token=${accessToken}`
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      success: false,
      error: body.error?.message || `Facebook API returned ${res.status}`,
    };
  }

  const data = await res.json();
  return { success: true, data: { name: data.name, id: data.id } };
}

// ─── WhatsApp ──────────────────────────────────────────────────────────────────
async function testWhatsApp(): Promise<TestResult> {
  // WhatsApp connection is handled via QR code pairing flow
  return { success: true, data: { note: 'QR pairing handled separately' } };
}

// ─── Telegram ──────────────────────────────────────────────────────────────────
async function testTelegram(creds: { botToken: string }): Promise<TestResult> {
  const { botToken } = creds;
  if (!botToken) {
    return { success: false, error: 'botToken is required' };
  }

  const res = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    return {
      success: false,
      error: body.description || `Telegram API returned ${res.status}`,
    };
  }

  const data = await res.json();
  if (!data.ok) {
    return { success: false, error: data.description || 'Telegram returned ok=false' };
  }

  return {
    success: true,
    data: { username: data.result?.username, botId: data.result?.id },
  };
}

// ─── Service router ────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const testers: Record<string, (creds: any) => Promise<TestResult>> = {
  binance: testBinance,
  coinbase: testCoinbase,
  tradingview: testTradingView,
  openai: testOpenAI,
  anthropic: testAnthropic,
  google: testGoogle,
  instagram: testInstagram,
  twitter: testTwitter,
  facebook: testFacebook,
  whatsapp: testWhatsApp,
  telegram: testTelegram,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, serviceId } = body;

    if (!email || !serviceId) {
      return NextResponse.json(
        { error: 'email and serviceId are required' },
        { status: 400 }
      );
    }

    const tester = testers[serviceId];
    if (!tester) {
      return NextResponse.json(
        { error: `Unknown service: ${serviceId}` },
        { status: 400 }
      );
    }

    // Find user and integration
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const integration = await prisma.integration.findUnique({
      where: {
        userId_serviceId: {
          userId: user.id,
          serviceId,
        },
      },
    });

    // Parse credentials
    let credentials = {};
    if (integration?.credentials) {
      try {
        credentials = JSON.parse(integration.credentials);
      } catch {
        return NextResponse.json(
          { error: 'Invalid credentials format in database' },
          { status: 500 }
        );
      }
    }

    // Run the test
    let result: TestResult;
    try {
      result = await tester(credentials);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error during test';
      result = { success: false, error: message };
    }

    // Update integration record
    if (integration) {
      await prisma.integration.update({
        where: { id: integration.id },
        data: {
          connected: result.success,
          lastTestedAt: new Date(),
          lastError: result.success ? null : (result.error ?? 'Test failed'),
        },
      });
    }

    return NextResponse.json({
      serviceId,
      success: result.success,
      error: result.error ?? null,
      data: result.data ?? null,
      testedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('POST /api/integrations/test error:', error);
    return NextResponse.json({ error: 'Failed to test integration' }, { status: 500 });
  }
}
