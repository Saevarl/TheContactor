import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import ContactListToolbar from '../contactListToolbar'
import * as fileService from '../../services/fileService';
import { selectContacts } from '../../features/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, addContact } from '../../features/contactsSlice';
import { useNavigation } from '@react-navigation/native';
import SingleContact from '../singleContact';


const ContactsList = () => {
  // dummy contacts with name and phone number as key
  const rContacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  
  const firstLetterList = [...new Set(rContacts.map((contact) => contact.name[0].toUpperCase()))];
  
  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  
  
  // *****************************
  // * ÞETTA ER DEVELOPMENT CODE *
  // *****************************
  const cleanDirectory = async () => {
    await fileService.cleanDirectory();
  
  }

  

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
    
      <TouchableOpacity
        onPress={() => cleanDirectory()}
      >
        <Text>Purge</Text>
      </TouchableOpacity>
      

       {
          firstLetterList.sort().map((letter, index) => {
            return(
              <View key={index}
                    className="mt-2">
<<<<<<< HEAD
           
                <Text className="text-gray-600 text-xs ml-3">{letter}</Text>
                <View className="bg-white rounded-xl mt-1">
=======
                
                <Text className="text-gray-600 text-xs ml-2">{letter}</Text>
                <View className="bg-gray-100 rounded-xl mt-1">
>>>>>>> saevar
                {
                  rContacts.filter((contact) => contact.name[0].toUpperCase() === letter).map((contact, index) => {
                      if (index === 0) {
                        contact = {...contact, withDivider: false}
                        return renderContact({contact});
                      } else {
                        contact = {...contact, withDivider: true}
                        return renderContact({contact});
                      }
                    })
             
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
