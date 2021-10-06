import React from "react"

const Attribute = ({
  id,
  attribute,
  onEditName,
  onEditValue,
  onAddValue,
  onDeleteValue,
  onDeleteAttribute,
}) => {
  return (
    <div className="tile is-parent">
      <div className="tile is-child notification is-primary is-2">
        <input
          type="text"
          className="input"
          placeholder="Nombre del atributo"
          value={attribute.label}
          onChange={(e) => onEditName(id, e.target.value)}
        />
      </div>
      <div className="tile is-child notification">
        {attribute.values.map((value, idx) => (
          <div key={idx} style={{ display: 'flex', height: 'fit-content', alignItems: "center" }}>
            <input
              type="text"
              className="input is-small"
              placeholder={`Valor ${idx + 1}`}
              value={value}
              onChange={(e) => onEditValue(id, idx, e.target.value)}
            />
            <button
              disabled={attribute.values.length <= 2}
              title={
                attribute.values.length <= 2
                  ? "El atributo debe tener 2 valores como mínimo"
                  : undefined
              }
              onClick={() => onDeleteValue(id, idx)}
              style={{ marginRight: "16px" }}
              className="delete"
            >
              X
            </button>
          </div>
        ))}
        <button className="button is-small" onClick={() => onAddValue(id)}>
          + Nuevo valor
        </button>
      </div>
      <div className="tile is-child notification is-2">
        <button className="button is-danger is-small" onClick={() => onDeleteAttribute(id)}>
          Eliminar atributo
        </button>
      </div>
    </div>
  )
}

export default Attribute
