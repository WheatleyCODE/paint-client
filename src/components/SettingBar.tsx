import React from 'react';
import { MdRedo, MdSave, MdUndo } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { useCanvasRestore } from '../hooks/useCanvasRestore';
import { useCanvas } from '../hooks/useCanvas';

export const SettingBar = () => {
  const { canvas } = useCanvas();
  const { undo, redo } = useCanvasRestore(canvas);

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

      <Button className="btn icon" type="submit">
        <MdSave className="icon" />
      </Button>
    </div>
  );
};
