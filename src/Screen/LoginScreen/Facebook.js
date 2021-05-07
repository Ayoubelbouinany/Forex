import React from 'react';
import {TouchableOpacity,Text,Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import * as Facebook from 'expo-facebook';
async function logIn() {
    try {
      await Facebook.initializeAsync({
        appId: '179441964049033',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        console.log($(await response.json()))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
function FacebookSignin() {
    return (
        <TouchableOpacity
        style={styles.button}
        onPress={() => logIn().then(() => console.log('Signed in with Facebook!'))}>
        <Text style={styles.buttonTitle}>FACEBOOK</Text>
      </TouchableOpacity>
    )
}

export default FacebookSignin
