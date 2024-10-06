import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ThemeToggleButton from './ThemeToggleButton';
import { DarkModeProvider } from '../contexts/DarkModeContextProvider';

export default function App() {
    return (
        <DarkModeProvider>
            <Router>
                <ThemeToggleButton />
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </Router>
        </DarkModeProvider>
    );
}