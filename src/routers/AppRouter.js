import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/login/LoginScreen';
import { Spinner } from '../components/ui/Spinner';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const {checking} = useSelector( state => state.auth );

    useEffect(() => {

      dispatch(startChecking());

    }, [dispatch])

    if (checking) {
        
        return (
            <div className='spinner-container'>
                <Spinner />
            </div>
        );
    }
    

    return (
        <BrowserRouter>

            <Routes>

                

                <Route path="/login" element={

                    <PublicRoute>
                        <LoginScreen />
                    </PublicRoute>

                } />


                <Route path="/*" element={
                     <PrivateRoute>
                         <DashboardRoutes />
                     </PrivateRoute> 
                    } 
                />



                

            </Routes>
        </BrowserRouter> 
    )
}