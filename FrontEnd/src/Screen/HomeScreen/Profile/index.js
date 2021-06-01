import React from 'react';
import { ScrollView,Button, View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ItemsProfile from './ItemsProfile';

import { items } from './../../../../mocks';

export default function Profile({navigation , route}) {
  let {user}= route.params;
  return(
    <ScrollView>
      <Image source={require('./../../../../assets/Profile/ground.png')} style={{height: 140,     width: '100%',}} />
      <View style={styles.user}>
        <View style={styles.edit}>
          <Image source={require('./../../../../assets/Profile/pencil.png')} style={{marginRight: 16, marginTop: 15}} />
        </View>
        <View style={styles.userInfo}>
          <Image source={require('./../../../../assets/Profile/user.png')} style={{width:30,height:30,backgroundSize:'cover'}} />
          <View style={styles.boxUser}>
            <Text style={styles.username}>{user.fullName ? user.fullName : user.name }</Text>
            <Text style={styles.mail}>{user.email ? user.email : 'Email From Facebook '}</Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        {
          items.map(item => {
            return (
              <ItemsProfile data={item} />
            );
          })
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  user: {
    backgroundColor: 'white',
    height: 120,
    marginTop: -70,
    marginLeft: 15,
    marginRight: 15,
    borderColor: '#E7E7E7',
    borderRadius: 4,
    borderWidth: 1,
  },
  edit: {
    flexDirection: 'row-reverse',
  },
  userInfo: {
    marginLeft: 20,
    marginTop: -6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  boxUser: {
    flexDirection: 'column',
    marginLeft: 20, 
    justifyContent: 'center',
  },
  username: {
    fontSize: 20,
    color: '#342B2B',
  },
  mail: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  box: {
    marginTop: 35,
    marginLeft: 29,
    marginRight: 29,
  },
});