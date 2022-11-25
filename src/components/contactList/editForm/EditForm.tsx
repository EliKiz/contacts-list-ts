import { useState } from "react";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Modal, Input, Button, Alert } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
    ContactItem,
    editContact,
} from "../../../store/slices/contact/contactApi";
import { selectContactStatus } from "../../../store/slices/contact/contactSlice";

type EditFormValues = {
    name: string;
    phone: string;
};

type Props = {
    isEditFormVisible: boolean;
    hideEditForm: () => void;
    selectedContact: ContactItem | null;
};

export const EditForm = ({
    isEditFormVisible,
    hideEditForm,
    selectedContact,
}: Props) => {
    const dispatch = useAppDispatch();

    const [error, setError] = useState("");
    const status = useAppSelector(selectContactStatus);

    const onFinish = async ({ name, phone }: EditFormValues) => {
        if (!selectedContact) return;

        await dispatch(editContact({ ...selectedContact, name, phone }))
            .unwrap()
            .then(hideEditForm)
            .catch((err) => setError(err));
    };

    return (
        <Modal
            title="Edit contact"
            visible={isEditFormVisible}
            onCancel={hideEditForm}
            width={450}
            centered
            footer={null}>
            <Form
                initialValues={{
                    name: selectedContact?.name,
                    phone: selectedContact?.phone,
                }}
                onFinish={onFinish}>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your name",
                        },
                    ]}>
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Name contact"
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your telephone number",
                        },
                    ]}>
                    <Input
                        prefix={
                            <PhoneOutlined className="site-form-item-icon" />
                        }
                        placeholder="telephone number"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        loading={status === "loading"}
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
            {error && <Alert message={error} type="error" />}
        </Modal>
    );
};
