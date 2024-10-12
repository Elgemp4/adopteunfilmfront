import { useMovieContext } from "../contexts/MovieContext";

export default function EvaluationButtons() {
    const movieContext = useMovieContext();

    if(movieContext == undefined){
        throw new Error("Context undefined");
    }

    const {like, dislike, seen} = movieContext;
    
    const handleDislike = () => {
        dislike();
    };

    const handleSeen = () => {
        seen();
    };

    const handleLike = () => {
        like();
    };


    return <div className="preferencesButtons-container">
    <button className="dislike-button material-symbols-outlined" onClick={handleDislike}>thumb_down</button>
    <button className="seen-button material-symbols-outlined" onClick={handleSeen}>visibility</button>
    <button className="like-button material-symbols-outlined" onClick={handleLike}>thumb_up</button>
    </div>
}