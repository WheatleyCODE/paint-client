import { useState } from 'react';

export interface ICanvasSettings {
  width: number;
  height: number;
}

const initCanvasSettings: ICanvasSettings = {
  width: 800,
  height: 600,
};

export const useCanvasHandlers = (canvas?: HTMLCanvasElement) => {
  const [canvasSettings, setCanvasSettings] = useState<ICanvasSettings>(initCanvasSettings);

  return {
    canvasSettings,
  };
};
