import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email query param required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { integrations: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Strip credentials from response for security
    const integrations = user.integrations.map((integration) => ({
      ...integration,
      credentials: integration.credentials ? '***' : null,
    }));

    return NextResponse.json({ integrations });
  } catch (error) {
    console.error('GET /api/integrations error:', error);
    return NextResponse.json({ error: 'Failed to fetch integrations' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, serviceId, category, credentials, enabled, notifications } = body;

    if (!email || !serviceId || !category) {
      return NextResponse.json(
        { error: 'email, serviceId, and category are required' },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    // Upsert integration
    const integration = await prisma.integration.upsert({
      where: {
        userId_serviceId: {
          userId: user.id,
          serviceId,
        },
      },
      update: {
        category,
        ...(credentials !== undefined && { credentials: JSON.stringify(credentials) }),
        ...(enabled !== undefined && { enabled }),
        ...(notifications !== undefined && { notifications }),
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        serviceId,
        category,
        credentials: credentials ? JSON.stringify(credentials) : null,
        enabled: enabled ?? false,
        notifications: notifications ?? true,
      },
    });

    return NextResponse.json({
      integration: {
        ...integration,
        credentials: integration.credentials ? '***' : null,
      },
    });
  } catch (error) {
    console.error('POST /api/integrations error:', error);
    return NextResponse.json({ error: 'Failed to save integration' }, { status: 500 });
  }
}
