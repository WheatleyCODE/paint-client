import { useEffect, useRef } from 'react';
import { IDrawSelectParams } from '../types';
import { useTypedSelector } from './redux';
import { Shape } from '../tools/abstract/Shape';
import { useCanvas } from './useCanvas';

export const useSelect = () => {
  const { canvas } = useCanvas();
  const dev = useRef<HTMLDivElement | null>(null);
  const { connections } = useTypedSelector((state) => state.paint);

  useEffect(() => {
    dev.current = document.querySelector('#select-test');
  }, []);

  const drawSelect = (params: IDrawSelectParams, username: string) => {
    if (!dev.current || !canvas) return;

    Shape.drawSelectSquare(dev.current, canvas, params);
  };

  return {
    drawSelect,
  };
};
