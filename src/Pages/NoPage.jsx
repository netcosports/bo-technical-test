import React from 'react';
import Dropzone from '../widgets/Dropzone';

// 404 page

function NoPage() {
  return (
    <div
      style={{
        height: '100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <p>{"Oups... this page doesn't seem to exist"}</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Dropzone inputMessage="click or drop your picture here" fileType="application/pdf" />
      </div>
    </div>
  );
}

export default NoPage;
