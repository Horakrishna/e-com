import jwt from 'jsonwebtoken'

//admin Auth 
const adminAuth = async(req,res,next)=>{
    try {
        const { token } =req.headers;
        if(!token){
            //return this res the execution is stop here
            return res.json({
                success: false,
                message:"Not Authorize.Login Again"
            })

        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        if(token_decode !== process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD){
             return res.json({
               success: false,
               message: "Not Authorize.Login Again",
             });
        }
        next()
    } catch (error) {
         console.log(error);
         res.json({
           success: false,
           message: error.message,
         });
    }
}

export default adminAuth