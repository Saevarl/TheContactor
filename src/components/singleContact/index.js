import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const SingleContact = ({contact}) => {
    
  return (
    <TouchableOpacity className="flex-row h-11 space-x-1 ">
        <View className="p-2 items-center justify-center">
            {
                contact.photo !== "" ?
                <Image
                    source={{uri: contact.photo}}
                    className="self-center rounded-full w-8 h-8"
                />
                :
                <Image 
                    source={{uri: 'https://picsum.photos/200/300'}}
                    className="self-center rounded-full w-8 h-8"
                />

            }
        </View>
      <View className={contact.withDivider ? "justify-center w-5/6 h-full mx-2 border-t border-gray-200": "justify-center w-5/6 h-full mx-2"}>
        <Text 
            >{contact.name}
        </Text>
        
        </View>
    </TouchableOpacity>
  )
}

export default SingleContact