import React from 'react';
import zucchina from '../../assets/zucchina.jpeg';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{ maxHeight: '100%' }}
        alt="zucchina non trovata."
        src={zucchina}
      />
    </div>
  );
};

export default NotFound;
