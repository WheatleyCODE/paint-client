import React from 'react';
import { MdPerson, MdRedo, MdUndo } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { useCanvasRestore, useSocket } from '../hooks';
import { SocketMethods } from '../types';

export const SettingsBar = () => {
  const { socketNext } = useSocket();
  const { undo, redo } = useCanvasRestore();

  const undoHandler = () => {
    socketNext(SocketMethods.UNDO);
    undo();
  };

  const redoHandler = () => {
    socketNext(SocketMethods.REDO);
    redo();
  };

  return (
    <div className="settings-bar">
      <div className="settings-bar__left">
        <Button onClick={undoHandler} className="btn btn-cian" type="submit">
          <MdUndo className="icon" />
        </Button>

        <Button onClick={redoHandler} className="btn btn-cian" type="submit">
          <MdRedo className="icon" />
        </Button>
      </div>

      <div className="settings-bar__right">
        <h1 className="settings-bar__title">MAGIC PAINT ONLINE</h1>
        <div className="settings-bar__users">
          <div className="settings-bar__user">
            <MdPerson className="icon" /> Вася
          </div>
          <div className="settings-bar__user">
            <MdPerson className="icon" /> Петя
          </div>
        </div>
      </div>
    </div>
  );
};
