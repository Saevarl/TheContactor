import { View, Text, TextInput, ScrollView, TouchableOpacityBase, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectContacts } from '../../features/contactsSlice';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import SingleContact from '../../components/singleContact';

const SearchContacts = () => {
    const contacts = useSelector(selectContacts);
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown: false
      })
  }, [])

    const filteredContacts = contacts.filter(contact => {
      if (search.length > 0) {  
      return contact.name.toLowerCase().includes(search.toLowerCase());
      }})

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
    <SafeAreaView className="bg-gray-200">
      <View className="flex-row mx-2 bg-gray-200 items-center"> 
        <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        className="ml-1">
          <MaterialIcons
                    name='arrow-back-ios'
                    size={19}
                    color={"rgb(51 65 85)"}
                    className="self-center mx-2"
                    />
        </TouchableOpacity>
        
        <TextInput 
                className="self-center text-xl mb-1 ml-1 "
                placeholder='Search'
                placeholderTextColor={"rgb(51 65 85)"}
                onChangeText={text => setSearch(text)}
                selectionColor={"green"}
                />
      </View>
      <ScrollView 
                className="bg-gray-200 h-full">
        {
          filteredContacts.length > 0
          ?
          <View className="flex-row m-2">
            <Text className="flex-1">Contacts</Text>
            <Text>
                {filteredContacts.length} found
            </Text>
        </View>
        :
        <></>
        }

        <View className="bg-gray-100 rounded-xl mt-1"> 
          {
            filteredContacts.map(contact => {
              contact = {...contact, withDivider: true}
              return renderContact({contact})
            }
            )
          }

      

          
        </View>
        
      </ScrollView>
      
    </SafeAreaView>
  )
}

export default SearchContacts