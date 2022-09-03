
import { useState} from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ContactList from '../contactList/ContactList';
import Login from '../login/Login';
import { LocaRoutes } from './LocalRoutes';

const AppRoutes = () => { 

    const [isLogin, setIsLogin] = useState(false)

    return ( 
    <BrowserRouter>
        <Routes>
            <Route 
                path={LocaRoutes.Home} 
                element={ isLogin ? <Navigate to={LocaRoutes.Contacts}/> : <Navigate to={LocaRoutes.Login}/> }  />
            <Route 
                path={LocaRoutes.Login} 
                element={<Login setIsLogin = {setIsLogin}/>}/>
            <Route 
                path={LocaRoutes.Contacts} 
                element={<ContactList/>}/>
        </Routes>
    </BrowserRouter>
    )
}

export default AppRoutes