import { useEffect, useRef, useState } from 'react';
import {
  ArbitraryBuilder,
  BrushBuilder,
  CircleBuilder,
  LineBuilder,
  RectBuilder,
  TriangleBuilder,
} from '../../tools';
import { useCanvas } from '../useCanvas';
import { useSocket } from '../useSocket';
import { useTypedDispatch, useTypedSelector } from '../redux';
import { colors } from '../../consts/paint.consts';
import { paintActions } from '../../store';
import { IObservables, Tool, ToolTypes } from '../../types';

export interface ITools {
  current: Tool | null;
  selectRect: () => void;
  selectBrush: () => void;
  selectCircle: () => void;
  selectTriangle: () => void;
  selectEraser: () => void;
  selectLine: () => void;
  selectArbitrary: () => void;
}

export const useTools = (observables: IObservables): ITools => {
  const { toolSettings } = useTypedSelector((state) => state.paint);
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

  const selectEraser = () => {
    clearCurrentTool();
    const { majorColor$, minorColor$, lineWidth$ } = observables;

    if (!shield.current || !canvas || !majorColor$ || !minorColor$ || !lineWidth$) return;

    const eraser = new BrushBuilder(shield.current, canvas)
      .setType(ToolTypes.ERASER)
      .setMajorColor$(majorColor$)
      .setInitMajorColor(colors.WHITE)
      .setMinorColor$(minorColor$)
      .setInitMinorColor(colors.WHITE)
      .setLineWidth$(lineWidth$)
      .setInitLineWidth(toolSettings.lineWidth)
      .setSocketNext(socketNext)
      .build();

    eraser.init();
    setCurrentTool(eraser);
    dispatch(paintActions.setCurrentTool(eraser.type));
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
      .setInitShapeFillType(toolSettings.currentShapeFillType)
      .setSelectSquare(select.current)
      .build();

    rect.init();
    setCurrentTool(rect);
    dispatch(paintActions.setCurrentTool(rect.type));
  };

  const selectLine = () => {
    clearCurrentTool();
    const { majorColor$, fill$, minorColor$, lineWidth$ } = observables;

    if (!shield.current || !select.current) return;
    if (!canvas || !majorColor$ || !minorColor$ || !fill$ || !lineWidth$) return;

    const line = new LineBuilder(shield.current, canvas)
      .setMajorColor$(majorColor$)
      .setInitMajorColor(toolSettings.majorColor)
      .setMinorColor$(minorColor$)
      .setInitMinorColor(toolSettings.minorColor)
      .setLineWidth$(lineWidth$)
      .setInitLineWidth(toolSettings.lineWidth)
      .setSocketNext(socketNext)
      .setFill$(fill$)
      .setInitShapeFillType(toolSettings.currentShapeFillType)
      .setSelectSquare(select.current)
      .build();

    line.init();
    setCurrentTool(line);
    dispatch(paintActions.setCurrentTool(line.type));
  };

  const selectCircle = () => {
    clearCurrentTool();
    const { majorColor$, fill$, minorColor$, lineWidth$ } = observables;

    if (!shield.current || !select.current) return;
    if (!canvas || !majorColor$ || !minorColor$ || !fill$ || !lineWidth$) return;

    const circle = new CircleBuilder(shield.current, canvas)
      .setMajorColor$(majorColor$)
      .setInitMajorColor(toolSettings.majorColor)
      .setMinorColor$(minorColor$)
      .setInitMinorColor(toolSettings.minorColor)
      .setLineWidth$(lineWidth$)
      .setInitLineWidth(toolSettings.lineWidth)
      .setSocketNext(socketNext)
      .setFill$(fill$)
      .setInitShapeFillType(toolSettings.currentShapeFillType)
      .setSelectSquare(select.current)
      .build();

    circle.init();
    setCurrentTool(circle);
    dispatch(paintActions.setCurrentTool(circle.type));
  };

  const selectTriangle = () => {
    clearCurrentTool();
    const { majorColor$, fill$, minorColor$, lineWidth$ } = observables;

    if (!shield.current || !select.current) return;
    if (!canvas || !majorColor$ || !minorColor$ || !fill$ || !lineWidth$) return;

    const triangle = new TriangleBuilder(shield.current, canvas)
      .setMajorColor$(majorColor$)
      .setInitMajorColor(toolSettings.majorColor)
      .setMinorColor$(minorColor$)
      .setInitMinorColor(toolSettings.minorColor)
      .setLineWidth$(lineWidth$)
      .setInitLineWidth(toolSettings.lineWidth)
      .setSocketNext(socketNext)
      .setFill$(fill$)
      .setInitShapeFillType(toolSettings.currentShapeFillType)
      .setSelectSquare(select.current)
      .build();

    triangle.init();
    setCurrentTool(triangle);
    dispatch(paintActions.setCurrentTool(triangle.type));
  };

  const selectArbitrary = () => {
    clearCurrentTool();
    const { majorColor$, fill$, minorColor$, lineWidth$ } = observables;

    if (!shield.current || !select.current) return;
    if (!canvas || !majorColor$ || !minorColor$ || !fill$ || !lineWidth$) return;

    const arbitrary = new ArbitraryBuilder(shield.current, canvas)
      .setMajorColor$(majorColor$)
      .setInitMajorColor(toolSettings.majorColor)
      .setMinorColor$(minorColor$)
      .setInitMinorColor(toolSettings.minorColor)
      .setLineWidth$(lineWidth$)
      .setInitLineWidth(toolSettings.lineWidth)
      .setSocketNext(socketNext)
      .setFill$(fill$)
      .setInitShapeFillType(toolSettings.currentShapeFillType)
      .setSelectSquare(select.current)
      .build();

    arbitrary.init();
    setCurrentTool(arbitrary);
    dispatch(paintActions.setCurrentTool(arbitrary.type));
  };

  useEffect(() => {
    shield.current = document.querySelector('#shield') as HTMLDivElement;
    select.current = document.querySelector('#select') as HTMLDivElement;
  }, []);

  return {
    current: currentTool,
    selectRect,
    selectBrush,
    selectCircle,
    selectTriangle,
    selectEraser,
    selectLine,
    selectArbitrary,
  };
};
