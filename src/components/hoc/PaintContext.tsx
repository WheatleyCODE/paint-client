import { createContext } from 'react';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketData } from '../../types';

export interface IPaintContext {
  canvas?: HTMLCanvasElement;
  socket?: WebSocketSubject<SocketData>;
}

const ForbiddenDataForRedax = createContext<IPaintContext>({});

export const PaintContext = ForbiddenDataForRedax;
