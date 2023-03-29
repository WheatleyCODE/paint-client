import { combineReducers } from '@reduxjs/toolkit';
import { paintSlice } from './paint/paint.slice';

export const rootReducer = combineReducers({
  paint: paintSlice.reducer,
});
