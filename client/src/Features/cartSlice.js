import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        count:0
    },
    reducers:{
        increment:(state)=>{
            state.count +=1;
        },
        decriment:(state)=>{
            state.count -=1;
        }

    }
})

export const {increment,decriment} = cartSlice.actions;

export default cartSlice.reducer;