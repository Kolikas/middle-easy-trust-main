import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

function setFavicon(href: string): void {
  let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/x-icon';
  link.href = href;
}

setFavicon('/favicon.ico');

createRoot(document.getElementById("root")!).render(<App />);
