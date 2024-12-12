import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppLayout } from './layouts/AppLayout';
import { AppRoutes } from './routes';
import { TelegramProvider } from './providers/TelegramProvider';

function App() {
  return (
    <BrowserRouter>
      <TelegramProvider>
        <Toaster position="top-center" />
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </TelegramProvider>
    </BrowserRouter>
  );
}

export default App;