import { createSlice } from "@reduxjs/toolkit";

const likeSlice = createSlice({
  name: "like",
  initialState: {
     likedItems: JSON.parse(localStorage.getItem("likes")) || []
  },
  reducers: {
    setFood: (state,action)=>{
      state.items=action.payload;

    },
     toggleLike: (state, action) => {
      const id = action.payload;

      const exists = state.likedItems.includes(id);

      if (exists) {
        state.likedItems = state.likedItems.filter(item => item !== id);
      } else {
        state.likedItems.push(id);
      }

      // ✅ save to localStorage
      localStorage.setItem("likes", JSON.stringify(state.likedItems));
    }
  }
});

export const { toggleLike ,setFood } = likeSlice.actions;
export default likeSlice.reducer;