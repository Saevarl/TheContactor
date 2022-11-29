import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export const ContactDetails = ({contacts})=>{
    return(
        <View style={styles.contactView}>
            <Image
                style={styles.contactImage}
                source={{ uri: contacts.image}} />
            <View style={styles.contact}>
                <Text>Name: {contacts.name}</Text>
                <Text>Phone number: {contacts.phoneNumber}</Text>
            </View>
        </View>
    );
};
export default ContactDetails;