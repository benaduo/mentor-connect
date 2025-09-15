'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import SidebarNav from '@/components/layout/sidebar-nav';
import { UserNav } from '@/components/layout/user-nav';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '../ui/button';

export function AppShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  // Using a cookie to store the sidebar state
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    const sidebarState = document.cookie.includes('sidebar_state=true');
    setOpen(sidebarState);
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    document.cookie = `sidebar_state=${isOpen}; path=/; max-age=604800`;
  };

  return (
    <SidebarProvider
      open={open}
      onOpenChange={handleOpenChange}
      defaultOpen={true}
    >
      <Sidebar>
        <SidebarNav />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
          <SidebarTrigger className="flex md:hidden" />

          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <UserNav />
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}