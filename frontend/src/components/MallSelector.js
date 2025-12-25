import React from 'react';
import './MallSelector.css';

function MallSelector({ value, onChange, malls, loading }) {
  if (loading) {
    return (
      <div className="mall-selector">
        <label className="selector-label">Shopping Mall</label>
        <div className="mall-select-loading">Loading malls...</div>
      </div>
    );
  }

  if (!malls || malls.length === 0) {
    return (
      <div className="mall-selector">
        <label className="selector-label">Shopping Mall</label>
        <div className="mall-select-error">No malls available</div>
      </div>
    );
  }

  return (
    <div className="mall-selector">
      <label className="selector-label">🏬 Shopping Mall</label>
      <select
        className="mall-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {malls.map((mall) => (
          <option key={mall.id} value={mall.id}>
            {mall.display_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MallSelector;

