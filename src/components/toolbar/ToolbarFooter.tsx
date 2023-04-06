import React from 'react';
import { Button } from 'react-bootstrap';
import { MdDelete, MdSave } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { paintActions as PA } from '../../store';
import { downloadCanvasImg } from '../../utils';
import { useCanvas, useSocket, useTypedDispatch } from '../../hooks';
import { SocketMethods } from '../../types';

export const ToolbarFooter = () => {
  const params = useParams();
  const dispatch = useTypedDispatch();
  const { canvas, canvasSettings } = useCanvas();
  const { socketNext } = useSocket();

  const clear = () => {
    if (!canvas) return;

    socketNext(SocketMethods.PUSH_UNDO);
    dispatch(PA.pushToUndo(canvas.toDataURL()));
    canvas.width = canvasSettings.width;
  };

  const download = () => {
    if (!canvas || !params.id) return;
    const dataUrl = canvas.toDataURL();
    downloadCanvasImg(dataUrl, params.id);
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
