import { useEffect, useRef } from 'react';
import { IDrawSelectParams } from '../types';
import { useTypedSelector } from './redux';
import { Shape } from '../tools/abstract/Shape';
import { useCanvas } from './useCanvas';

export interface ISelectData {
  [username: string]: HTMLDivElement;
}

export const useSelect = () => {
  const { canvas } = useCanvas();
  const dev = useRef<ISelectData | null>(null);
  const { connections } = useTypedSelector((state) => state.paint);

  useEffect(() => {
    const selectData = connections.reduce((acc, username) => {
      acc[username] = document.querySelector(`[data-select="${username}"]`) as HTMLDivElement;
      return acc;
    }, {} as ISelectData);

    dev.current = selectData;
  }, [connections]);

  const drawSelect = (params: IDrawSelectParams, username: string) => {
    if (!dev.current || !canvas) return;

    Shape.drawSelectSquare(dev.current[username], canvas, params);
  };

  return {
    drawSelect,
  };
};
