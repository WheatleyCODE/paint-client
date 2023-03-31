import React from 'react';
import { MdRedo, MdSave, MdUndo } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useCanvasRestore, useCanvas } from '../hooks';
import { downloadCanvasImg } from '../utils';

export const SettingsBar = () => {
  const params = useParams();
  const { canvas } = useCanvas();
  const { undo, redo } = useCanvasRestore(canvas);

  const download = () => {
    if (!canvas || !params.id) return;
    const dataUrl = canvas.toDataURL();
    downloadCanvasImg(dataUrl, params.id);
  };

  return (
    <div className="settings">
      <Button onClick={() => undo()} className="btn icon" type="submit">
        <MdUndo className="icon" />
      </Button>

      <Button onClick={() => redo()} className="btn icon" type="submit">
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
