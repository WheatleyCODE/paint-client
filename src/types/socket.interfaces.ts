import {
  IDrawBrushParams,
  IDrawCircleParams,
  IDrawRectParams,
  IDrawTriangleParams,
  ToolTypes,
} from './tool-params.interfaces';
import { TriangleParams } from './paint.interfaces';

export const enum SocketMethods {
  PUSH_UNDO = 'PUSH_UNDO',
  UNDO = 'UNDO',
  REDO = 'REDO',
  CONNECTION = 'CONNECTION',
  DRAW = 'DRAW',
  SELECT = 'SELECT',
}

export interface IDrawSelectParams {
  startCoords: { x: number; y: number };
  coords: { x: number; y: number };
  figure: ToolTypes;
  isShow: boolean;
  triangleParams?: TriangleParams;
}

export interface ISocketPayloadSelect {
  type: ToolTypes.NONE;
  params: IDrawSelectParams;
}

export interface ISocketPayloadBrush {
  type: ToolTypes.BRUSH;
  params: IDrawBrushParams;
}

export interface ISocketPayloadRect {
  type: ToolTypes.RECT;
  params: IDrawRectParams;
}

export interface ISocketPayloadCircle {
  type: ToolTypes.CIRCLE;
  params: IDrawCircleParams;
}

export interface ISocketPayloadTriangle {
  type: ToolTypes.TRIANGLE;
  params: IDrawTriangleParams;
}

export interface ISocketIDS {
  id: string;
  username: string;
}

export interface ISocketConnection extends ISocketIDS {
  method: SocketMethods.CONNECTION;
}

export interface ISocketPushUndo extends ISocketIDS {
  method: SocketMethods.PUSH_UNDO;
}

export interface ISocketUndo extends ISocketIDS {
  method: SocketMethods.UNDO;
}

export interface ISocketRedo extends ISocketIDS {
  method: SocketMethods.REDO;
}

export interface ISocketSelect extends ISocketIDS {
  method: SocketMethods.SELECT;
  payload: ISocketPayloadSelect;
}

export interface ISocketDraw extends ISocketIDS {
  method: SocketMethods.DRAW;
  payload: SocketPayload;
}

export type SocketPayload =
  | ISocketPayloadBrush
  | ISocketPayloadRect
  | ISocketPayloadSelect
  | ISocketPayloadCircle
  | ISocketPayloadTriangle;

export type SocketData =
  | ISocketConnection
  | ISocketDraw
  | ISocketPushUndo
  | ISocketUndo
  | ISocketRedo
  | ISocketSelect;
