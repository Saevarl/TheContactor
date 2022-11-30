import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as fileService from '../services/fileService';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    
    contacts: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = [action.payload];
      })
  } 
})

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const contacts = await fileService.getAllContacts();
    console.log("BLALALAL", contacts);
    const contactList = contacts.map(c => JSON.parse(c));
    console.log(contactList);
    return contactList;
  }
  
)
    


// Action creators are generated for each case reducer function
export const { addContact, removeContact } = contactsSlice.actions

export const selectContacts = (state) => state.contacts.contacts

export default contactsSlice.reducer