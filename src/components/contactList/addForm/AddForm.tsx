import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { addContact } from "../../../store/slices/contact/contactApi";
import { selectContactStatus } from "../../../store/slices/contact/contactSlice";
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
            title="Add new contact "
            visible={isAddFormVisible}
            onCancel={hideAddForm}
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
                            message: "Please enter your name!",
                        },
                    ]}>
                    <Input placeholder="Enter name" />
                </Form.Item>
                <Form.Item
                    label="Username"
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your telephone number!",
                        },
                    ]}>
                    <Input placeholder="Enter telephone number" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        loading={status === "loading"}
                        type="primary"
                        htmlType="submit">
                        Add
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddForm;
