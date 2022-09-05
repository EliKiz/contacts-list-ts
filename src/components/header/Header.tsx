
import { LoginOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/slices/auth/authSlice';
import { selectUserData } from '../../store/slices/user/userSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { LocaRoutes } from '../pages/LocalRoutes';
import s from './Header.module.css'

const Header = () =>{

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const userData = useAppSelector(selectUserData)

    const handleLogout = () => { 
        dispatch(logOut())
        navigate(LocaRoutes.Login)
    }

    return ( 
        <header className={s.header}> 
            <div>
                <span> User, {userData?.username}</span>
            </div>
    
            <Button type='primary' icon = {<LoginOutlined/>}
            size='small'
            onClick={handleLogout}/>
    
        </header>
    )

}

export default Header