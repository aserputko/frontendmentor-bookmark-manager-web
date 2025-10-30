import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AllBookmarksPage, ArchivedBookmarksPage, BookmarksPage } from '../features/bookmarks';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/bookmarks' replace />,
  },
  {
    path: '/bookmarks',
    element: <BookmarksPage />,
    children: [
      {
        index: true,
        element: <Navigate to='all' replace />,
      },
      {
        path: 'all',
        element: <AllBookmarksPage />,
      },
      {
        path: 'archived',
        element: <ArchivedBookmarksPage />,
      },
    ],
  },
]);
