import { ToolTypes } from './tools.interfaces';
import { DeepPartial } from './utils.interfaces';

export interface IToolSettings {
  color: string;
  fillColor: string;
  isFill: boolean;
  lineWidth: number;
  borderWidth: number;
}

export interface IPaintState {
  username: string | null;
  currentTool: ToolTypes;
  toolSettings: IToolSettings;
  changeStep: number;
  undoList: string[];
  redoList: string[];
}

export type ChangeTSFilds = DeepPartial<IToolSettings>;
