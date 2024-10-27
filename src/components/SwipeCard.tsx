import { useMovieContext } from "../contexts/MovieContext";

import { motion, useMotionValue, useTransform } from "framer-motion"

export default function SwipeCard() {
    const movieContext = useMovieContext();

    if(movieContext == undefined){
        throw new Error("Context undefined");
    }

    const x = useMotionValue(0);

    const opacity = useTransform(x, [-100, 0, 100], [0.1, 1, 0.1]);
    const rotate = useTransform(x, [-100, 0, 100], [-10, 0, 10]);
    const backgroundColor = useTransform(x, [-100, 0, 100], ["#fa3425FF", "#FFF0", "#29fa25FF"]);

    

    const {movie_image, movie_title, like, dislike} = movieContext;

    const handleDragEnd = () => {
        if(x.get() > 70){
            like()
        }
        else if(x.get() < -70){
            dislike()
        }
    }

    return <motion.div
            style={{
                x,
                rotate
            }}
            className="movie-image" 
            drag="x"
            dragConstraints={{
                left: 0,
                right: 0,
            }}
            onDragEnd={handleDragEnd}>
            <motion.img 
            src={movie_image} 
            alt={movie_title}
            />  
            <motion.div 
                className="color-overlay"
                style={{
                    backgroundColor
                }}>
            </motion.div>
    </motion.div>  
}