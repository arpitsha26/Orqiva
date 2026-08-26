import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/auth.route.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json())
app.use("/",router)

app.get("/", (req, res) => {
    res.json({ message: "hello from auth" });
});

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`Auth started at port: ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();