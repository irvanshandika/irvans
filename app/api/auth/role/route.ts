import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        accounts: true,
      },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Cek apakah user memiliki akun dengan role
    if (!user.accounts || user.accounts.length === 0) {
      return NextResponse.json({ success: false, role: 'user', message: 'No account found' }, { status: 200 });
    }

    // Ambil role dari akun pertama (asumsi satu user hanya memiliki satu role)
    const role = user.accounts[0].role || 'user';

    return NextResponse.json({ success: true, role }, { status: 200 });
  } catch (error) {
    console.error('Error checking user role:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}