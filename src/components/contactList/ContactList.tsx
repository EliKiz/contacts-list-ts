import { Avatar, Button, List, Modal } from "antd";
import { useEffect, useState } from "react";
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
import AddForm from "./addForm/AddForm";

const { confirm } = Modal;

const { Title } = Typography;
const { Search } = Input;

const ContactList = () => {
    const [isOpen, setIsOpen] = useState(false);

    const contactList = useAppSelector(selectContactList);
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectContactStatus);

    const showAddForm = () => setIsOpen(true);
    const hideAddForm = () => setIsOpen(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
    };

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    const handleDelet = (id: string) => {
        confirm({
            title: "Are you soure?",
            icon: <ExclamationCircleOutlined />,
            content: "Удаление не отменить",
            onOk() {
                dispatch(deleteContact(id)).unwrap();
            },
            onCancel() {},
            cancelText: "Cancel",
            okText: "Yes",
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
                            avatar={
                                <Avatar src="https://joeschmoe.io/api/v1/random" />
                            }
                            title={item.name}
                            description={item.phone}
                        />
                    </List.Item>
                )}
            />
            <Button
                onClick={showAddForm}
                type="primary"
                className="contactList-btn-add">
                Add new contact
            </Button>
            {isOpen && (
                <AddForm isAddFormVisible={isOpen} hideAddForm={hideAddForm} />
            )}
        </div>
    );
};

export default ContactList;
