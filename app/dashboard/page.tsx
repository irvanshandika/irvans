import { Metadata } from 'next';
import DashboardMain from './main';

export const metadata: Metadata = {
  title: 'Dashboard - Portfolio',
  description: 'Dasbor utama untuk melihat statistik dan aktivitas terbaru',
};

export default function DashboardPage() {
  return <DashboardMain />;
}