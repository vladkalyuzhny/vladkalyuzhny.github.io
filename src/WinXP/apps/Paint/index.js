import React from 'react';

const base = 'https://jspaint.app';

// add child div to capture mouse event when not focused
function Paint({ onClose, isFocus, url }) {
  const src = url ? `${base}#load:${url}` : base;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <iframe
        src={src}
        frameBorder="0"
        title="paint"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(192,192,192)',
        }}
      />
      {!isFocus && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        />
      )}
    </div>
  );
}

export default Paint;
