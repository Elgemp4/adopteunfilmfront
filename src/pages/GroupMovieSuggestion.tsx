import { useGroupContext } from "../contexts/GroupContext";

export default function GroupMovieSuggestion() {

    const context = useGroupContext();

    return (
        <div>
            <h1>Movie Choice</h1>
            <p>Here you can choose a movie</p>
        </div>
    );
}