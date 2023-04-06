import { Observable } from 'rxjs';
import { SocketMethods, SocketPayload } from './socket.interfaces';
import { Change } from './toolbar.interfaces';
import {
  EffectTypes,
  IDefaultBuilder,
  IEvents,
  ShapeFillTypes,
  ToolTypes,
} from './tool-params.interfaces';

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
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
  setEffects: (effects: EffectTypes[]) => void;
  getEffects: () => EffectTypes[];
  setChangeLineWidth: (change: () => void) => void;
  setLightness$(lightness$: Observable<Change>): void;
  setInitLightness(initLightness: number): void;
  setSaturation$(saturation$: Observable<Change>): void;
  setInitSaturation(saturation: number): void;
  setEffectSpeed$(effectSpeed$: Observable<Change>): void;
  setInitEffectSpeed(effectSpeed: number): void;
}

export interface IRect extends IShape {
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export interface IArbitrary extends IShape {
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export interface ILine extends IShape {
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export interface ICircle extends IShape {
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export interface ITriangle extends IShape {
  setSocketNext: (socketNext: (method: SocketMethods, payload: SocketPayload) => void) => void;
}

export type Shape = IRect | ICircle | ITriangle | ILine | IArbitrary;
export type Tool = IBrush | IRect | ICircle | ITriangle | ILine | IArbitrary;
