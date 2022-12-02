import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import styles from "./styles";
import { TextInput } from "@react-native-material/core";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import CallNumber from "../../features/callNumber";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { selectContacts } from "../../features/contactsSlice";


export const ContactDetail = ({ route })=>{
    const [contact, setContact] = useState(route.params.contact)
    
    const navigation = useNavigation(); 
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
    
    return (
        <SafeAreaView className="bg-gray-200">
            
            <TouchableOpacity
                    onPress={() => navigation.goBack()} >
                <View className="ml-3">
                    <MaterialIcons
                        name='arrow-back-ios'
                        size={24}
                    />
            </View>
            </TouchableOpacity>
            <Image
                style={styles.contactImage}
                source={{ uri: contact.photo}}
                className="self-center" />
            <View className="h-60" >
                <View className="flex-row justify-center">
                    <Text className="font-bold text-3xl ml-8 self-center">{contact.name}</Text>
                    <TouchableOpacity
                                    className="ml-2 mt-3"
                                    onPress={() => navigation.navigate("EditContact", {contact: contact})}>
                            <AntDesign name="edit" color={"gray"} size={16}/>
                    </TouchableOpacity>
                </View>
                <View className="flex-row p-2 self-center mb-8">
                    <Text className="text-gray-500 text-xs">Phone</Text>
                    <Text className="ml-2">{contact.phone}</Text>
                </View>
                
            </View>
            <View className="bg-slate-200 h-full items-center">
                
                <TouchableOpacity
                            className="rounded-full p-2 mt-12"
                            onPress={() => CallNumber(contact.phone)}>
                    <AntDesign name="phone" color={"green"} size={40}/>
                </TouchableOpacity>
            </View>
                        
                    
        </SafeAreaView>
    );
};
export default ContactDetail;