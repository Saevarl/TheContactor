import * as Contacts from 'expo-contacts';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ContactsList from '../components/contactsList';
import { addContact } from './contactsSlice';

export default function ImportContacts() {
    const [contacts, setContacts] = useState(undefined);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        (async () => {
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image ],
            });
            if (data.length > 0) {
                console.log('1st',data);
                setContacts(data);
                addingContact();
            }else{
                setError('No contacts found');
            }
          }else{
            setError('Permission to access contacts denied.')
          }
        })();
      }, []);

      const addingContact = ()=>{
        console.log('ADDING CONTACT FROM PHONE');
        contacts.map((contact)=>{
            return(
                dispatch(addContact({
                    id: contact.id,
                    name: contact.name,
                    phone: contact.phoneNumber.digits,
                    photo: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'
                }))
            )
        });
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
    
      const getContactRows = () =>{
        if (contacts!== undefined){
            firstLetterList.sort().map((letter, index) => {
                return(
                    <View key={index}
                        className='mt-2'>
                        <Text className="text-gray-600 text-xs ml-3">{letter}</Text>
                        <View className="bg-white rounded-xl mt-1">
                            {
                                contacts.filter((contact)=>contact.name[0].toUpperCase()=== letter).map((contact, index)=>{
                                    if (index === 0){
                                        contact = {...contact, withDivider: false}
                                        return renderContact({contact});
                                    }else{
                                        contact = {...contact, withDivider: true}
                                        return renderContact({contact});
                                    }
                                })
                            }
                        </View>
                    </View>
                );
            })
        }else{
            return <Text>Awaiting Contacts...</Text>
            }
        }
    
        const firstLetterList = [...new Set(contacts.map((contact) => contact.name[0].toUpperCase()))];

  return (

    <View>
        {getContactRows()}
        <Text>{error}</Text>
        <StatusBar style='auto' />
    </View>
  );
}
