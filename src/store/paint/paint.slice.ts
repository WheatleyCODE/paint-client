import { createSlice } from '@reduxjs/toolkit';
import { IPaintState } from '../../types/paint.interfaces';

const initialState: IPaintState = {
  canvas: {} as HTMLCanvasElement,
  currentTool: undefined,
  redo: undefined,
  toolSettings: undefined,
  undo: undefined,
};

export const paintSlice = createSlice({
  name: 'paint',
  initialState,
  reducers: {},
});

export const paintActions = paintSlice.actions;
