import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PublicRoute = ({children}) => {
    
    const {uid} = useSelector( state => state.auth );

    let user = uid;
    return !!user
        ? <Navigate to="/dashboard"/>
        : children
    
     
}
