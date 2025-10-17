'use client';

import * as React from 'react';
import { type Icon } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/src/components/ui/sidebar';

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: Icon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={pathname === item.url || pathname.startsWith(item.url) ? 'bg-muted' : ''}
              >
                <Link href={item.url}>
                  <item.icon
                    className={
                      pathname === item.url || pathname.startsWith(item.url) ? 'text-primary' : ''
                    }
                  />
                  <span
                    className={
                      pathname === item.url || pathname.startsWith(item.url)
                        ? 'font-medium text-primary'
                        : ''
                    }
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
