import React, { Profiler } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import Chart from "./Chart";
import  Profile from "./Profile/index";
import AddProduit from './AddProduit';
import SettingsScreen from './Home';
import Panier from './Panier';
const Tab = createBottomTabNavigator();
function Routes({user}) {
  return (
    // <NavigationContainer>


     <Tab.Navigator
     
     screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
      
        if (route.name === 'Home') {
          iconName =  'home-outline';
        } else if (route.name === 'Profile') {
          iconName = 'person-circle-outline';
        }else if(route.name === 'Chart'){
          iconName = 'bar-chart-outline';
        }
        else if(route.name === 'AddProduct'){
          iconName = 'add-circle-outline';
        }
        else if(route.name === 'Panier'){
          iconName = 'cart-outline';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
   
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      tabBarVisible: false,
            style: {
              height: 60,
              paddingTop: 10,
              paddingBottom: 5,
            },
            
    }}
   
     
  
        
    
     >
  
     <Tab.Screen name="Home" component={SettingsScreen} initialParams={{user: user}} >
  
       </Tab.Screen>
       
        
      <Tab.Screen name="Profile" component={Profile} initialParams={{user: user}} > 
    
      </Tab.Screen> 
   

       <Tab.Screen name="AddProduct" component={AddProduit}  initialParams={{user: user}}>
       </Tab.Screen>

       <Tab.Screen name="Panier" component={Panier}  initialParams={{user: user}}>
       </Tab.Screen>

      </Tab.Navigator>
 /* </NavigationContainer> */
  )
}

export default Routes