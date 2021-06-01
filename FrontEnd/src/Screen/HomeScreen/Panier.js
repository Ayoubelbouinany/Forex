import React , { useEffect,useState } from 'react'
import { View, Text, Image,StyleSheet,TouchableOpacity, ScrollView, Alert } from 'react-native'
import axios from "axios";
function Panier({ navigation , route}) {

    let {user} = route.params;
let userName = user.fullName ? user.fullName : user.name;
const [listPanier, setPanier] = useState([])
const [load, setload] = useState(false)
console.log('user Name ' + userName);
let fetchData = async()=>{
    setload(true)
    await axios.get(`http://10.0.2.2:3000/api/users/${userName}/cart`).then(res=>{
  setPanier(res.data);
    }).catch(err=>{
      console.log(err);
    })
}

    let AddToCart = async(devisesId,increase,decrease)=>{
        let userName = user.fullName ? user.fullName : user.name 
        let data = {
          devisesId,
          user:userName,
          increase,
          decrease
        }
      console.log(data)
        await axios.post(`http://10.0.2.2:3000/api/users/cart`,data).then(res=>{
      // console.log(res.data)
      fetchData();
        }).catch(err=>{
           console.log(err);
         })
        }

//Passer la commande

let PasserCommande = async(totalPrice,totalQuantity)=>{
    let userName = user.fullName ? user.fullName : user.name ;
    let userSold=0;
    let email ='ayoub.elbouinany99@gmail.com';
    let newSold=0;
    let cur='';
    await axios.get(`http://10.0.2.2:3000/api/users/${userName}`).then(res=>{
         userSold= res.data.user.sold;
         //email=res.data.user.email;
        }).catch(err=>{
            console.log(err)
        })

   console.log(userSold);
    listPanier.cart && listPanier.cart.items && Object.keys(listPanier.cart.items).map(async (id) =>{
      let data1={
        idDevise:listPanier.cart.items[id].produit._id,
        quantity:listPanier.cart.items[id].qty
      }
       await axios.post(`http://10.0.2.2:3000/api/UpdateDevises`,data1).then(res=>{
        
        cur = listPanier.cart.items[id].produit.cur;
            if(userSold > 0){
                if(listPanier.cart.items[id].produit.cur === '$'){
                 
                 newSold= parseFloat(userSold - totalPrice).toFixed(2);
                 //ADD new Commande
                 addNewCommande(userName,totalPrice,totalQuantity,email,cur,newSold);

                 }else if(listPanier.cart.items[id].produit.cur === '£'){
                     newSold= parseFloat(userSold/1.4 - totalPrice).toFixed(2);
                     //ADD new Commande
                 addNewCommande(userName,totalPrice,totalQuantity,email,cur,newSold);
                     
                 }else if(listPanier.cart.items[id].produit.cur === 'MAD'){
                     newSold= parseFloat(userSold*10 - totalPrice).toFixed(2);
                     //ADD new Commande
                     addNewCommande(userName,totalPrice,totalQuantity,email,cur,newSold);
                 }
              }else{
                  Alert('Le solde est insuffisant')
              }


        }).catch(err=>{
            console.log(err)
        })
     
    }
    
          )

       
         
          
}

let  addNewCommande= async (userName,totalPrice,totalQuantity,email,cur,newSold)=>{ 
let data = {
    fullName:userName,
    totalPrice:totalPrice,
    totalQuantity:totalQuantity,
    email:email,
    cur:cur
}
await axios.post(`http://10.0.2.2:3000/api/addCommande`,data).then(res=>{
  let data = {
      fullName:userName,
        newSold:newSold,
        fullName:userName
  };
   axios.post(`http://10.0.2.2:3000/api/updateSold`,data).then(res=>{
      console.log(res);
     }).catch(err=>{
         console.log(err)
     })
     Alert('Commande va passer !')

}).catch(err=>{
    console.log(err);
})
}


useEffect(() => {
    fetchData();
}, [])

    return (
        <ScrollView>



<View style={styles.popular}>
        {
    
            listPanier.cart && listPanier.cart.items ? Object.keys(listPanier.cart.items).map(id =>
                <View style={styles.container}>
                     <View style={styles.container} key={id}>
               <Image source={require('./../../../assets/devises.jpg') }
                       style={{
                         width:'40%',
                         backgroundSize:'cover',
                         height:200
                       }}
                       />
                           <View style={styles.titleSection}>
                   <Text style={styles.title}>{listPanier.cart.items[id].produit.title}</Text>
                   
                   
                   <View styl e={styles.titleSection}>
          <Text style={styles.price} className="price">{listPanier.cart.items[id].price} DH</Text>
       
        <View style={styles.box}>
          {/* -1 */
          <TouchableOpacity style={styles.button} onPress={() => AddToCart(listPanier.cart.items[id].produit._id,false,true)}>
             <Text style={styles.buttonText}>-</Text>
           </TouchableOpacity>
          /* value */}
           <Text style={styles.value}>{listPanier.cart.items[id].qty}</Text>
          {/* +1 */}
         <TouchableOpacity style={styles.button} onPress={() => AddToCart(listPanier.cart.items[id].produit._id,true,false)}>
             <Text style={styles.buttonText}>+</Text>
           </TouchableOpacity>
         </View>
      </View>
                    </View>
                
                
                  </View>
                 
         </View>
         
                      )
          
                      
                  :
                  <View>
              <Text> Sorry Dont find</Text>
                  </View>
               }
            
              </View>
          
             
   { listPanier.cart &&
    <View style={styles.infoRest}>
   <Text style={styles.nameRest}>Quantity Total :   {listPanier.cart.totalQty}    </Text>
<Text style={styles.nameRest}>Total:    {listPanier.cart.totalPrice} </Text>
<TouchableOpacity
            onPress={() => PasserCommande(listPanier.cart.totalPrice,listPanier.cart.totalQty)}
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
            Passer La Commande
            </Text>
          </TouchableOpacity>
</View>
   }
   


      </ScrollView>
    )
}

export default Panier


const styles = StyleSheet.create({
    titleSection: {
      margin:5,
      width:100,
      textAlign:'center',
      marginLeft:8
    },
    title: {
      fontSize: 20,
      color: '#459D72',
    },
    price: {
      fontSize: 16,
    },
    box: {
      width: 76,
      marginTop: 6,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      width: 25,
      height: 20,
      backgroundColor: '#459D72',
      alignItems: 'center',
      borderRadius: 2,
    },
    buttonText: {
      color: 'white',
    },
    value: {
      marginLeft: 10,
      marginRight: 10,
    },
    container:{
        width:350,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 15,
        marginTop: 8,
        marginBottom: 18,
      },
      popular: {
        marginLeft: 15,
        marginRight: 15,
      },
  infoRest: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 200,
    marginTop: 20,
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
  });



