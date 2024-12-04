import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
// Add product
const addProduct = async(req,res)=>{
    try {
       const { name,description,price, category,subCategory,sizes,bestseller}  =req.body;

       //image Array
       const image1=req.files.image1 && req.files.image1[0]
       const image2=req.files.image2 && req.files.image2[0]
       const image3=req.files.image3 && req.files.image3[0]
       const image4=req.files.image4 && req.files.image4[0]

       const images = [image1, image2, image3, image4].filter(
         (item) => item !== undefined);

         //Image Url to store db
         let imagesUrl = await Promise.all(
            images.map(async (item) => {
             let result = await cloudinary.uploader.upload(item.path, {
               resource_type: "image",
             });
             return result.secure_url;
           })
         );
        // console.log(
        //   name,
        //   description,
        //   price,
        //   category,
        //   subCategory,
        //   sizes,
        //   bestseller
        // );
        // console.log(imagesUrl)
        // res.json({})
        //send Data to mongo db
        const productData = {
          name,
          description,
          category,
          subCategory,
          price:Number(price),
          sizes:JSON.parse(sizes),
          bestseller: bestseller === "true" ? true : false,
          image:imagesUrl,
          date:Date.now()
        };
        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({
            success:true,
            message:"product added Successfully"
        })
    } catch (error) {
         console.log(error);
         res.json({
           success: false,
           message: error.message,
         });
    }
}
// List product
const listProduct = async(req,res)=>{
    try {
        const products = await productModel.find({})
        res.json({
          success: true,
          message: products,
        });
    } catch (error) {
         console.log(error);
         res.json({
           success: false,
           message: error.message,
         });
    }
}
// Delate product
const removingProduct = async(req,res)=>{
   try {
     await productModel.findByIdAndDelete(req.body.id)
     res.json({
        success:true,
        message:"Product Remaove sussefully"
     })
   } catch (error) {
     console.log(error);
     res.json({
       success: false,
       message: error.message,
     });
   } 
}
// Single product info
const singleProduct = async(req,res)=>{
    try {
      
        const {productId } =req.body;
        const product = await productModel.findById(productId);
        res.json({
            success:true,
            product
        })
    } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: error.message,
        }); 
    }
}
//update product
const updateProduct = async (req,res)=>{
    
}
export {
  listProduct,
  addProduct,
  singleProduct,
  removingProduct,
  updateProduct,
};