import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { MdBrush, MdSquare, MdCircle, MdOutlineHorizontalRule } from 'react-icons/md';
import { RiEraserFill } from 'react-icons/ri';
import { useCanvas } from '../hooks/useCanvas';
import { Brush } from '../tools/Brush';
import { ITool } from '../types/tools.interfaces';
import { IObservables } from '../types/toolbar.interfaces';

export const Toolbar = () => {
  const colorRef = useRef<HTMLInputElement | null>(null);
  const lineWidthRef = useRef<HTMLInputElement | null>(null);
  const borderWidthRef = useRef<HTMLInputElement | null>(null);
  const fillRef = useRef<HTMLInputElement | null>(null);

  const [currentTool, setCurrentTool] = useState<ITool | null>(null);
  const [observables, setObservables] = useState<IObservables>({});
  const { canvas } = useCanvas();

  const clearCurrentTool = () => {
    currentTool?.destroyEvents();
    setCurrentTool(null);
  };

  const selectBrush = () => {
    clearCurrentTool();

    const { color$, lineWidth$ } = observables;

    // builder
    if (canvas && color$ && lineWidth$) {
      const brush = new Brush(canvas, color$, lineWidth$, '#000', 1);
      brush.init();
      setCurrentTool(brush);
    }
  };

  const selectRect = () => {
    clearCurrentTool();

    const { color$, lineWidth$ } = observables;

    if (canvas && color$ && lineWidth$) {
      const brush = new Brush(canvas, color$, lineWidth$, '#000', 1);
      brush.init();
      setCurrentTool(brush);
    }
  };

  useEffect(() => {
    const color = colorRef.current;
    const line = lineWidthRef.current;

    if (color && line) {
      const color$ = fromEvent<ChangeEvent<HTMLInputElement>>(color, 'input');
      const lineWidth$ = fromEvent<ChangeEvent<HTMLInputElement>>(line, 'input');

      setObservables({ lineWidth$, color$ });
    }
  }, []);

  return (
    <div className="toolbar">
      <input ref={colorRef} type="color" className="input color" />

      <div className="toolbar__tools">
        <button onClick={selectBrush} className="btn icon" type="submit">
          <MdBrush className="icon" />
        </button>

        <button className="btn icon" type="submit">
          <MdSquare className="icon" />
        </button>

        <button className="btn icon" type="submit">
          <MdCircle className="icon" />
        </button>

        <button className="btn icon" type="submit">
          <RiEraserFill className="icon" />
        </button>

        <button className="btn icon" type="submit">
          <MdOutlineHorizontalRule className="icon" />
        </button>
      </div>

      <input ref={lineWidthRef} type="range" min="0" max="5" />
      <input ref={lineWidthRef} type="range" min="0" max="5" />
    </div>
  );
};
