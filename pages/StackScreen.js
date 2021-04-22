import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ArtistList from './ArtistList';
import SearchPage from './SearchPage';

const Stack = createStackNavigator();

const StackScreen = () => {
  return(
    <Stack.Navigator >
      <Stack.Screen name = "Searchpage" component = {SearchPage}  options={{
      headerStyle: {
        backgroundColor: '#2e91d9'
      },headerTintColor: '#fff',
      }}/>
      <Stack.Screen name = "AritstList" component = {ArtistList} getParam/>
      
    </Stack.Navigator>
  ) 
}

export default StackScreen;

