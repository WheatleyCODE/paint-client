import { EffectTypes, ShapeFillTypes, ToolTypes } from './tool-params.interfaces';
import { DeepPartial } from './utils.interfaces';

export interface IToolSettings {
  currentShapeFillType: ShapeFillTypes;
  majorColor: string;
  minorColor: string;
  lineWidth: number;
  lightness: number;
  saturation: number;
  timeToEnd: number;
  interval: number;
  effectSpeed: number;
}

export interface ICanvasSettings {
  width: number;
  height: number;
}

export type TriangleParams = {
  sides: {
    a: number;
    b: number;
    c: number;
  };

  angles: {
    a: number;
    b: number;
    c: number;
  };

  translateX: number;
};

export interface IPaintState {
  username: string | null;
  currentTool: ToolTypes;
  currentEffect: EffectTypes;
  toolSettings: IToolSettings;
  canvasSettings: ICanvasSettings;
  changeStep: number;
  undoList: string[];
  redoList: string[];
  connections: string[];
}

export type SelectSquareParams = {
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
  height?: number;
  width?: number;
};

export type ChangeTSFilds = DeepPartial<IToolSettings>;
