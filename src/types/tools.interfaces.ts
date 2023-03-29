export const enum ToolTypes {
  BRUSH = 'BRUSH',
}

export interface IColor {
  initColor: string;
}

export interface ITool {
  type: ToolTypes;
  destroyEvents: () => void;
  init: () => void;
}

export interface IBrush extends ITool, IColor {
  initLineWidth: number;
}

export interface IRect extends ITool, IColor {
  initBorderWidth: number;
  initFill: boolean;
}
