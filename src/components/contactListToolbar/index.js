import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { PlusIcon } from "react-native-heroicons/solid";
import { MagnifyingGlassIcon, EllipsisVerticalIcon } from "react-native-heroicons/outline";

const ContactListToolbar = () => {
  return (
    <View className="flex-row h-10 mb-2 bg-gray-200 justify-center">
      <Text className="flex-1 font-bold text-xl m-2 " >Phone</Text>
      <View className="flex-row justify-center mx-4 mt-2 space-x-2">
        <TouchableOpacity>
            <PlusIcon color={"black"} className="h-6 w-6 m-2 ml-2" />
        </TouchableOpacity>
        
        <TouchableOpacity>
            <MagnifyingGlassIcon color={"black"} className="h-6 w-6 m-2 ml-2" />
        </TouchableOpacity>

        <TouchableOpacity>  
            <EllipsisVerticalIcon color={"black"} className="h-6 w-6 m-2 ml-2" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ContactListToolbar