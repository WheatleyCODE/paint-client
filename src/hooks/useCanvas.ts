import { useEffect, useState } from 'react';
import { Brush } from '../tools/Brush';
import { ToolTypes } from '../types/tools.interfaces';
import { Rect } from '../tools/Rect';
import { SocketPayload } from '../types/socket.interfaces';

export interface ICanvasSettings {
  width: number;
  height: number;
}

const initCanvasSettings: ICanvasSettings = {
  width: 800,
  height: 600,
};

export const useCanvas = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [canvasSettings, setCanvasSettings] = useState<ICanvasSettings>(initCanvasSettings);

  useEffect(() => {
    const $canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    setCanvas($canvas);
  }, []);

  const draw = (data: SocketPayload) => {
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

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
