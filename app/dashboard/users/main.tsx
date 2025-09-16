'use client';
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Loader2, UserPlus, Edit, Check, X } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/src/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/src/components/ui/dialog';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  accountId: string;
};

export default function UsersMain() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleRoleChange = async (user: User, newRole: 'user' | 'admin') => {
    try {
      const response = await fetch(`/api/users/${user.accountId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user role');
      }
      
      // Update local state
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, role: newRole } : u
        )
      );
      
      toast.success(`Role updated to ${newRole}`);
      setIsRoleDialogOpen(false);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };
  
  const openRoleDialog = (user: User) => {
    setSelectedUser(user);
    setIsRoleDialogOpen(true);
  };
  
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <Toaster position="top-right" />
      
      <Card className="mb-8 border-none shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-medium">Pengguna</CardTitle>
              <CardDescription className="text-muted-foreground mt-1">
                Kelola akun pengguna dan hak akses
              </CardDescription>
            </div>
            
            <Button size="sm" className="h-9">
              <UserPlus className="mr-2 h-4 w-4" />
              Tambah Pengguna
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nama</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tanggal Bergabung</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'admin' 
                            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                            : 'bg-green-50 text-green-700 border border-green-200'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{user.createdAt}</td>
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openRoleDialog(user)}>
                              Ubah Role
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Dialog untuk mengubah role */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ubah Role Pengguna</DialogTitle>
            <DialogDescription>
              Ubah role untuk pengguna {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">User</span>
              <Button
                variant={selectedUser?.role === 'user' ? 'default' : 'outline'}
                size="sm"
                onClick={() => selectedUser && handleRoleChange(selectedUser, 'user')}
                className="w-24"
              >
                {selectedUser?.role === 'user' && <Check className="h-4 w-4 mr-2" />}
                Pilih
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Admin</span>
              <Button
                variant={selectedUser?.role === 'admin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => selectedUser && handleRoleChange(selectedUser, 'admin')}
                className="w-24"
              >
                {selectedUser?.role === 'admin' && <Check className="h-4 w-4 mr-2" />}
                Pilih
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Batal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}