import { Button } from './shared/components/ui/button';

function App() {
  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <Button onClick={() => alert('Clicked!')}>Click me</Button>
    </div>
  );
}

export default App;
