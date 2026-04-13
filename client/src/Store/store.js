import { configureStore } from '@reduxjs/toolkit';
import likeSlice from '../Features/likeSlice';

export const store = configureStore({
  reducer: {
    Like : likeSlice,
  },
});