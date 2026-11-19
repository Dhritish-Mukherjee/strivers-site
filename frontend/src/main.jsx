import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

// Dismiss preloader smoothly once mounted
if (typeof window !== 'undefined') {
  if (typeof window.__dismissPreloader === 'function') {
    window.__dismissPreloader();
  } else {
    const preloader = document.getElementById('app-preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => preloader.remove(), 250);
    }
  }
}
