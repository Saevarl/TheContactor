import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as fileService from '../services/fileService';
import * as Contacts from 'expo-contacts';
import uuid from 'react-native-uuid';


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

      .addCase(addContactsFromOs.fulfilled, (state, action)=>{
        state.contacts = [...state.contacts, ...action.payload]
      })
        
  }
})

export const addContactsFromOs = createAsyncThunk(
  'contacts/addContactsFromOS',
  async() =>{
    console.log('Eftir Async');
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image ],
        });
        if (data.length > 0) {
          console.log('þetta er frá Símanum', data);
          const contacts = data.map((contact)=> {
            console.log('Símanúmer',contact.phoneNumbers[0].digits);
            return {
              id: `${uuid.v4()}`,
              name: contact.name,
              phone: contact.phoneNumbers[0].digits,
              photo: 'https://www.picsum.photos/200/300'
            }
          })
          console.log(contacts);
          return contacts;
        }else{
          console.log('No contacts found');
          setError('No contacts found');
        }
      }else{
        console.log('Permission to access contacts denied');
        setError('Permission to access contacts denied.')
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


export const { setExpandedContact} = contactsSlice.actions

export const expandedContact = (state) => state.contacts.expandedContact;

export const selectContacts = (state) => state.contacts.contacts

export default contactsSlice.reducer