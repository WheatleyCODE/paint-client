import { Observable } from 'rxjs';
import { SocketMethods, SocketPayload } from './socket.interfaces';
import { Change } from './toolbar.interfaces';
import { IDefaultBuilder, IEvents, ShapeTypes, ToolTypes } from './tool-params.interfaces';

export interface ITool extends IEvents, IDefaultBuilder {
  type: ToolTypes;
  initMajorColor: string;
  initMinorColor: string;
  initLineWidth: number;
}

export interface IShape extends ITool {
  initShapeType: ShapeTypes;
  setSelectSquare: ($selectSquare: HTMLDivElement) => void;
}

export interface IBrush extends ITool {
  isBrush: boolean;
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export interface IRect extends IShape {
  isRect: boolean;
  setFill$: (obs$: Observable<Change>) => void;
  setInitShapeType: (shapeType: ShapeTypes) => void;
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

// export interface ICircle extends IShape {
//   isCircle: boolean;
// }

export type Tool = IBrush | IRect;
