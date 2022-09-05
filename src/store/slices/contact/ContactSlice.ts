import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../components/app/store';
import {ListService, _apiUsers} from '../../../service/ListService'

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
    const response = await fetch(_apiUsers)
    return await response.json()
  }
)

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
        if (action.payload) {
          state.list = action.payload;
        }
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.status = 'failed';
        
      });
  }
});

export const selectContactList = (state: RootState) => state.contact.list;

export default contactSlice.reducer;