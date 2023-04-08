import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ChangeTSFilds,
  EffectTypes,
  IPaintState,
  ISaveCanvas,
  ShapeFillTypes,
  ToolTypes,
} from '../../types';

const initialState: IPaintState = {
  username: null,
  currentTool: ToolTypes.NONE,
  currentEffect: EffectTypes.NONE,
  toolSettings: {
    currentShapeFillType: ShapeFillTypes.FILL_BORDER,
    majorColor: '#1f3df8',
    minorColor: '#dc2b2b',
    lineWidth: 10,
    lightness: 60,
    saturation: 100,
    timeToEnd: 1000,
    interval: 1000,
    effectSpeed: 5,
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
    pushToRedo: (state, { payload }: PayloadAction<ISaveCanvas>) => {
      state.redoList.push(payload);
    },

    setRedo: (state, { payload }: PayloadAction<ISaveCanvas[]>) => {
      state.redoList = payload;
    },

    changeToolSettings: (state, { payload }: PayloadAction<ChangeTSFilds>) => {
      state.toolSettings = { ...state.toolSettings, ...payload };
    },

    setUsername: (state, { payload }: PayloadAction<string>) => {
      state.username = payload;
    },

    pushToUndo: (state, { payload }: PayloadAction<ISaveCanvas>) => {
      state.undoList.push(payload);
    },

    setUndo: (state, { payload }: PayloadAction<ISaveCanvas[]>) => {
      state.undoList = payload;
    },

    addConnection: (state, { payload }: PayloadAction<string>) => {
      state.connections.push(payload);
    },

    setConnections: (state, { payload }: PayloadAction<string[]>) => {
      state.connections = payload;
    },

    setCurrentTool: (state, { payload }: PayloadAction<ToolTypes>) => {
      state.currentTool = payload;
    },

    setCurrentEffect: (state, { payload }: PayloadAction<EffectTypes>) => {
      state.currentEffect = payload;
    },

    setCanvasSize: (state, { payload }: PayloadAction<{ width: number; height: number }>) => {
      state.canvasSettings.height = payload.height;
      state.canvasSettings.width = payload.width;
    },
  },
});

export const paintActions = paintSlice.actions;
