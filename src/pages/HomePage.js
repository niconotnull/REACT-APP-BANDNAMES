import { useContext } from 'react';
import { BandList } from '../componentes/BandList';
import { BandAdd } from '../componentes/BandAdd';

import { SocketContext } from '../context/SocketContext';
import { BandChart } from '../componentes/BandChart';

function HomePage() {
  const { online } = useContext(SocketContext);

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status:
          {online ? (
            <span className='text-success'>Online</span>
          ) : (
            <span className='text-danger'>Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />
      <div className='row'>
        <div className='col'>
          <BandChart />
        </div>
      </div>

      <div className='row'>
        <div className='col-8'>
          <BandList />
        </div>

        <div className='col-4'>
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
