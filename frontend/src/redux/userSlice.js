import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
      userData:null,
    },
    reducers:{
        setUserdata:(state,action)=>{
            state.userData=action.payload 
        }
    }
   
})

export const {setUserdata}=userSlice.actions 
export default userSlice.reducer

