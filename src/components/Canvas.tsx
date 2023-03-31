import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { paintActions as PA } from '../store/paint/paint.slice';
import { useCanvas } from '../hooks/useCanvas';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { useRequest } from '../hooks/useRequest';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getStreamOnloadImg } from '../utils/stream.utils';

export const Canvas = () => {
  const params = useParams();
  const dispatch = useTypedDispatch();
  const { username } = useTypedSelector((state) => state.paint);
  const { canvas, canvasSettings } = useCanvas();
  const { width, height } = canvasSettings;

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

  const pushToUndo = () => {
    if (!canvas) return;
    dispatch(PA.pushToUndo(canvas.toDataURL()));
  };

  return (
    <div className="canvas">
      <canvas
        onMouseUp={saveImage}
        onMouseDown={pushToUndo}
        id="canvas"
        width={width}
        height={height}
      />
    </div>
  );
};
