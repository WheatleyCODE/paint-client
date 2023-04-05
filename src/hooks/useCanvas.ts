import { useContext, useState } from 'react';
import { Brush, Circle, Rect, Triangle, Line } from '../tools';
import { PaintContext } from '../components/hoc/PaintContext';
import { ToolTypes, SocketPayload } from '../types';
import { Arbitrary } from '../tools/Arbitrary';

export interface ICanvasSettings {
  width: number;
  height: number;
}

const initCanvasSettings: ICanvasSettings = {
  width: 900,
  height: 900,
};

export const useCanvas = () => {
  const { canvas } = useContext(PaintContext);
  const [canvasSettings, setCanvasSettings] = useState<ICanvasSettings>(initCanvasSettings);

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

  // Todo
  const changeWidth = () => {
    setCanvasSettings((p) => ({ ...p }));
  };

  const changeHeight = () => {
    setCanvasSettings((p) => ({ ...p }));
  };

  return {
    canvas,
    canvasSettings,
    draw,
  };
};
