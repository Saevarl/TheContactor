import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ContactListToolbar from '../contactListToolbar'
import * as fileService from '../../services/fileService';
import { selectContacts } from '../../reducers/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact } from '../../reducers/contactsSlice';
import { useNavigation } from '@react-navigation/native';


const ContactsList = () => {
  // dummy contacts with name and phone number as key
  const rContacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  const firstLetterList = [...new Set(rContacts.map((contact) => contact.name[0].toUpperCase()))];
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);




   
  


  const cleanDirectory = async () => {
    await fileService.cleanDirectory();
  
  }

return (
    <View> 
    
      <TouchableOpacity
        onPress={() => cleanDirectory()}
      >
        <Text>Purge</Text>
      </TouchableOpacity>
       <ContactListToolbar addContact={(contact) => addContact(contact)}/>

       {
          firstLetterList.sort().map((letter, index) => {
            return(
              <View key={index}
                    className="m-2">
                
                <Text className="text-gray-600 text-xs ml-3">{letter}</Text>
                <View className="bg-white rounded-xl mx-2 mt-1">
                {
                  rContacts.filter((contact) => contact.name[0].toUpperCase() === letter).map((contact) => {
                    
                    return(
                      
                        <TouchableOpacity
                          key={contact.id}
                          onPress={() => navigation.navigate('ContactDetail', {contact: contact})}>
                          
                          <Text className="p-2 mx-2">{contact.name}</Text>
                        </TouchableOpacity>
                      
                    )
                  }
    
                  )
                  
                }
                </View>

            </View>
              
            )
          })
        }
              
        
        
        
    
      
    </View>
  )
}

export default ContactsList
