import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { LanguageProvider } from './contexts/LanguageContext';
import { DataProvider } from './contexts/DataContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </LanguageProvider>
  </StrictMode>
);
