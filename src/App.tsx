import { QueryProvider } from './app/providers/QueryProvider';
import { RouterProvider } from './app/providers/RouterProvider';

function App() {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  );
}

export default App;
