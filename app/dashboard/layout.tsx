'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { AppSidebar } from '@/src/components/app-sidebar';
import { SidebarProvider, SidebarInset } from '@/src/components/ui/sidebar';
import { SiteHeader } from '@/src/components/site-header';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserRole() {
      try {
        const session = await getSession();

        if (!session || !session.user) {
          router.push('/auth/login');
          return;
        }

        // Mengambil data akun pengguna dari database untuk memeriksa role
        const response = await fetch(`/api/auth/role?email=${session.user.email}`);
        const data = await response.json();

        if (!data.success || data.role !== 'admin') {
          // Redirect ke halaman restricted jika bukan admin
          router.push('/restricted');
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error('Error checking user role:', error);
        router.push('/auth/login');
      }
    }

    checkUserRole();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="min-h-screen bg-background">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
