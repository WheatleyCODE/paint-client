import { useEffect, useRef, useState } from 'react';
import {
  ArbitraryBuilder,
  BrushBuilder,
  CircleBuilder,
  LineBuilder,
  RectBuilder,
  TriangleBuilder,
} from '../../tools';
import { useCanvas } from '../canvas';
import { useSocket } from '../useSocket';
import { useTypedDispatch, useTypedSelector } from '../redux';
import { colors, DEFAULT_LINE_WIDTH } from '../../consts';
import { paintActions } from '../../store';
import { EffectTypes, IBrush, Tool, ToolTypes } from '../../types';
import { IPaintObservables } from './usePaintObservables';
import { createBrush, createEraser } from '../../tools/creators';
import { createMagic } from '../../tools/creators/createMagic';

export interface ITools {
  current: Tool | null;
  selectRect: () => void;
  selectBrush: () => void;
  selectCircle: () => void;
  selectTriangle: () => void;
  selectEraser: () => void;
  selectLine: () => void;
  selectArbitrary: () => void;
  selectMagic: () => void;
}

export interface IUsePaintToolsParams {
  observables: IPaintObservables;
  changeLineWidth: (num: number) => void;
}

export const usePaintTools = ({ observables, changeLineWidth }: IUsePaintToolsParams): ITools => {
  const { toolSettings, currentEffect } = useTypedSelector((state) => state.paint);
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

  const getChangeLineWidth = () => {
    let prevNum = 0;

    return (num: number) => {
      const number = Math.round(num);
      if (prevNum === number) return;
      prevNum = number;

      if (number % 5 !== 0) return;
      changeLineWidth(number);
    };
  };

  // Brushes
  const selectBrush = () => {
    clearCurrentTool();
    if (!shield.current || !canvas) return;

    const brush = createBrush({
      shield: shield.current,
      canvas,
      toolSettings,
      observables,
      currentEffect,
      socketNext,
      changeLineWidth: getChangeLineWidth(),
    });

    if (!brush) return;

    brush.init();
    setCurrentTool(brush);
    dispatch(paintActions.setCurrentTool(brush.type));
  };

  const selectEraser = () => {
    clearCurrentTool();
    if (!shield.current || !canvas) return;

    const eraser = createEraser({
      shield: shield.current,
      canvas,
      socketNext,
      observables,
      toolSettings,
    });

    if (!eraser) return;

    eraser.init();
    setCurrentTool(eraser);
    dispatch(paintActions.setCurrentTool(eraser.type));
  };

  const selectMagic = () => {
    clearCurrentTool();
    if (!shield.current || !canvas) return;

    const magic = createMagic({
      shield: shield.current,
      canvas,
      toolSettings,
      observables,
      currentEffect,
      socketNext,
      changeLineWidth: getChangeLineWidth(),
    });

    if (!magic) return;

    magic.init();
    setCurrentTool(magic);
    dispatch(paintActions.setCurrentTool(magic.type));
  };

  // Shapes
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

  useEffect(() => {
    if (currentTool) {
      if (currentTool.type === ToolTypes.BRUSH || currentTool.type === ToolTypes.MAGIC) {
        const tool = currentTool as IBrush;
        const effects = tool.getEffects();
        const isExits = !!effects.find((effect) => effect === currentEffect);
        const rainbowEffect = effects.find((effect) => effect === EffectTypes.RAINBOW);

        if (!isExits) {
          const newEffects = [currentEffect];
          if (rainbowEffect) newEffects.push(rainbowEffect);

          tool.setEffects(newEffects);
          tool.destroyEvents();
          tool.init();
        }
      }
    }
  }, [currentEffect, currentTool]);

  useEffect(() => {
    if (currentEffect === EffectTypes.NONE) {
      changeLineWidth(DEFAULT_LINE_WIDTH);
      dispatch(paintActions.changeToolSettings({ lineWidth: DEFAULT_LINE_WIDTH }));
      currentTool?.setInitLineWidth(DEFAULT_LINE_WIDTH);
      currentTool?.destroyEvents();
      currentTool?.init();
    }
  }, [currentEffect]);

  return {
    current: currentTool,
    selectRect,
    selectBrush,
    selectCircle,
    selectTriangle,
    selectEraser,
    selectLine,
    selectArbitrary,
    selectMagic,
  };
};
