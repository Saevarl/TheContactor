import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import styles from "./styles";
import { TextInput } from "@react-native-material/core";

export const ContactDetails = ({contacts, updateContact})=>{
    const [contactImg, setContactImg] = useState(contacts.image)
    const [contactName, setContactName] = useState(contacts.name);
    const [contactNumber, setContactNumber] = useState(contacts.phoneNumber);
    const [isEditingContact, setIsEditingContact] = useState(false);

    const onContactUpdate = () => {
        const updatedContact = {
            id: contacts.id,
            image: contactImg,
            name: contactName,
            phoneNumber: contactNumber,
        }
        setContactImg("");
        setContactName("");
        setContactNumber("");
        setIsEditingContact(false);
        updateContact(updatedContact);
        updateJson(contacts.id, updatedContact)
    };

    const updateJson = async(id, updItem)=>{
        const response = await fetch(`/feedback/${id}`, {
            methot: 'PUT',
            header: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedback(
            feedback.map((item)=>(item.id === id ? { ...item, ...data } : item))
        )
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
                                value={contactImg}
                                onChangeText={(text) => setImgURL(text)}
                            />
                            <TextInput
                                color={'green'}
                                label="Contact Number"
                                value={contactNumber}
                                onChangeText={(text) => setContactNumber(text)}
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
                            source={{ uri: contacts.image}} />
                        <View style={styles.contact}>
                            <Text>Name: {contacts.name}</Text>
                            <Text>Phone number: {contacts.phoneNumber}</Text>
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
export default ContactDetails;