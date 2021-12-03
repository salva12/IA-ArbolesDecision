import React from 'react';

const DataTable = ({ attributes, data, onEditRow, onDeleteRow, hasDeleteAndUseInTest }) => (
  <table className="table is-striped is-fullwidth">
    <thead>
      <tr>
        <th>ID</th>
        {attributes.map((attr, idx) => (
          <th key={idx}>{attr.label}</th>
        ))}
        {hasDeleteAndUseInTest && (
          <>
            <th
              data-tip={`
                <div>
                  Marque las casillas de los datos que quiere usar en el conjunto de test.
                  <br />
                  Los demás serán usados en el conjunto de entrenamiento.
                  <br />
                  Puede dejar ninguna casilla sin marcar, pero no puede marcar todas.
                </div>
              `}
              data-html
            >
              Usar en el conjunto de test
            </th>
            <th />
          </>
        )}
      </tr>
    </thead>
    <tbody>
      {data.length === 0 && (
        <tr>
          <td
            colSpan={attributes.length + 3}
            style={{ textAlign: "center" }}
            class="notification has-text-weight-semibold"
          >
            No hay registros de datos
          </td>
        </tr>
      )}
      {data.map((d, dataIdx) => (
        <tr key={dataIdx}>
          <td>{dataIdx + 1}</td>
          {attributes.map((attr, attrIdx) => (
            <td key={attrIdx}>
              <div className="select is-small">
                <select
                  value={d[attr.label]}
                  onChange={(e) =>
                    onEditRow(e.target.value, dataIdx, attr.label)
                  }
                >
                  <option
                    disabled={attrIdx === attributes.length - 1}
                    value=""
                  >
                    Sin valor
                  </option>
                  {attr.values.map((val, valueIdx) => (
                    <option key={valueIdx} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </div>
              {d[attr]}
            </td>
          ))}
          {hasDeleteAndUseInTest && (
            <>
              <td>
                <input
                  type="checkbox"
                  checked={d.useInTestSet}
                  onChange={e => onEditRow(e.target.checked, dataIdx, 'useInTestSet')}
                />
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => onDeleteRow(dataIdx)}
                  data-tip="Eliminar registro"
                />
              </td>
            </>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default DataTable;
