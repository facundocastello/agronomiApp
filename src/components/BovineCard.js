import React from 'react';
import { isArray } from 'util';

export default function BovineCard({
  _id,
  caravane,
  internCaravane,
  name,
  deleteBovine,
  parent,
  type
}) {
  return (
    <div className='border rounded m-3 w-100'>
      <div className='bg-green font-weight-bold px-3 py-1 rounded-top'>
        {name} - {caravane} - {internCaravane}
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
