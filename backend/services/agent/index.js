import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/db.js"
import router from "./routes/agent.route.js"
dotenv.config()

const port =process.env.PORT

const app=express()

app.use(express.json())
app.use("/",router)

app.use((err,req,res,next)=>{
  console.error(err)

  const status = Number.isInteger(err.status) && err.status >= 400 && err.status < 600
    ? err.status
    : 500

  return res.status(status).json(
    err.data || { message: err.message || "Unexpected agent service error" }
  )
})


app.get("/",(req,res)=>{
    res.json({message:"hello from agent"})
})

app.listen(port,()=>{
    console.log(`agent started at ${port}`)
    connectDb()
})
