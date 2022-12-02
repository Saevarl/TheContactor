import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as fileService from '../../services/fileService';
import { selectContacts } from '../../features/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact } from '../../features/contactsSlice';
import { useNavigation } from '@react-navigation/native';
import SingleContact from '../singleContact';


const ContactsList = () => {
  // dummy contacts with name and phone number as key
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  const firstLetterList = [...new Set(contacts.map((contact) => contact.name[0].toUpperCase()))];
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  
  
  const renderContact = ({contact}) => {
    return(
      <View
        className="h-auto"
        key={contact.id}>
            <SingleContact contact={contact}/>
      </View>
      )
  }

    

return (
    <View> 
      {
        firstLetterList.sort().map((letter, index) => {
          return(
            <View key={index}
                  className="mt-2">
              
              <Text className="text-gray-600 text-xs ml-2">{letter}</Text>
              <View className="bg-gray-100 rounded-xl mt-1">
              {
                contacts.filter((contact) => contact.name[0].toUpperCase() === letter).map((contact, index) => {
                    if (index === 0) {
                      contact = {...contact, withDivider: false}
                    } else {
                      contact = {...contact, withDivider: true}
                    }
                    return renderContact({contact})
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
