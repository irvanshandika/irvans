import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role } = await request.json();

    if (!role || (role !== 'user' && role !== 'admin')) {
      return NextResponse.json(
        { error: 'Invalid role. Role must be "user" or "admin"' },
        { status: 400 }
      );
    }

    const params = await context.params;

    // Update role di account
    const updatedAccount = await prisma.account.update({
      where: {
        id: params.id,
      },
      data: {
        role,
      },
    });

    return NextResponse.json(updatedAccount);
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Failed to update user role' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
