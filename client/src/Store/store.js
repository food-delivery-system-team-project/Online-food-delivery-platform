import { configureStore } from '@reduxjs/toolkit';
import likeSlice from '../Features/likeSlice';
import searchReducer from '../Features/searchSlice'

export const store = configureStore({
  reducer: {
    Like : likeSlice,
    search: searchReducer
  },
});