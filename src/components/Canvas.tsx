import React from 'react';
import { useCanvas } from '../hooks/useCanvas';

export const Canvas = () => {
  const { canvas, canvasSettings } = useCanvas();
  const { width, height } = canvasSettings;

  return (
    <div className="canvas">
      <canvas id="canvas" width={width} height={height} />
    </div>
  );
};
