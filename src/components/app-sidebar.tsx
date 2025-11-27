/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';

import { NavClouds } from '@/src/components/nav-clouds';
import { NavDocuments } from '@/src/components/nav-documents';
import { NavMain } from '@/src/components/nav-main';
import { NavSecondary } from '@/src/components/nav-secondary';
import { NavUser } from '@/src/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/src/components/ui/sidebar';
import Link from 'next/link';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Projects',
      url: '/dashboard/projects',
      icon: IconFolder,
    },
    {
      title: 'Users',
      url: '/dashboard/users',
      icon: IconUsers,
    },
    {
      title: 'Analytics',
      url: '/dashboard/analytics',
      icon: IconChartBar,
    },
    {
      title: 'Reports',
      url: '/dashboard/reports',
      icon: IconReport,
    },
  ],
  navClouds: [
    {
      title: 'Projects',
      icon: IconFolder,
      isActive: true,
      url: '/dashboard/projects',
      items: [
        {
          title: 'All Projects',
          url: '/dashboard/projects',
        },
        {
          title: 'Create New',
          url: '/dashboard/projects/create',
        },
      ],
    },
    {
      title: 'Users',
      icon: IconUsers,
      url: '/dashboard/users',
      items: [
        {
          title: 'All Users',
          url: '/dashboard/users',
        },
        {
          title: 'User Roles',
          url: '/dashboard/users/roles',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Profile',
      url: '/profile',
      icon: IconSettings,
    },
    {
      title: 'Help',
      url: '#',
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: 'Documentation',
      url: '/documentation',
      icon: IconFileDescription,
    },
    {
      name: 'API Reference',
      url: '/api-reference',
      icon: IconFileWord,
    },
    {
      name: 'Resources',
      url: '/resources',
      icon: IconDatabase,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
              <Link href="/" aria-label="Home">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Irvans</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavClouds items={data.navClouds} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
