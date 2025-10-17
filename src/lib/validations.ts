import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email harus diisi' })
    .email({ message: 'Email tidak valid' }),
  password: z
    .string()
    .min(1, { message: 'Password harus diisi' })
    .min(8, { message: 'Password minimal 8 karakter' }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Nama harus diisi' })
      .max(50, { message: 'Nama maksimal 50 karakter' }),
    email: z
      .string()
      .min(1, { message: 'Email harus diisi' })
      .email({ message: 'Email tidak valid' }),
    password: z
      .string()
      .min(1, { message: 'Password harus diisi' })
      .min(8, { message: 'Password minimal 8 karakter' }),
    confirmPassword: z.string().min(1, { message: 'Konfirmasi password harus diisi' }),
    recaptchaToken: z.string().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
