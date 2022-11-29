import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Button } from "react-native";
import styles from "./styles";

export const ContactDetails = ({contacts})=>{
    console.log(contacts.image)
    return(
        <View styles={styles.contactView}>
            <Image
                styles={styles.contactImage}
                resizeMode="cover"
                source={{uri: contacts.image}}/>
            <Text>{contacts.name}</Text>
        </View>
    );
};
export default ContactDetails;