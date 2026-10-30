import "dotenv/config";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
    console.log("redis connected");
});

redis.on("error", (err) => {
    console.error("Redis error:", err.message);
});

export default redis;
