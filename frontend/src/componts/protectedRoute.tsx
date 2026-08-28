import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/Auth/authContext";


export const ProtectedRoute = () => {
 const {isAuthenticated} = useAuth();

 if(!isAuthenticated){
    return <Navigate to="/login" replace />
}
return <Outlet/>

};