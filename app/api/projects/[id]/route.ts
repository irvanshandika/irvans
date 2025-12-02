import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { deleteImageFromCloudinary, getPublicIdFromUrl } from '@/src/lib/cloudinary';

const prisma = new PrismaClient();

// GET a single project by ID
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: (await context.params).id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Check if the user owns the project
    if (project.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT update a project
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findUnique({
      where: {
        id: (await context.params).id,
      },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (existingProject.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const data = await req.json();

    // Handle image update
    let imageUrl = existingProject.imageUrl;

    // If a new image is provided, update it
    if (data.imageUrl && data.imageUrl !== existingProject.imageUrl) {
      // Delete old image from Cloudinary if exists
      if (existingProject.imageUrl) {
        try {
          const publicId = getPublicIdFromUrl(existingProject.imageUrl);
          if (publicId) {
            await deleteImageFromCloudinary(publicId);
            console.log(`Deleted old image from Cloudinary: ${publicId}`);
          }
        } catch (cloudinaryError) {
          console.error('Error deleting old image from Cloudinary:', cloudinaryError);
          // Continue with update even if old image deletion fails
        }
      }

      // Set new image URL
      imageUrl = data.imageUrl;
    }

    // Update project
    const updatedProject = await prisma.project.update({
      where: {
        id: (await context.params).id,
      },
      data: {
        title: data.title,
        description: data.description,
        imageUrl: imageUrl,
        demoUrl: data.demoUrl,
        githubUrl: data.githubUrl,
        categories: data.categories || existingProject.categories,
        code: data.code,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE a project
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if project exists and belongs to user
    const existingProject = await prisma.project.findUnique({
      where: {
        id: (await context.params).id,
      },
    });

    if (!existingProject) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (existingProject.userId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete image from Cloudinary if exists
    if (existingProject.imageUrl) {
      try {
        const publicId = getPublicIdFromUrl(existingProject.imageUrl);
        if (publicId) {
          await deleteImageFromCloudinary(publicId);
          console.log(`Deleted image from Cloudinary: ${publicId}`);
        }
      } catch (cloudinaryError) {
        console.error('Error deleting image from Cloudinary:', cloudinaryError);
        // Continue with project deletion even if image deletion fails
      }
    }

    // Delete project
    await prisma.project.delete({
      where: {
        id: (await context.params).id,
      },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
