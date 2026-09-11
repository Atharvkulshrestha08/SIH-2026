import React from 'react';

const MODELS = [
  { value: 'auto', label: 'Auto (Intent-Based Routing)' },
  { value: 'ai/qwen2.5:7B-Q4_K_M', label: 'ai/qwen2.5:7B-Q4_K_M (4.36 GiB - Active)' },
  { value: 'qwen2.5-coder:7b-instruct-q4_K_M', label: 'qwen2.5-coder:7b (Compatible)' },
];

export default function ModelSelector({ value, onChange }) {
  return (
    <div className="wb-model-select-wrap">
      <label className="wb-label" style={{ paddingLeft: 2, marginBottom: 6 }}>
        LOCAL MODEL ENGINE
      </label>
      <select
        className="wb-model-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {MODELS.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
