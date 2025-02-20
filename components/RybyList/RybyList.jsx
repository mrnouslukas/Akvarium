import React from "react";
import "./RybyList.css";

const RybyList = ({ data, onDelete }) => {
  return (
    <div className="person-list-container">
      <h5 className="team-header">Tvoje ryby:</h5>
      <div className="person-list">
        {data.map((item) => (
          <div className="person-item" key={item.id}>
            <span className="person-info">
              {item.jmeno} {item.druh} / {item.level}
            </span>
            <button className="delete-btn" onClick={() => onDelete(item.id)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RybyList;
