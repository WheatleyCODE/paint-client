import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PaintContext } from '../components/hoc/PaintContext';
import { useTypedSelector } from './redux';
import { SocketMethods, SocketPayload, SocketData } from '../types';

export const useSocket = () => {
  const params = useParams();
  const { socket } = useContext(PaintContext);
  const { username } = useTypedSelector((state) => state.paint);

  const socketNext = (method: SocketMethods, payload?: SocketPayload) => {
    if (!socket || !username) return;
    if (!params.id) return;

    socket.next(<SocketData>{
      id: params.id,
      username,
      method,
      payload,
    });
  };

  return {
    socket$: socket,
    socketNext,
  };
};
