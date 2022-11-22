import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../components/app/store';
import {ListService, CONTACTS_URL} from '../../../service/ListService'

const {getContact} = ListService()

type ContactItem = { 
  phone: string,
  name: string,
  id: string
}

export type ContactState = {
  isLoggedIn: boolean;
  list : ContactItem[];
  status: 'idle' | 'loading' | 'failed'
};

const initialState: ContactState = {
  list: [],
  status: 'idle',
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
};

export const fetchContacts = createAsyncThunk(
  "contact/fetchContacts",
  async () => { 
    const response = await fetch(CONTACTS_URL)
    return await response.json()
  }
)

export const deleteContact = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('contact/deleteContact', async (id, { rejectWithValue }) => {
  const response = await fetch(`${CONTACTS_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return rejectWithValue(
      `Ошибка при удалении: ${response.status} (${response.statusText})`
    );
  }

  return id;
});

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
  
  },
  extraReducers:(builder) => { 
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = action.payload;
        }
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.status = 'failed';
      })
      // cases for deleting a single contact
      .addCase(deleteContact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload) {
          state.list = state.list.filter(
            (contact) => contact.id !== action.payload
          );
        }
      })
      .addCase(deleteContact.rejected, (state) => {
        state.status = 'failed';
      })

  }
});

export const selectContactList = (state: RootState) => state.contact.list;
export const selectContactStatus = (state: RootState) => state.contact.status;


export default contactSlice.reducer;