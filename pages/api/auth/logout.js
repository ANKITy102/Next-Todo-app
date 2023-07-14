
import {  cookieSetter } from "@/utils/features";
const { asyncError, errorHandler } = require("@/middlewares/error");

const handler = asyncError(async(req,res)=>{
    if(req.method!=="GET"){
        return errorHandler(res,400,"Only Get method is allowd")
    }
    console.log(req.headers.cookie);
 

    cookieSetter(res,null, false);

    res.status(200).json({
        success:true,
        message:`logged out`
    })

});
export default handler;