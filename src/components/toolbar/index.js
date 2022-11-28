import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Toolbar = () => {
  return (
    <View className="flex-row h-10 bg-gray-200 items-center justify-center px-4">
        <View className="flex-row space-x-3 "> 
            <TouchableOpacity>
                <Text className="font-bold text-gray-500 p-2">Recents</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text className="font-bold text-gray-500 p-2">Contacts</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Toolbar