import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ContactListToolbar from '../contactListToolbar'
import * as fileService from '../../services/fileService';
import uuid from 'react-native-uuid';
import { selectContacts } from '../../reducers/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../reducers/contactsSlice';
import { getContactsMatchingString } from 'react-native-contacts';


const ContactsList = ({navigate}) => {
  // dummy contacts with name and phone number as key
  const [contacts, setContacts] = useState([])
  const rContacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async () => {
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
      console.log("CONTACTS", contactList);
      setContacts(contactList);
    })();
  }, []);




    //fileService.cleanDirectory();
    //console.log('useEffect');
    //dispatch(fetchContacts());
 
  


  const cleanDirectory = async () => {
    await fileService.cleanDirectory();
  
  }

  const addContact = async contact => {
    id = `${uuid.v4()}`;
    contact = {...contact, id};
    await fileService.addContact(contact);
    setContacts([...contacts, contact]);
    
  }

  const removeContact = async contact => {
    const fileName = `${contact.name}-${contact.id}.json`;
    await fileService.remove(fileName);
    setContacts(contacts.filter(c => c.id !== contact.id));
    
  }



  return (
    <View className="bg-gray-200"> 
      <TouchableOpacity
        onPress={() => addContact({name: 'Saevar', phone: '1234567890', photo: 'https://picsum.photos/200'})}
      >
        <Text>Add Contact</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => cleanDirectory()}
      >
        <Text>Purge</Text>
      </TouchableOpacity>
       <ContactListToolbar 
                        navigate={navigate}
                        addContact={(contact) => addContact(contact)}
        />
        <FlatList
          data={contacts}
          renderItem={({item}) => <Text className="bg-white p-2 m-2">{item.name}</Text>}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      
    </View>
  )
}

export default ContactsList
