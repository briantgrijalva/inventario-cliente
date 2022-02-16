// import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../auth/authContext'

export const PublicRoute = ({children}) => {
    
    // const {user} = useContext(AuthContext)
    // return user.logged
    let navigate = useNavigate();

    const user = true;
    return user
        ? navigate("/dashboard")
        : children
    

    // return <Navigate to="/login"/>;
     
}
