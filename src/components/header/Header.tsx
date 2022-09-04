
import { LoginOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../store/slices/auth/authSlice';
import { useAppDispatch } from '../app/hooks';
import { LocaRoutes } from '../pages/LocalRoutes';
import s from './Header.module.css'

const Header = () =>{

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const handleLogout = () => { 
        dispatch(logOut())
        navigate(LocaRoutes.Login)
    }

    return ( 
        <header className={s.header}> 
            <ul>
                <li>Пользователь</li>
                <li></li>
            </ul>
    
            <Button type='primary' icon = {<LoginOutlined/>}
            size='small'
            onClick={handleLogout}/>
    
        </header>
    )

}

export default Header