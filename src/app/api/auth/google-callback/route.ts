/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fungsi untuk menangani callback dari Google OAuth
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=NoCodeProvided", request.url));
  }

  try {
    // NextAuth.js sebenarnya menangani proses ini secara otomatis
    // Kita hanya perlu mengarahkan pengguna ke callback NextAuth
    const callbackUrl = new URL("/api/auth/callback/google", request.url);
    callbackUrl.searchParams.set("code", code);
    
    if (state) {
      callbackUrl.searchParams.set("state", state);
    }
    
    return NextResponse.redirect(callbackUrl);
  } catch (error) {
    console.error("Error in Google callback:", error);
    return NextResponse.redirect(new URL("/auth/login?error=AuthFailed", request.url));
  }
}