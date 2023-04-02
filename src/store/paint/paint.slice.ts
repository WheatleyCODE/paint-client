import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangeTSFilds, IPaintState, ToolTypes } from '../../types';

const initialState: IPaintState = {
  username: null,
  currentTool: ToolTypes.BRUSH,
  toolSettings: {
    color: '#000',
    fillColor: '#fff',
    isFill: true,
    lineWidth: 1,
    borderWidth: 1,
  },
  changeStep: 5,
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

    changeToolSettings: (state, { payload }: PayloadAction<ChangeTSFilds>) => {
      state.toolSettings = { ...state.toolSettings, ...payload };
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
