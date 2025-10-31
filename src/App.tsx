import { QueryProvider } from './app/providers/QueryProvider';
import { RouterProvider } from './app/providers/RouterProvider';
import { Toaster } from './shared/components/ui/sonner';

function App() {
  return (
    <QueryProvider>
      <RouterProvider />
      <Toaster />
    </QueryProvider>
  );
}

export default App;
