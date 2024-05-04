import React, { useState } from 'react';

function RangeSelector() {
  const [value, setValue] = useState(50);

  return (
    <form>
      <div className="mb-3">
        <label htmlFor="customRange1" className="form-label">Exemple de curseur</label>
        <input type="range" className="form-range" id="customRange1" min="0" max="100" value={value} onChange={e => setValue(e.target.value)} />
        <span>{value}</span>
      </div>
      <button type="submit" className="btn btn-primary">Soumettre</button>
    </form>
  );
}

export default RangeSelector;
