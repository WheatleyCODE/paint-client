import React, { ReactNode, FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Observable } from 'rxjs';
import { IPaintContext, PaintContext } from './PaintContext';
import { useTypedSelector } from '../../hooks';
import { WS_SERVER } from '../../consts';
import { SocketData, SocketMethods } from '../../types';

export interface IPaintProviderProps {
  children: ReactNode;
}

export const PaintProvider: FC<IPaintProviderProps> = ({ children }) => {
  const { username } = useTypedSelector((state) => state.paint);
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();
  const [socket, setSocket] = useState<WebSocket>();
  const [socketObs, setSocketObs] = useState<Observable<SocketData>>();
  const params = useParams();

  const connect = (name: string) => {
    if (socket || socketObs) return;
    if (!params.id) return;

    const websocket = new WebSocket(WS_SERVER);

    const observer = new Observable<SocketData>((obs) => {
      websocket.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        console.info('ws.onmessage', msg);
        obs.next(msg);
      };
    });

    setSocketObs(observer);
    setSocket(websocket);

    websocket.onopen = () => {
      websocket.send(
        JSON.stringify({
          id: params.id,
          username: name,
          method: SocketMethods.CONNECTION,
        })
      );
    };
  };

  useEffect(() => {
    if (!username) return;
    connect(username);
  }, [username]);

  useEffect(() => {
    const $canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    setCanvas($canvas);
  }, []);

  const data: IPaintContext = useMemo(
    () => ({
      canvas,
      socket,
      socketObs,
    }),
    [canvas, socket, socketObs]
  );

  return <PaintContext.Provider value={data}>{children}</PaintContext.Provider>;
};
