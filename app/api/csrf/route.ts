/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { randomBytes } from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/authOptions';

// Fungsi untuk menghasilkan token CSRF
function generateCSRFToken() {
  return randomBytes(32).toString('hex');
}

// API untuk mendapatkan token CSRF
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const csrfToken = generateCSRFToken();

    // Simpan token dalam cookie yang hanya dapat diakses melalui HTTP
    const response = NextResponse.json({ csrfToken });
    
    response.cookies.set({
      name: 'csrf-token',
      value: csrfToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 10, // 10 menit
    });

    return response;
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}