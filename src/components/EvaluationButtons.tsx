export default function EvaluationButtons() {
    const handleDislike = () => {
        console.log('Dislike');
    };

    const handleSeen = () => {
        console.log('Already Seen');
    };

    const handleLike = () => {
        console.log('Like');
    };


    return <div className="preferencesButtons-container">
    <button className="dislike-button material-symbols-outlined" onClick={handleDislike}>thumb_down</button>
    <button className="seen-button material-symbols-outlined" onClick={handleSeen}>visibility</button>
    <button className="like-button material-symbols-outlined" onClick={handleLike}>thumb_up</button>
    </div>
}