import React from 'react';
import zucchina from '../../assets/zucchina.jpeg';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          marginTop: '2rem',
          borderRadius: '7px'
        }}
        alt="zucchina non trovata."
        src={zucchina}
      />
    </div>
  );
};

export default NotFound;
