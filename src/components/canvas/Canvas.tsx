import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { paintActions as PA } from '../../store';
import { UserSelect } from './UserSelect';
import {
  useCanvas,
  useCanvasMove,
  useCanvasResize,
  useCanvasRestore,
  useRequest,
  useSocket,
  useTypedDispatch,
  useTypedSelector,
} from '../../hooks';
import { getCursor, getStreamOnloadImg } from '../../utils';
import { IReqImageData, SocketMethods } from '../../types';

export interface ICanvasProps {
  lineWidthValue: number;
}

export const Canvas: FC<ICanvasProps> = ({ lineWidthValue }) => {
  const params = useParams();
  const dispatch = useTypedDispatch();
  const { username, currentTool, connections, canvasSettings } = useTypedSelector(
    (state) => state.paint
  );
  const { canvas, drawImageCanvas } = useCanvas();
  const { pushToUndo } = useCanvasRestore();
  const { rightRef, bottomRef } = useCanvasResize();
  const { isActive, canvasMain } = useCanvasMove();
  const { socketNext } = useSocket();

  const pushToUndoWS = () => {
    socketNext(SocketMethods.PUSH_UNDO);
    pushToUndo();
  };

  const { req: saveImg } = useRequest<any, { image: string }, unknown>({
    url: `image?id=${params.id}`,
    method: 'post',
  });

  const { data, req: getImage } = useRequest<IReqImageData, unknown>({
    url: `image?id=${params.id}`,
    method: 'get',
  });

  useEffect(() => {
    if (!username) return;

    if (!data) {
      getImage();
      return;
    }

    dispatch(PA.setCanvasSize({ width: data.size.width, height: data.size.height }));
    const onload$ = getStreamOnloadImg(data.image);

    onload$.subscribe((img) => {
      drawImageCanvas(img);
    });
  }, [data, username]);

  const saveImage = () => {
    const image = canvas?.toDataURL();

    if (image) {
      saveImg({ image });
    }
  };

  const cursor = getCursor(currentTool, lineWidthValue, isActive);
  const { width, height } = canvasSettings;

  return (
    <div ref={canvasMain} className="canvas">
      <div style={{ width, height }} className="position-relative">
        {connections.map((name) => (
          <UserSelect key={name} name={name} />
        ))}

        <UserSelect />

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
