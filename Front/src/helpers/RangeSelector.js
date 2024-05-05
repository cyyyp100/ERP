import React, { useState } from 'react';

function RangeSelector() {
  const [value, setValue] = useState(50);

  return (
      <div className="mb-3">
        <label htmlFor="customRange1" className="form-label"></label>
        <input type="range" className="form-range" id="customRange1" min="0" max="100000" value={value} onChange={e => setValue(e.target.value)} />
        <span>{value}</span>
      </div>
  );
}

export default RangeSelector;
