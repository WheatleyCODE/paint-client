import { useState } from 'react';
import { Brush, Rect } from '../../tools';
import { IObservables, IToolSettings, Tool } from '../../types';
import { useCanvas } from '../useCanvas';
import { useSocket } from '../useSocket';

export interface ITools {
  current: Tool | null;
  selectRect: () => void;
  selectBrush: () => void;
}

export const useTools = (observables: IObservables, toolSettings: IToolSettings): ITools => {
  const { canvas } = useCanvas();
  const { socketNext } = useSocket();
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);

  const clearCurrentTool = () => {
    currentTool?.destroyEvents();
    setCurrentTool(null);
  };

  const selectBrush = () => {
    clearCurrentTool();

    const { majorColor$, minorColor$, lineWidth$ } = observables;

    if (canvas && majorColor$ && lineWidth$) {
      const brush = new Brush(
        canvas,
        majorColor$,
        toolSettings.majorColor,
        lineWidth$,
        toolSettings.lineWidth,
        socketNext
      );
      brush.init();
      setCurrentTool(brush);
    }
  };

  const selectRect = () => {
    clearCurrentTool();
    const { majorColor$, fill$, minorColor$, lineWidth$ } = observables;

    if (canvas && majorColor$ && minorColor$ && fill$ && lineWidth$) {
      const rect = new Rect(
        canvas,
        majorColor$,
        toolSettings.majorColor,
        lineWidth$,
        toolSettings.lineWidth,
        fill$,
        true, // todo
        minorColor$,
        toolSettings.minorColor,
        socketNext
      );
      rect.init();
      setCurrentTool(rect);
    }
  };

  return {
    current: currentTool,
    selectRect,
    selectBrush,
  };
};
