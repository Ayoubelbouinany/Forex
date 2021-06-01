import * as React from 'react';
import { Image, Text, View,StyleSheet, Dimensions ,ImageBackground,ScrollView} from 'react-native'
import { WebView } from 'react-native-webview';

function WebChart({ navigation, route }) {
   let {uri} = route.params;
    return (
        <View style={{ height: '100%' }}>
        {/* Header  */}
        <ImageBackground source={require('./../../../assets/forex.jpg')} style={styles.imgBack}>
          
        </ImageBackground>
    
        <View style={styles.infoRest}>
       
    
          <Text style={styles.nameRest}>Devises      <Image source={require('./../../../assets/shop.png')}/> </Text>
          
    
        </View>
     
        <WebView
        source={{ uri: uri}}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
        javaScriptEnabled
          domStorageEnabled
          allowFileAccessFromFileURLs
          startInLoadingState
          originWhitelist={['*']}
          mixedContentMode="compatibility"
      />
     
      </View>
       
    )
}

export default WebChart


const styles = StyleSheet.create({
    imgBack: {
      width: '100%', 
      height: 200,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 15,
      marginRight: 15,
      marginBottom: 49,
    },
    infoRest: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      height: 120,
      marginTop: -58,
      marginLeft: 15,
      marginRight: 15,
      borderColor: '#E7E7E7',
      borderRadius: 4,
      borderWidth: 1,
    },
    nameRest: {
      fontSize: 20,
      color: '#342B2B',
      marginBottom: 7,
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
        marginTop: 8,
        marginBottom: 18,
      }
  });
  