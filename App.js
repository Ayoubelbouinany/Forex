import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Screen/LoginScreen/Login';
import RegistrationScreen from './src/Screen/RegistrationScreen/RegistrationScreen';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function App() {
  return (
<NavigationContainer>
      <Stack.Navigator>
        {/* { user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : ( */}
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        {/* )} */}
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
