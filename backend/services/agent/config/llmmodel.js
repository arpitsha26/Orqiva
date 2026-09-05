
import { ChatGroq } from "@langchain/groq"

import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import dotenv from "dotenv";
dotenv.config();


const groq=new ChatGroq({
    model:"openai/gpt-oss-120b"

})


const gemini=new ChatGoogleGenerativeAI({
    model:"gemini-2.5-flash"
})

export const getModel=async (agent)=>{

    switch (agent) {
        case "coding":
            return gemini;
        
        
    
        default:
            return groq;
    }

}
