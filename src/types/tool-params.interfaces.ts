import { Observable } from 'rxjs';
import { Change } from './toolbar.interfaces';

export const enum ToolTypes {
  NONE = 'NONE',
  BRUSH = 'BRUSH',
  RECT = 'RECT',
  CIRCLE = 'CIRCLE',
  TRIANGLE = 'TRIANGLE',
  ERASER = 'ERASER',
}

export const enum EffectTypes {
  NONE = 'NONE',
  RESIZE = 'RESIZE',
  BIG_TO_LOW = 'BIG_TO_LOW',
  LOW_TO_BIG = 'LOW_TO_BIG',
}

export const enum ShapeTypes {
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

export interface IDrawBrushParams {
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
  fillStyle: string;
}

export interface IDrawCircleParams {
  lineWidth: number;
  strokeStyle: string;
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
  fill: boolean;
  fillStyle: string;
}

export interface IDrawTriangleParams {
  lineWidth: number;
  strokeStyle: string;
  firstX: number;
  firstY: number;
  secondX: number;
  secondY: number;
  lastX: number;
  lastY: number;
  fill: boolean;
  fillStyle: string;
}
