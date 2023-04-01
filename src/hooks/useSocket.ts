import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PaintContext } from '../components/hoc/PaintContext';
import { useTypedSelector } from './redux';
import { SocketMethods, SocketPayload, SocketData } from '../types';

export const useSocket = () => {
  const params = useParams();
  const { socket, socketObs } = useContext(PaintContext);
  const { username } = useTypedSelector((state) => state.paint);

  const socketNext = (method: SocketMethods, payload?: SocketPayload) => {
    if (!socket || !username) return;
    if (!params.id) return;

    const data = {
      id: params.id,
      username,
      method,
      payload,
    };

    socket.send(JSON.stringify(data));
  };

  return {
    socket,
    socketObs,
    socketNext,
  };
};
