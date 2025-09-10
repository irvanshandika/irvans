'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Simulasi data profil pengguna
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Full-stack developer with 5 years of experience in React, Node.js, and TypeScript.',
    avatarUrl: '/placeholder-avatar.jpg',
  });
  
  const handleSave = () => {
    // Simulasi penyimpanan data
    setTimeout(() => {
      setIsEditing(false);
      // Tampilkan toast sukses di implementasi sebenarnya
    }, 500);
  };
  
  return (
    <div className="container mx-auto py-6">
      <Toaster position="top-right" />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-500">Manage your account information</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            {!isEditing && (
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
          
          <div className="flex-1">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                {isEditing ? (
                  <Input 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900">{profile.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {isEditing ? (
                  <Input 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    type="email"
                  />
                ) : (
                  <p className="text-gray-900">{profile.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                {isEditing ? (
                  <Textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-900">{profile.bio}</p>
                )}
              </div>
              
              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave}>Save Changes</Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}