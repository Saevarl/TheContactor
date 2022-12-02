import { View, Text, FlatList, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import ContactListToolbar from '../contactListToolbar'
import * as fileService from '../../services/fileService';
import { selectContacts } from '../../features/contactsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts} from '../../features/contactsSlice';
import { useNavigation, addContact } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Contacts from 'expo-contacts';
import uuid from 'react-native-uuid';

const ContactsList = () => {
  // dummy contacts with name and phone number as key
  const rContacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [contacts, setContacts] = useState(undefined);
  const [error, setError] = useState(undefined);

    const getContactsFromOS = () => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image ],
            });
            if (data.length > 0) {
                setContacts(data);
            }else{
                setError('No contacts found');
            }
          }else{
            setError('Permission to access contacts denied.')
          }
        });

      const addingContact = ()=>{
        console.log('ADDING CONTACT FROM PHONE');
        contacts.map((contact)=>{
            const newContact = {
                id: `${uuid.v4()}`,
                name: contact.name,
                phone: contact.phoneNumbers,
                photo: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'
            }
            console.log(newContact);
            dispatch(addContact(newContact));
        });
      }

  useEffect(() => {
      dispatch(fetchContacts());
      setContacts(rContacts);
      const contactsFromOS = getContactsFromOS();
      setContacts({...rContacts, contactsFromOS});
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
          key={contact.id}>
        <TouchableOpacity
          
          onPress={() => navigation.navigate('ContactDetail', {contact})}>
            {/*Hér þarf að rendera SingleContact component í stað þess að rendera bara text*/}
            <Text 
            className="p-2 mx-2">
              {contact.name}
            </Text>
          </TouchableOpacity>
          <View/>
      </View>
      )
  }
  
  const firstLetterList = [...new Set(contacts.map((contact)  => contact.name[0].toUpperCase()))];

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
           
                <Text className="text-gray-600 text-xs ml-3">{letter}</Text>
                <View className="bg-white rounded-xl mt-1">
                {
                  contacts.filter((contact) => contact.name[0].toUpperCase() === letter).map((contact, index) => {
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
}
export default ContactsList
