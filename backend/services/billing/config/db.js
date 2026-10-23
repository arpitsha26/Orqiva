import mongoose from "mongoose"

const connectDb=async ()=>{
    try {
       await mongoose.connect(process.env.MONGODB_URI) 
       console.log("db connected")
    } catch (error) {
       console.log(`db error ${error}`) 
    }
}

export default connectDb