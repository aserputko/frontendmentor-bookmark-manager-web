import { Outlet } from 'react-router-dom';
import { BookmarkLayout } from '../components/BookmarkLayout';
import { BookmarksNavbar } from '../components/BookmarksNavbar';

export const BookmarksPage = () => {
  return (
    <BookmarkLayout>
      <BookmarksNavbar />
      <Outlet />
    </BookmarkLayout>
  );
};
