import { ReactNode, createContext, useContext, useState } from "react";


interface MovieContextType{
    movie_image: string,
    movie_title: string,
    movie_description: string,
    like: () => void,
    dislike: () => void,
    seen: () => void
}


const MovieContext = createContext<MovieContextType|undefined>(undefined);

export default function MovieProvider({children}: {children: ReactNode}) {
    const [movie] = useState({
        title: 'Example Movie',
        description: "Loreuuuum ipsum dolor sit amet consectetur adipisicing elit. Vel excepturi officiis nam esse explicabo. Quaerat ut consequuntur quo sapiente ex perferendis id consectetur doloremque cumque. Consequatur facilis aperiam iste et.",
        imageUrl: 'https://placehold.co/300x450'
    });

    const like = () => {

    }

    const dislike = () => {

    }

    const seen = () => {

    }

    return <MovieContext.Provider value={{
        movie_image: movie.imageUrl,
        movie_title: movie.title,
        movie_description: movie.description,
        like, dislike, seen
    }}>
        {children}
    </MovieContext.Provider>
}

export const useMovieContext = () => {
    return useContext(MovieContext);
}