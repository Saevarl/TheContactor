import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as fileService from '../services/fileService';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    
    contacts: [],
    expandedContact: null,
  },
  reducers: {
    setExpandedContact: (state, action) => {
      state.expandedContact = action.payload;
    },
    addContactsFromOs: (state, action) => {
      state.contacts = [...state.contacts, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        console.log("Error: Adding Contact Failed");
      })

      .addCase(removeContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(c => c.id !== action.payload);
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
    return contactList;
  }
)

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact) => {
    await fileService.addContact(contact);
    return contact;
  }
)

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (contact) => {
    await fileService.remove(contact);
    return contact.id;
  }
)


export const { setExpandedContact, addContactsFromOs } = contactsSlice.actions

export const expandedContact = (state) => state.contacts.expandedContact;

export const selectContacts = (state) => state.contacts.contacts

export default contactsSlice.reducer