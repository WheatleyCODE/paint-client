import { ToolTypes } from './tools.interfaces';

export interface IPaintState {
  username: string | null;
  currentTool: ToolTypes;
  toolSettings: any;
  undoList: string[];
  redoList: string[];
}
