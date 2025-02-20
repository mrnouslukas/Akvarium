import "./RybyForm.css";

const RybyForm = ({ jmeno, druh, level, valid, onChange, onAdd }) => {
  return (
    <div className="container d-flex justify-content-center">
      <div className="person-form">
        <h5 className="text-center pb-3">Přidat do akvaria</h5>
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              placeholder="Jmeno"
              name="jmeno"
              onChange={onChange}
              value={jmeno}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Druh"
              name="druh"
              onChange={onChange}
              value={druh}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <select
              aria-label="Vyber velikost ryby"
              className="form-select"
              name="level"
              value={level}
              onChange={onChange}
            >
              <option value="">Vyber velikost ryby:</option>
              <option value="mala">Malá ryba</option>
              <option value="velka">Velká ryba</option>
            </select>
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              disabled={!valid}
              onClick={onAdd}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RybyForm;
