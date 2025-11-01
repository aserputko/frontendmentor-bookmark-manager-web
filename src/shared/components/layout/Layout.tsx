import { SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className='h-full'>
      <AppSidebar />
      <main className='flex w-full flex-auto flex-col items-start justify-start'>{children}</main>
    </SidebarProvider>
  );
}
