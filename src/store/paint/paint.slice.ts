import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChangeTSFilds, EffectTypes, IPaintState, ShapeTypes, ToolTypes } from '../../types';

const initialState: IPaintState = {
  username: null,
  currentTool: ToolTypes.BRUSH,
  currentEffect: EffectTypes.NONE,
  toolSettings: {
    currentShape: ShapeTypes.FILL_BORDER,
    majorColor: '#000',
    minorColor: '#fff',
    lineWidth: 10,
    lightness: 1,
    saturation: 1,
    timeToEnd: 1000,
    interval: 1000,
  },
  canvasSettings: {
    width: 900,
    height: 900,
  },
  changeStep: 2,
  undoList: [],
  redoList: [],
  connections: [],
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

    addConnection: (state, { payload }: PayloadAction<string>) => {
      state.connections.push(payload);
    },

    setConnections: (state, { payload }: PayloadAction<string[]>) => {
      state.connections = payload;
    },
  },
});

export const paintActions = paintSlice.actions;
