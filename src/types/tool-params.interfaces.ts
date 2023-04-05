import { Observable } from 'rxjs';
import { Change } from './toolbar.interfaces';

export const enum ToolTypes {
  NONE = 'NONE',
  BRUSH = 'BRUSH',
  RECT = 'RECT',
  CIRCLE = 'CIRCLE',
  TRIANGLE = 'TRIANGLE',
  ERASER = 'ERASER',
  LINE = 'LINE',
  ARBITRARY = 'ARBITRARY',
}

export const enum EffectTypes {
  NONE = 'NONE',
  RESIZE = 'RESIZE',
  BIG_TO_LOW = 'BIG_TO_LOW',
  LOW_TO_BIG = 'LOW_TO_BIG',
}

export const enum ShapeFillTypes {
  BORDER = 'BORDER',
  FILL = 'FILL',
  FILL_BORDER = 'FILL_BORDER',
}

export interface IEvents {
  destroyEvents: () => void;
  init: () => void;
}

export interface IDefaultBuilder {
  setMajorColor$: (obs$: Observable<Change>) => void;
  setInitMajorColor$: (majorColor: string) => void;
  setMinorColor$: (obs$: Observable<Change>) => void;
  setInitMinorColor$: (minorColor: string) => void;
  setLineWidth$: (obs$: Observable<Change>) => void;
  setInitLineWidth: (lineWidth: number) => void;
}

export interface IDrawTool {
  lineWidth: number;
  strokeStyle: string;
}

export interface IDrawShape extends IDrawTool {
  fillType: ShapeFillTypes;
  fillStyle: string;
}

export interface IDrawBrushParams extends IDrawTool {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export interface IDrawRectParams extends IDrawShape {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IDrawLineParams extends IDrawShape {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export type Coords = [number, number];

export interface IDrawArbitraryParams extends IDrawShape {
  coords: Coords[];
  isEnd: boolean;
}

export interface IDrawCircleParams extends IDrawShape {
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
}

export interface IDrawTriangleParams extends IDrawShape {
  firstX: number;
  firstY: number;
  secondX: number;
  secondY: number;
  lastX: number;
  lastY: number;
}
