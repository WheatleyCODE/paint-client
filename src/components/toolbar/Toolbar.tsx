import React, { useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { MdBrush, MdCircle, MdOutlineHorizontalRule, MdSquare } from 'react-icons/md';
import { RiEraserFill } from 'react-icons/ri';
import { Form } from 'react-bootstrap';
import { useCanvas, useSocket } from '../../hooks';
import { Brush, Rect } from '../../tools';
import { Tool, ToolTypes, Change, IObservables } from '../../types';
import { ToolButton } from './ToolButton';

export const Toolbar = () => {
  const colorRef = useRef<HTMLInputElement | null>(null);
  const lineWidthRef = useRef<HTMLInputElement | null>(null);
  const borderWidthRef = useRef<HTMLInputElement | null>(null);
  const fillRef = useRef<HTMLInputElement | null>(null);
  const fillColorRef = useRef<HTMLInputElement | null>(null);

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

    const { color$, lineWidth$ } = observables;

    if (canvas && color$ && lineWidth$) {
      const brush = new Brush(canvas, color$, '#000', lineWidth$, 1, socketNext);
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
        '#000',
        borderWidth$,
        1,
        fill$,
        true,
        fillColor$,
        '#000',
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

    if (color && line && border && fill && fillColor) {
      const color$ = fromEvent<Change>(color, 'input');
      const lineWidth$ = fromEvent<Change>(line, 'input');
      const borderWidth$ = fromEvent<any>(border, 'input');
      const fill$ = fromEvent<Change>(fill, 'change');
      const fillColor$ = fromEvent<Change>(fillColor, 'input');

      setObservables({ lineWidth$, color$, borderWidth$, fill$, fillColor$ });
    }
  }, []);

  return (
    <div className="toolbar">
      <input ref={colorRef} type="color" className="input color" />

      <input ref={fillColorRef} type="color" className="input color" />

      <div className="toolbar__tools">
        <ToolButton
          Icon={MdBrush}
          isActive={currentTool?.type === ToolTypes.BRUSH}
          onClick={selectBrush}
        />
        <ToolButton
          Icon={MdSquare}
          isActive={currentTool?.type === ToolTypes.RECT}
          onClick={selectRect}
        />
        <ToolButton Icon={MdCircle} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={RiEraserFill} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={MdOutlineHorizontalRule} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={MdOutlineHorizontalRule} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={MdOutlineHorizontalRule} isActive={false} onClick={selectBrush} />
        <ToolButton Icon={MdOutlineHorizontalRule} isActive={false} onClick={selectBrush} />
      </div>

      <div className="toolbar__settings">
        <Form.Label>Fill</Form.Label>
        <Form.Check ref={fillRef} className="checkbox" />
        <Form.Label>Line</Form.Label>
        <Form.Range ref={lineWidthRef} min="0" max="10" />
        <Form.Label>Border</Form.Label>
        <Form.Range ref={borderWidthRef} min="0" max="10" />
      </div>
    </div>
  );
};
