import { useEffect, useRef } from 'react';
import { IDrawSelectParams } from '../types';
import { useTypedSelector } from './redux';
import { Shape } from '../tools/abstract/Shape';
import { useCanvas } from './canvas';

export interface ISelectData {
  [username: string]: HTMLDivElement;
}

export const useSelect = () => {
  const { canvas } = useCanvas();
  const dev = useRef<ISelectData | null>(null);
  const { connections } = useTypedSelector((state) => state.paint);

  useEffect(() => {
    dev.current = connections.reduce((acc, username) => {
      acc[username] = document.querySelector(`[data-select="${username}"]`) as HTMLDivElement;
      return acc;
    }, {} as ISelectData);
  }, [connections]);

  const drawSelect = (params: IDrawSelectParams, username: string) => {
    if (!dev.current || !canvas) return;
    Shape.drawSelectSquare(dev.current[username], canvas, params);
  };

  return {
    drawSelect,
  };
};
