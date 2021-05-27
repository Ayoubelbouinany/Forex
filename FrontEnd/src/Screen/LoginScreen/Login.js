import React, { useState, useEffect } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View ,Alert} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { firebase } from '../../firebase/config'
import FacebookSignin from './Facebook';
import styles from './styles';
import * as Facebook from 'expo-facebook';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { _storeData, _retrieveData} from "../localStorage";
export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tokens,setToken]=useState({});
  const onFooterLinkPress = () => {
      navigation.navigate('Registration')
  }

  useEffect(()=>{
   setToken(_retrieveData('user'));
  },[])
  
  //Login Facebook
  const LoginFacebook= async () => {
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
       // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
       navigation.navigate('Home', {user: await response.json()})
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }



  const onLoginPress = () => {
  
    firebase
    .auth().signInWithEmailAndPassword(email, password)
          .then((response) => {
              const uid = response.user.uid
              const usersRef = firebase.firestore().collection('users')
              usersRef
                  .doc(uid)
                  .get()
                  .then(firestoreDocument => {
                      if (!firestoreDocument.exists) {
                          alert("User does not exist anymore.")
                          return;
                      }
                      const user = firestoreDocument.data()

                     _storeData('user','ayoub');
                      navigation.navigate('Home', {user: user})
                  })
                  .catch(error => {
                      alert(error)
                  });
          })
          .catch(error => {
              alert(error)
          })
  }

  return (
      <View style={styles.container}>
          <KeyboardAwareScrollView
              style={{ flex: 1, width: '100%' }}
              keyboardShouldPersistTaps="always">
              <Image
                  style={styles.logo}
                  source={require('../../../assets/iconFireBase.png')}
              />
              <TextInput
                  style={styles.input}
                  placeholder='E-mail'
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  secureTextEntry
                  placeholder='Password'
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => onLoginPress()}>
                  <Text style={styles.buttonTitle}>Log in</Text>
                  
              </TouchableOpacity>
              <TouchableOpacity
              style={styles.button}
              onPress={() => LoginFacebook().then(() => console.log('Signed in with Facebook!'))}>
        <Text style={styles.buttonTitle}>FACEBOOK</Text>
      </TouchableOpacity>
              <View style={styles.footerView}>
                  <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
              </View>
            
          </KeyboardAwareScrollView>
      
      </View>
  )
}