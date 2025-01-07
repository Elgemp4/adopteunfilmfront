import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import { ReactNode } from "react";

interface SkipIfLoggedInProps {
    children: ReactNode;
}

export default function SkipIfLoggedIn({ children }: SkipIfLoggedInProps) {
    const { isLoggedIn, isFullyRegistered } = useUserContext();

    if (isLoggedIn) {
        return isFullyRegistered
            ? <Navigate to="/movies" replace />
            : <Navigate to="/login" replace />;
    }
    return children;
}
