import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState }from 'react'
import { CameraIcon } from 'react-native-heroicons/solid'
import { UserIcon, PhoneIcon, CameraIcon as Camera } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addContact } from '../../features/contactsSlice'
import uuid from 'react-native-uuid';

const CreateContact = ({"navigation": { navigate }}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch(); 
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    const [isEditingName, setIsEditingName] = useState(false)
    const [isEditingPhone, setIsEditingPhone] = useState(false)
    const [isEditingPhoto, setIsEditingPhoto] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [photo, setPhoto] = useState('')
  
  const CreateContact = () => {
    const contact = {
        id: `${uuid.v4()}`,
        name: name,
        phone: phone,
        photo: photo?photo:'https://www.picsum.photos/200/300'
    }
    setName('');    
    setPhone('');
    setPhoto('');
    dispatch(addContact( contact ));
    navigate('Home');
    }  

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
        <ScrollView>
        <View className=" h-screen py-4 flex-1">
      <View className="h-30 flex flex-col ">
        <View className="h-20 items-center justify-center">
            <CameraIcon className="h-40 w-40" color={"orange"}/>
        </View>
        <View className="flex-row bg-white items-center rounded-lg mx-3 px-2 mb-3">
            <UserIcon className="h-40 w-40 ml-2" color={ isEditingName ? "orange" : "gray"}/>
            <TextInput 
                    className="bg-white h-10 px-5 pr-16 w-full rounded-lg text-sm focus:outline-none" 
                    type="text" 
                    name="name" 
                    placeholder="Name"
                    onFocus={() => setIsEditingName(true)}
                    onBlur={() => setIsEditingName(false)}
                    onChangeText={text => setName(text)}
                    selectionColor={"orange"}      
                    />
        </View>
        <View className="flex-row bg-white items-center rounded-lg mx-3 px-2 mb-3">
            <PhoneIcon className="h-40 w-40 ml-2" color={ isEditingPhone ? "orange" : "gray"}/>
            <TextInput 
                    className="bg-white h-10 px-5 pr-16 w-full rounded-lg text-sm focus:outline-none" 
                    type="text" 
                    name="Phone" 
                    placeholder="Phone"
                    onFocus={() => setIsEditingPhone(true)}
                    onBlur={() => setIsEditingPhone(false)}
                    onChangeText={text => setPhone(text)} 
                    selectionColor={"orange"}
                    />
        </View>
        <View className="flex-row bg-white items-center rounded-lg mx-3 px-2 mb-3">
            <Camera className="h-40 w-40 ml-2" color={ isEditingPhoto ? "orange" : "gray"}/>
            <TextInput 
                    className="bg-white h-10 px-5 pr-16 w-full rounded-lg text-sm focus:outline-none" 
                    type="text" 
                    name="Photo" 
                    placeholder="Photo"
                    onFocus={() => setIsEditingPhoto(true)}
                    onBlur={() => setIsEditingPhoto(false)}
                    onChangeText={text => setPhoto(text)} 
                    selectionColor={"orange"}
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
                        onPress={() => CreateContact()}>
                        
                <Text className="font-bold text-gray-500 p-2">Save</Text>
            </TouchableOpacity>

        
        </View>
    </View>
    </SafeAreaView>
    
  )
}

export default CreateContact