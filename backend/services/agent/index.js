import express, { Router } from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";




dotenv.config();

const port = process.env.PORT ;

const app = express();

app.use(express.json())




app.get("/", (req, res) => {
    res.json({ message: "hello from agent" });
});

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`agent started at port: ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();