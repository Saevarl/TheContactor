import { View, Text, Image } from 'react-native'
import React from 'react'

const SingleContact = ({contact}) => {
    
  return (
    <View className="flex-row h-full space-x-1 ">
        <View className="p-2 items-center justify-center">
            {
                contact.photo !== "" ?
                <Image
                    source={{uri: contact.photo}}
                    className="self-center rounded-full w-8 h-8"
                />
                :
                <Image 
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                    className="self-center rounded-full w-8 h-8"
                />

            }
        </View>
      <View className={contact.withDivider ? "justify-center w-5/6 h-full mx-2 border-t border-gray-200": "justify-center w-5/6 h-full mx-2"}>
        <Text 
            >{contact.name}
        </Text>
        
        </View>
    </View>
  )
}

export default SingleContact