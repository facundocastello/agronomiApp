import React from 'react';
import { isArray } from 'util';

export default function BovineCard({
  _id,
  caravane,
  batch,
  internCaravane,
  name,
  deleteBovine,
  parent,
  type
}) {
  return (
    <div className='bg-white border rounded m-3 w-100'>
      <div
        className='font-weight-bold px-3 py-1 rounded-top'
        style={{ backgroundColor: batch[0].color ? batch[0].color : 'white' }}
      >
        <div className='bg-white bg-opaque'>
          {name} | {caravane} | {internCaravane}
        </div>
      </div>
      <div>
        <strong>Batch</strong> {batch[0].name}
      </div>
      <div>
        <strong>Type</strong> {type}
      </div>
      {parent.length > 0 && (
        <div>
          <strong>Parent:</strong> {parent[0].name}
        </div>
      )}
      <div className='badge bg-danger' onClick={() => deleteBovine(_id)}>
        X
      </div>
    </div>
  );
}
