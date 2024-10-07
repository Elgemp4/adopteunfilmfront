import AppRouter from '../routers/router';
import ThemeToggleButton from './ThemeToggleButton';
import { DarkModeProvider } from '../contexts/DarkModeContextProvider';

export default function App() {
    return (
        <DarkModeProvider>
            <AppRouter />
            <ThemeToggleButton />
        </DarkModeProvider>
    );
}