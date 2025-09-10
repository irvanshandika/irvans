"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useState } from "react";

interface UseReCaptchaReturn {
  executeReCaptcha: () => Promise<string | null>;
  isVerifying: boolean;
  error: string | null;
}

export function useReCaptcha(): UseReCaptchaReturn {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeReCaptcha = async (): Promise<string | null> => {
    setIsVerifying(true);
    setError(null);

    try {
      if (!executeRecaptcha) {
        throw new Error("reCAPTCHA belum siap");
      }

      // Eksekusi reCAPTCHA dengan action 'register'
      const token = await executeRecaptcha("register");
      return token;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Gagal memverifikasi reCAPTCHA";
      setError(errorMessage);
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  return {
    executeReCaptcha,
    isVerifying,
    error,
  };
}