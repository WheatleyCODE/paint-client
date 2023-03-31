/* eslint-disable consistent-return */
import { useParams } from 'react-router-dom';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { useEffect, useState } from 'react';
import { WS_SERVER } from '../consts/api.consts';
import { useTypedSelector } from './useTypedSelector';
import { SocketData, SocketMethods, SocketPayload } from '../types/socket.interfaces';

export const useSocket = () => {
  const { username } = useTypedSelector((state) => state.paint);
  const [socket, setSocket] = useState<WebSocketSubject<SocketData> | null>(null);
  const params = useParams();

  const connect = (name: string) => {
    if (socket) return;
    if (!params.id) return;
    const subject = webSocket<SocketData>(WS_SERVER);

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

  const socketNext = (method: SocketMethods, payload: SocketPayload) => {
    if (!socket || !username) return;
    if (!params.id) return;

    socket.next({
      id: params.id,
      username,
      method,
      payload,
    });
  };

  useEffect(() => {
    if (!username) return;

    const sub = connect(username);

    return () => {
      sub?.complete();
    };
  }, [username]);

  return {
    socket$: socket,
    socketNext,
  };
};
