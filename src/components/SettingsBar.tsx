import React from 'react';
import { MdRedo, MdSave, MdUndo } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useCanvas, useCanvasRestore, useSocket, useTypedSelector } from '../hooks';
import { downloadCanvasImg } from '../utils';
import { SocketMethods } from '../types';

export const SettingsBar = () => {
  const { undoList, redoList } = useTypedSelector((state) => state.paint);
  const params = useParams();
  const { socketNext } = useSocket();
  const { canvas } = useCanvas();
  const { undo, redo } = useCanvasRestore();

  const download = () => {
    if (!canvas || !params.id) return;
    const dataUrl = canvas.toDataURL();
    downloadCanvasImg(dataUrl, params.id);
  };

  const undoHandler = () => {
    socketNext(SocketMethods.UNDO);
    undo();
  };

  const redoHandler = () => {
    socketNext(SocketMethods.REDO);
    redo();
  };

  return (
    <div className="settings">
      <Button onClick={undoHandler} className="btn icon" type="submit">
        <MdUndo className="icon" />
      </Button>

      <Button onClick={redoHandler} className="btn icon" type="submit">
        <MdRedo className="icon" />
      </Button>

      <Button className="btn icon" type="submit">
        <MdSave className="icon" />
      </Button>

      <Button onClick={download} className="btn icon" type="submit">
        <MdSave className="icon" />
      </Button>
    </div>
  );
};
