import { IDrawBrashParams, IDrawRectParams, ToolTypes } from './tools.interfaces';

export const enum SocketMethods {
  PUSH_UNDO = 'PUSH_UNDO',
  UNDO = 'UNDO',
  REDO = 'REDO',
  CONNECTION = 'CONNECTION',
  DRAW = 'DRAW',
}

export interface ISocketPayloadBrush {
  type: ToolTypes.BRUSH;
  params: IDrawBrashParams;
}

export interface ISocketPayloadRect {
  type: ToolTypes.RECT;
  params: IDrawRectParams;
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

export interface ISocketDraw {
  id: string;
  username: string;
  method: SocketMethods.DRAW;
  payload: SocketPayload;
}

export type SocketPayload = ISocketPayloadBrush | ISocketPayloadRect;
export type SocketData =
  | ISocketConnection
  | ISocketDraw
  | ISocketPushUndo
  | ISocketUndo
  | ISocketRedo;
