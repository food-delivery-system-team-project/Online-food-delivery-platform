// searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    value:false,
    query: "",
    results: [],
    allFoods: [] // store all data here
  },
  reducers: {
    setFoods: (state, action) => {
      state.allFoods = action.payload;
    },
    toggleSearch :(state)=>{
      state.value=!state.value;

    },
    setQuery: (state, action) => {
  state.query = action.payload;

  if (!action.payload.trim()) {
    state.results = [];
    return;
  }

  state.results = state.allFoods.filter((item) =>
    item.name.toLowerCase().includes(action.payload.toLowerCase())
  );
}
  }
});

export const { setFoods, setQuery , toggleSearch } = searchSlice.actions;
export default searchSlice.reducer;
