import redis from "../config/redis.js"

const protect=async (req,res,next) => {
    try {
        const sessionId=req.cookies?.session
        if(!sessionId){
            return res.status(401).json({message:"unauthorized"})
        }
        const session=await redis.get(`session-${sessionId}`)
        if(!session){
            res.clearCookie("session")
            return res.status(401).json({message:"session expired"})
        }
        req.user=JSON.parse(session)
        next()
       
    } catch (error) {
        return res.status(500).json({message:`protect error ${error}`})
    }
}

export default protect