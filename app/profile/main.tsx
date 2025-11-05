/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import toast from "react-hot-toast"

// Skema validasi untuk form profil
const profileSchema = z.object({
  name: z.string().min(2, { message: 'Nama harus minimal 2 karakter' }),
  email: z.string().email({ message: 'Email tidak valid' }),
});

export default function ProfileMain() {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Data profil pengguna
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    avatarUrl: '',
  });

  // Mengambil data profil pengguna
  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        avatarUrl: session.user.image || '',
      });
      setIsLoading(false);
    } else if (status === 'unauthenticated') {
      // Redirect ke halaman login jika tidak terautentikasi
      window.location.href = '/auth/login';
    }
  }, [session, status]);

  // Validasi input form
  const validateForm = () => {
    try {
      profileSchema.parse(profile);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path) {
            const key = err.path[0] as string;
            formattedErrors[key] = err.message;
          }
        });
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  // Menyimpan perubahan profil
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    try {
      // Membuat token CSRF untuk keamanan
      const csrfResponse = await fetch('/api/csrf');
      const { csrfToken } = await csrfResponse.json();
      
      const response = await fetch(`/api/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          name: profile.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal memperbarui profil');
      }

      const result = await response.json();
      
      toast.success('Profil berhasil diperbarui');
      
      setIsEditing(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profil</h1>
        <p className="text-gray-500">Kelola informasi akun Anda</p>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-6 flex justify-center items-center min-h-[300px]">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2">Memuat data profil...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>

              {!isEditing && (
                <Button variant="outline" className="w-full" onClick={() => setIsEditing(true)}>
                  Edit Profil
                </Button>
              )}
            </div>

            <div className="flex-1">
              {isEditing ? (
                <form
                  className="space-y-4"
                  onSubmit={e => {
                    e.preventDefault();
                    handleSave();
                  }}
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Nama
                    </label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={e => setProfile({ ...profile, name: e.target.value })}
                      className={errors.name ? "border-red-500" : ""}
                      disabled={isSaving}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      disabled={true}
                      className="bg-gray-100"
                    />
                    <p className="text-sm text-gray-500 mt-1">Email tidak dapat diubah</p>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        'Simpan Perubahan'
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setIsEditing(false);
                        setErrors({});
                      }}
                      disabled={isSaving}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium">Nama</h3>
                    <p>{profile.name}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium">Email</h3>
                    <p>{profile.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}