
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { ReactNode } from "react";

interface SkipIfLoggedInProps{
    children: ReactNode
}

export default function SkipIfLoggedIn ({children } : SkipIfLoggedInProps) {
    const { isLoggedIn } = useUserContext();

    if(isLoggedIn){
        return <Navigate to="/loggedin"/>
    }

    return children
}