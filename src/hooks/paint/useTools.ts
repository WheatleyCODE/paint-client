import { useEffect, useRef, useState } from 'react';
import { RectBuilder } from '../../tools';
import { IObservables, Tool, ToolTypes } from '../../types';
import { useCanvas } from '../useCanvas';
import { useSocket } from '../useSocket';
import { BrushBuilder } from '../../tools/builders/BrushBuilder';
import { useTypedDispatch, useTypedSelector } from '../redux';
import { paintActions } from '../../store';

export interface ITools {
  current: Tool | null;
  selectRect: () => void;
  selectBrush: () => void;
}

export const useTools = (observables: IObservables): ITools => {
  const { toolSettings, currentTool: curentToolType } = useTypedSelector((state) => state.paint);
  const { canvas } = useCanvas();
  const { socketNext } = useSocket();
  const dispatch = useTypedDispatch();
  const shield = useRef<HTMLDivElement | null>(null);
  const select = useRef<HTMLDivElement | null>(null);
  const [currentTool, setCurrentTool] = useState<Tool | null>(null);

  const clearCurrentTool = () => {
    currentTool?.destroyEvents();
    setCurrentTool(null);
    dispatch(paintActions.setCurrentTool(ToolTypes.NONE));
  };

  const selectBrush = () => {
    clearCurrentTool();
    const { majorColor$, minorColor$, lineWidth$ } = observables;

    if (!shield.current || !canvas || !majorColor$ || !minorColor$ || !lineWidth$) return;

    const brush = new BrushBuilder(shield.current, canvas)
      .setMajorColor$(majorColor$)
      .setInitMajorColor(toolSettings.majorColor)
      .setMinorColor$(minorColor$)
      .setInitMinorColor(toolSettings.minorColor)
      .setLineWidth$(lineWidth$)
      .setInitLineWidth(toolSettings.lineWidth)
      .setSocketNext(socketNext)
      .build();

    brush.init();
    setCurrentTool(brush);
    dispatch(paintActions.setCurrentTool(brush.type));
  };

  const selectRect = () => {
    clearCurrentTool();
    const { majorColor$, fill$, minorColor$, lineWidth$ } = observables;

    if (!shield.current || !select.current) return;
    if (!canvas || !majorColor$ || !minorColor$ || !fill$ || !lineWidth$) return;

    const rect = new RectBuilder(shield.current, canvas)
      .setMajorColor$(majorColor$)
      .setInitMajorColor(toolSettings.majorColor)
      .setMinorColor$(minorColor$)
      .setInitMinorColor(toolSettings.minorColor)
      .setLineWidth$(lineWidth$)
      .setInitLineWidth(toolSettings.lineWidth)
      .setSocketNext(socketNext)
      .setFill$(fill$)
      .setInitShapeType(toolSettings.currentShape)
      .setSelectSquare(select.current)
      .build();

    rect.init();
    setCurrentTool(rect);
    dispatch(paintActions.setCurrentTool(rect.type));
  };

  useEffect(() => {
    shield.current = document.querySelector('#shield') as HTMLDivElement;
    select.current = document.querySelector('#select') as HTMLDivElement;
  }, []);

  useEffect(() => {
    if (curentToolType === ToolTypes.BRUSH) {
      selectBrush();
    }

    if (curentToolType === ToolTypes.RECT) {
      selectRect();
    }
  }, [observables]);

  return {
    current: currentTool,
    selectRect,
    selectBrush,
  };
};
