import { useMovieContext } from "../contexts/MovieContext";

export default function MovieDescription() {
    const movieContext = useMovieContext();

    if(movieContext == undefined){
        throw new Error("Context undefined");
    }

    const {movie_description, movie_title} = movieContext;

    return <div className={`movie-info`}>
        <div>
            <h3 className="movie-info__title">{movie_title}</h3>
            <p className="movie-info__description">{movie_description}</p>
        </div>
    </div>
}