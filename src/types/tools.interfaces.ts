export const enum ToolTypes {
  BRUSH = 'BRUSH',
  RECT = 'RECT',
}

export interface IEvents {
  destroyEvents: () => void;
  init: () => void;
}

export interface ITool extends IEvents {
  type: ToolTypes;
  initLineWidth: number;
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

export interface IDrawBrashParams {
  lineWidth: number;
  strokeStyle: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export interface IDrawRectParams {
  lineWidth: number;
  strokeStyle: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: boolean;
  fillColor: string;
}

export type Tool = IBrush | IRect | ICircle;
