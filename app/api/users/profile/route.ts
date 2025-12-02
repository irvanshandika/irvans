/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { z } from 'zod';

const prisma = new PrismaClient();

// Skema validasi untuk update profil
const updateProfileSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus minimal 2 karakter' }),
  bio: z.string().optional(),
});

// API untuk mendapatkan data profil pengguna
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        accounts: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.accounts[0]?.role || 'user',
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// API untuk memperbarui profil pengguna
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validasi input
    try {
      updateProfileSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: 'Validation error', details: error.issues },
          { status: 400 }
        );
      }
    }

    // Verifikasi CSRF token
    const csrfToken = request.headers.get('X-CSRF-Token');
    if (!csrfToken) {
      return NextResponse.json(
        { error: 'CSRF token missing' },
        { status: 403 }
      );
    }

    // Update profil pengguna
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email as string,
      },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}