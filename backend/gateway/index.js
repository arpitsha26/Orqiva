import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";

dotenv.config();

const port= process.env.PORT ;


const app=express();
app.use(cors());
// app.use(cors({
//     origin:process.env.FRONTEND_URL,
//     credentials:true}
// ))

app.use("/auth",proxy(process.env.AUTH_SERVICE))

app.get("/",(req,res)=>{
    res.json({"message":"hello from gateway"})
})

app.listen(port,()=>{
    console.log(`gateway started at port: ${port}`)
})
