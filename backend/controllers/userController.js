import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";


//generate token function
const createToken = (id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
// Login user 
const loginUser =async (req,res) =>{
    try {
        const { email ,password} = req.body;
        const user = await userModel.findOne({email});
        if(!user){
             return res.json({
               success: false,
               message: "User doesn't Exist",
             });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            //generate token
            const token =createToken(user._id)
            res.json({
              success: true,
              token,
            });
        }else{
             res.json({
               success: false,
               message:"invalid Cridential"
             });
        }
    } catch (error) {
         console.log(error);
         res.json({
           success: false,
           message: error.message,
         });
    }
}
// Register user 
const registerUser =async (req,res) =>{
   try {
        const { name , email , password } =req.body;

        //chech user already exists
        const exists = await userModel.findOne({email});

        if (exists) {
            return res.json({
                success:false,
                message:"User already Exist"
            })
        }
        //Validate email and Strong Password
        if (!validator.isEmail(email)) {
             return res.json({
               success: false,
               message: "Please Enter Valid Email"
             });
        }
        // Strong Password or lenght 8 char

        if (password.length < 8) {
          return res.json({
            success: false,
            message: "Please Enter Strong Password"
          });
        }
        //Hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        //create user
        const newUser =new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save()
        //crate token
        const token =createToken(user._id);
        res.json({
            success: true,
            token
        })

   } catch (error) {
    console.log(error);
    res.json({
        success:false,
        message: error.message
    })
   }
}
// Admin login user 
const adminLogin =async (req,res) =>{

  try {
    const {email,password} =req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      //CREATE token admin user
      const token = jwt.sign(email + password , process.env.JWT_SECRET);
      res.json({
        success:true,
        token
      })
    }else{
       res.json({
         success: false,
         message: "invalid cridential"
       });
    }
  } catch (error) {
     console.log(error);
     res.json({
       success: false,
       message: error.message,
     });
  }
}

export { loginUser, registerUser, adminLogin };