import { createContext } from 'react';
import { Observable } from 'rxjs';
import { SocketData } from '../../types';

export interface IPaintContext {
  canvas?: HTMLCanvasElement;
  socket?: WebSocket;
  socketObs?: Observable<SocketData>;
}

const ForbiddenDataForRedux = createContext<IPaintContext>({});

export const PaintContext = ForbiddenDataForRedux;
