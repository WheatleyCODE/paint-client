import React from 'react';
import { useCanvas } from '../hooks/useCanvas';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { paintActions as PA } from '../store/paint/paint.slice';

export const Canvas = () => {
  const { canvas, canvasSettings } = useCanvas();
  const dispatch = useTypedDispatch();
  const { width, height } = canvasSettings;

  const pushToUndo = () => {
    if (!canvas) return;

    dispatch(PA.pushToUndo(canvas.toDataURL()));
  };

  return (
    <div className="canvas">
      <canvas onMouseUp={pushToUndo} id="canvas" width={width} height={height} />
    </div>
  );
};
