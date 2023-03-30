import { ToolTypes } from './tools.interfaces';

export interface IPaintState {
  currentTool: ToolTypes;
  toolSettings: any;
  undoList: string[];
  redoList: string[];
}
