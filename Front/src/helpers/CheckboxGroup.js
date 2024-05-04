import React from 'react';

function CheckboxGroup({ title, checkboxes }) {
  return (
    <div>
      <h2>{title}</h2>
      <form>
        {checkboxes.map(checkbox => (
          <div key={checkbox.id} className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id={checkbox.id} />
            <label className="form-check-label" htmlFor={checkbox.id}>{checkbox.label}</label>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Soumettre</button>
      </form>
    </div>
  );
}

export default CheckboxGroup;
