import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

export default function PostLoginRedirection() {
    const { isLoggedIn, isFullyRegistered } = useUserContext();

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return isFullyRegistered
        ? <Navigate to="/movies" replace />
        : <Navigate to="/login" replace />;
}
