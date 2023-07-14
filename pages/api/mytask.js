import { asyncError, errorHandler } from "@/middlewares/error";
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";
const handler = asyncError(async(req,res)=>{
    if(req.method!=="GET"){
        return errorHandler(res,400,"Only Get method is allowd")
    }

    await connectDB();
    const user = await checkAuth(req);
    if(!user){
        return errorHandler(res,401, "Please login");
    }
    const tasks = await Task.find({user:user._id});
    // console.log(tasks)
    // checkAuth(req);
    // await Task.create({
    //     title:"Sample Title",
    //      description:"Sampe description",
    //      user:"Askdjkfdsjfsdjfsdjf"
    // })
    // const user ={};
    // const tasks = await Task.find({user:user._id});
    res.json({
        
        success:true,
        tasks,
    })
})

export default handler;