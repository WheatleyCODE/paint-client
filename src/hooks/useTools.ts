import { useEffect, useRef, useState } from 'react';
import { filter, fromEvent, map, tap } from 'rxjs';
import { useTypedDispatch, useTypedSelector } from './redux';
import { useCanvas } from './useCanvas';
import { useSocket } from './useSocket';
import { Brush, Rect } from '../tools';
import { Change, IObservables, Tool, ToolTypes } from '../types';
import { useValidInput } from './useValidInput';
import { paintActions as PA } from '../store';

export const useTools = () => {
  const {
    toolSettings,
    currentTool: currentToolType,
    changeStep,
    currentShape,
  } = useTypedSelector((state) => state.paint);

  const dispatch = useTypedDispatch();
  const lineWidthInput = useValidInput(toolSettings.lineWidth);
  const fillInput = useValidInput(currentShape);
  const majorColorInput = useValidInput(toolSettings.majorColor);
  const minorColorInput = useValidInput(toolSettings.minorColor);

  const majorColorRef = useRef<HTMLInputElement | null>(null);
  const minorColorRef = useRef<HTMLInputElement | null>(null);
  const lineWidthRef = useRef<HTMLInputElement | null>(null);
  const fillRef = useRef<HTMLInputElement | null>(null);

  const [currentTool, setCurrentTool] = useState<Tool | null>(null);
  const [observables, setObservables] = useState<IObservables>({});
  const { canvas } = useCanvas();
  const { socketNext } = useSocket();

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

  useEffect(() => {
    const majorColor = majorColorRef.current;
    const minorColor = majorColorRef.current;
    const line = lineWidthRef.current;
    const fill = fillRef.current;

    if (majorColor && minorColor && line && fill) {
      const majorColor$ = fromEvent<Change>(majorColor, 'input');
      const minorColor$ = fromEvent<Change>(minorColor, 'input');
      const lineWidth$ = fromEvent<Change>(line, 'input');
      const fill$ = fromEvent<Change>(fill, 'change');

      setObservables({ lineWidth$, majorColor$, minorColor$, fill$ });
    }
  }, []);

  useEffect(() => {
    const { lineWidth$, fill$, majorColor$, minorColor$ } = observables;
    if (!lineWidth$ || !fill$ || !majorColor$ || !minorColor$) return;

    const streamMajorColor$ = majorColor$.pipe(
      map((e) => ({ majorColor: e.target.value })),
      tap(({ majorColor }) => majorColorInput.changeValue(majorColor))
    );

    const streamMinorColor$ = minorColor$.pipe(
      map((e) => ({ minorColor: e.target.value })),
      tap(({ minorColor }) => minorColorInput.changeValue(minorColor))
    );

    const streamLineWidth$ = lineWidth$.pipe(
      map((e) => ({ lineWidth: +e.target.value })),
      filter(({ lineWidth }) => lineWidth % changeStep === 0),
      tap(({ lineWidth }) => lineWidthInput.changeValue(lineWidth))
    );

    // fill$.subscribe((e) => {
    //   const isFill = !e.target.checked;
    //   fillInput.changeValue(isFill);
    //   dispatch(PA.changeToolSettings({ isFill }));
    // });

    streamMajorColor$.subscribe((data) => {
      dispatch(PA.changeToolSettings(data));
    });

    streamMinorColor$.subscribe((data) => {
      dispatch(PA.changeToolSettings(data));
    });

    // streamBW$.subscribe((data) => {
    //   dispatch(PA.changeToolSettings(data));
    // });

    streamLineWidth$.subscribe((data) => {
      dispatch(PA.changeToolSettings(data));
    });
  }, [observables]);

  return {
    tools: {
      majorColor: {
        value: majorColorInput.value,
        ref: majorColorRef,
        changeValue: majorColorInput.changeValue,
      },

      minorColor: {
        value: minorColorInput.value,
        ref: minorColorRef,
        changeValue: minorColorInput.changeValue,
      },

      lineWidth: {
        value: lineWidthInput.value,
        ref: lineWidthRef,
        changeValue: lineWidthInput.changeValue,
      },

      fill: {
        value: fillInput.value,
        ref: fillRef,
        changeValue: fillInput.changeValue,
      },
    },
    selectBrush,
    selectRect,
    currentTool,
    toolSettings,
    currentShape,
    changeStep,
    observables,
  };
};
