/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { AuthForm } from '@/src/components/auth/AuthForm';
import { registerSchema, RegisterFormValues } from '@/src/lib/validations';
import { registerUser } from '@/app/actions/auth';
import { useReCaptcha } from '@/src/hooks/useReCaptcha';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { executeReCaptcha, isVerifying, error: recaptchaError } = useReCaptcha();

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      // Eksekusi reCAPTCHA untuk mendapatkan token
      const recaptchaToken = await executeReCaptcha();

      if (!recaptchaToken) {
        setError(recaptchaError || 'Verifikasi keamanan gagal. Silakan coba lagi.');
        return;
      }

      const { success, message, user } = await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        recaptchaToken: recaptchaToken,
      });

      if (!success) {
        setError(message || 'Terjadi kesalahan saat mendaftar');
        return;
      }

      // Redirect ke halaman login setelah berhasil mendaftar
      router.push('/auth/login?registered=true');
    } catch (error) {
      setError('Terjadi kesalahan saat mendaftar');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm
          type="register"
          schema={registerSchema}
          onSubmit={handleSubmit}
          formFields={[
            { name: 'name', label: 'Nama', type: 'text' },
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
            {
              name: 'confirmPassword',
              label: 'Konfirmasi Password',
              type: 'password',
            },
          ]}
          title="Register"
          description="Buat akun baru untuk mengakses aplikasi"
          submitText="Daftar"
          footerText="Sudah punya akun?"
          footerLinkText="Login"
          footerLinkHref="/auth/login"
        />
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
