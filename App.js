import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/homescreen';
import CreateContact from './src/screens/createContact';
import ContactDetail from './src/screens/contactDetail';
import SearchContacts from './src/screens/searchContacts';
import EditContact from './src/screens/editContact';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateContact" component={CreateContact} />
        <Stack.Screen name="ContactDetail" component={ContactDetail} />
        <Stack.Screen name="SearchContacts" component={SearchContacts} />
        <Stack.Screen name="EditContact" component={EditContact} />
      </Stack.Navigator>
    </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
