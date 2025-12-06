import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all messages
export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch all messages with user information
    const messages = await prisma.message.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: messages,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch messages' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Create new message
export async function POST(req: NextRequest) {
  try {
    // Get session to check if user is authenticated
    const session = await getServerSession();

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { success: false, message: 'Anda harus login terlebih dahulu untuk mengirim pesan' },
        { status: 401 }
      );
    }

    // Get message content from request body
    const { message, subject } = await req.json();

    if (!message || message.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Pesan tidak boleh kosong' },
        { status: 400 }
      );
    }

    if (!subject || subject.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Subject tidak boleh kosong' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Create message in database
    const newMessage = await prisma.message.create({
      data: {
        subject: subject,
        content: message,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    // Create notification for the new message
    const notification = await prisma.notification.create({
      data: {
        title: `Pesan baru dari ${user.name || user.email}`,
        message: `Subject: ${subject}`,
        type: 'message',
        messageId: newMessage.id,
      },
      include: {
        messageData: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
        },
      },
    });

    // Broadcast notification via WebSocket
    try {
      // Import dynamically to avoid issues
      const { broadcastNotification } = await import('@/src/lib/websocket');
      broadcastNotification({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        isRead: notification.isRead,
        createdAt: notification.createdAt.toISOString(),
        messageId: notification.messageId || undefined,
      });
    } catch (wsError) {
      console.error('Error broadcasting notification:', wsError);
      // Don't fail the request if WebSocket broadcast fails
    }


    return NextResponse.json(
      {
        success: true,
        message: 'Pesan berhasil dikirim',
        data: newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat menyimpan pesan' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
