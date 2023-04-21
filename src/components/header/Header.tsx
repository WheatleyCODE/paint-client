import React, { memo } from 'react';
import { MdPerson, MdRedo, MdUndo } from 'react-icons/md';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useCanvasRestore, useRequest, useSocket, useTypedSelector } from '../../hooks';
import { SocketMethods } from '../../types';

export const Header = () => {
  const params = useParams();
  const { socketNext } = useSocket();
  const { connections } = useTypedSelector((state) => state.paint);
  const { undo, redo } = useCanvasRestore();

  const { req: saveImg } = useRequest<any, { image: string }, unknown>({
    url: `image?id=${params.id}`,
    method: 'post',
  });

  const saveImage = (canvas: HTMLCanvasElement) => {
    const image = canvas.toDataURL();

    if (image) {
      saveImg({ image });
    }
  };

  const undoHandler = () => {
    socketNext(SocketMethods.UNDO);
    undo(saveImage);
  };

  const redoHandler = () => {
    socketNext(SocketMethods.REDO);
    redo(saveImage);
  };

  const MemoPerson = memo(MdPerson);

  return (
    <div className="header">
      <div className="header__left">
        <Button data-testid="undo" onClick={undoHandler} className="btn btn-cian" type="submit">
          <MdUndo className="icon" />
        </Button>

        <Button data-testid="redo" onClick={redoHandler} className="btn btn-cian" type="submit">
          <MdRedo className="icon" />
        </Button>
      </div>

      <div className="header__right">
        <h1 className="header__title">MAGIC PAINT ONLINE</h1>
        <div className="header__users">
          {connections.map((name) => (
            <div key={name} className="header__user">
              <MemoPerson className="icon" /> {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
