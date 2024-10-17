import { useDarkMode } from '../contexts/DarkModeContextProvider';

export default function ThemeToggleButton() {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <button
            onClick={toggleDarkMode}
            className="theme-toggle-button material-symbols-outlined"
        >
            {darkMode ? 'light_mode' : 'dark_mode'}
        </button>
    );
}