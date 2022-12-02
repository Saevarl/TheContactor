import { View, Text, FlatList, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as fileService from '../../services/fileService';
import { selectContacts } from '../../features/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact } from '../../features/contactsSlice';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SingleContact from '../singleContact';
import { addContactsFromOs } from '../../features/contactsSlice';


const ContactsList = () => {
  // dummy contacts with name and phone number as key
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [error, setError] = useState(undefined);

  const firstLetterList = [...new Set(contacts.map((contact) => contact.name[0].toUpperCase()))];

  useEffect(() => {
    dispatch(fetchContacts());
    console.log('þetta er useEffect');
    console.log('KALLI',contacts);
    dispatch(addContactsFromOs());
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

  const getPhoneNumbers = (contact)=>{
    if(contact.phoneNumbers){
      return contact.phoneNumbers.map((phoneNumber, index)=>{
        return (
          <View key={index}>
            <Text>{phoneNumber.digits}</Text>
          </View>
        )
      });
    }
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
