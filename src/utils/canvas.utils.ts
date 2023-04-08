/* eslint-disable max-len */
import { ShapeFillTypes, ToolTypes } from '../types';
import { cursors } from '../consts';

export const getCVGCursor = (width: number) => {
  const widthHalf = width ? width / 2 : 0;
  const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.2" height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;
  return cursor;
};

export const applyFillTypeStyles = (
  canvasCtx: CanvasRenderingContext2D,
  fillType: ShapeFillTypes
) => {
  if (fillType === ShapeFillTypes.FILL) {
    canvasCtx.fill();
  }

  if (fillType === ShapeFillTypes.BORDER) {
    canvasCtx.stroke();
  }

  if (fillType === ShapeFillTypes.FILL_BORDER) {
    canvasCtx.fill();
    canvasCtx.stroke();
  }
};

export const getCursor = (type: ToolTypes, width: number) => {
  const cursor =
    type === ToolTypes.BRUSH || type === ToolTypes.ERASER || type === ToolTypes.MAGIC
      ? getCVGCursor(width)
      : cursors[type];

  return cursor;
};
