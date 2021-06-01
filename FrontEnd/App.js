import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Screen/LoginScreen/Login';
import RegistrationScreen from './src/Screen/RegistrationScreen/RegistrationScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/Screen/HomeScreen/HomeScreen';
import WebChart from './src/Screen/HomeScreen/WebChart';
import checkOut from './src/Screen/HomeScreen/checkOut';


const Stack = createStackNavigator();
export default function App() {
  let user=undefined;
  return (
<NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChartView" component={WebChart} />
      <Stack.Screen name="checkout" component={checkOut} />
      </Stack.Navigator>
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
