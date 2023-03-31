import { IDrawBrashParams, IDrawRectParams, ToolTypes } from './tools.interfaces';

export const enum SocketMethods {
  CONNECTION = 'connection',
  DRAW = 'draw',
}

export interface ISocketPayloadBrush {
  type: ToolTypes.BRUSH;
  params: IDrawBrashParams;
}

export interface ISocketPayloadRect {
  type: ToolTypes.RECT;
  params: IDrawRectParams;
}

export interface ISocketConnection {
  id: string;
  username: string;
  method: SocketMethods.CONNECTION;
}

export interface ISocketDraw {
  id: string;
  username: string;
  method: SocketMethods.DRAW;
  payload: SocketPayload;
}

export type SocketPayload = ISocketPayloadBrush | ISocketPayloadRect;
export type SocketData = ISocketConnection | ISocketDraw;
