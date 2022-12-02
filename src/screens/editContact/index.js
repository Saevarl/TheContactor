import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { addContact, removeContact } from "../../features/contactsSlice";
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraIcon } from 'react-native-heroicons/solid'
import { UserIcon, PhoneIcon, CameraIcon as Camera } from 'react-native-heroicons/outline'



const EditContact = ({ route }) => {
    const contact = route.params.contact;
    const [contactPhoto, setContactPhoto] = useState(contact.photo)
    const [contactName, setContactName] = useState(contact.name);
    const [contactPhone, setContactPhone] = useState(contact.phone);
    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingPhone, setIsEditingPhone] = useState(false)
    const [isEditingPhoto, setIsEditingPhoto] = useState(false)

    const dispatch = useDispatch();
    const navigation = useNavigation(); 
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    
    
    const onContactUpdate = () => {
        dispatch(removeContact(contact));
        dispatch(addContact({
            id: contact.id,
            name: contactName,
            phone: contactPhone,
            photo: contactPhoto
        }));
        navigation.navigate("Home");
    }
  return (
    <SafeAreaView className="flex-1 bg-gray-200">
        <ScrollView>
        <Text className="text-xl font-bold ml-8 mt-8 self-center mr-8">Edit Contact</Text>
        <View className=" h-screen py-4 flex-1">
      <View className="h-30 flex flex-col ">
        <View className="h-20 items-center justify-center">
            <CameraIcon className="h-40 w-40" color={"green"}/>
        </View>
        <View className="flex-row bg-white items-center rounded-lg mx-3 px-2 mb-3">
            <UserIcon className="h-40 w-40 ml-2" color={ isEditingName ? "green" : "gray"}/>
            <TextInput 
                    className="bg-white h-10 px-5 pr-16 rounded-lg w-full text-sm focus:outline-none" 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                    onFocus={() => setIsEditingName(true)}
                    onBlur={() => setIsEditingName(false)}
                    onChangeText={text => setContactName(text)}
                    value={contactName}
                    selectionColor={"green"}      
                    />
        </View>
        <View className="flex-row bg-white items-center rounded-lg mx-3 px-2 mb-3">
            <PhoneIcon className="h-40 w-40 ml-2" color={ isEditingPhone ? "green" : "gray"}/>
            <TextInput 
                    className="bg-white h-10 px-5 pr-16 w-full rounded-lg text-sm focus:outline-none" 
                    type="text" 
                    name="Phone" 
                    placeholder="Phone"
                    onFocus={() => setIsEditingPhone(true)}
                    onBlur={() => setIsEditingPhone(false)}
                    onChangeText={text => setContactPhone(text)} 
                    value={contactPhone}
                    selectionColor={"green"}
                    />
        </View>
        <View className="flex-row bg-white items-center rounded-lg mx-3 px-2 mb-3">
            <Camera className="h-40 w-40 ml-2" color={ isEditingPhoto ? "green" : "gray"}/>
            <TextInput 
                    className="bg-white h-10 px-5 pr-16 w-full rounded-lg text-sm focus:outline-none" 
                    type="text" 
                    name="Photo" 
                    placeholder="Photo"
                    onFocus={() => setIsEditingPhoto(true)}
                    onBlur={() => setIsEditingPhoto(false)}
                    onChangeText={text => setContactPhoto(text)} 
                    value={contactPhoto}
                    selectionColor={"green"}
                    />
        </View>
        
      </View>
    </View>
    </ScrollView>
    <View className="flex-row h-10 bg-gray-200 justify-center px-4">
        <View className="flex-row space-x-8 "> 
            <TouchableOpacity 
                        className="item-center"
                        onPress={() => navigation.goBack()}>
                <Text className="font-bold text-gray-500 p-2">Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                        className="w-auto"
                        onPress={() => onContactUpdate()}>
                        
                <Text className="font-bold text-gray-500 p-2">Save</Text>
            </TouchableOpacity>

        
        </View>
    </View>
    </SafeAreaView>
  )
}

export default EditContact