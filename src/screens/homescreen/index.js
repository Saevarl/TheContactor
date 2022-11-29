import { View, Text, SafeAreaView, Image, FlatList } from 'react-native'
import React, { useLayoutEffect, useState }from 'react'
import { useNavigation } from '@react-navigation/native'; 
import Toolbar from '../../components/toolbar';
import ContactsList from '../../components/contactsList';
import ContactDetails from '../../components/contactDetails';
import * as data from "../../../data.json";

const HomeScreen = () => {
    const navigation = useNavigation(); 
    const [contacts, setContacts] = useState(data.contacts)
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
  
  return (
    <SafeAreaView className="bg-gray-200">
    <View>
      <ContactsList />
      <Toolbar />
      <FlatList 
        data = {contacts}
        renderItem={({item})=>(
          <ContactDetails
          contacts={item}
          />)}
        keyExtractor={(item) => item?.id}
      />
    </View>
    </SafeAreaView>
    
  )
}

export default HomeScreen