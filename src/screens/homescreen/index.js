import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React, { useLayoutEffect }from 'react'
import { useNavigation } from '@react-navigation/native'; 
import Toolbar from '../../components/toolbar';
import ContactsList from '../../components/contactsList';

const HomeScreen = ({"navigation": { navigate }}) => {
    const navigation = useNavigation(); 
    
  



    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])
  
  return (
    <SafeAreaView className=" bg-gray-200 flex-1">
    
      <ScrollView nestedScrollEnabled={true}>
        <View className="flex-1">
          <ContactsList 
                    navigate={(screen) => navigate(screen)}
                    
          />
        </View>
      
      </ScrollView>
      <Toolbar className="fixed bottom-0 left-0" />
    
    </SafeAreaView>
  )
}

export default HomeScreen