import { EffectTypes, ShapeTypes, ToolTypes } from './tools.interfaces';
import { DeepPartial } from './utils.interfaces';

export interface IToolSettings {
  currentShape: ShapeTypes;
  majorColor: string;
  minorColor: string;
  lineWidth: number;
  lightness: number;
  saturation: number;
  timeToEnd: number;
  interval: number;
}

export interface ICanvasSettings {
  width: number;
  height: number;
}

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

export type ChangeTSFilds = DeepPartial<IToolSettings>;
