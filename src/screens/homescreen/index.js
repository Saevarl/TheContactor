import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect }from 'react'
import { useNavigation } from '@react-navigation/native'; 
import Toolbar from '../../components/toolbar';

const HomeScreen = () => {
    const navigation = useNavigation(); 
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    


  return (
    <SafeAreaView>
    <View>
      <Text className="text-red-500">HomeScreen</Text>
      <Toolbar className="h-10 bg-blue-500"/>
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen