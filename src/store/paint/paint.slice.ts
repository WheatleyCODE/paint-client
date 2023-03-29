import { createSlice } from '@reduxjs/toolkit';
import { IPaintState } from '../../types/paint.interfaces';

const initialState: IPaintState = {
  a: true,
};

export const paintSlice = createSlice({
  name: 'paint',
  initialState,
  reducers: {},
});

export const PA = paintSlice.actions;
