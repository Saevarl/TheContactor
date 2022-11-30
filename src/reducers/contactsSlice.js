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
        state.contacts = action.payload;
      })
  } 
})

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const contacts = await fileService.getAllContacts();
    const contactList = contacts.map(c => {
      const contact = JSON.parse(c.file);
      return {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        photo: contact.photo
      }
    });
    console.log("Contact list: ", contactList);
    return contactList;
  }
  
)
    


// Action creators are generated for each case reducer function
export const { addContact, removeContact } = contactsSlice.actions

export const selectContacts = (state) => state.contacts.contacts

export default contactsSlice.reducer