import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import api from "./api";


interface MovieContextType{
    movie_image: string,
    movie_title: string,
    movie_description: string,
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
    vote_avg: number
}

const MovieContext = createContext<MovieContextType|undefined>(undefined);


export default function MovieProvider({children}: {children: ReactNode}) {
    const [movieList, setMovieList] = useState<MovieApiResponseType[]>([]);

    const [loading, setLoading] = useState(true);

    const [seen, setSeen] = useState(false);
    const [appreciate, setAppreciate] = useState(false);
    
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

    const evaluate = async (appreciate : boolean) => {
        try{
            setAppreciate(appreciate);
            await sendEvaluation();
            await removeEvaluatedMovie();
        }
        catch(_){
            alert("Une erreur est survenue lors de l'évaluation du film. Veuillez réesayer")
        }
    }

    const onSeen = () => {
        setSeen(!onSeen);
    }

    const sendEvaluation = async () => {
        await api.post("/movies", 
            {
                movieId: movieList[0].id,
                seen,
                appreciate
            }
        );
    }

    const removeEvaluatedMovie = async () => {
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
        like: onLike, dislike: onDislike, seen: onSeen
    }}>
        {children}
    </MovieContext.Provider>
}

export const useMovieContext = () => {
    return useContext(MovieContext);
}