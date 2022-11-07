import React from 'react';
import { RingLoader } from 'react-spinners';

const Loading = () => (
  <div className="contentWrap">
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <RingLoader color="#C63DEE" height={15} width={5} radius={2} margin={2} />
    </div>
  </div>
);

export default Loading;
