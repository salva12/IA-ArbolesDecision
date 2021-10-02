import React from 'react';

const Attribute = ({ id, attribute, onEditName, onEditValue, onAddValue }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid black', marginBottom: '16px' }}>
      <div style={{ padding: '16px', borderRight: '1px solid black' }}>
        <input
          type="text"
          placeholder="Nombre del atributo"
          value={attribute.label}
          onChange={e => onEditName(id, e.target.value)}
        />
      </div>
      <div style={{ padding: '16px' }}>
        {attribute.values.map((value, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Valor ${idx + 1}`}
            value={value}
            onChange={onEditValue}
            style={{ marginRight: '16px' }}
          />
        ))}
        <button onClick={onAddValue}>
          + Nuevo valor
        </button>
      </div>
    </div>
  )
};

export default Attribute;
