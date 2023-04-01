import React, { useEffect, useRef } from 'react';
import { filter, Observable, Subscription } from 'rxjs';
import { useParams } from 'react-router-dom';
import { paintActions as PA } from '../store';
import {
  useCanvas,
  useRequest,
  useSocket,
  useTypedDispatch,
  useTypedSelector,
  useCanvasRestore,
} from '../hooks';
import { getStreamOnloadImg } from '../utils';
import { SocketMethods, SocketData } from '../types';

export const Canvas = () => {
  const params = useParams();
  const dispatch = useTypedDispatch();
  const { username, undoList } = useTypedSelector((state) => state.paint);
  const { canvas, canvasSettings, draw } = useCanvas();
  const { undo, redo } = useCanvasRestore();
  const { socket$, socketNext } = useSocket();
  const { width, height } = canvasSettings;

  const pushToUndo = () => {
    if (!canvas) return;
    dispatch(PA.pushToUndo(canvas.toDataURL()));
  };

  const pushToUndoWS = () => {
    if (!canvas) return;

    socketNext(SocketMethods.PUSH_UNDO);
    dispatch(PA.pushToUndo(canvas.toDataURL()));
  };

  useEffect(() => {
    if (!socket$) return;

    const stream$ = socket$.pipe(filter((data) => data.username !== username));

    const sub = stream$.subscribe((data) => {
      switch (data.method) {
        case SocketMethods.CONNECTION:
          console.log('CONNECTION', data);
          break;

        case SocketMethods.DRAW:
          draw(data.payload);
          break;

        case SocketMethods.PUSH_UNDO:
          console.log('PUSH_UNDO work', data);
          pushToUndo();
          break;

        case SocketMethods.UNDO:
          console.log('UNDO work', data);
          undo();
          break;

        case SocketMethods.REDO:
          console.log('REDO work', data);
          redo();
          break;

        default:
          break;
      }

      return () => {
        socket$.unsubscribe();
        sub.unsubscribe();
      };
    });
  }, [socket$, undoList]);

  const { req: saveImg } = useRequest({
    url: `image?id=${params.id}`,
    method: 'post',
  });

  const { data, req: getImage } = useRequest<string, unknown>({
    url: `image?id=${params.id}`,
    method: 'get',
  });

  useEffect(() => {
    if (!username) return;

    if (!data) {
      getImage();
      return;
    }

    const onload$ = getStreamOnloadImg(data);

    onload$.subscribe((img) => {
      const ctx = canvas?.getContext('2d');

      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      ctx.stroke();
    });
  }, [data, username]);

  const saveImage = () => {
    const img = canvas?.toDataURL();
    saveImg({ img });
  };

  return (
    <div className="canvas">
      <canvas
        onMouseUp={saveImage}
        onMouseDown={pushToUndoWS}
        id="canvas"
        width={width}
        height={height}
      />
    </div>
  );
};
