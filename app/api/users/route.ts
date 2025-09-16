import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Mengambil semua user dengan account mereka
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
      },
    });
    
    // Format data untuk ditampilkan di frontend
    const formattedUsers = users.map((user) => {
      const account = user.accounts[0]; // Mengambil account pertama
      return {
        id: user.id,
        name: user.name || 'Unknown',
        email: user.email || 'No Email',
        role: account?.role || 'user',
        createdAt: user.createdAt.toISOString().split('T')[0],
        accountId: account?.id || '',
      };
    });
    
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}