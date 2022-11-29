import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ContactListToolbar from '../contactListToolbar'
import * as fileService from '../../services/fileService';
import uuid from 'react-native-uuid';

const ContactsList = ({navigate}) => {
  // dummy contacts with name and phone number as key
  const [contacts, setContacts] = useState([])
  
  
  const addContact = async contact => {
    id = `${uuid.v4()}`;
    console.log(id);
    contact = {...contact, id};
    console.log(contact);
    const newContact = await fileService.addContact(contact);
    console.log(newContact);
    
    //setContacts([...contacts, newContact])
   
    
    
  }
    



  return (
    <View className="bg-gray-200"> 
      <TouchableOpacity onPress={async () => addContact({name: 'Sævar', phone: '779654565', image: "https://www.pngitem.com/pimgs/m/226-2267516_male-shadow-circle-default-profile-image-round-hd.png"})}>
        <Text>Add Contact</Text>
      </TouchableOpacity>
        <ContactListToolbar 
                        navigate={navigate}
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
