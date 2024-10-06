import LoginForm from './LoginForm';
import ThemeToggleButton from './ThemeToggleButton.tsx';
import { DarkModeProvider } from "../contexts/DarkModeContextProvider.tsx";


export default function App() {
    return (
        <DarkModeProvider>
            <ThemeToggleButton/>
            <LoginForm />
        </DarkModeProvider>
    );
}
