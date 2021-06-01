const Product = require('../models/FrontOffice/Devises.module');
var fs = require('fs');
var path = require('path')
const multer = require('multer');
const { exchangeRates , currencies } = require('exchange-rates-api');

// let folder= path.join(__dirname,'../../FrontEnd/public');
// const storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//       console.log(folder + "and " + cb)
//             cb(null, path.join(folder ,'/images/'))
//         },
//     filename: (req, file, cb) => {
        
//                 //cb(null,new Date().toISOString() + file.originalname);
//                 cb(null, new Date().toISOString().replace(/:/g,'-')+ file.originalname)
//             }
  
//   });
//   const fileFilter=(req, file, cb)=>{
//     if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
//         cb(null, true)
//     } else {
//         cb(null, false)
//     }
// }
// var upload = multer()
//   var upload = multer({
//     storage: storage,
//      limits: {
//         fieldSize: 1024 * 1024 * 5
//      },
//     fileFilter: fileFilter
    
// });
// //Upload Single Image
//   let showImageSingle = upload.single('image');



const getProduct = async (req, res,next) => {
const {vendeur} = req.params;
console.log(vendeur);
  await Product.getAllProducts(vendeur,function (e, products) {
     if (e) {
       e.status = 406; return next(e);
     }
     if (products.length < 1) {
       return res.status(404).json({ message: "products not found" })
     }
     res.json({ products: products })
   }) 
};

//Add new product
let addNewProduct = async(req,res,next)=>{
 
  var addProduct = new Product({
    title:req.body.title,
    description:req.body.description,
    price:req.body.price,
    quantity:req.body.quantity,
    vendeur:req.body.vendeur,
    cur:req.body.cur
  })
   await Product.addProduct(addProduct,function (err, product){
    if(err) return next(err.message)
    res.send(product);
 
  })
}


//DELETE
//delete Product by id 

let DeleteProductById=async(req,res,next)=>{
  let {id}= req.params;
  await Product.deleteProductById(id,(err,product)=>{
    if(err)return next(err);
    res.json({message:`delete product ${product}`})
  })
}



//Update

// let UpdateProduct= async(req,res,next)=>{
//   let {id} = req.params;
//   let productUpdate= {
//     image: url + '/pics/' + req.file.filename,
//     title:req.body.title,
//     description:req.body.description,
//     category:req.body.category,
//     department:req.body.department,
//     price:req.body.price,
//     quantity:req.body.quantity
//   };
//   await Product.updateProduct(id,productUpdate,(err,newProduct)=>{
//     if(err) return next(err);
//     res.json({message:'Update product',
//            Product:newProduct})
//   })
// }



  
let ProductById= async function (req, res, next) {
    let {id} = req.params;
    await Product.getProductByID(id,(err,product)=>{
      if(err) return next(err);
      res.json({product :product})
    })
    
 
  }
  
  let removeAllProduct= async(req,res,next)=>{
    await Product.removeAllProduct((err,product)=>{
        if(err) return next(err);
        res.json({
          message: `Remove All ${product} `
        })
    })
  } 
 


  module.exports = {getProduct,addNewProduct,DeleteProductById,ProductById,removeAllProduct}
