import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, locale } = body;

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email },
      include: { integrations: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          locale: locale || 'pt',
        },
        include: { integrations: true },
      });
    }

    // Strip credentials from integrations for security
    const safeIntegrations = user.integrations.map((integration) => ({
      ...integration,
      credentials: integration.credentials ? '***' : null,
    }));

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        locale: user.locale,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        integrations: safeIntegrations,
      },
    });
  } catch (error) {
    console.error('POST /api/user error:', error);
    return NextResponse.json({ error: 'Failed to get or create user' }, { status: 500 });
  }
}
