import { createSlice } from '@reduxjs/toolkit'

export const contactsListSlice = createSlice({
  name: 'Contacts List',
  initialState: {
    
    contacts: [],
  },
  reducers: {
    addContact: state => {
        state.contacts = [...state.contacts, action.payload]
    },
    removeContact: state => {
      state.value -= 1
    },
   
    
  }
})

// Action creators are generated for each case reducer function
export const { addContact, removeContact } = contactsListSlice.actions

export const selectContacts = (state) => state.contactsList.contacts

export default contactsListSlice.reducer