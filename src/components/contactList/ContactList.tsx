import { Avatar, Button, List, Modal } from "antd";
import { useEffect } from "react";
import { Typography, Input } from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./contactList.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    deleteContact,
    fetchContacts,
    selectContactList,
    selectContactStatus,
} from "../../store/slices/contact/contactSlice";

const { confirm } = Modal;

const { Title } = Typography;
const { Search } = Input;

const ContactList = () => {
    const contactList = useAppSelector(selectContactList);
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectContactStatus);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDelet = (id: string) => {
        confirm({
            title: "Вы уверены?",
            icon: <ExclamationCircleOutlined />,
            content: "Удаление не отменить",
            onOk() {
                dispatch(deleteContact(id)).unwrap();
            },
            onCancel() {},
            cancelText: "Отмена",
            okText: "Да",
        });
    };

    return (
        <div className="contactList">
            <Title>List contacts</Title>
            <Search
                className="contactSerch"
                placeholder="search contact"
                onChange={handleChange}
                enterButton
            />
            <List
                bordered
                itemLayout="horizontal"
                dataSource={contactList}
                loading={status === "loading"}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button key="list-loadmore-edit">edit</Button>,
                            <Button
                                onClick={() => handleDelet(item.id)}
                                key="list-loadmore-more">
                                delete
                            </Button>,
                        ]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.name} />}
                            title={item.name}
                            description={item.phone}
                        />
                    </List.Item>
                )}
            />
            <Button type="primary" className="contactList-btn-add">
                Adding new contact
            </Button>
        </div>
    );
};

export default ContactList;
