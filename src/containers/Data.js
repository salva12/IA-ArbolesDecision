import React from "react"
import { ReactComponent as Plus } from "../assets/plus-solid.svg"

const Data = ({ attributes, data, setData }) => {
  const onAddRow = () => {
    const newRow = {}
    attributes.forEach((attr) => {
      newRow[attr.label] = ""
    })
    setData([...data, newRow])
  }

  const onEditRow = (value, index, attribute) => {
    const newData = [...data]
    newData.splice(index, 1, {
      ...data[index],
      [attribute]: value,
    })
    setData(newData)
  }

  const onDeleteRow = (index) => {
    const newData = data.filter((_d, idx) => idx !== index)
    setData(newData)
  }

  return (
    <div>
      <h2 className="title is-2">Conjunto de datos</h2>
      <div class="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              {attributes.map((attr, idx) => (
                <th key={idx}>{attr.label}</th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={attributes.length + 2}
                  style={{ textAlign: "center" }}
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
                <td>
                  <button
                    className="delete"
                    onClick={() => onDeleteRow(dataIdx)}
                    data-tip="Eliminar registro"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="section center">
        <button className="button is-primary" onClick={onAddRow}>
          <span className="icon">
            <Plus width={16} height={16} />
          </span>
          <span>Nuevo registro de datos</span>
        </button>
      </div>
    </div>
  )
}

export default Data
