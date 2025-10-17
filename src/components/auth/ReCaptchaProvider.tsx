'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { ReactNode } from 'react';

interface ReCaptchaProviderProps {
  children: ReactNode;
}

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  // Gunakan environment variable untuk reCAPTCHA site key
  // Pastikan untuk menambahkan NEXT_PUBLIC_RECAPTCHA_SITE_KEY di .env.local
  const reCaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY || '';

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaSiteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
