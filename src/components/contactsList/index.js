import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ContactListToolbar from '../contactListToolbar'
import * as fileService from '../../services/fileService';
import uuid from 'react-native-uuid';
import { selectContacts } from '../../reducers/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact } from '../../reducers/contactsSlice';
import { useNavigation } from '@react-navigation/native';


const ContactsList = ({navigate}) => {
  // dummy contacts with name and phone number as key
  const rContacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);




   
  


  const cleanDirectory = async () => {
    await fileService.cleanDirectory();
  
  }


  const removeContact = async contact => {
    const fileName = `${contact.name}-${contact.id}.json`;
    await fileService.remove(fileName);
    setContacts(contacts.filter(c => c.id !== contact.id));
    
  }



  return (
    <View className="bg-gray-200"> 
      
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
          data={rContacts}
          renderItem={({item}) => 
                            <TouchableOpacity
                              onPress={() => navigation.navigate("ContactDetail", {contact: item})}>
                              <Text className="bg-white p-2 m-2">{item.name}</Text>
                            </TouchableOpacity>}
          keyExtractor={item => item?.id}
          scrollEnabled={false}
        />
      
    </View>
  )
}

export default ContactsList
