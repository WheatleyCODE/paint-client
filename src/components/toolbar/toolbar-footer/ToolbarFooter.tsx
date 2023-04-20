import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { MdDelete, MdSave } from 'react-icons/md';
import { paintActions as PA } from '../../../store';
import { useCanvas, useRequest, useSocket, useTypedDispatch } from '../../../hooks';
import { getSaveDataCanvas } from '../../../utils';
import { SocketMethods } from '../../../types';

export const ToolbarFooter = () => {
  const params = useParams();
  const dispatch = useTypedDispatch();
  const { canvas, clearCanvas, downloadImageCanvas } = useCanvas();
  const { socketNext } = useSocket();

  const { req: saveImg } = useRequest<any, { image: string }, unknown>({
    url: `image?id=${params.id}`,
    method: 'post',
  });

  const clear = () => {
    // eslint-disable-next-line no-restricted-globals
    const isClear = confirm('Вы действительно хотите очистить холст?');
    if (!isClear) return;

    if (!canvas) return;
    const saveData = getSaveDataCanvas(canvas);

    socketNext(SocketMethods.PUSH_UNDO);
    dispatch(PA.pushToUndo(saveData));

    socketNext(SocketMethods.CLEAR);
    clearCanvas();

    const image = canvas.toDataURL();
    saveImg({ image });
  };

  const download = () => {
    if (!params.id) return;
    downloadImageCanvas(params.id);
  };

  return (
    <div className="toolbar-footer">
      <Button onClick={download} className="btn btn-cian" type="submit">
        <MdSave className="icon" /> Save image
      </Button>

      <Button onClick={clear} className="btn btn-cian" type="submit">
        <MdDelete className="icon" /> Clear canvas
      </Button>
    </div>
  );
};
