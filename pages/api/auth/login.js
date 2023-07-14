import { User } from "@/models/user";
import { connectDB, cookieSetter, generateToken } from "@/utils/features";
const { asyncError, errorHandler } = require("@/middlewares/error");
import bcrypt from "bcrypt"
const handler = asyncError(async(req,res)=>{
    if(req.method!=="POST"){
        return errorHandler(res,400,"Only Post method is allowd")
    }
    const { email,password}= req.body;

    if( !email || !password) return errorHandler(res,400, "Please enter all fields");
    await connectDB();
    let user = await User.findOne({email}).select("+password");
    if(!user) return errorHandler(res,400,"Invalid Email or Password");

    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched) return errorHandler(res,400,"Invalid Email or Password");
    
    const token = generateToken(user._id);
    cookieSetter(res,token, true);

    res.status(200).json({
        success:true,
        message:`Welcome back, ${user.name}`,
        user
    })

});
export default handler;