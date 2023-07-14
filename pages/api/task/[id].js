const { asyncError, errorHandler } = require("@/middlewares/error");
import { Task } from "@/models/task";
import { checkAuth, connectDB } from "@/utils/features";
const handler = asyncError(async(req,res)=>{
    if(req.method==="PUT"){
        await connectDB();
        const user = await checkAuth(req);
        if(!user) return errorHandler(res,401,"Login First");

        const taskId = req.query.id;
        const task = await Task.findById(taskId);

        if(!task) return errorHandler(res,404, "Task not found");
        task.isCompleted = !task.isCompleted;
        await task.save();
        res.status(200).json({
            success:true,
            message:"Task Updated"
        })


    }
    else if(req.method==="DELETE"){
        await connectDB();
        const user = await checkAuth(req);
        if(!user) return errorHandler(res,401,"Login First");

        const taskId = req.query.id;
        const task = await Task.findById(taskId);

        if(!task) return errorHandler(res,404, "Task not found");
     
        await task.deleteOne();
        res.status(200).json({
            success:true,
            message:"Task deleted"
        })
    }
    else{

        errorHandler(res,400,"This method is not available");
    }
   
});
export default handler;