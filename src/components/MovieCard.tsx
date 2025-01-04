export default function MovieCard() {
    return (
        <div className="movie-card">
            <div className="movie-card__image">
                <img src="https://via.placeholder.com/300" alt="movie" />
            </div>
            <div className="movie-card__info">
                <h2 className="movie-card_title"></h2>
                <p className="movie-card_node">Note : {}</p>
            </div>
        </div>
    );
}