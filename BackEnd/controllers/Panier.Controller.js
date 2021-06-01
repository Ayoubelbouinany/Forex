let Panier=require('../models/FrontOffice/Panier.module');
let panier_function = require('../models/FrontOffice/Panier.function');
let Product = require('../models/FrontOffice/Devises.module');
const { ErrorHandler } = require('../midelleware/ErrorHandler');
var paypal = require('paypal-rest-sdk');
const { db } = require('../models/FrontOffice/Panier.module');
let Commande = require('../models/FrontOffice/Commande.module');



let AddToPanier =function (req, res, next) {

 
  
 
        let { devisesId, increase,user, decrease } = req.body
    console.log(req.body)
      Panier.getPanierByUserId(user, function (err, p) {
    if (err) return next(err)
       let oldPanier = new panier_function(p[0] || { user })
      console.log('panier ' + JSON.stringify(oldPanier));
       // no cart save empty cart to database then return response
       if (p.length < 1 && !devisesId) {
           return Panier.createPanier(oldPanier.generateModel(), function (err, resultPanier) {
             if (err) return next(err)
             return res.status(201).json({ panier: resultPanier })
           })
        }
      
         Product.getProductByID(devisesId, function (e, product) {
           if (e) {
             e.status = 406;
            return next(e);
       }
       console.log(product)
           if (product) {
             if (decrease) {
               oldPanier.decreaseQty(product.id);
             } else if (increase) {
                oldPanier.increaseQty(product.id);
             } else {
                oldPanier.add(product, product.id);
             }
          
             let newPanier = oldPanier.generateModel();
            
             Panier.updatePanierByUserId(
                user,
               newPanier,
          function (err, result) {
                if (err) return next(err)
              return res.status(200).json({ cart: result })
              })
          }else {
                let err = new ErrorHandler('/cart', 400, 'invalid_field', {
                  message: "invalid request body"
                })
                return next(err)
              }
            })
          })
        }

        // Get Cart By User ID
    let getCartByUserId= (req,res,next)=>{
       let {user} = req.params;
       console.log(user)
     Panier.getPanierByUserId(user, function (err, cart) {
     if (err) return next(err)
 if (cart.length < 1) {
       let err = new ErrorHandler('cart error', 404, 'not_found', { message: "create a cart first" })
       return next(err)
     }

    return res.status(201).json({ cart: cart[0] })
 })

    }



//checkout
 let checkout= (req, res, next)=>{
  const cartId = req.params.cartId
   const frontURL = 'http://localhost:3001'

   console.log('checkout')
  Panier.getPanierById(cartId, function (err, p) {
    if (err) return next(err)
    if (!p) {
      let err = new ErrorHandler('/checkout', 400, 'invalid_field', { message: 'cart not found' })
      return next(err)
    }
   
    const items_arr = new panier_function(p).generateArray()
    console.log(items_arr);
    const paypal_list = []
    for (let i of items_arr) {
       paypal_list.push({
       "name": i.produit.title,
       "price": i.produit.price,
       "currency": "CAD",
       "quantity": i.qty
       })
     }
   let create_payment_json = {
     "intent": "sale",
       "payer": {
         "payment_method": "paypal"
     },
       "redirect_urls": {
         "return_url": frontURL + '/success_page',
         "cancel_url": frontURL + '/cancel_page'
       },
       "transactions": [{
         "item_list": {
           "items": paypal_list
        },
         "amount": {
           "currency": "CAD",
           "total": p.totalPrice
         },
         "description": "This is the payment description."
       }]
     }
    paypal.configure({
      'mode': 'sandbox', //sandbox or live
      'client_id': 'AWL2jx41LoLFwsYZ6QXJR2bXweZsmC2WU23_5vKP0Lm-IeuVEUPjX4KiFsfsopkLemG_o0jmr9Fhymgy',
      'client_secret': 'EPcbm-8yN4aP00UciTLOM4R_FBKqqcwR7OYq-vdkpDfaszOCbiUmwK6-akj57R4yTMQzKctElbPbLpC-'
    });
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        console.log("JSON.stringify(error)");
        console.log(JSON.stringify(error));
        return next(error)
      } else {
        console.log(payment);
        for (const link of payment.links) {
          if (link.rel === 'approval_url') {
            res.json(link.href)
            console.log(link.href);
          }
        }
      }
    });
  })
}

//GET /payment/success
let payment =(req, res, next) =>{
  var paymentId = req.query.paymentId;
  var payerId = { payer_id: req.query.PayerID };
  paypal.payment.execute(paymentId, payerId, function (error, payment) {
    if (error) {
      console.error(JSON.stringify(error));
      return next(error)
    } else {
      if (payment.state == 'approved') {
    //Update quantity product
      for(const item of payment.transactions[0].item_list.items){
            console.log('item');
       Product.findAndUpdate(item.name,item.quantity,function (err, p) {
      if (err) return next(err)
      if (!p) {
        let err = new ErrorHandler('/checkout', 400, 'invalid_product', { message: 'product not found' })
        return next(err)
      }
    })
let newCommande={
  User:item.user,
  totalPrice:item.totalPrice,
  totalQuantity:item.totalQty,
  items:item.produit
}
    //Add Commande 
    Commande.addCommande(newCommande,function(err,c){
      if (err) return next(err)
      if (!c) {
        let err = new ErrorHandler('/profile', 400, 'invalid_commande', { message: 'commande not found' })
        return next(err)
      }
    })
    //
      }
      console.log('payment completed successfully');
        res.json({ payment })
      } else {
        console.log('payment not successful');
      }
    }
  })
}



    module.exports={
      AddToPanier,getCartByUserId,checkout,payment
    }