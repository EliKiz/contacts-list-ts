import { Button, Form, Input } from 'antd';
import { Typography, Alert } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocaRoutes } from '../pages/LocalRoutes';
import {ListService} from '../../service/ListService';

import './login.css'
import { useAppDispatch } from '../app/hooks';
import { logIn } from '../../store/slices/auth/authSlice';

type Loginvalues = { 
    userName: string
}

type userItem = { 
    email: string,
    username: string,
    avatar: string,
    name: string,
    id: string
}



const { Title } = Typography;

const {getUsers} = ListService()

const Login = () => { 

    const [error, setError] = useState('')
    const [loadig, setLoading] = useState(false)
    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const onFinish = async ({userName}: Loginvalues) => {
        setLoading(true)

        const userList:userItem[] = await getUsers()

        const fiendUser = userList.find((user) => user.username === userName)
        console.log('fiendUser is', fiendUser)
        
        if(!fiendUser) { 
            setError('User not fiend')
        } else { 
            setError('')
            dispatch(logIn())
            navigate(LocaRoutes.Contacts)
        }
        setLoading(false)
    };


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    return ( 
        
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            initialValues={{ userName: '', password: ''}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
                <Title>Login</Title>
            <Form.Item
                label="Username"
                name="userName"
                rules={[{ required: true, message: 'Please input your username!' }]}
                >
                <Input placeholder="Enter user name" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={loadig} type="primary" htmlType="submit">
                    Log in
                </Button>
            </Form.Item>

            {
                error && <Alert message="no user" type="error" />
            }
            
        </Form>
    )

}

export default Login