import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {

    setCart: (state, action) => {
  state.items = action.payload.map(item => ({
    _id: item.foodId._id,
    name: item.foodId.name,
    price: item.foodId.price,
    image: item.foodId.image,
    storeName: item.foodId.storeName,
    quantity: item.quantity
  }));

  state.totalQuantity = state.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
},

    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.items.find(
        (i) => i._id === item._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      state.totalQuantity += 1;
    },

    removeFromCart: (state, action) => {
      const id = action.payload;

      const existingItem = state.items.find(i => i._id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(i => i._id !== id);
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalQuantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalQuantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    }
  }
});

export const {
  setCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;