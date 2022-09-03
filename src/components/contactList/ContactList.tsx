
import { Avatar, Button, List } from 'antd';
import { useState, useEffect } from 'react';
import { Typography} from 'antd';
import ListService from '../service/ListService';
import './contactList.css'

const {getContact} = ListService()
const { Title } = Typography;

type ContactItem = { 
    phone: string,
    name: string,
    id: string
}

const ContactList = () => { 

    const [contactList, setContactList] = useState<ContactItem[]>([])

    useEffect(() => {
        getContact()
            .then((res) => setContactList(res) )
    }, [])


    return ( 
        <div className="contactList">
            <Title>List contacts</Title>
            <List
                bordered
                itemLayout="horizontal"
                dataSource={contactList}
                renderItem={item => (
                    <List.Item  actions={[<Button key="list-loadmore-edit">edit</Button>, <Button key="list-loadmore-more">delete</Button>]}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.name} />}
                            title={item.name}
                            description={item.phone}
                            />
                </List.Item>
                )}
            />
            <Button type="primary" className='contactList-btn-add' >Adding new contact</Button>
        </div>
    )
}

export default ContactList