import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPaintState, ToolTypes } from '../../types';

const initialState: IPaintState = {
  username: null,
  currentTool: ToolTypes.BRUSH,
  toolSettings: undefined,
  undoList: [],
  redoList: [],
};

export const paintSlice = createSlice({
  name: 'paint',
  initialState,
  reducers: {
    pushToRedo: (state, { payload }: PayloadAction<string>) => {
      state.redoList.push(payload);
    },

    setRedo: (state, { payload }: PayloadAction<string[]>) => {
      state.redoList = payload;
    },

    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },

    pushToUndo: (state, { payload }: PayloadAction<string>) => {
      state.undoList.push(payload);
    },

    setUndo: (state, { payload }: PayloadAction<string[]>) => {
      state.undoList = payload;
    },
  },
});

export const paintActions = paintSlice.actions;
