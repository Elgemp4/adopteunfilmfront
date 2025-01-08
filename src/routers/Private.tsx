
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { ReactNode } from "react";

interface PrivateProps{
    children: ReactNode
}

export default function Private({children } : PrivateProps) {
    const { isLoggedIn } = useUserContext();

    if(!isLoggedIn){
        return <Navigate to="/login"/>
    }

    return children
}