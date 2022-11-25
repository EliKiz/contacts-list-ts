import { Alert, Avatar, Button, List, Modal } from "antd";
import { useEffect, useState } from "react";
import { Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import AddForm from "./addForm/AddForm";
import { EditForm } from "./editForm/EditForm";
import {
    ContactItem,
    deleteContact,
    fetchContacts,
} from "../../store/slices/contact/contactApi";
import {
    selectContactList,
    selectContactStatus,
} from "../../store/slices/contact/contactSlice";
import SearchForm from "./searchForm/SearchForm";

import "./contactList.css";

const { confirm } = Modal;

const { Title } = Typography;

const ContactList = () => {
    const [error, setError] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactItem | null>(
        null
    );

    const [filteredList, setFilteredList] = useState<ContactItem[] | null>(
        null
    );

    const contactList = useAppSelector(selectContactList);
    const dispatch = useAppDispatch();

    const status = useAppSelector(selectContactStatus);

    const showAddForm = () => setIsOpen(true);
    const hideAddForm = () => setIsOpen(false);

    const showEditForm = (contactItem: ContactItem) => {
        setIsEditOpen(true);
        setSelectedContact(contactItem);
    };
    const hideEditForm = () => setIsEditOpen(false);

    useEffect(() => {
        dispatch(fetchContacts())
            .unwrap()
            .then(() => setError(""))
            .catch((err) => setError(err));
    }, [dispatch]);

    const handleDelet = (id: string) => {
        confirm({
            title: "Are you soure?",
            icon: <ExclamationCircleOutlined />,
            content: "Can't cancel deletion",
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
            <SearchForm setFilteredList={setFilteredList} />
            {error && (
                <Alert
                    style={{ marginBottom: "20px" }}
                    message={error}
                    type="error"
                />
            )}
            <List
                bordered
                itemLayout="horizontal"
                dataSource={filteredList?.length ? filteredList : contactList}
                loading={status === "loading"}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Button
                                onClick={() => showEditForm(item)}
                                key="list-loadmore-edit">
                                edit
                            </Button>,
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
            {isEditOpen && (
                <EditForm
                    isEditFormVisible={isEditOpen}
                    hideEditForm={hideEditForm}
                    selectedContact={selectedContact}
                />
            )}
        </div>
    );
};

export default ContactList;
