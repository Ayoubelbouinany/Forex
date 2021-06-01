import React, { useState, useEffect } from 'react';
 import { Image,Button, Text, TextInput, TouchableOpacity, View ,Alert} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as ImagePicker from 'expo-image-picker';

import styles from './styles';
import axios from 'axios';

function AddProduit({navigation , route}) {
    let {user}= route.params;
    console.log('add' + JSON.stringify(user));
   // const [image, setImage] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [vendeur, setVendeur] = useState('')
    const [cur, setCur] = useState('')



// const _pickImage= async()=>{
//     let result= ImagePicker.launchImageLibraryAsync({
//         mediaTypes:ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//       aspect: [4, 3],
//       quality:1
//     });
//     Alert(result.uri);
//     console.log(result);
//     if(!result.cancelled){
//         setImage(result.uri);
//     }
// } 

useEffect(() => {
    let userName = user.fullName ? user.fullName : user.name;
    setVendeur(userName)
}, [])


    const AddProduct = async ()=>{
        let data = {
            title,
            description,
            price,
            quantity,
            vendeur,
            cur
        }

       await  axios.post('http://10.0.2.2:3000/api/addProduct',data).then(res=>{
        console.log(res)
        Alert('Add successfully')
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
    
      <View style={styles.container}>

{/* <View style={{ 'marginTop': 20}}>
        <Button
          title="Select Image"
          onPress={_pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View> */}

      <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
        <Text >Add Devises </Text>
          <TextInput
              style={styles.input}
              placeholder='Title'
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setTitle(text)}
              value={title} 
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
          <TextInput
              style={styles.input}
              multiline={true}
              numberOfLines={4}
              placeholder='description'
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setDescription(text)}
              value={description} 
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
           <TextInput
              style={styles.input}
              placeholder='Price'
              keyboardType = 'numeric'
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setPrice(text)}
              value={price} 
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
          <TextInput
              style={styles.input}
              placeholder='Quantity'
              keyboardType = 'numeric'
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setQuantity(text)}
              value={quantity} 
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
            <TextInput
              style={styles.input}
              placeholder='CUR {$ or  £ or MAD}'
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setCur(text)}
              value={cur} 
              underlineColorAndroid="transparent"
              autoCapitalize="none"
          />
          <TouchableOpacity
              style={styles.button}
              onPress={() => AddProduct()}>
              <Text style={styles.buttonTitle}>Add</Text>
              
          </TouchableOpacity>
          </KeyboardAwareScrollView>
  </View>
 
    )
}
export default AddProduit
