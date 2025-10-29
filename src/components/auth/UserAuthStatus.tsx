'use client';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import Link from 'next/link';
import toast from 'react-hot-toast';

export function UserAuthStatus() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  if (isLoading) {
    return (
      <div className="text-sm text-foreground/70 dark:text-foreground/50">
        Loading...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex gap-2">
        <Link href="/auth/login">
          <Button
            variant="outline"
            size="sm"
            className="border-border dark:border-border-dark"
          >
            Login
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button size="sm">Register</Button>
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    toast.success(`See You Again, ${session.user?.name}!`, {
      duration: 5000,
    });
    await signOut({ callbackUrl: '/' });
  };

  const truncateName = (
    name: string | null | undefined,
    max: number = 12
  ) => {
    if (!name) return 'Profile';
    return name.length > max ? name.slice(0, max) + '…' : name;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full border border-border dark:border-border-dark bg-background dark:bg-background-dark p-1 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent-dark dark:hover:text-accent-foreground-dark transition-colors">
            <Image
              src={session.user?.image || '/placeholder.svg'}
              alt={session.user?.name || 'Profile'}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-foreground dark:text-foreground-dark">
              {truncateName(session.user?.name)}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 text-foreground/70 dark:text-foreground-dark/70"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 bg-popover dark:bg-popover-dark text-popover-foreground dark:text-popover-foreground-dark border-border dark:border-border-dark"
          align="end"
        >
          <DropdownMenuLabel>
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] relative">
                <Image
                  src={session.user?.image || '/placeholder.svg'}
                  alt={session.user?.name || 'Profile'}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col space-y-0.5">
                <span className="font-medium truncate text-foreground dark:text-foreground-dark">
                  {session.user?.name}
                </span>
                <span className="text-xs text-muted-foreground dark:text-muted-foreground-dark truncate">
                  {session.user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-border dark:bg-border-dark" />
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="cursor-pointer flex items-center text-foreground dark:text-foreground-dark hover:bg-accent dark:hover:bg-accent-dark"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M3 3H10.2V10.2H3V3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.8 3H21V10.2H13.8V3Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 13.8H10.2V21H3V13.8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.8 13.8H21V21H13.8V13.8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href="/profile"
              className="cursor-pointer flex items-center text-foreground dark:text-foreground-dark hover:bg-accent dark:hover:bg-accent-dark"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2"
              >
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer flex items-center text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 focus:text-red-600 dark:focus:text-red-400"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 17L21 12L16 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 12H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
