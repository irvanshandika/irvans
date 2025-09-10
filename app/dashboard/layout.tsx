import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Portfolio',
  description: 'Dashboard untuk mengelola portfolio dan melihat statistik',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}