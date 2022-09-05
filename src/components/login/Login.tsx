import { Button, Form, Input } from 'antd';
import { Typography, Alert } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LocaRoutes } from '../pages/LocalRoutes';
import {ListService} from '../../service/ListService';

import './login.css'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logIn } from '../../store/slices/auth/authSlice';
import { fetchUsers } from '../../store/slices/user/userApi';
import { selectUserStatus } from '../../store/slices/user/userSlice';

type Loginvalues = { 
    userName: string
}


const { Title } = Typography;

const {getUsers} = ListService()

const Login = () => { 

    const status = useAppSelector(selectUserStatus)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const onFinish = async ({userName}: Loginvalues) => {
        
        try { 
            const isUserFound = await dispatch(fetchUsers(userName)).unwrap()

            if(isUserFound) { 
                dispatch(logIn());
                navigate(LocaRoutes.Contacts)
            }

        } catch(e) { 
            console.log(e)
        }
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
                <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button loading={status === 'loading'} type="primary" htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
            
        </Form>
    )

}

export default Login