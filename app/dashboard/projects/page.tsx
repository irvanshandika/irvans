import { Metadata } from 'next';
import ProjectsMain from './main';

export const metadata: Metadata = {
  title: 'Projects - Portfolio',
  description: 'Kelola dan lihat daftar proyek portfolio',
};

export default function ProjectsPage() {
  return <ProjectsMain />;
}
