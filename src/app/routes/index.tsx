import { createBrowserRouter } from 'react-router-dom';

import MainLayout from 'shared/ui/main-layout';
import { TodoListPage } from 'pages/todo-list';
import { TodoDetailsPage } from 'pages/todo-details';
// import { FeedPage } from 'pages/feed';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TodoListPage />,
      },
      {
        path: ':id',
        element: <TodoDetailsPage />,
      },
    ],
  },
]);

export default Router;
