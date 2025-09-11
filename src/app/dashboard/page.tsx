/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { AppSidebar } from "@/src/components/app-sidebar";
import { ChartAreaInteractive } from "@/src/components/chart-area-interactive";
import { DataTable } from "@/src/components/data-table";
import { SectionCards } from "@/src/components/section-cards";
import { SiteHeader } from "@/src/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/components/ui/sidebar";

// Import komponen dashboard kustom
import { UserChart } from '@/src/components/dashboard/UserChart';
import { ProjectRatingChart } from '@/src/components/dashboard/ProjectRatingChart';
import ProjectList from '@/src/components/dashboard/ProjectList';

// Komponen loading untuk Suspense
function LoadingComponent() {
  return (
    <div className="flex items-center justify-center h-64 bg-muted rounded-md animate-pulse">
      <p className="text-muted-foreground">Memuat data...</p>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // Redirect ke halaman login jika tidak terautentikasi
  if (status === 'unauthenticated') {
    redirect('/auth/login');
  }

  // Tampilkan loading state saat memeriksa sesi
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              
              <div className="px-4 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card rounded-xl border shadow-sm p-4">
                  <h2 className="text-xl font-semibold mb-4">Grafik Pengguna</h2>
                  <Suspense fallback={<LoadingComponent />}>
                    <UserChart />
                  </Suspense>
                </div>

                <div className="bg-card rounded-xl border shadow-sm p-4">
                  <h2 className="text-xl font-semibold mb-4">Grafik Rating Proyek</h2>
                  <Suspense fallback={<LoadingComponent />}>
                    <ProjectRatingChart />
                  </Suspense>
                </div>
              </div>
              
              <div className="px-4 lg:px-6">
                <div className="bg-card rounded-xl border shadow-sm p-4">
                  <h2 className="text-xl font-semibold mb-4">Daftar Proyek Terbaru</h2>
                  <Suspense fallback={<LoadingComponent />}>
                    <ProjectList />
                  </Suspense>
                </div>
              </div>
              
              <div className="px-4 lg:px-6 mb-4">
                <div className="bg-card rounded-xl border shadow-sm p-4">
                  <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>
                  <div className="space-y-4">
                    {[
                      { action: 'Membuat proyek baru', time: '2 jam yang lalu' },
                      { action: 'Memperbarui informasi profil', time: '1 hari yang lalu' },
                      { action: 'Menambahkan pengguna baru', time: '3 hari yang lalu' },
                      { action: 'Memperbarui pengaturan proyek', time: '1 minggu yang lalu' },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}