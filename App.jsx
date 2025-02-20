import { useState } from "react";
import RybyList from "./components/RybyList/RybyList";
import RybyForm from "./components/RybyForm/RybyForm";
import rawData from "./RybyData.json";
import Toggler from "./components/Toggler/Toggler";
import TaskManagement from "./components/TaskManagement/TaskManagement";
import "./App.css";

const App = () => {
  const defaultPeople = rawData.ryby?.length ? rawData.ryby : [];

  const [RybyRecords, setPersonRecords] = useState(defaultPeople);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [activeSection, setActiveSection] = useState(1);

  const [newPersonInfo, setNewPersonInfo] = useState({
    id: RybyRecords.length ? Math.max(...RybyRecords.map((p) => p.id)) + 1 : 1,
    jmeno: "",
    druh: "",
    level: "",
  });

  const handlePersonRemoval = (id) => {
    setPersonRecords((prevRecords) =>
      prevRecords.filter((person) => person.id !== id)
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedInfo = { ...newPersonInfo, [name]: value };
    setNewPersonInfo(updatedInfo);
    validateForm(updatedInfo);
  };

  const validateForm = ({ jmeno, druh, level }) => {
    setIsFormComplete(!!(jmeno && druh && level));
  };

  const handlePersonAddition = () => {
    setPersonRecords((prevRecords) => [...prevRecords, newPersonInfo]);
    setNewPersonInfo({
      id: newPersonInfo.id + 1,
      jmeno: "",
      druh: "",
      level: "",
    });
    setIsFormComplete(false);
  };

  const switchTab = (tabName) => {
    setActiveSection(tabName === "list-of-ryby" ? 1 : 2);
  };

  return (
    <div className="main-container">
      <div className="toggle-container">
        <h1 className="text-center pb-3">Akvarium</h1>
        <h4 className="text-center">přehled ryb</h4>
        <Toggler onChoose={switchTab} active={activeSection} />
      </div>
      <div className="content-container">
        {activeSection === 1 ? (
          <div className="container">
            <RybyList data={RybyRecords} onDelete={handlePersonRemoval} />
            <RybyForm
              jmeno={newPersonInfo.jmeno}
              druh={newPersonInfo.druh}
              level={newPersonInfo.level}
              valid={isFormComplete}
              onChange={handleInputChange}
              onAdd={handlePersonAddition}
            />
          </div>
        ) : (
          <div className="container">
            <TaskManagement ryby={RybyRecords} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
