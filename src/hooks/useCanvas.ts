import { useContext } from 'react';
import { Brush, Circle, Rect, Triangle, Line } from '../tools';
import { PaintContext } from '../components/hoc/PaintContext';
import { ToolTypes, SocketPayload } from '../types';
import { Arbitrary } from '../tools/Arbitrary';
import { useTypedSelector } from './redux';

export const useCanvas = () => {
  const { canvas } = useContext(PaintContext);
  const { canvasSettings } = useTypedSelector((state) => state.paint);

  const draw = (data: SocketPayload) => {
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    switch (data.type) {
      case ToolTypes.BRUSH:
        Brush.draw(ctx, data.params);
        break;
      case ToolTypes.RECT:
        Rect.draw(ctx, data.params);
        break;
      case ToolTypes.CIRCLE:
        Circle.draw(ctx, data.params);
        break;
      case ToolTypes.TRIANGLE:
        Triangle.draw(ctx, data.params);
        break;
      case ToolTypes.LINE:
        Line.draw(ctx, data.params);
        break;
      case ToolTypes.ARBITRARY:
        Arbitrary.draw(ctx, data.params);
        break;
      default:
        break;
    }
  };

  const setImage = (img: HTMLImageElement) => {
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.stroke();
  };

  const setImageResize = (
    img: HTMLImageElement,
    width: number,
    height: number,
    sWidth: number,
    sHeight: number
  ) => {
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, sWidth, sHeight, 0, 0, sWidth, sHeight);
    ctx.stroke();
  };

  return {
    canvas,
    canvasSettings,
    draw,
    setImage,
    setImageResize,
  };
};
