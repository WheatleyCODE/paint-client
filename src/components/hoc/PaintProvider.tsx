/* eslint-disable consistent-return */
import React, { ReactNode, FC, useEffect, useMemo, useState } from 'react';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { useParams } from 'react-router-dom';
import { IPaintContext, PaintContext } from './PaintContext';
import { useTypedSelector } from '../../hooks';
import { WS_SERVER } from '../../consts';
import { SocketData, SocketMethods } from '../../types';

export interface IPaintProviderProps {
  children: ReactNode;
}

export const PaintProvider: FC<IPaintProviderProps> = ({ children }) => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const { username } = useTypedSelector((state) => state.paint);
  const [socket, setSocket] = useState<WebSocketSubject<SocketData>>();
  const params = useParams();

  const connect = (name: string) => {
    if (socket) return;
    if (!params.id) return;
    const subject = webSocket<SocketData>(WS_SERVER);

    // !
    subject.subscribe({
      next: (message) => {
        console.log(message);
        setSocket(subject);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Socket is complete'),
    });

    subject.next({
      id: params.id,
      username: name,
      method: SocketMethods.CONNECTION,
    });

    return subject;
  };

  useEffect(() => {
    if (!username) return;

    const sub = connect(username);

    return () => {
      sub?.complete();
    };
  }, [username]);

  useEffect(() => {
    const $canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    setCanvas($canvas);
  }, []);

  const data: IPaintContext = useMemo(
    () => ({
      canvas,
      socket,
    }),
    [canvas, socket]
  );

  return <PaintContext.Provider value={data}>{children}</PaintContext.Provider>;
};
