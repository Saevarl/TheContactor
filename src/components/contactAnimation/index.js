import { View, Text, TouchableOpacity  } from 'react-native'
import React from 'react'
import { TrashIcon, PhoneIcon, UserCircleIcon  } from "react-native-heroicons/outline";

const ContactAnimation = ({ contact }) => {
    return (
    <View className="h-14 ml-2">
      <Text className="text-xs ml-11">Phone: {contact.phone}</Text>
      <View className="flex-row justify-between mx-10 mr-12 pt-2">
        <TouchableOpacity
                    >
            <PhoneIcon 
                    className="h-5 w-5" 
                    color={"green"}
                    />
        </TouchableOpacity>
        <TrashIcon 
                className="h-5 w-5 "
                color={"gray"}/>
        <UserCircleIcon 
                    className="h-5 w-5" />
        </View>
    </View>
  )
}

export default ContactAnimation