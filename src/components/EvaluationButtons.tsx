import {useMovieContext} from "../contexts/MovieContext";
import {useState} from "react";

export default function EvaluationButtons() {
    const movieContext = useMovieContext();

    if (movieContext == undefined) {
        throw new Error("Context undefined");
    }

    const {like, dislike, seen} = movieContext;
    const [isSeenActive, setIsSeenActive] = useState(false);

    const handleDislike = () => {
        dislike();
        resetSeenState();
    };

    const handleSeen = () => {
        seen();
        setIsSeenActive((prev) => !prev);
    };

    const handleLike = () => {
        like();
        resetSeenState();
    };

    const resetSeenState = () => {
        setIsSeenActive(false); // Remet l'icône de "seen" à l'état normal
    };


    return <div className="preferences-buttons-container">
        <button className="button button--dislike material-symbols-outlined" onClick={handleDislike}>thumb_down</button>
        <button
            className={`button button--seen material-symbols-outlined ${
                isSeenActive ? "active" : ""
            }`}
            onClick={handleSeen}
        >
            {isSeenActive ? "visibility" : "visibility_off"}
        </button>
        <button className="button button--like material-symbols-outlined" onClick={handleLike}>thumb_up</button>
    </div>
}