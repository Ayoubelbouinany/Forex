 import React,{ useEffect,useState} from 'react'
 import { Image, Text, TextInput,StyleSheet, TouchableOpacity, View, Dimensions ,ImageBackground,ScrollView,Linking,Button} from 'react-native'
 import axios from "axios";

function Home({ navigation,route }) {
let {user} = route.params;
let userName = user.fullName ? user.fullName : user.name;
const [list, setList] = useState([])
const [load, setload] = useState(false)
let fetchData = async()=>{
  setload(true)
  await axios.get(`http://10.0.2.2:3000/api/products/${userName}`).then(res=>{
console.log(res.data)
setList(res.data);
  }).catch(err=>{
    console.log(err);
  })


  
}

let AddToCart = async(devisesId,increase,decrease)=>{
  let userName = user.fullName ? user.fullName : user.name 
  let data = {
    devisesId,
    increase,
    decrease,
    user:userName
  }
console.log(data)
  await axios.post(`http://10.0.2.2:3000/api/users/cart`,data).then(res=>{
    navigation.navigate('Panier')
  }).catch(err=>{
     console.log(err);
   })



  
}


  useEffect(() => {
    
    console.log("user " + JSON.stringify(user))
    console.log(fetchData());
    console.log(list.products)
  
  }, [])
  return (
        <ScrollView>
    {/* Header  */}
    <ImageBackground source={require('./../../../assets/forex.jpg')} style={styles.imgBack}>
      
    </ImageBackground>

    <View style={styles.infoRest}>
   

      <Text style={styles.nameRest}>Devises      <Image source={require('./../../../assets/shop.png')}/> </Text>
      

    </View>

       {/* list product  */}

    <View style={styles.line}></View>
    <View style={styles.container}>
    <TouchableOpacity
            onPress={() =>
              navigation.navigate('ChartView',{uri:"https://www.tradingview.com/chart/?symbol=FX%3AGBPUSD"})
            }
            style={{
              backgroundColor: "#FFB833",
              alignItems: "center",
              padding: 10,
              borderRadius: 5,
              margin: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
              }}
            >
            GBPUSD
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ChartView',{uri:"https://www.tradingview.com/chart/?symbol=FX%3AEURUSD"})
            }
            style={{
              backgroundColor: "#FFB833",
              alignItems: "center",
              padding: 10,
              borderRadius: 5,
              margin: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
              }}
            >
              EURUSD
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => 
            navigation.navigate('ChartView',{uri:
                "https://www.tradingview.com/chart/?symbol=USDJPY"
            })
            }
            style={{
              backgroundColor: "#FFB833",
              alignItems: "center",
              padding: 10,
              borderRadius: 5,
              margin: 20,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
              }}
            >
              USDJPY
            </Text>
          </TouchableOpacity>
         
          </View>
    <View style={styles.popular}>
    <Text style={styles.textTitle}>Best Sellers</Text>
      {
    
   list && list.products ? list.products.map(r => {
          return(
            <View style={styles.container} key={r.id}>
      <Image source={require('./../../../assets/devises.jpg') }
              style={{
                width:'40%',
                backgroundSize:'cover',
                height:200
              }}
              />
                  <View style={styles.titleSection}>
          <Text style={styles.title}>{r.title}</Text>
          
          <Text style={styles.container} className="price">{r.description}</Text>
          <Text style={styles.price} className="price">{r.price} DH</Text>
          <View> 
        <TouchableOpacity
              style={styles.button}
               onPress={()=>AddToCart(r._id,false,false)}
              >
        <Text style={styles.buttonTitle}>Acheter</Text>
        </TouchableOpacity>
        </View>
          </View>
       
       
        </View>

          );
        })
        :
        <View>
        <Text> Sorry Dont find</Text>
        </View>
      }
   
    </View>

    
    </ScrollView>
  );
}


 export default Home



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
  foods: {
    fontSize: 12,
    color: '#A0A0A0',
  },
  box: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 239,
  },
  boxItem: {
    flexDirection: 'row',
  },
  boxItemText: {
    marginLeft: 1,
  },
  textTitle: {
    fontSize: 16,
  },
  line: {
    backgroundColor: '#F2F2F4',
    height: 4,
    marginBottom: 30,
  },
  popular: {
    marginLeft: 15,
    marginRight: 15,
  },

  boxTitle: {
    width: 145, 
    height: 40,
    marginBottom: -20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E7E7E7',
    borderWidth: 1,
    zIndex: 1,
  },
  titleSection: {
     width:350,
     padding:3,
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'center',
   backgroundColor: 'white',
   marginLeft: 5,
   marginRight: 15,
   borderColor: '#E7E7E7',
   borderRadius: 4,
   borderWidth: 1,
  },
  title: {
    fontSize: 20,
    color: '#459D72',
  },
  price: {
    fontSize: 16,
  },
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15,
    marginTop: 8,
    marginBottom: 18,
  },
  button: {
    backgroundColor: 'gold',
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
}
});
