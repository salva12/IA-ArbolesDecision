import React, { Fragment } from 'react';

const Attribute = ({ id, attribute, onEditName, onEditValue, onAddValue, onDeleteValue, onDeleteAttribute }) => {
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
          <Fragment key={idx}>
            <input
              type="text"
              placeholder={`Valor ${idx + 1}`}
              value={value}
              onChange={e => onEditValue(id, idx, e.target.value)}
            />
            <button
              disabled={attribute.values.length <= 2}
              title={attribute.values.length <= 2 && "El atributo debe tener 2 valores como mínimo"}
              onClick={() => onDeleteValue(id, idx)}
              style={{ marginRight: '16px' }}
            >
              X
            </button>
          </Fragment>
        ))}
        <button onClick={() => onAddValue(id)}>
          + Nuevo valor
        </button>
      </div>
    </div>
  )
};

export default Attribute;
