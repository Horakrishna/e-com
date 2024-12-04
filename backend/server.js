import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoute.js';

//App Config

const app =express()
const port =process.env.PORT || 4000
//connected to mongodb
connectDB()
//connected to Cloudinary
connectCloudinary()
//Middlewares
app.use(express.json())
app.use(cors())

//Api End Points
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
//Api End Points

app.get('/',(req,res)=>{
    res.send("API is working")
})
//Start Express server
app.listen(port, ()=>console.log("server Started on PORT :" + port))