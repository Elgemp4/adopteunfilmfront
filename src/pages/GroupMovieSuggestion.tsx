import { useEffect } from "react";
import { useGroupContext } from "../contexts/GroupContext";

export default function GroupMovieSuggestion() {

    const context = useGroupContext();

    useEffect(() => {
        loadGroupSuggestedMovies();
    });

    if(context === undefined) {
        return <h1>Loading...</h1>;
    }

    const { selectedGroup, selectedUsers, loadGroupSuggestedMovies } = context;

    

    return (
        <div>
            <h1>Movie Choice for {selectedGroup?.name}</h1>
            <h2>Selected users:</h2>
            <div className="selected-users">
                {selectedUsers.map(user => (
                    <div key={user.id}>{user.firstName} {user.lastName}</div>
                ))}
            </div>

            <div className="movie-suggestions">
                
            </div>
        </div>
    );
}