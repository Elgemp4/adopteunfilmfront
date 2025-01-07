import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import api from "./api";


interface MovieContextType{
    movie_image: string,
    movie_title: string,
    movie_release_date: string,
    movie_vote_avg: number,
    movie_vote_count: number,
    movie_description: string,
    movie_genres: Array<any>,
    like: () => void,
    dislike: () => void,
    seen: () => void
}

interface MovieApiResponseType{
    id: number,
    adult: boolean,
    title: string,
    description: string,
    poster_path: string,
    release_date: string,
    genres: Array<any>,
    vote_avg: number,
    vote_count: number,
}

const MovieContext = createContext<MovieContextType|undefined>(undefined);


export default function MovieProvider({children}: {children: ReactNode}) {
    const [movieList, setMovieList] = useState<MovieApiResponseType[]>([]);

    const [loading, setLoading] = useState(true);

    const [seen, setSeen] = useState(false);
    const [, setAppreciate] = useState(false);
    
    useEffect(() => {
        loadMovies();
    }, [])

    async function loadMovies() {
        try{
            setLoading(true);
            
            const suggestedMovies = await api.get("/movies");
            setMovieList(suggestedMovies.data);
        }
        catch(err : any){
            console.log(err.response);
        }
        finally{
            setLoading(false);
        }
    }

    const onLike = async () => {
        await evaluate(true);
    }

    const onDislike = async () => {
        await evaluate(false);
    }

    const evaluate = async (appreciateValue: boolean) => {
        try {
            setAppreciate(appreciateValue);
            await sendEvaluation(appreciateValue); // Passez la nouvelle valeur directement
            await removeEvaluatedMovie();
        } catch (_) {
            alert("Une erreur est survenue lors de l'évaluation du film. Veuillez réessayer");
        }
    };


    const onSeen = () => {
        setSeen(!seen);
    }

    const sendEvaluation = async (appreciateValue: boolean) => {
        await api.post("/movies", {
            movieId: movieList[0].id,
            seen,
            appreciate: appreciateValue,
        });
    };


    const removeEvaluatedMovie = async () => {
        setSeen(false);
        setMovieList(movieList.slice(1, undefined));

        if(movieList.length <= 1){
            await loadMovies();
        }
    }

    if(!loading && movieList.length == 0){
        return <div>Erreur de connection, veuillez recharger la page...</div>
    }

    return loading ? <h1>Loading ...</h1> : <MovieContext.Provider value={{
        movie_image: movieList[0].poster_path,
        movie_title: movieList[0].title,
        movie_description: movieList[0].description,
        movie_release_date: movieList[0].release_date,
        movie_vote_avg: movieList[0].vote_avg,
        movie_vote_count: movieList[0].vote_count,
        movie_genres: movieList[0].genres,
        like: onLike, dislike: onDislike, seen: onSeen
    }}>
        {children}
    </MovieContext.Provider>
}

export const useMovieContext = () => {
    return useContext(MovieContext);
}