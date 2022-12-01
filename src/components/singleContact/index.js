import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ContactAnimation from '../contactAnimation';


const SingleContact = ({contact}) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelected = () => {
    setIsSelected(!isSelected);
  }
  return (
    <View>
    <TouchableOpacity className="flex-row h-11 space-x-1 "
                      onPress={toggleSelected}>
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
    
    {isSelected && <ContactAnimation contact={contact} toggleSelected={() => toggleSelected}/>}
    



    </View>
  )
}

export default SingleContact