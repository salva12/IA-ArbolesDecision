import React from 'react';

const Attribute = ({ attribute, onEditName, onEditValue, onAddValue }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', border: '1px solid black' }}>
      <div style={{ padding: '16px', borderRight: '1px solid black' }}>
        <input
          type="text"
          placeholder="Nombre del atributo"
          value={attribute.label}
          onChange={onEditName}
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
