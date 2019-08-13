import React from "react";
import classnames from "classnames";

export default function Input({
  className,
  defaultValue,
  elements,
  indexName,
  name,
  onInputChange,
  title,
  type
}) {
  var renderedInput = "";
  switch (type) {
    case "select":
      renderedInput = (
        <select
          style={style.fixedHeight}
          className="bg-white border rounded w-75"
          defaultValue={defaultValue ? defaultValue : 0}
          indexname={indexName}
          name={name}
          type={type}
          onChange={e => onInputChange(e, elements)}
        >
          <option />
          {elements &&
            elements.map((element, index) => (
              <option id={element._id} key={`${name}-${index}`}>
                {element.name}
              </option>
            ))}
        </select>
      );

      break;
    default:
      renderedInput = (
        <input
          style={style.fixedHeight}
          defaultValue={defaultValue ? defaultValue : ''}
          className="border rounded w-75"
          onChange={onInputChange}
          name={name}
          type={type}
        />
      );
      break;
  }
  return (
    <div
      className={classnames(
        className ? className : "align-items-center d-flex flex-column p-3"
      )}
    >
      {title && <div className="mr-2">{title}</div>}
      <div className="w-100">{renderedInput}</div>
    </div>
  );
}

const style = {
  fixedHeight: {
    height: "30px"
  }
};
