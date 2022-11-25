import { Alert, Button, Form, Input } from "antd";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { LocaRoutes } from "../pages/LocalRoutes";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logIn } from "../../store/slices/auth/authSlice";
import { fetchUsers } from "../../store/slices/user/userApi";
import {
    selectUserError,
    selectUserStatus,
} from "../../store/slices/user/userSlice";

import "./login.css";

type Loginvalues = {
    userName: string;
};

const { Title } = Typography;

const Login = () => {
    const status = useAppSelector(selectUserStatus);
    const error = useAppSelector(selectUserError);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const onFinish = async ({ userName }: Loginvalues) => {
        try {
            const isUserFound = await dispatch(fetchUsers(userName)).unwrap();
            if (isUserFound) {
                dispatch(logIn());
                navigate(LocaRoutes.Contacts);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            layout="vertical"
            initialValues={{ userName: "", password: "" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Title>Login</Title>
            <Form.Item
                label="Username"
                name="userName"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}>
                <Input placeholder="Enter username" />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}>
                <Input.Password placeholder="Enter password" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                    loading={status === "loading"}
                    type="primary"
                    htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
            {error && <Alert message="User is not found" type="error" />}
        </Form>
    );
};

export default Login;
