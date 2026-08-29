import express, { Router } from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/chat.routes.js";



dotenv.config();

const port = process.env.PORT ;

const app = express();

app.use(express.json())

app.use("/",router)


app.get("/", (req, res) => {
    res.json({ message: "hello from chat" });
});

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`chat started at port: ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();