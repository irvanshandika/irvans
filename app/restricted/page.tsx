'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function RestrictedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="max-w-md w-full bg-card p-8 rounded-lg shadow-lg text-center space-y-6">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-foreground">Akses Dibatasi</h1>

        <p className="text-muted-foreground">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini hanya tersedia
          untuk pengguna dengan role admin.
        </p>

        <Button
          onClick={() => router.push('/')}
          className="flex items-center justify-center gap-2 w-full"
        >
          <ArrowLeft size={16} />
          Kembali ke Halaman Utama
        </Button>
      </div>
    </div>
  );
}
