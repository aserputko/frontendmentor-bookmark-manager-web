import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AllBookmarks, ArchivedBookmarks, BookmarksPage } from '../features/bookmarks';

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
        element: <AllBookmarks />,
      },
      {
        path: 'archived',
        element: <ArchivedBookmarks />,
      },
    ],
  },
]);
