import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from './contexts/AuthContext';

import { Routes } from './routes';

function App() {
  return (
    <AuthContextProvider>
      <Toaster
        position="top-right"
        reverseOrder
      />

      <Routes />
    </AuthContextProvider>
  );
}

export default App;
