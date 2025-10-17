'use server';

import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RegisterFormData } from '@/src/lib/auth';
import { verifyReCaptcha } from './recaptcha';

const prisma = new PrismaClient();

export async function registerUser(data: RegisterFormData) {
  try {
    // Verifikasi reCAPTCHA jika token tersedia
    if (data.recaptchaToken) {
      const recaptchaResult = await verifyReCaptcha(data.recaptchaToken);

      // Tentukan ambang batas skor reCAPTCHA (0.5 adalah nilai umum)
      const RECAPTCHA_SCORE_THRESHOLD = 0.5;

      if (!recaptchaResult.success || recaptchaResult.score < RECAPTCHA_SCORE_THRESHOLD) {
        return {
          success: false,
          message: 'Verifikasi keamanan gagal. Silakan coba lagi.',
        };
      }
    } else {
      // Jika tidak ada token reCAPTCHA, tolak pendaftaran
      return {
        success: false,
        message: 'Verifikasi keamanan diperlukan. Silakan coba lagi.',
      };
    }

    // Periksa apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar' };
    }

    // Hash password
    const hashedPassword = await hash(data.password, 10);

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        accounts: {
          create: {
            type: 'credentials',
            provider: 'credentials',
            providerAccountId: data.email,
            role: 'user', // Set default role sebagai "user"
          },
        },
      },
    });

    return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Terjadi kesalahan saat mendaftar' };
  }
}

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'Semua field harus diisi' };
  }

  try {
    // Periksa apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { error: 'Email sudah terdaftar' };
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Buat user baru
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        accounts: {
          create: {
            type: 'credentials',
            provider: 'credentials',
            providerAccountId: email,
            role: 'user', // Set default role sebagai "user"
          },
        },
      },
    });

    revalidatePath('/auth/login');
    redirect('/auth/login?registered=true');
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Terjadi kesalahan saat mendaftar' };
  }
}
