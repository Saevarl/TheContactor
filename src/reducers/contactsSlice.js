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
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
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
    console.log(contactList);
    return contactList;
  }
)

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact) => {
    console.log("Adding contact");
    await fileService.addContact(contact);
    return contact;
  }
)




    



export const selectContacts = (state) => state.contacts.contacts

export default contactsSlice.reducer