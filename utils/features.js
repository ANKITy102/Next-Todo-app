import mongoose from "mongoose";
import {serialize} from "cookie"
import jwt from 'jsonwebtoken';
import { User } from "@/models/user";

export const connectDB =async()=>{
 const {connection} =    await mongoose.connect(process.env.MONGO_URI,{
        dbName:"NextTodo",
    })
    console.log("Data base connectd");
    console.log(connection.host)
};
export const cookieSetter = (res,token,set)=>{
    res.setHeader("Set-Cookie", serialize("token", set ? token : "", {
        path: "/",
        httpOnly: true,
        maxAge: set ? (1000 * 60 * 60 * 24 * 15) : 0 // 15 days
      }));
}


export const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET);
};


export const checkAuth = async(req)=>{
    const fetchToke= req.headers.cookie;
    // console.log(fetchToke)
    if(!fetchToke){
        throw new Error("token not provided")
    }
    const token = fetchToke.split("=")[1];
    // console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    return user;
}