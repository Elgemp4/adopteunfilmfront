import { useMovieContext } from "../contexts/MovieContext";

import { motion, useMotionValue, useTransform } from "framer-motion"

export default function SwipeCard() {
    const movieContext = useMovieContext();

    const x = useMotionValue(0);

    const opacity = useTransform(x, [-100, 0, 100], [0.1, 1, 0.1]);
    const rotate = useTransform(x, [-100, 0, 100], [-10, 0, 10]);

    if(movieContext == undefined){
        throw new Error("Context undefined");
    }

    const {movie_image, movie_title, like, dislike} = movieContext;

    const handleDragEnd = () => {
        if(x.get() > 100){
            like()
        }
        else if(x.get() < -100){
            dislike()
        }
    }

    return <motion.img 
    src={movie_image} 
    alt={movie_title}
    style={{
        x,
        opacity,
        rotate
    }}
    className="movie-image" 
    drag="x"
    dragConstraints={{
        left: 0,
        right: 0,
    }}
    onDragEnd={handleDragEnd}/>   
}