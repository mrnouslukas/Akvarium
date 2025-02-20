import "./Toggler.css"; // Keep this as is

const Toggler = ({ onChoose, active }) => {
  const handleClick = (e) => {
    onChoose(e.target.name);
  };

  return (
    <div className="container">
      <button
        className={`toggler-btn ${active === 1 ? "active" : ""}`}
        onClick={handleClick}
        name="list-of-ryby"
      >
        Seznam ryb v akvariu
      </button>
      <button
        className={`toggler-btn ${active === 2 ? "active" : ""}`}
        onClick={handleClick}
        name="tasks-management"
      >
        tabulka akvaria
      </button>
    </div>
  );
};

export default Toggler;
