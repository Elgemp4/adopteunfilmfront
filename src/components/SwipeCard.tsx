import { useMovieContext } from "../contexts/MovieContext";

export default function SwipeCard() {
    const movieContext = useMovieContext();

    if(movieContext == undefined){
        throw new Error("Context undefined");
    }

    const {movie_image, movie_title} = movieContext;

    return <img src={movie_image} alt={movie_title} className="movie-image" />   
}