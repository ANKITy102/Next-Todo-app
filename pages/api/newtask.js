import { checkAuth, connectDB } from "@/utils/features";
import { Task } from "../../models/task";
import { asyncError, errorHandler } from "@/middlewares/error";
const handler = asyncError(async (req, res) => {

    if (req.method !== "POST") {
        return errorHandler(res, 400, "Only Post method is allowd")
    }

    const { title, description } = req.body;
    if (!title || !description) {
        return errorHandler(res, 400, "all fields are required.")
    }
    await connectDB();
    const savedUser = await checkAuth(req);
    if (!savedUser) {
        return errorHandler(res, 400, "Please login");
    }

    const savedTask = await Task.create({
        title,
        description,
        user: savedUser._id
    })
    return res.status(200).json({
        success: true,
        message:"Task added successfully",
        savedTask
    })



})

export default handler;