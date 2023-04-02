import { useContext, useState } from 'react';
import { Brush, Rect } from '../tools';
import { PaintContext } from '../components/hoc/PaintContext';
import { ToolTypes, SocketPayload } from '../types';
import { getStreamOnloadImg } from '../utils';

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
      default:
        break;
    }
  };

  return {
    canvas,
    canvasSettings,
    draw,
  };
};
