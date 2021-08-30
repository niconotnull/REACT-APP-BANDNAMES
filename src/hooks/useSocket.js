import { useEffect, useMemo, useState } from 'react';
import io from 'socket.io-client';

export const useSocket = (severPath) => {
  const socket = useMemo(
    () =>
      io.connect(severPath, {
        transports: ['websocket'],
      }),
    [severPath]
  );

  const [online, setOnline] = useState(false);

  useEffect(() => {
    console.log(socket);
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online };
};
