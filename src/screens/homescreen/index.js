import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect }from 'react'
import { useNavigation } from '@react-navigation/native'; 
import Toolbar from '../../components/toolbar';
import ContactsList from '../../components/contactsList';

const HomeScreen = () => {
    const navigation = useNavigation(); 
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
  
  return (
    <SafeAreaView className="bg-gray-200">
    <View>
      <ContactsList />
      <Toolbar />
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen