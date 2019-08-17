import React from 'react';
import { isArray } from 'util';

export default function BatchCard({ _id, color, name, deleteBatch }) {
  return (
    <div className='bg-white border rounded m-3 w-100'>
      <div
        className='flex-center font-weight-bold px-3 py-1 rounded-top'
        style={{ backgroundColor: color ? color : 'white' }}
      >
        <div className='bg-white bg-opaque w-25'>{name}</div>
      </div>
      <div className='badge bg-danger' onClick={() => deleteBatch(_id)}>
        X
      </div>
    </div>
  );
}
