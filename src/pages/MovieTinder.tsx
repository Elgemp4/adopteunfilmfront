import SwipeCard from '../components/SwipeCard';
import EvaluationButtons from '../components/EvaluationButtons';
import MovieDescription from '../components/MovieDescription';
import MovieProvider from '../contexts/MovieContext';
import Button from '../components/forms/Button';
import { useNavigate } from 'react-router-dom';


export default function MovieTinder() {

    const navigate = useNavigate();

    return (
        <div className="movie-tinder">
            <div className="header">
                <Button 
                    name='settings'
                    text='Settings'
                    key={"settings"}
                    onClick={() => navigate("/settings")}
                    className="settings-button material-symbols-outlined" />
                <Button 
                    name='groups'
                    text='Groups'
                    key={'groups'}
                    onClick={() => navigate("/groups")}
                    className="groups-button material-symbols-outlined"/>
            </div>
            <div className="movie-container">
                <MovieProvider>
                    <SwipeCard/>
                    <EvaluationButtons/>
                    <MovieDescription/>
                </MovieProvider>
            </div>
        </div>
    );
}