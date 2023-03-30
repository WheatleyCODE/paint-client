import React from 'react';
import { MdRedo, MdSave, MdUndo } from 'react-icons/md';
import { useCanvasRestore } from '../hooks/useCanvasRestore';
import { useCanvas } from '../hooks/useCanvas';

export const SettingBar = () => {
  const { canvas } = useCanvas();
  const { undo, redo } = useCanvasRestore(canvas);

  return (
    <div className="settings">
      <button onClick={() => undo()} className="btn icon" type="submit">
        <MdUndo className="icon" />
      </button>

      <button onClick={() => redo()} className="btn icon" type="submit">
        <MdRedo className="icon" />
      </button>

      <button className="btn icon" type="submit">
        <MdSave className="icon" />
      </button>

      <button className="btn icon" type="submit">
        <MdSave className="icon" />
      </button>
    </div>
  );
};
