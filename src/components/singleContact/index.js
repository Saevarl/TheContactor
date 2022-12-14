import { View, Text, Image, TouchableOpacity, LayoutAnimation } from 'react-native'
import React, { useState } from 'react'
import ContactAnimation from '../contactAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { setExpandedContact } from '../../features/contactsSlice';



const SingleContact = ({contact}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);
  const selectedContact = useSelector(state => state.contacts.expandedContact);
  const dispatch = useDispatch();

  const toggleSelected = () => {
    if (selectedContact === null || selectedContact !== contact.id) {
      updateLayout();
      dispatch(setExpandedContact(contact.id));
      
    } else {
      dispatch(setExpandedContact(null));
      updateLayout();
    }
  }


  
  const updateLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLayoutHeight(layoutHeight === 0 ? 1 : 0);
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
    
    {selectedContact === contact.id && <ContactAnimation contact={contact}/>}
    



    </View>
  )
}

export default SingleContact