import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPaintState } from '../../types/paint.interfaces';
import { ToolTypes } from '../../types/tools.interfaces';

const initialState: IPaintState = {
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

    pushToUndo: (state, { payload }: PayloadAction<string>) => {
      state.undoList.push(payload);
    },

    setUndo: (state, { payload }: PayloadAction<string[]>) => {
      state.undoList = payload;
    },
  },
});

export const paintActions = paintSlice.actions;
