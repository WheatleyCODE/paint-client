export const enum ToolTypes {
  BRUSH = 'BRUSH',
  RECT = 'RECT',
}

export interface IEvents {
  destroyEvents: () => void;
  init: () => void;
}

export interface ITool extends IEvents {
  initLineWidth: number;
  type: ToolTypes;
  initColor: string;
}

export interface IShape extends ITool {
  initFill: boolean;
  initFillColor: string;
}

export interface IBrush extends ITool {
  isBrush: boolean;
}

export interface IRect extends IShape {
  isRect: boolean;
}

export interface ICircle extends IShape {
  isCircle: boolean;
}

export type Tool = IBrush | IRect | ICircle;
