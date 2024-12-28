import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const myRoot = document.getElementById('root');

if (!myRoot) {
  throw new Error('Root element not found');
}

const root = createRoot(myRoot);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
