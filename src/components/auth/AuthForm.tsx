/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/src/components/ui/form';
import { Input } from '@/src/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';

interface AuthFormProps {
  type: 'login' | 'register';
  schema: z.ZodType<any, any>;
  onSubmit: (values: any) => Promise<void>;
  formFields: {
    name: string;
    label: string;
    type: string;
  }[];
  title: string;
  description: string;
  submitText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export function AuthForm({
  type,
  schema,
  onSubmit,
  formFields,
  title,
  description,
  submitText,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: formFields.reduce(
      (acc, field) => {
        acc[field.name] = '';
        return acc;
      },
      {} as Record<string, string>
    ),
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(values);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Gunakan redirect: true untuk menghindari masalah dengan popup
      await signIn('google', {
        callbackUrl: '/',
        redirect: true,
      });
      // Tidak perlu menangani redirect di sini karena redirect: true
    } catch (error) {
      setError('Terjadi kesalahan saat login dengan Google');
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {formFields.map(field => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      <Input {...formField} type={field.type} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            {error && <div className="text-sm font-medium text-red-500">{error}</div>}

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
              aria-label={submitText === 'Login' ? 'Kirim formulir login' : 'Kirim formulir pendaftaran'}
            >
              {isLoading ? 'Loading...' : submitText}
            </Button>
          </form>
        </Form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              Atau lanjutkan dengan
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          aria-label="Masuk dengan akun Google"
        >
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </div>
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {footerText}{' '}
          <a
            href={footerLinkHref}
            className="text-blue-600 hover:underline dark:text-blue-400"
            aria-label={footerLinkText}
          >
            {footerLinkText}
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
