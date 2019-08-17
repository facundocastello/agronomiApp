import React from "react";

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
      <div className="p-3 border rounded w-100">
        <div className="d-flex justify-content-around">
          <div className="d-flex flex-column">
            <strong>Name</strong> {name}
          </div>
          <div className="d-flex flex-column">
            <strong>Size</strong> {size}
          </div>
          {histories && histories.length > 0 && (
            <div className="d-flex flex-column">
              <strong>Histories</strong> {histories[histories.length - 1].type}
            </div>
          )}
        </div>
        {deleteCrop && (
          <div className="bg-danger" onClick={deleteCrop(_id)}>
            X
          </div>
        )}
      </div>
      {displayHistories && histories && (
        <div className="d-flex flex-column mt-3">
          Histories
          <div className="d-flex">
            <div className="font-weight-bold w-100 border">description</div>
            <div className="font-weight-bold w-100 border">type</div>
            <div className="font-weight-bold w-100 border">cultive</div>
          </div>
          {histories.map(history => (
            <div className="d-flex">
              <div className="w-100 border">{history.description}</div>
              <div className="w-100 border">{history.type}</div>
              <div className="w-100 border">{history.cultive}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
