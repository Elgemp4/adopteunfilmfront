import { useEffect, useRef } from "react";
import { useGroupContext } from "../contexts/GroupContext";
import MovieCard from "../components/MovieCard";

export default function GroupMovieSuggestion() {
    const context = useGroupContext();

    const isInTriggerZone = useRef(false);

    useEffect(() => {
        context?.loadGroupSuggestedMovies(0);
    }, []);

    useEffect(() => {
        const handleScroll = async () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
    
            if(!isInTriggerZone.current && scrollTop + windowHeight >= documentHeight - 50){
                isInTriggerZone.current = true;
                
                await context?.loadGroupSuggestedMovies(context?.suggestedMovies.length);
            }
            else{
                isInTriggerZone.current = false;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [context]);

    console.log(context?.suggestedMovies.length);
    return (
        
        <div className="movie-suggestions">
            {context?.suggestedMovies.map(suggestion => {
                const movie = suggestion.movie;
                const users = suggestion.users;

                return <MovieCard key={movie.id} movie={movie} users={users} />;
            })}
        </div>
        
    );
}