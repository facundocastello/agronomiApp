import React from 'react';
import Card from './Card';

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
  const foot = [
    {
      icon: 'pencil',
      color: 'warning',
      action: () => editBovine(_id)
    },
    {
      icon: 'remove',
      color: 'danger',
      action: () => deleteBovine(_id)
    }
  ];
  return (
    <Card
      titleColor={batch[0].color}
      title={`${name} | ${caravane} | ${internCaravane}`}
      foot={foot}
    >
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
    </Card>
  );
}
