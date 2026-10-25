
import api from '../../utils/axios'

async function sendMessage(payload) {
    const {data}=await api.post("/api/agent/chat",payload)
    return data
}

export default sendMessage
