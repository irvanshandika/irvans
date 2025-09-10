'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';
import { LayoutDashboard, Users, FolderKanban, UserCircle, Menu, X } from 'lucide-react';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    name: 'Projects',
    href: '/dashboard/projects',
    icon: FolderKanban
  },
  {
    name: 'Management Users',
    href: '/dashboard/users',
    icon: Users
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: UserCircle
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar for mobile (overlay) */}
      <div
        className={cn(
          'fixed inset-0 z-40 transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="bg-black/50 absolute inset-0" onClick={toggleSidebar}></div>
        <nav className="relative w-64 max-w-[80%] h-full bg-background border-r border-border shadow-lg flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-xl font-bold">Portfolio Dashboard</h2>
          </div>
          <div className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-2 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                      pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Sidebar for desktop (fixed) */}
      <div className="hidden lg:flex h-screen w-64 flex-col fixed left-0 top-0 border-r border-border">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold">Portfolio Dashboard</h2>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}