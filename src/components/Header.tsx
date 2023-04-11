import React from 'react';
import { MdPerson, MdRedo, MdUndo } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { useCanvasRestore, useSocket, useTypedSelector } from '../hooks';
import { SocketMethods } from '../types';

export const Header = () => {
  const { socketNext } = useSocket();
  const { connections } = useTypedSelector((state) => state.paint);
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
    <div className="header">
      <div className="header__left">
        <Button onClick={undoHandler} className="btn btn-cian" type="submit">
          <MdUndo className="icon" />
        </Button>

        <Button onClick={redoHandler} className="btn btn-cian" type="submit">
          <MdRedo className="icon" />
        </Button>
      </div>

      <div className="header__right">
        <h1 className="header__title">MAGIC PAINT ONLINE</h1>
        <div className="header__users">
          {connections.map((name) => (
            <div key={name} className="header__user">
              <MdPerson className="icon" /> {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
