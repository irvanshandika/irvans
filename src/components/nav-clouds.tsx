import { type Icon } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/src/components/ui/sidebar';

export function NavClouds({
  items,
  className,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup className={className}>
      <SidebarGroupLabel>Modules</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(item => {
            if (item.items && item.items.length > 0) {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  <SidebarMenu>
                    {item.items.map(subItem => (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton
                          asChild
                          tooltip={subItem.title}
                          className={pathname === subItem.url ? 'bg-muted' : ''}
                        >
                          <Link href={subItem.url}>
                            <span
                              className={pathname === subItem.url ? 'font-medium text-primary' : ''}
                            >
                              {subItem.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarMenuItem>
              );
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={
                    pathname === item.url || pathname.startsWith(item.url) ? 'bg-muted' : ''
                  }
                >
                  <Link href={item.url}>
                    {item.icon && (
                      <item.icon
                        className={
                          pathname === item.url || pathname.startsWith(item.url)
                            ? 'text-primary'
                            : ''
                        }
                      />
                    )}
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
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
