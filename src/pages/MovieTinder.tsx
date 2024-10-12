import { useState } from 'react';

export default function MovieTinder() {
    const [movie, setMovie] = useState({
        title: 'Example Movie',
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel excepturi officiis nam esse explicabo. Quaerat ut consequuntur quo sapiente ex perferendis id consectetur doloremque cumque. Consequatur facilis aperiam iste et.",
        imageUrl: 'https://placehold.co/300x450'
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
                <button className="settings-button material-symbols-outlined">Settings</button>
                <button className="groups-button material-symbols-outlined">Groups</button>
            </div>
            <div className="movie-container">
                <img src={movie.imageUrl} alt={movie.title} className="movie-image" />
                <div className="preferencesButtons-container">
                    <button className="dislike-button material-symbols-outlined" onClick={handleDislike}>thumb_down</button>
                    <button className="seen-button material-symbols-outlined" onClick={handleSeen}>visibility</button>
                    <button className="like-button material-symbols-outlined" onClick={handleLike}>thumb_up</button>
                </div>
                <div className={`movie-description ${isDescriptionExpanded ? 'expanded' : ''}`}>
                    <button className="expand-button" onClick={toggleDescription}>
                        {isDescriptionExpanded ? 'Réduire' : 'Agrandir'}
                    </button>
                    <div>
                        {movie.description}
                    </div>
                </div>
            </div>
        </div>
    );
}