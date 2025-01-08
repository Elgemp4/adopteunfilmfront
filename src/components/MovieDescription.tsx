import { useMovieContext } from "../contexts/MovieContext";
import MetaData from "./MetaData";
import Tag from "./Tag";

export default function MovieDescription() {
    const movieContext = useMovieContext();

    if(movieContext == undefined){
        throw new Error("Context undefined");
    }

    const {movie_description, movie_title, movie_genres, movie_release_date, movie_vote_avg, movie_vote_count} = movieContext;

    return <div className={`movie-info`}>
        <div>
            <h3 className="movie-info__title">{movie_title}</h3>
            <div className="metadata-container">
                <MetaData title="Date" value={movie_release_date?.split("T")[0]}/>
                <MetaData title="Note" value={movie_vote_avg.toString()}/>
                <MetaData title="Votes" value={movie_vote_count.toString()}/>
            </div>
            <hr className="separator"/>
            <p className="movie-info__description">{movie_description}</p>
            <hr className="separator" />
            <div className="genre-tags">
                {movie_genres.map((value) => <Tag value={value.name}/>)} 
            </div>
        </div>
    </div>
}