import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import './global.sass';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </StrictMode>,
);