import { Navigate } from "react-router-dom"

export const PrivateRoute = ({user, children}) => {
    const token = localStorage.getItem('access-token')
    if(!token)
        return <Navigate to="/" />
    return children;
}
