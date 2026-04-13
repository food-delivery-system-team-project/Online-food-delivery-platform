import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
    items:[],
    isLiked: false
  },
  reducers: {
    setFood: (state,action)=>{
      state.items=action.payload;

    },
    toggleLike: (state , action) => {
      const item = state.items.find(i=>i.id===action.payload)
      if(item){
        item.isLiked= !item.isLiked
      }
    }
  }
});

export const { toggleLike ,setFood } = likeSlice.actions;
export default likeSlice.reducer;