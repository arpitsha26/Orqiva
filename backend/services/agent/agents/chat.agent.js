import { getModel } from "../config/llmmodel"

export const chatAgent=async(state)=>{

    const llm= await getModel("chat")

    const systemPrompt="You are OrqivaAI, an Intelligent AI assitant"

    const response=await llm.invoke([
        {
        "role":"system",
        "content": systemPrompt
        },
        {
            "role":"human",
            "content":state.prompt
        }
])


 return {
    ...state,
    aiResponse:response.content
 }
    
}