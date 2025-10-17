/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { AuthForm } from '@/src/components/auth/AuthForm';
import { loginSchema, LoginFormValues } from '@/src/lib/validations';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormValues) => {
    const loadingToast = toast.loading('Sedang login...');

    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: '/',
      });

      if (!result || result.error) {
        toast.dismiss(loadingToast);
        toast.error('Email atau password salah', {
          duration: 3000,
        });
        setError('Email atau password salah');
        return;
      }

      toast.dismiss(loadingToast);
      toast.success('Login berhasil!', {
        duration: 3000,
      });

      // Add delay before redirect
      setTimeout(() => {
        router.push(result.url || '/');
        router.refresh();
      }, 1000);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Terjadi kesalahan saat login', {
        duration: 3000,
      });
      setError('Terjadi kesalahan saat login');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AuthForm
          type="login"
          schema={loginSchema}
          onSubmit={handleSubmit}
          formFields={[
            { name: 'email', label: 'Email', type: 'email' },
            { name: 'password', label: 'Password', type: 'password' },
          ]}
          title="Login"
          description="Masukkan email dan password untuk login ke akun Anda"
          submitText="Login"
          footerText="Belum punya akun?"
          footerLinkText="Daftar"
          footerLinkHref="/auth/register"
        />
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>
        )}
      </div>
    </div>
  );
}
