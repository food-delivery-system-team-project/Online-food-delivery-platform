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
},

 // ✅ FILTER ACTION
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };

      let filtered = [...state.allFoods];

      // apply search first
      if (state.query) {
        filtered = filtered.filter((item) =>
          item.name.toLowerCase().includes(state.query.toLowerCase())
        );
      }

      state.results = applyFilters(filtered, state.filters);
    }
  }
});

// 🔥 FILTER LOGIC (clean & reusable)
const applyFilters = (data, filters) => {
  let result = [...data];

  // price filter
  if (filters.priceRange === "low") {
    result = result.filter((item) => item.price < 200);
  } else if (filters.priceRange === "medium") {
    result = result.filter((item) => item.price >= 200 && item.price <= 500);
  } else if (filters.priceRange === "high") {
    result = result.filter((item) => item.price > 500);
  }

  // rating filter
  if (filters.rating > 0) {
    result = result.filter((item) => item.rating >= filters.rating);
  }

  // sorting
  if (filters.sort === "priceLow") {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.sort === "priceHigh") {
    result.sort((a, b) => b.price - a.price);
  } else if (filters.sort === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
};

export const { setFoods, setQuery, toggleSearch, setFilters } = searchSlice.actions;
export default searchSlice.reducer;