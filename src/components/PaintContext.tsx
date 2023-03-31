import { createContext } from 'react';

export interface IPaintContext {
  canvas?: HTMLCanvasElement;
}

const ForbiddenDataForRedax = createContext<IPaintContext>({});

export const PaintContext = ForbiddenDataForRedax;
