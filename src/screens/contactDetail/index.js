import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import styles from "./styles";
import { TextInput } from "@react-native-material/core";
import { useDispatch } from "react-redux";
import { addContact, removeContact } from "../../reducers/contactsSlice";
import { useNavigation } from "@react-navigation/native";



export const ContactDetail = ({ route })=>{
    const contact = route.params.contact;
    const [contactPhoto, setContactPhoto] = useState(contact.photo)
    const [contactName, setContactName] = useState(contact.name);
    const [contactPhone, setContactPhone] = useState(contact.phone);
    const [isEditingContact, setIsEditingContact] = useState(false);

    const dispatch = useDispatch();
    
    
    const onContactUpdate = () => {
        dispatch(removeContact(contact));
        dispatch(addContact({
            id: contact.id,
            name: contactName,
            phone: contactPhone,
            photo: contactPhoto
        }));
        setIsEditingContact(false);
    }
    
    return(
        <View style={styles.contactView}>
            {
                        isEditingContact
                        ?
                        <> 
                        <View style={styles.editContainer}>
                            <Text style={styles.updateContactHeader}>Edit Contact Info</Text>
                            <TextInput
                                
                                color={'green'}
                                label="Contact Name"
                                value={contactName}
                                onChangeText={(text) => setContactName(text)}
                            />
                            <TextInput
                                
                                color={'green'}
                                label="Image URL"
                                value={contactPhoto}
                                onChangeText={(text) => setContactPhoto(text)}
                            />
                            <TextInput
                                color={'green'}
                                label="Contact Number"
                                value={contactPhone}
                                onChangeText={(text) => setContactPhone(text)}
                                />
                            <View style={styles.createContactBtns}>
                                <Button
                                    title="Cancel"
                                    onPress={() => setIsEditingContact(false)}
                                />
                                <Button
                                    title="Update Contact"
                                    onPress={onContactUpdate}
                                    color={'green'}
                                />
                            </View>    
                
                        </View>
                        
                       </>
                        :
                        <>
                        <Image
                            style={styles.contactImage}
                            source={{ uri: contactPhoto}} />
                        <View style={styles.contact}>
                            <Text>Name: {contactName}</Text>
                            <Text>Phone number: {contactPhone}</Text>
                        </View>
                        <TouchableOpacity
                                style={styles.editBtn}
                                        onPress={() => setIsEditingContact(true)}>
                                <Text style={styles.btnText}>Edit contact info</Text>
                            </TouchableOpacity>
                        </>
                    }
        </View>
    );
};
export default ContactDetail;