import { useEffect } from 'react';
import { filter, tap } from 'rxjs';
import { paintActions as PA } from '../store';
import { ISocketPayloadResize, SocketMethods } from '../types';
import { getStreamOnloadImg } from '../utils';
import { useCanvas, useCanvasDraw, useCanvasRestore } from './canvas';
import { useSelect } from './useSelect';
import { useSocket } from './useSocket';
import { useTypedDispatch, useTypedSelector } from './redux';

export const useSocketSubscription = () => {
  const { canvas, clearCanvas, drawImageCanvas } = useCanvas();
  const { socketObs } = useSocket();
  const { draw } = useCanvasDraw();
  const { drawSelect } = useSelect();
  const { undo, redo, pushToUndo } = useCanvasRestore();
  const dispatch = useTypedDispatch();
  const { connections, username } = useTypedSelector((state) => state.paint);

  const changeSize = ({ params: param }: ISocketPayloadResize) => {
    const { sWidth, sHeight, width: w, height: h } = param;
    if (!canvas) return;

    const data = canvas.toDataURL();
    const onload$ = getStreamOnloadImg(data);

    onload$.subscribe((img) => {
      dispatch(PA.setCanvasSize({ width: w, height: h }));

      setTimeout(() => {
        drawImageCanvas(img, { sy: 0, sx: 0, sWidth: w, sHeight: h });
      }, 0);
    });
  };

  useEffect(() => {
    if (!socketObs) return;

    const stream$ = socketObs.pipe(
      tap((data) => {
        if (JSON.stringify(data.connections) !== JSON.stringify(connections)) {
          dispatch(PA.setConnections(data.connections));
        }
      }),
      filter((data) => data.username !== username)
    );

    // * rewrite websocket onmessage
    stream$.subscribe((data) => {
      switch (data.method) {
        case SocketMethods.DRAW:
          draw(data.payload);
          break;

        case SocketMethods.PUSH_UNDO:
          pushToUndo();
          break;

        case SocketMethods.UNDO:
          undo();
          break;

        case SocketMethods.REDO:
          redo();
          break;

        case SocketMethods.SELECT: {
          drawSelect(data.payload.params, data.username);
          break;
        }

        case SocketMethods.RESIZE: {
          changeSize(data.payload);
          break;
        }

        case SocketMethods.CLEAR: {
          clearCanvas();
          break;
        }

        default:
          break;
      }
    });
  }, [socketObs, redo, undo, canvas, pushToUndo, draw, drawSelect, changeSize, connections]);
};
