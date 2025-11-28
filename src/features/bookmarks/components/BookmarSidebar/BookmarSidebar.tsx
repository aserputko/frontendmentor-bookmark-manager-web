import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon, IconName, IconSize } from '../../../../shared/components/ui/icon';
import { Logo } from '../../../../shared/components/ui/logo';

export function BookmarSidebar() {
  const location = useLocation();

  const isActive = useCallback(
    (url: string) => {
      return location.pathname === url;
    },
    [location.pathname],
  );

  const items = useMemo(
    () => [
      {
        title: 'Home',
        url: '/bookmarks/all',
        icon: IconName.House,
        isActive: isActive('/bookmarks/all'),
      },
      {
        title: 'Archived',
        url: '/bookmarks/archived',
        icon: IconName.Archive,
        isActive: isActive('/bookmarks/archived'),
      },
    ],
    [isActive],
  );

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild variant={item.isActive ? 'active' : 'default'}>
                    <Link to={item.url}>
                      <Icon name={item.icon} size={IconSize.Large} />
                      <span className='text-preset-3 flex flex-auto'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isActive('/bookmarks/all') && (
          <SidebarGroup>
            <SidebarGroupLabel>Tags</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Tag 111</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Tag 222</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Tag 333</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {isActive('/bookmarks/archived') && (
          <SidebarGroup>
            <SidebarGroupLabel>Tags</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Tag 444</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
