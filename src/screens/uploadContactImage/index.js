import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import styles from '../contactDetail/styles';

export default class UploadContactImage extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <Text></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 50
    },
});