import React from 'react';

export default function Card({ titleColor, children, foot, title }) {
  return (
    <div className='d-flex flex-column justify-content-between bg-white border rounded m-3 w-100'>
      <div
        className='font-weight-bold px-3 py-1 rounded-top'
        style={{ backgroundColor: titleColor ? titleColor : 'white' }}
      >
        <div className='bg-white bg-opaque'>{title}</div>
      </div>
      <div>{children}</div>
      <div className='d-flex justify-content-center mb-2'>
        {foot.map((footItem, index) => (
          <i
            key={`foot-${index}`}
            className={`badge bg-${footItem.color} d-inline-block fa fa-${
              footItem.icon
            } ${index !== 0 && 'ml-2'}`}
            onClick={footItem.action}
          />
        ))}
      </div>
    </div>
  );
}
