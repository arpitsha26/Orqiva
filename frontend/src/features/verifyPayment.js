import api from "../../utils/axios"

export const verifyPayment=async (payload) => {
    try {
        const {data}=await api.post("/api/billing/verify",payload)
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}