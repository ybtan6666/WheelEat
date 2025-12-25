import React from 'react';
import './DietarySelector.css';

const DIETARY_OPTIONS = [
  { value: 'any', label: 'Any' },
  { value: 'halal_pork_free', label: 'Halal & Pork Free' },
];

function DietarySelector({ value, onChange }) {
  return (
    <div className="dietary-selector">
      <label className="selector-label">Dietary Needs</label>
      <div className="dietary-options">
        {DIETARY_OPTIONS.map((option) => (
          <button
            key={option.value}
            className={`dietary-option ${value === option.value ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DietarySelector;
