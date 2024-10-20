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
    
    useEffect(() => {
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

        loadMovies();
    }, [])

    /*const [movie] = useState({
        title: 'Example Movie',
        description: "Loreuuuum ipsum dolor sit amet consectetur adipisicing elit. Vel excepturi officiis nam esse explicabo. Quaerat ut consequuntur quo sapiente ex perferendis id consectetur doloremque cumque. Consequatur facilis aperiam iste et.",
        imageUrl: 'https://placehold.co/300x450'
    });*/

    const like = () => {
        console.log("like")
        setMovieList(movieList.splice(0, 1));
    }

    const dislike = () => {
        console.log("dislike")
        setMovieList(movieList.splice(0, 1));
    }

    const seen = () => {
        console.log("seen")
    }

    return loading ? <h1>Loading ...</h1> : <MovieContext.Provider value={{
        movie_image: movieList[0].poster_path,
        movie_title: movieList[0].title,
        movie_description: movieList[0].description,
        like, dislike, seen
    }}>
        {children}
    </MovieContext.Provider>
}

export const useMovieContext = () => {
    return useContext(MovieContext);
}