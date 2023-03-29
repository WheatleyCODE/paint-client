import { useEffect, useState } from 'react';
import { useCanvasHandlers } from './useCanvasHandlers';

export const useCanvas = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const { canvasSettings } = useCanvasHandlers(canvas);

  useEffect(() => {
    const $canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    setCanvas($canvas);
  }, []);

  return {
    canvas,
    canvasSettings,
  };
};
