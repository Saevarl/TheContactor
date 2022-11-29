import { View, Text, SafeAreaView, ScrollView, FlatList } from 'react-native'
import React, { useLayoutEffect, useState }from 'react'
import { useNavigation } from '@react-navigation/native'; 
import Toolbar from '../../components/toolbar';
import ContactsList from '../../components/contactsList';
import ContactDetails from '../../components/contactDetails';
import * as data from "../../../data.json";

const HomeScreen = ({"navigation": { navigate }}) => {
    const navigation = useNavigation(); 
    const [contacts, setContacts] = useState(data.contacts);
    
    const updateContact = (updatedContact) =>{
      const newContact = contacts.map((contact)=>{
          if(contact.id === updatedContact.id){
              return updatedContact;
          }
          else {
              return contact;
          }
      })
      setContacts(newContact);
  };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    
  return (
    <View>
      <SafeAreaView className=" bg-gray-200 flex-1">

        <ScrollView nestedScrollEnabled={true}>
          <View className="flex-1">
            <ContactsList 
                      navigate={(screen) => navigate(screen)}

            />
          </View>

        </ScrollView>
        <Toolbar className="fixed bottom-0 left-0" />

      </SafeAreaView>
      <FlatList 
            data = {contacts}
            renderItem={({item})=>(
              <ContactDetails
              contacts={item}
              updateContact={updateContact}
              />)}
            keyExtractor={(item) => item?.id}
          />
      </View>
  )
}

export default HomeScreen