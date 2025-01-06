import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AddEmployee from './screens/AddEmployee';
import ViewEmployees from './screens/ViewEmployees';
import SanctionScreen from './screens/SanctionScreen';
import TaskScreen from './screens/TaskScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ViewEmployees" component={ViewEmployees} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} />
        <Stack.Screen name='SanctionScreen' component={SanctionScreen}/>
        <Stack.Screen name='TaskScreen' component={TaskScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}