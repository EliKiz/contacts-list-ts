const CONTACTS_URL = "https://63134721a8d3f673ffc7bb7e.mockapi.io/contact-lis";
const USERS_URL = " https://63134721a8d3f673ffc7bb7e.mockapi.io/Users";

const ListService = () => {
    const getUsers = async () => {
        const res = await fetch(CONTACTS_URL);
        return res.json();
    };

    const getContact = async () => {
        const res = await fetch(USERS_URL);
        return res.json();
    };

    return { getUsers, getContact };
};

export { ListService, USERS_URL, CONTACTS_URL };
