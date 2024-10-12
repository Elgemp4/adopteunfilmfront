import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

export default function MovieDescription() {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const movieContext = useMovieContext();

    if(movieContext == undefined){
        throw new Error("Context undefined");
    }

    const {movie_description, movie_title} = movieContext;

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    return <div className={`movie-info ${isDescriptionExpanded ? 'expanded' : ''}`}>
        <button className="expand-button" onClick={toggleDescription}>
            {isDescriptionExpanded ? 'Réduire' : 'Agrandir'}
        </button>
        <div>
            <h3 className="movie-info__title">{movie_title}</h3>
            <p className="movie-info__description">{movie_description}</p>
        </div>
    </div>
}