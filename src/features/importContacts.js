import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, StatusBar, Image } from 'react-native';
import * as Contacts from 'expo-contacts';
import { SafeAreaView } from 'react-native-safe-area-context';

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
              setContacts(data);
            }else{
              setError('No contacts found');
            }
          }else{
            setError('Permission to access contacts denied.')
          }
        })();
      }, []);
    
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
    
      const getContactRows = () =>{
        if (contacts !== undefined){
          return contacts.map((contact, index)=>{
            console.log(contact.phoneNumbers);
            <View key={index}>
              <Image
                source={{uri: 'https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg'}}/>
              <Text>Name: {contact.name}</Text>
              {getPhoneNumbers(contact)}
              <Text>Phone numbers: {contact.phoneNumbers}</Text>
            </View>
          });
        }else{
          return <Text>Awaiting Contacts...</Text>
        }
      }

  return (
    <View>
        <Text>Halló</Text>
        <SafeAreaView>
            <ScrollView>
            {getContactRows()}
            </ScrollView>
            <Text>{error}</Text>
            <StatusBar style='auto' />
        </SafeAreaView>
    </View>
  );
}
