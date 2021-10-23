import React from 'react';
import { ReactComponent as Plus } from '../assets/plus-solid.svg';

const Attribute = ({
  id,
  attribute,
  isClass,
  onEditName,
  onEditValue,
  onAddValue,
  onDeleteValue,
  onDeleteAttribute,
}) => {
  return (
    <div className="tile is-parent">
      <div className="tile is-child box is-primary is-2">
        <input
          type="text"
          className="input"
          placeholder="Nombre del atributo"
          value={attribute.label}
          onChange={(e) => onEditName(id, e.target.value)}
        />
      </div>

      <div className="tile is-child box columns" style={{ flexWrap: 'wrap' }}>
        {attribute.values.map((value, idx) => (
          <div
            key={idx}
            className="column is-one-quarter"
            style={{ display: 'flex', height: 'fit-content', alignItems: "center" }}
          >
            <input
              type="text"
              className="input is-small"
              placeholder={`Valor ${idx + 1}`}
              value={value}
              onChange={(e) => onEditValue(id, idx, e.target.value)}
            />
            <span
              data-tip={
                attribute.values.length <= 2
                  ? 'No se puede eliminar. El atributo debe tener 2 valores como mínimo'
                  : 'Eliminar valor'
              }
            >
              <button
                disabled={attribute.values.length <= 2}
                onClick={() => onDeleteValue(id, idx)}
                className="delete is-medium"
              />
            </span>
          </div>
        ))}
        <div className="column is-one-quarter">
          <span data-tip={isClass ? 'La clase sólo puede tener dos valores' : ''}>
            <button
              className="button is-small"
              disabled={isClass}
              onClick={() => onAddValue(id)}
            >
              <span className="icon">
                <Plus width={8} height={8} />
              </span>
              <span>Nuevo valor</span>
            </button>
          </span>
        </div>
      </div>

      <div className="tile is-child box is-2">
        <button className="button is-danger is-small" onClick={() => onDeleteAttribute(id)}>
          Eliminar atributo
        </button>
      </div>
    </div>
  )
}

export default Attribute
