import SwipeCard from '../components/SwipeCard';
import EvaluationButtons from '../components/EvaluationButtons';
import MovieDescription from '../components/MovieDescription';
import MovieProvider from '../contexts/MovieContext';

export default function MovieTinder() {
    return (
        <div className="movie-tinder">
            <div className="header">
                <button className="settings-button material-symbols-outlined">Settings</button>
                <button className="groups-button material-symbols-outlined">Groups</button>
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