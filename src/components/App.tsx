import AppRouter from '../routers/router';

import { DarkModeProvider } from '../contexts/DarkModeContextProvider';

export default function App() {
    return (
        <DarkModeProvider>
            <AppRouter />
        </DarkModeProvider>
    );
}