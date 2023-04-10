import { useCanvas } from './useCanvas';
import { Brush, Circle, Line, Rect, Triangle, Arbitrary } from '../../tools';
import { SocketPayload, ToolTypes } from '../../types';

export const useCanvasDraw = () => {
  const { canvas, context } = useCanvas();

  const draw = (data: SocketPayload) => {
    if (!context || !canvas) return;

    switch (data.type) {
      case ToolTypes.BRUSH:
        Brush.draw(context, data.params);
        break;
      case ToolTypes.RECT:
        Rect.draw(context, data.params);
        break;
      case ToolTypes.CIRCLE:
        Circle.draw(context, data.params);
        break;
      case ToolTypes.TRIANGLE:
        Triangle.draw(context, data.params);
        break;
      case ToolTypes.LINE:
        Line.draw(context, data.params);
        break;
      case ToolTypes.ARBITRARY:
        Arbitrary.draw(context, data.params);
        break;
      default:
        break;
    }
  };

  return {
    draw,
  };
};
