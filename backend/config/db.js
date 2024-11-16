import mongoose from "mongoose";

export const connectDb = async()=>{
    try { 
        await mongoose.connect(process.env.MONGO_URI)
        console.log('uri',process.env.MONGO_URI)
    } catch (error) {
        console.log("Db not connected",error)
    }
}