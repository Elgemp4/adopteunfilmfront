import { useState } from "react";
import { User } from "../contexts/GroupContext";
import UserCard from "./UserCard";
import Button from "./forms/Button";

export default function MovieCard({ movie, users } : { movie: any, users: any }) {
    const [isInfoVisible, setInfoVisible] = useState(false);

    const toggleInfo = () => {
        setInfoVisible(!isInfoVisible);
    };

    return <div className="movie-card">
                <h1 className="movie-card__title">{movie.title}</h1>
                <div className="movie-card__main" onClick={() => toggleInfo()}>
                    <img className="movie-card__image" key={movie.id} src={movie.poster_path} alt={movie.title}  />
                    <div className="movie-card__vote-avg">{movie.vote_avg}/10</div>
                    <div className={`movie-card__info ${isInfoVisible ? "visible" : ""}`}>
                        <h4 className="movie-card__description_title">Description</h4>
                        <p className="movie-card__description">{movie.description}</p>
                    </div>
                </div>
                <div className="movie-card__likedby">
                    <h4 className="movie-card__subtitle">Liked by</h4>
                    {users.map((user: User) => <UserCard user={user} isSelected={false} onSelect={() => {}}/>)}
                </div>
                <Button name="Seen" text="Mark as seen" onClick={() => {}}/>
            </div>;
}