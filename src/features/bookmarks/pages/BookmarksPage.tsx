import { Outlet } from 'react-router-dom';
import Layout from '../../../shared/components/layout/Layout';
import { BookmarksNavbar } from '../components/BookmarksNavbar';

export const BookmarksPage = () => {
  return (
    <Layout>
      <BookmarksNavbar />

      <Outlet />
    </Layout>
  );
};
