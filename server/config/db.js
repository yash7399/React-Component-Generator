import mongoose from "mongoose";


export const connectDB = async () =>{
    try{
        const MONGO_URI = process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI)
        console.log("Database Connected Successfully")
    }
    catch(error){
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}