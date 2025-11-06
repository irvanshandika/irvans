/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Label } from '@/src/components/ui/label';
import { Separator } from '@/src/components/ui/separator';
import { useSession } from 'next-auth/react';
import { Loader2, User, Mail, Edit3, Save, X, Check } from 'lucide-react';
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-light text-slate-800 dark:text-slate-100 mb-3">
            Profil Saya
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light">
            Kelola informasi akun Anda dengan mudah
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">

            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-slate-200 dark:border-slate-700 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-16 h-16 border-t-2 border-slate-400 dark:border-slate-300 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-slate-500 dark:text-slate-400 font-light">Memuat profil...</p>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700 bg-linear-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-700 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl md:text-2xl font-light text-slate-800 dark:text-slate-100">
                      Informasi Pribadi
                    </CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400 mt-1">
                      Data akun dan preferensi Anda
                    </CardDescription>
                  </div>
                  {!isEditing && (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="outline" 
                      size="sm"
                      className="border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Avatar Section */}
                  <div className="lg:col-span-1">
                    <div className="flex flex-col items-center">
                      <div className="relative group mb-6">
                        <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-white dark:ring-slate-700 shadow-xl transition-transform duration-300 group-hover:scale-105">
                          <AvatarImage 
                            src={profile.avatarUrl} 
                            alt={profile.name}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-600 dark:to-slate-700 text-slate-600 dark:text-slate-300 text-2xl font-light">
                            {profile.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 rounded-full bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      <div className="text-center">
                        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100 mb-1">
                          {profile.name}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                          {profile.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Section */}
                  <div className="lg:col-span-2">
                    {isEditing ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSave();
                        }}
                        className="space-y-6"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            <User className="w-4 h-4 inline mr-2" />
                            Nama Lengkap
                          </Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className={`bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 transition-all duration-200 ${
                              errors.name ? "border-red-400 focus:ring-red-200" : ""
                            }`}
                            placeholder="Masukkan nama lengkap"
                            disabled={isSaving}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1 flex items-center">
                              <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            <Mail className="w-4 h-4 inline mr-2" />
                            Alamat Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            disabled={true}
                            className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
                          />
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Email tidak dapat diubah
                          </p>
                        </div>

                        <Separator className="my-6 bg-slate-100 dark:bg-slate-700" />

                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button 
                            type="submit" 
                            disabled={isSaving}
                            className="bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 text-white transition-colors duration-200"
                          >
                            {isSaving ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Menyimpan...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4 mr-2" />
                                Simpan Perubahan
                              </>
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
                            className="border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Batal
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center">
                              <User className="w-4 h-4 mr-2" />
                              Nama Lengkap
                            </h4>
                            <p className="text-slate-800 dark:text-slate-200 font-light text-base">
                              {profile.name}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center">
                              <Mail className="w-4 h-4 mr-2" />
                              Email
                            </h4>
                            <p className="text-slate-800 dark:text-slate-200 font-light text-base">
                              {profile.email}
                            </p>
                          </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-800 dark:text-slate-200">
                                Akun Terverifikasi
                              </h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Email Anda telah diverifikasi
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}