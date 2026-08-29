import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import { getCurrentUser } from "./controllers/user.controller.js";
import protect from "./middleware/auth.middleware.js";
import cookieParser from "cookie-parser";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";

dotenv.config();

const port= process.env.PORT ;


const app=express();

app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true}
))

app.use(cookieParser())

app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/chat",protect,proxyWithHeader(process.env.CHAT_SERVICE))

app.get("/api/me",protect,getCurrentUser)

app.get("/",(req,res)=>{
    res.json({"message":"hello from gateway"})
})

app.listen(port,()=>{
    console.log(`gateway started at port: ${port}`)
})
