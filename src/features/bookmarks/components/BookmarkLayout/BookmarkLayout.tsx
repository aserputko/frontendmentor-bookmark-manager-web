import { SidebarProvider } from '../../../../shared/components/ui/sidebar';
import { BookmarSidebar } from '../BookmarSidebar/BookmarSidebar';

export const BookmarkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className='h-full'>
      <BookmarSidebar />
      <main className='flex w-full flex-auto flex-col items-start justify-start'>{children}</main>
    </SidebarProvider>
  );
};
