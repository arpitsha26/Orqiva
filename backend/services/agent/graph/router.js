import { getModel } from "../config/llmmodel.js"

export const router=async(state)=>{

const llm= await getModel("router")

const prompt=`You are an agent router.

Available agents:
-chat
-search
-coding
-pdf
-ppt
-vision

Rules:

chat:
General conversation,
explantions,
learning,
questions.

search:
Current events,
latest inforamtion,
news,recent developments,
internet lookup.

coding:
Generate Code,
debug code,
build projects,
architecture,
Api design.

vision:
Generate image,
Create image.



pdf:
Questions about generate PDFs
or document context.

ppt:
Questions about generate ppts
or ppt context.

Return ONLY one word:

chat 
search
coding
pdf
vision

User Query:
${state.prompt}

`

const response=await llm.invoke(prompt)
console.log(response)

return {
    ...state,
    agent:response.content.trim().toLowerCase()
}


}

