import { useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { useTypedSelector } from './redux';
import { useCanvas } from './useCanvas';
import { useSocket } from './useSocket';
import { Brush, Rect } from '../tools';
import { Change, IObservables, Tool, ToolTypes } from '../types';

export const useTools = () => {
  const colorRef = useRef<HTMLInputElement | null>(null);
  const lineWidthRef = useRef<HTMLInputElement | null>(null);
  const borderWidthRef = useRef<HTMLInputElement | null>(null);
  const fillRef = useRef<HTMLInputElement | null>(null);
  const fillColorRef = useRef<HTMLInputElement | null>(null);

  const {
    toolSettings: ts,
    currentTool: currentToolType,
    changeStep,
  } = useTypedSelector((state) => state.paint);

  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [observables, setObservables] = useState<IObservables>({});
  const { canvas } = useCanvas();
  const { socketNext } = useSocket();

  const clearCurrentTool = () => {
    currentTool?.destroyEvents();
    setCurrentTool(null);
  };

  const selectBrush = () => {
    console.log('ssss');
    clearCurrentTool();

    const { color$, lineWidth$ } = observables;

    console.log('ssss');
    console.log(canvas, color$, lineWidth$);

    if (canvas && color$ && lineWidth$) {
      const brush = new Brush(canvas, color$, ts.color, lineWidth$, ts.lineWidth, socketNext);
      brush.init();
      setCurrentTool(brush);
    }
  };

  const selectRect = () => {
    clearCurrentTool();
    const { color$, borderWidth$, fill$, fillColor$ } = observables;

    if (canvas && color$ && borderWidth$ && fill$ && fillColor$) {
      const rect = new Rect(
        canvas,
        color$,
        ts.color,
        borderWidth$,
        ts.borderWidth,
        fill$,
        ts.isFill,
        fillColor$,
        ts.fillColor,
        socketNext
      );
      rect.init();
      setCurrentTool(rect);
    }
  };

  useEffect(() => {
    const color = colorRef.current;
    const line = lineWidthRef.current;
    const border = borderWidthRef.current;
    const fill = fillRef.current;
    const fillColor = fillColorRef.current;
    console.log(color, line, border, fill, fillColor);

    if (color && line && border && fill && fillColor) {
      const color$ = fromEvent<Change>(color, 'input');
      const lineWidth$ = fromEvent<Change>(line, 'input');
      const borderWidth$ = fromEvent<any>(border, 'input');
      const fill$ = fromEvent<Change>(fill, 'change');
      const fillColor$ = fromEvent<Change>(fillColor, 'input');

      setObservables({ lineWidth$, color$, borderWidth$, fill$, fillColor$ });
    }
  }, []);

  return {
    refs: {
      colorRef,
      lineWidthRef,
      borderWidthRef,
      fillRef,
      fillColorRef,
    },
    selectBrush,
    selectRect,
    currentTool,
    toolSettings: ts,
    changeStep,
    observables,
  };
};
