import React,{useState,useEffect} from 'react'
import { View,Alert } from 'react-native'
import Routes from './Routes'
import Login from "./../LoginScreen/Login";
import {_retrieveData,_storeData  } from "../localStorage";


  
  
function HomeScreen({navigation,route}) {

    // const [user, setUser] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    
      let {user}= route.params;

    useEffect(() => {
        //fetchUser();
       // console.log(user);
      }, []);


    // const fetchUser = async () => {
    //     // setIsLoading(true);
    //     const userData = await _retrieveData('user');
    //     setUser(userData);
    //     // setIsLoading(false);
    //   }


   
    return user === ''? <Login />: <Routes  user={user} />;
  
   
}

export default HomeScreen
