import { useEffect, useRef } from "react";
import { useGroupContext } from "../contexts/GroupContext";
import MovieCard from "../components/MovieCard";
import { useNavigate, useParams } from "react-router-dom";

export default function GroupMovieSuggestion() {
    const context = useGroupContext();

    const isInTriggerZone = useRef(false);

    const { idGroup, idUsers } = useParams<{ idGroup: string, idUsers: string}>();

    const groupContext = useGroupContext();
    const navigate = useNavigate();

    //Set the id of the selected group
    useEffect(() => {
        if(idGroup == undefined || idUsers == undefined){
            return;
        }
        async function load(group : string, users : string) {
            context?.chooseGroup(parseInt(group));
            context?.chooseUsers(users.split(',').map(id => parseInt(id)));
        }
        load(idGroup, idUsers);

    }, [idGroup]);

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

    return (
        
        <div className="movie-suggestions">
            {context?.suggestedMovies.map(suggestion => {
                const movie = suggestion.movie;
                const users = suggestion.users;

                return <MovieCard key={movie.id} movie={movie} users={users} onSeen={() => {
                    context?.setSeen(movie.id);
                }} />;
            })}
        </div>
        
    );
}