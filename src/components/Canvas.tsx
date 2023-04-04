import React, { FC, useEffect } from 'react';
import { filter } from 'rxjs';
import { useParams } from 'react-router-dom';
import { paintActions as PA } from '../store';
import {
  useCanvas,
  useCanvasRestore,
  useRequest,
  useSocket,
  useTypedDispatch,
  useTypedSelector,
} from '../hooks';

import { getStreamOnloadImg } from '../utils';
import { SocketMethods, ToolTypes } from '../types';
import { getCursor } from '../utils/canvas.utils';
import { cursors } from '../consts/paint.consts';
import { useSelect } from '../hooks/useSelect';

export interface ICanvasProps {
  lineWidthValue: number;
}

export const Canvas: FC<ICanvasProps> = ({ lineWidthValue }) => {
  const params = useParams();
  const dispatch = useTypedDispatch();
  const { username, currentTool, connections } = useTypedSelector((state) => state.paint);
  const { canvas, canvasSettings, draw } = useCanvas();
  const { drawSelect } = useSelect();
  const { undo, redo } = useCanvasRestore();
  const { socketObs, socketNext } = useSocket();
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
    if (!socketObs) return;

    const stream$ = socketObs.pipe(filter((data) => data.username !== username));

    // * rewrite websocket onmessage
    stream$.subscribe((data) => {
      switch (data.method) {
        case SocketMethods.CONNECTION:
          break;

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

        default:
          break;
      }
    });
  }, [socketObs, redo, undo, canvas, pushToUndo, draw, drawSelect]);

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

  const cursor = currentTool === ToolTypes.BRUSH ? getCursor(lineWidthValue) : cursors[currentTool];

  return (
    <div className="canvas">
      <div className="position-relative">
        {connections.map((name) => (
          <div id={`select-${name}`} className="select">
            <div className="circle" />
          </div>
        ))}

        <div id="select-test" className="select-connection">
          <div className="select-connection__name">Dikey WHT</div>
          <div className="circle" />
        </div>

        <div id="select" className="select">
          <div className="circle" />
        </div>
        <canvas id="canvas" width={width} height={height} style={{ width, height }} />
        <div
          style={{ cursor, width, height }}
          onContextMenu={(e) => e.preventDefault()}
          aria-hidden
          onMouseUp={saveImage}
          onMouseDown={pushToUndoWS}
          id="shield"
        />
      </div>
    </div>
  );
};
