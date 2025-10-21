import { configureStore } from '@reduxjs/toolkit';
import segmentReducer from './segmentSlice';

export const store = configureStore({
  reducer: {
    segment: segmentReducer
  }
});