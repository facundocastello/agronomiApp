import React from "react";

export default function CropCard({ _id, deleteCrop, name, location, size }) {
  return (
    <div className="p-3 border rounded m-3 w-100">
      <div className="d-flex justify-content-around">
        <div className="d-flex flex-column">
          <strong>Name</strong> {name}
        </div>
        <div className="d-flex flex-column">
          <strong>Size</strong> {size}
        </div>
        <div className="d-flex flex-column">
          <strong>Location</strong> {location}
        </div>
      </div>
      {deleteCrop && (
        <div className="bg-danger" onClick={deleteCrop(_id)}>
          X
        </div>
      )}
    </div>
  );
}
