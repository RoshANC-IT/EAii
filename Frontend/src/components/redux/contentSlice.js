import { createSlice } from "@reduxjs/toolkit";
const contentSlice = createSlice({
    name:"content",
    initialState:{
        contents:[],
    },
    reducers:{
        setContent:(state, action)=>{
            state.contents=action.payload;

        }
    }
})
export const {setContent}=contentSlice.actions;
export default contentSlice.reducer;
