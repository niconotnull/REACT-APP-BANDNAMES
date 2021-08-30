import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../context/SocketContext';

export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on('current-bands', (b) => {
      setBands(b);
    });

    return () => socket.off('current-bands');
  }, [socket]);

  const cambioNombre = (event, id) => {
    const nuevoNombre = event.target.value;

    setBands((b) =>
      b.map((band) => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const onPerdioFoco = (id, nombre) => {
    socket.emit('cambiar-nombre', { id, nombre });
  };

  const votar = (id) => {
    socket.emit('votar-banda', id);
  };

  const borrarBanda = (id) => {
    socket.emit('borrar-banda', id);
  };

  const crearRows = () => {
    return bands.map((e) => (
      <tr key={e.id}>
        <td>
          <button className='btn btn-primary' onClick={() => votar(e.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className='form-control'
            value={e.name}
            onChange={(event) => cambioNombre(event, e.id)}
            onBlur={() => onPerdioFoco(e.id, e.name)}
          />
        </td>
        <td>
          <h3>{e.votes}</h3>
        </td>
        <td>
          <button className='btn btn-danger' onClick={() => borrarBanda(e.id)}>
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className='table table-stripped'>
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};
