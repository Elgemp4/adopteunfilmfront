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


    return <div className="preferences-buttons-container">
    <button className="button button--dislike material-symbols-outlined" onClick={handleDislike}>thumb_down</button>
    <button className="button button--seen material-symbols-outlined" onClick={handleSeen}>visibility</button>
    <button className="button button--like material-symbols-outlined" onClick={handleLike}>thumb_up</button>
    </div>
}