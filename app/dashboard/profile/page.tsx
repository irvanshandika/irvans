import { Metadata } from 'next';
import ProfileMain from './main';

export const metadata: Metadata = {
  title: 'Profile - Portfolio',
  description: 'Kelola informasi profil pengguna',
};

export default function ProfilePage() {
  return <ProfileMain />;
}