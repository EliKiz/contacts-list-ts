import { Form } from "antd";
import { Input } from "antd";
import { ContactItem } from "../../../store/slices/contact/contactApi";
import { selectContactList } from "../../../store/slices/contact/contactSlice";
import { useAppSelector } from "../../app/hooks";

import "./searchForm.css";

type Props = {
    setFilteredList: (value: ContactItem[] | null) => void;
};

const SearchForm = ({ setFilteredList }: Props) => {
    const { Search } = Input;
    const contactList = useAppSelector(selectContactList);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = event.target.value.toLocaleLowerCase();
        if (searchValue) {
            const resultFilter = contactList.filter((contact) => {
                return (
                    contact.name
                        .toLocaleLowerCase()
                        .includes(searchValue.toLocaleLowerCase()) ||
                    contact.phone.includes(searchValue)
                );
            });
            setFilteredList(resultFilter);
        } else {
            setFilteredList(null);
        }
    };

    return (
        <Form>
            <Search
                className="contactSerch"
                placeholder="search contact"
                onChange={handleChange}
                enterButton
            />
        </Form>
    );
};

export default SearchForm;
