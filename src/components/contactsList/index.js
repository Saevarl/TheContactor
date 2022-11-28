import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ContactListToolbar from '../contactListToolbar'

const ContactsList = ({navigate}) => {
  // dummy contacts with name and phone number as key
  const contacts = [
    {name: 'John Doe', phone: '234567890'},
    {name: 'Jane Doe', phone: '987654321'},
    {name: 'John Smith', phone: '13456790'},
    {name: 'Jane Smith', phone: '09874321'},
    {name: 'John Doe', phone: '12356780'},

  ]
  return (
    <View className="bg-gray-200"> 
        <ContactListToolbar 
                        navigate={navigate}
        />
        <FlatList
          data={contacts}
          renderItem={({item}) => <Text className="bg-white p-2 m-2">{item.name}</Text>}
          keyExtractor={item => item.phone}
          nestedScrollEnabled={true}
        />
      
    </View>
  )
}

export default ContactsList
