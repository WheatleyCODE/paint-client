import { Observable } from 'rxjs';
import { SocketMethods, SocketPayload } from './socket.interfaces';
import { Change } from './toolbar.interfaces';
import { IDefaultBuilder, IEvents, ShapeFillTypes, ToolTypes } from './tool-params.interfaces';

export interface ITool extends IEvents, IDefaultBuilder {
  type: ToolTypes;
  initMajorColor: string;
  initMinorColor: string;
  initLineWidth: number;
}

export interface IShape extends ITool {
  initShapeFillType: ShapeFillTypes;
  setSelectSquare: ($selectSquare: HTMLDivElement) => void;
  setFill$: (obs$: Observable<Change>) => void;
  setInitShapeFillType: (fillType: ShapeFillTypes) => void;
}

export interface IBrush extends ITool {
  isBrush: boolean;
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export interface IRect extends IShape {
  isRect: boolean;
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export interface ICircle extends IShape {
  isCircle: boolean;
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export interface ITriangle extends IShape {
  isTriangle: boolean;
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export type Shape = IRect | ICircle | ITriangle;
export type Tool = IBrush | IRect | ICircle | ITriangle;
