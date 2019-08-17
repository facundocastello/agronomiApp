import React from 'react';
import Card from './Card';

export default function BatchCard({ _id, color, name, deleteBatch }) {
  return (
    <Card
      titleColor={color}
      title={`${name}`}
      foot={[
        {
          color: 'danger',
          icon: 'remove',
          action: () => deleteBatch(_id)
        }
      ]}
    />
  );
}
