import React, { FC, useEffect } from 'react';
import { filter, tap } from 'rxjs';
import { useParams } from 'react-router-dom';
import { paintActions, paintActions as PA } from '../store';
import {
  useCanvas,
  useCanvasResize,
  useCanvasRestore,
  useRequest,
  useSelect,
  useSocket,
  useTypedDispatch,
  useTypedSelector,
} from '../hooks';
import { getCursor, getStreamOnloadImg } from '../utils';
import { ISaveCanvas, ISocketPayloadResize, SocketMethods } from '../types';

export interface ICanvasProps {
  lineWidthValue: number;
}

export const Canvas: FC<ICanvasProps> = ({ lineWidthValue }) => {
  const params = useParams();
  const dispatch = useTypedDispatch();
  const { username, currentTool, connections } = useTypedSelector((state) => state.paint);
  const { canvas, draw, setImage, canvasSettings, setImageResize } = useCanvas();
  const { drawSelect } = useSelect();
  const { undo, redo } = useCanvasRestore();
  const { rightRef, bottomRef } = useCanvasResize();
  const { socketObs, socketNext } = useSocket();
  const { width, height } = canvasSettings;

  const changeSize = ({ params: param }: ISocketPayloadResize) => {
    const { sWidth, sHeight, width: w, height: h } = param;

    if (!canvas) return;

    const data = canvas.toDataURL();
    const onload$ = getStreamOnloadImg(data);

    onload$.subscribe((img) => {
      dispatch(paintActions.setCanvasSize({ width: w, height: h }));

      setTimeout(() => {
        setImageResize(img, w, h, sWidth, sHeight);
      }, 0);
    });
  };

  const clearCanvas = () => {
    if (!canvas) return;
    // eslint-disable-next-line no-self-assign
    canvas.width = canvas.width;
  };

  const pushToUndo = () => {
    if (!canvas) return;

    const saveData: ISaveCanvas = {
      width: canvas.width,
      height: canvas.height,
      image: canvas.toDataURL(),
    };

    dispatch(PA.pushToUndo(saveData));
  };

  const pushToUndoWS = () => {
    if (!canvas) return;

    const saveData: ISaveCanvas = {
      width: canvas.width,
      height: canvas.height,
      image: canvas.toDataURL(),
    };

    socketNext(SocketMethods.PUSH_UNDO);
    dispatch(PA.pushToUndo(saveData));
  };

  useEffect(() => {
    if (!socketObs) return;

    const stream$ = socketObs.pipe(
      tap((data) => {
        if (JSON.stringify(data.connections) !== JSON.stringify(connections)) {
          dispatch(paintActions.setConnections(data.connections));
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
      setImage(img);
    });
  }, [data, username]);

  const saveImage = () => {
    const img = canvas?.toDataURL();
    saveImg({ img });
  };

  const cursor = getCursor(currentTool, lineWidthValue);

  return (
    <div className="canvas">
      <div className="position-relative">
        {connections.map((name) => (
          <div data-select={name} className="select-connection">
            <div className="circle" />
            <div className="triangle">
              <div data-triangle="bottom" className="triangle__bottom" />
              <div data-triangle="right" className="triangle__right" />
              <div data-triangle="left" className="triangle__left" />
            </div>
            <div className="select-connection__name">{name}</div>
          </div>
        ))}

        <div id="select" className="select">
          <div className="circle" />
          <div className="triangle">
            <div data-triangle="bottom" className="triangle__bottom" />
            <div data-triangle="right" className="triangle__right" />
            <div data-triangle="left" className="triangle__left" />
          </div>
        </div>
        <canvas id="canvas" width={width} height={height} style={{ width, height }} />
        <div
          style={{ cursor, width, height }}
          onContextMenu={(e) => e.preventDefault()}
          aria-hidden
          onMouseUp={saveImage}
          onMouseDown={pushToUndoWS}
          id="shield"
        >
          <div ref={rightRef} className="canvas__resize-right" />
          <div ref={bottomRef} className="canvas__resize-bottom" />
        </div>
      </div>
    </div>
  );
};
