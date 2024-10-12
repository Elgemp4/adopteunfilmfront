import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";

export default function MovieDescription() {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

    const movieContext = useMovieContext();

    if(movieContext == undefined){
        throw new Error("Context undefined");
    }

    const {movie_description} = movieContext;

    const toggleDescription = () => {
        setIsDescriptionExpanded(!isDescriptionExpanded);
    };

    return <div className={`movie-description ${isDescriptionExpanded ? 'expanded' : ''}`}>
        <button className="expand-button" onClick={toggleDescription}>
            {isDescriptionExpanded ? 'Réduire' : 'Agrandir'}
        </button>
        <div>
            {movie_description}
        </div>
    </div>
}