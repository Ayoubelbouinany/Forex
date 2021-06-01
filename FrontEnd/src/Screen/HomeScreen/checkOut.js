import React,{useEffect, useState } from 'react'
import { View,TextInput,StyleSheet, Text,TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { axios } from "axios";
function checkOut({ navigation,route }) {
//     await axios.post(`http://10.0.2.2:3000/api/addCommande`,data).then(res=>{
//   // console.log(res.data)
//     }).catch(err=>{
//        console.log(err);
//      })

let {data} = route.params;
console.log({data});
    const [adress, setAdress] = useState('')
  const [ville, setVille] = useState('')
    return (
       <View style={styles.container}>
            <TextInput
                  style={styles.input}
                  placeholder='Adresse'
                  placeholderTextColor="#aaaaaa"
                  onChangeText={(text) => setAdress(text)}
                  value={adress}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TextInput
                  style={styles.input}
                  placeholderTextColor="#aaaaaa"
                  placeholder='Ville'
                  onChangeText={(text) => setVille(text)}
                  value={ville}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
              />
              <TouchableOpacity
                  style={styles.button}
                  onPress={() => console.log('hello')}>
                  <Text style={styles.buttonTitle}>Log in</Text>
                  
              </TouchableOpacity>
       </View>
    )
}

export default checkOut

const styles= StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
})

    