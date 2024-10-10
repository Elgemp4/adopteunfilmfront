import { useState } from 'react';

export default function MovieTinder() {
    const [movie, setMovie] = useState({
        title: 'Example Movie',
        description: 'This is an example movie description. Im trying to make it as long as possible to see how it looks when it is expanded.',
        imageUrl: 'https://via.placeholder.com/300x450'
    });

    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const handleDislike = () => {
        console.log('Dislike');
    };

    const handleSeen = () => {
        console.log('Already Seen');
    };

    const handleLike = () => {
        console.log('Like');
    };

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    return (
        <div className="movie-tinder">
            <div className="header">
                <button className="settings-button">Settings</button>
                <button className="groups-button">Groups</button>
            </div>
            <div className="movie-container">
                <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
                <div className="preferencesButtons-container">
                    <button className="dislike-button" onClick={handleDislike}>Je n'aime pas</button>
                    <button className="seen-button" onClick={handleSeen}>Déjà vu</button>
                    <button className="like-button" onClick={handleLike}>J'aime</button>
                </div>
                <div className={`movie-description ${isDescriptionExpanded ? 'expanded' : ''}`}>
                    <button className="expand-button" onClick={toggleDescription}>
                        {isDescriptionExpanded ? 'Réduire' : 'Agrandir'}
                    </button>
                    {movie.description}
                </div>
            </div>
        </div>
    );
}