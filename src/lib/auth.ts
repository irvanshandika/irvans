'use server';

import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  recaptchaToken?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export async function registerUser(data: RegisterFormData) {
  try {
    // Periksa apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      return { success: false, message: "Email sudah terdaftar" };
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
            type: "credentials",
            provider: "credentials",
            providerAccountId: data.email,
            role: "user", // Set default role sebagai "user"
          },
        },
      },
    });

    return { success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Terjadi kesalahan saat mendaftar" };
  }
}

export async function checkUserExists(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return !!user;
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}