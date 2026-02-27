import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, serviceId, field } = body;

    if (!email || !serviceId) {
      return NextResponse.json(
        { error: 'email and serviceId are required' },
        { status: 400 }
      );
    }

    if (!field || !['enabled', 'notifications'].includes(field)) {
      return NextResponse.json(
        { error: 'field must be "enabled" or "notifications"' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Find integration
    const integration = await prisma.integration.findUnique({
      where: {
        userId_serviceId: {
          userId: user.id,
          serviceId,
        },
      },
    });

    if (!integration) {
      return NextResponse.json({ error: 'Integration not found' }, { status: 404 });
    }

    // Toggle the field
    const currentValue = integration[field as 'enabled' | 'notifications'];
    const updated = await prisma.integration.update({
      where: { id: integration.id },
      data: { [field]: !currentValue },
    });

    return NextResponse.json({
      integration: {
        ...updated,
        credentials: updated.credentials ? '***' : null,
      },
    });
  } catch (error) {
    console.error('POST /api/integrations/toggle error:', error);
    return NextResponse.json({ error: 'Failed to toggle integration' }, { status: 500 });
  }
}
