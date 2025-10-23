import { SidebarProvider } from '../ui/sidebar';
import { Navbar } from './Navbar';
import { AppSidebar } from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex w-full flex-auto flex-col items-start justify-start'>
        <Navbar />

        <div className='flex w-full flex-auto flex-col items-start justify-start gap-4 bg-teal-50 p-8'>
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
