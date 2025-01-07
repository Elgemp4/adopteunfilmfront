import { useNavigate } from 'react-router-dom';
import Button from './forms/Button';
import { useUserContext } from '../contexts/UserContext';

export default function TopBar() {
    const navigate = useNavigate();
    const { isLoggedIn } = useUserContext();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <nav className="top-bar">
            <Button
                name='settings'
                text='Settings'
                key={'settings'}
                onClick={() => navigate("/settings")}
                className="settings-button material-symbols-outlined" />
            <Button
                name='groups'
                text='Groups'
                key={'groups'}
                onClick={() => navigate("/groups")}
                className="groups-button material-symbols-outlined"/>
            <Button
                name='movieTinder'
                text='Movie'
                key={'movie'}
                onClick={() => navigate("/movies")}
                className="movie-tinder-button material-symbols-outlined"
            />
        </nav>
    );
}