
import { useState} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { selectIsLoggedIn } from '../../store/slices/auth/authSlice';
import { useAppSelector } from '../app/hooks';
import ContactList from '../contactList/ContactList';
import Header from '../header/Header';
import Login from '../login/Login';
import { LocaRoutes } from './LocalRoutes';

const AppRoutes = () => { 

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return ( 
        <>
        <BrowserRouter>
            { isLoggedIn && <Header/> }
                <Routes>
                    <Route 
                        path={LocaRoutes.Home} 
                        element={ isLoggedIn ? <Navigate to={LocaRoutes.Contacts}/> : <Navigate to={LocaRoutes.Login}/> }  />
                    <Route 
                        path={LocaRoutes.Login} 
                        element={isLoggedIn ?  <Navigate to={LocaRoutes.Contacts}/>: <Login/>}/>
                    <Route 
                        path={LocaRoutes.Contacts} 
                        element={ isLoggedIn ? <ContactList/> : <Navigate to={LocaRoutes.Login}/>}/>
                </Routes>
        </BrowserRouter>
        </>
    )
}

export default AppRoutes