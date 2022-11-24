import { Button, Form, Input, Modal } from "antd";
import Title from "antd/lib/skeleton/Title";
import { useState } from "react";
import { ContactItem } from "../../../store/slices/contact/contactApi";
import {
    addContact,
    selectContactStatus,
} from "../../../store/slices/contact/contactSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type Props = {
    isAddFormVisible: boolean;
    hideAddForm: () => void;
};

type AddFormValues = {
    name: string;
    phone: string;
};

export const AddForm = ({ isAddFormVisible, hideAddForm }: Props) => {
    const [error, setError] = useState("");
    const status = useAppSelector(selectContactStatus);
    const dispatch = useAppDispatch();

    const onFinish = async ({ name, phone }: AddFormValues) => {
        await dispatch(addContact({ name, phone }))
            .unwrap()
            .then(hideAddForm)
            .catch((err) => setError(err));
    };

    return (
        <Modal
            title="Добавление контакта"
            visible={isAddFormVisible}
            onCancel={hideAddForm}
            width={400}
            centered
            footer={null}>
            <Form
                name="add-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                layout="vertical"
                initialValues={{ name: "", password: "" }}
                onFinish={onFinish}
                autoComplete="off">
                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста введите имя!",
                        },
                    ]}>
                    <Input placeholder="Введите имя" />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста введите номер!",
                        },
                    ]}>
                    <Input placeholder="Введите номер телефона" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        loading={status === "loading"}
                        type="primary"
                        htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddForm;
