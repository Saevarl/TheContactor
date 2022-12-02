import { View, Text, TouchableOpacity  } from 'react-native'
import React from 'react'
import { TrashIcon, PhoneIcon, UserCircleIcon  } from "react-native-heroicons/outline";
import { removeContact } from '../../features/contactsSlice';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CallNumber from '../../features/callNumber';

const ContactAnimation = ({contact}) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    return (
    <View className="h-14 ml-2">
      <Text className="text-xs ml-11">Phone {contact.phone}</Text>
      <View className="flex-row justify-between mx-10 mr-12 pt-2">
        <TouchableOpacity
                    onPress={() => CallNumber(contact.phone)} >
            <PhoneIcon 
                    className="h-5 w-5" 
                    color={"green"}
                    />
        </TouchableOpacity>
        <TouchableOpacity
                    onPress={() => dispatch(removeContact(contact))}>
        <TrashIcon 
                className="h-5 w-5 "
                color={"gray"}/>
        </TouchableOpacity>
        <TouchableOpacity
                    onPress={() => navigation.navigate('ContactDetail', {contact: contact})}>
        <UserCircleIcon 
                    className="h-5 w-5" />
        </TouchableOpacity>


      </View>
    </View>
  )
}

export default ContactAnimation