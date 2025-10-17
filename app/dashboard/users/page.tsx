import { Metadata } from 'next';
import UsersMain from './main';

export const metadata: Metadata = {
  title: 'Users - Portfolio',
  description: 'Kelola dan lihat daftar pengguna',
};

export default function UsersPage() {
  return <UsersMain />;
}
