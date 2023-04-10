import { useContext, useEffect, useState } from 'react';
import { PaintContext } from '../../components/hoc/PaintContext';

export interface IDrawImageCanvasParams {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  sx?: number;
  sy?: number;
  sWidth?: number;
  sHeight?: number;
  isClear?: boolean;
}

export const useCanvas = () => {
  const { canvas } = useContext(PaintContext);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) setContext(ctx);
    }
  }, [canvas]);

  const drawImageCanvas = (image: HTMLImageElement, params: IDrawImageCanvasParams = {}) => {
    if (!canvas || !context) return;
    const { width: w, height: h } = canvas;
    const { x = 0, y = 0, width = w, height = h, sx, sy, sWidth, sHeight, isClear = true } = params;

    if (isClear) context.clearRect(x, y, width, height);

    if (typeof sx === 'number' && typeof sy === 'number') {
      if (typeof sWidth === 'number' && typeof sHeight === 'number') {
        context.drawImage(image, x, y, width, height, sx, sy, sWidth, sHeight);
        context.stroke();
        return;
      }
    }

    context.drawImage(image, x, y, width, height);
    context.stroke();
  };

  const clearCanvas = () => {
    if (!canvas || !context) return;
    canvas.width = canvas.width;
  };

  const downloadImageCanvas = (filename: string) => {
    if (!canvas || !context) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = `${filename}.jpg`;
    link.click();
    link.remove();
  };

  return {
    canvas,
    context,
    drawImageCanvas,
    downloadImageCanvas,
    clearCanvas,
  };
};
