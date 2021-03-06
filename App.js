import React from 'react';
import Playlist from './pages/Playlist';
import StackScreen from './pages/StackScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Now Playing" 
          component={Playlist} 
          options = {{
            tabBarIcon: ({color, size}) => <MaterialIcons name = "headset" size = {size} color = {color}/>
        }}/>
        <Tab.Screen name="Search" component={StackScreen} options = {{
          tabBarIcon: ({color, size}) => <AntDesign name="search1" size={size} color={color} />
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App;

