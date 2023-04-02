import React, { useEffect } from 'react';
import { debounceTime, filter, tap, map } from 'rxjs';
import { useTypedDispatch, useValidInput, useTools } from '../../hooks';
import { paintActions as PA } from '../../store';
import { ToolbarFooter } from './ToolbarFooter';
import { ToolbarSettings } from './ToolbarSettings';
import { ToolbarTools } from './ToolbarTools';
import Palette from './Palette';
import { BrushPreview } from './BrushPreview';

export const Toolbar = () => {
  const {
    refs,
    currentTool,
    toolSettings: ts,
    observables,
    selectBrush,
    selectRect,
    changeStep,
  } = useTools();
  const { colorRef, fillColorRef, fillRef, lineWidthRef, borderWidthRef } = refs;
  const dispatch = useTypedDispatch();
  const borderWidthInput = useValidInput(ts.borderWidth);
  const lineWidthInput = useValidInput(ts.lineWidth);
  const fillInput = useValidInput(ts.isFill);
  const colorInput = useValidInput(ts.color);
  const fillColorInput = useValidInput(ts.fillColor);

  useEffect(() => {
    const { borderWidth$, lineWidth$, fill$, color$, fillColor$ } = observables;
    if (!borderWidth$ || !lineWidth$ || !fill$ || !color$ || !fillColor$) return;

    const streamColor$ = color$.pipe(
      map((e) => ({ color: e.target.value })),
      tap(({ color }) => colorInput.changeValue(color)),
      debounceTime(100)
    );

    const streamFC$ = fillColor$.pipe(
      map((e) => ({ color: e.target.value })),
      tap(({ color }) => fillColorInput.changeValue(color)),
      debounceTime(100)
    );

    const streamBW$ = borderWidth$.pipe(
      map((e) => ({ borderWidth: +e.target.value })),
      filter(({ borderWidth }) => borderWidth % changeStep === 0),
      tap(({ borderWidth }) => borderWidthInput.changeValue(borderWidth)),
      debounceTime(100)
    );

    const streamLW$ = lineWidth$.pipe(
      map((e) => ({ lineWidth: +e.target.value })),
      filter(({ lineWidth }) => lineWidth % changeStep === 0),
      tap(({ lineWidth }) => lineWidthInput.changeValue(lineWidth)),
      debounceTime(100)
    );

    fill$.subscribe((e) => {
      const isFill = !e.target.checked;
      fillInput.changeValue(isFill);
      dispatch(PA.changeToolSettings({ isFill }));
    });

    streamFC$.subscribe((data) => {
      dispatch(PA.changeToolSettings(data));
    });

    streamColor$.subscribe((data) => {
      dispatch(PA.changeToolSettings(data));
    });

    streamBW$.subscribe((data) => {
      dispatch(PA.changeToolSettings(data));
    });

    streamLW$.subscribe((data) => {
      dispatch(PA.changeToolSettings(data));
    });
  }, [observables]);

  return (
    <div className="toolbar">
      <BrushPreview width={lineWidthInput.value} color={colorInput.value} />

      <Palette input={{ ref: colorRef, value: colorInput.value }} />
      <Palette input={{ ref: fillColorRef, value: fillColorInput.value }} />

      <ToolbarTools
        currentToolType={currentTool?.type || ''}
        selectBrush={selectBrush}
        selectRect={selectRect}
      />

      <ToolbarSettings
        fill={{ ref: fillRef, value: fillInput.value }}
        lineWidth={{ ref: lineWidthRef, value: lineWidthInput.value }}
        borderWidth={{ ref: borderWidthRef, value: borderWidthInput.value }}
        min={1}
        max={100}
      />

      <ToolbarFooter />
    </div>
  );
};
