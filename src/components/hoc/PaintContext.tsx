import { createContext } from 'react';
import { Observable } from 'rxjs';
import { SocketData } from '../../types';

export interface IPaintContext {
  canvas?: HTMLCanvasElement;
  socket?: WebSocket;
  socketObs?: Observable<SocketData>;
}

const ForbiddenDataForRedax = createContext<IPaintContext>({});

export const PaintContext = ForbiddenDataForRedax;
