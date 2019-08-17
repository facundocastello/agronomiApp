import React from 'react';

export default function CropCard({
  _id,
  deleteCrop,
  displayHistories,
  name,
  histories,
  size
}) {
  return (
    <div>
      <div className='pb-3 bg-white border rounded shadow w-100'>
        <div className='bg-green font-weight-bold px-3 py-1 rounded-top'>
          {name}
        </div>
        <div className='d-flex mt-2 justify-content-around'>
          <div className='d-flex flex-column'>
            <strong>Size</strong> {size}
          </div>
          <div className='d-flex flex-column'>
            <strong>Cultive</strong>
            {getActualCultive(histories)}
          </div>
        </div>
        {deleteCrop && (
          <div className='bg-danger' onClick={deleteCrop(_id)}>
            X
          </div>
        )}
      </div>
      {displayHistories && histories && (
        <div className='d-flex flex-column mt-3'>
          Histories
          <div className='d-flex'>
            <div className='font-weight-bold w-100 border'>description</div>
            <div className='font-weight-bold w-100 border'>type</div>
            <div className='font-weight-bold w-100 border'>cultive</div>
          </div>
          {histories.map(history => (
            <div className='d-flex'>
              <div className='w-100 border'>{history.description}</div>
              <div className='w-100 border'>{history.type}</div>
              <div className='w-100 border'>{history.cultive}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const getActualCultive = histories => {
  if (!histories) return 'None';

  const sowsAndHarvest = histories.filter(
    history => history.type === 'sow' || history.type === 'harvest'
  );

  if (sowsAndHarvest.length === 0) return 'None';

  const lastSowAndHarvest = sowsAndHarvest[sowsAndHarvest.length - 1];
  if (lastSowAndHarvest.type === 'sow') return lastSowAndHarvest.cultive;

  return 'None';
};
