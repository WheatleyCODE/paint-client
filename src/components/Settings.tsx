import React from 'react';
import { MdRedo, MdSave, MdUndo } from 'react-icons/md';

export const Settings = () => {
  return (
    <div className="settings">
      <button className="btn icon" type="submit">
        <MdUndo className="icon" />
      </button>

      <button className="btn icon" type="submit">
        <MdRedo className="icon" />
      </button>

      <button className="btn icon" type="submit">
        <MdSave className="icon" />
      </button>
    </div>
  );
};
