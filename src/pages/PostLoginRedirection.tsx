
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";



export default function PostLoginRedirection() {
    const {isFullyRegistered} = useUserContext();
    
    

    return isFullyRegistered ? <Navigate to="/movies"/> : <Navigate to="/providers"/>
}