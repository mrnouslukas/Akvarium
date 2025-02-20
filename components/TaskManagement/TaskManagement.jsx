import React, { useState, useEffect, useCallback } from "react";
import "./TaskManagement.css";

const TaskManagement = ({ ryby }) => {
  const [dimensions, setDimensions] = useState({
    width: "",
    height: "",
    length: "",
  });
  const [approved, setApproved] = useState(false);

  const getRequiredVolume = useCallback(() => {
    return ryby.reduce(
      (sum, fish) => sum + (fish.level.toLowerCase() === "mala" ? 10 : 20),
      0
    );
  }, [ryby]);

  const getAquariumVolume = useCallback(() => {
    const { width, height, length } = dimensions;
    return width * height * length;
  }, [dimensions]);

  const smallFishCount = useCallback(
    () => ryby.filter((fish) => fish.level.toLowerCase() === "mala").length,
    [ryby]
  );

  const bigFishCount = useCallback(
    () => ryby.filter((fish) => fish.level.toLowerCase() === "velka").length,
    [ryby]
  );

  const evaluateApproval = useCallback(() => {
    const availableVolume = getAquariumVolume();
    const neededVolume = getRequiredVolume();
    setApproved(availableVolume >= neededVolume && availableVolume > 0);
  }, [getAquariumVolume, getRequiredVolume]);

  useEffect(() => {
    evaluateApproval();
  }, [dimensions, evaluateApproval]);

  const handleSubmit = () => {
    if (approved) {
      alert("Akvárium má dostatečný objem.");
      resetDimensions();
    }
  };

  const resetDimensions = () => {
    setDimensions({ width: "", height: "", length: "" });
    setApproved(false);
  };

  return (
    <div className="aquarium-container">
      <div className="info-box text-center border rounded pb-2">
        <h3 className="pt-3" style={{ fontSize: "1.25rem" }}>
          Požadavky na ryby
        </h3>
        <p style={{ fontSize: "0.875rem" }}>Malá ryba: 10 litrů</p>
        <p style={{ fontSize: "0.875rem" }}>Velká ryba: 20 litrů</p>
      </div>

      <h2 className="text-center" style={{ fontSize: "1.5rem" }}>
        Plán akvária
      </h2>

      <div className="info-box mb-3 border rounded">
        <h3 className="text-center pt-3" style={{ fontSize: "1.25rem" }}>
          Počet ryb
        </h3>
        <p className="text-center" style={{ fontSize: "0.875rem" }}>
          Malé ryby: {smallFishCount()}
        </p>
        <p className="text-center" style={{ fontSize: "0.875rem" }}>
          Velké ryby: {bigFishCount()}
        </p>
      </div>

      <div className="aquarium-form row justify-content-center align-items-center">
        {["width", "height", "length"].map((dim, index) => (
          <div className="col-md-3 mb-2" key={index}>
            <input
              type="number"
              min="0"
              placeholder={`${dim.charAt(0).toUpperCase() + dim.slice(1)} (dm)`}
              value={dimensions[dim]}
              onChange={(e) =>
                setDimensions({ ...dimensions, [dim]: e.target.value })
              }
              className="form-control"
            />
          </div>
        ))}
        <div className="col-md-3 mb-2">
          <button
            className="btn btn-primary w-100"
            onClick={handleSubmit}
            disabled={!approved}
            style={{ backgroundColor: approved ? "green" : "red" }}
          >
            Vyzkoušet rozměry
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
