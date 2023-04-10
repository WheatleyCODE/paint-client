import { IToolSettings } from './paint.interfaces';
import { IPaintObservables } from '../hooks/paint/usePaintObservables';
import { SocketMethods, SocketPayload } from './socket.interfaces';

export interface ICreateBrushParams {
  shield: HTMLDivElement | null;
  canvas?: HTMLCanvasElement;
  toolSettings: IToolSettings;
  observables: IPaintObservables;
  socketNext: (method: SocketMethods, payload: SocketPayload) => void;
}

export interface ICreateShapeParams {
  shield: HTMLDivElement | null;
  select: HTMLDivElement | null;
  canvas?: HTMLCanvasElement;
  toolSettings: IToolSettings;
  observables: IPaintObservables;
  socketNext: (method: SocketMethods, payload: SocketPayload) => void;
}
