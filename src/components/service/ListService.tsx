
const ListService = () => { 

    const _apiUsers = 'https://63134721a8d3f673ffc7bb7e.mockapi.io/Users'
    const _apiList = 'https://63134721a8d3f673ffc7bb7e.mockapi.io/contact-lis'

    const getUsers = async () =>  {
        const res = await fetch(_apiUsers);
        return res.json();
    }

    const getContact = async () => { 
        const res = await fetch(_apiList)
        return res.json()
    }

    return {getUsers, getContact}
}

export default ListService