import * as React from 'react';
import { WebView } from 'react-native-webview';

function WebChart({ navigation, route }) {
   let {uri} = route.params;
    return (
    
        <WebView
        source={{ uri: uri}}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn('WebView error: ', nativeEvent);
        }}
      />
       
    )
}

export default WebChart


