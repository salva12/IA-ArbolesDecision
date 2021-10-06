import React from "react"
import Tree from "./../components/Tree"

const Data = ({ attributes, data, setData }) => {
  const onAddRow = () => {
    const newRow = {}
    attributes.forEach((attr) => {
      newRow[attr.label] = ""
    })
    setData([...data, newRow])
  }

  const onEditRow = (value, index, attribute) => {
    const newData = [...data];
    newData.splice(index, 1, {
      ...data[index],
      [attribute]: value
    });
    setData(newData);
  };

  const onDeleteRow = (index) => {
    const newData = data.filter((_d, idx) => idx !== index)
    setData(newData)
  }

  return (
    <div>
      <table style={{ border: "1px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black" }}>ID</th>
            {attributes.map((attr, idx) => (
              <th key={idx} style={{ border: "1px solid black" }}>
                {attr.label}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((d, dataIdx) => (
            <tr key={dataIdx}>
              <td style={{ border: "1px solid black" }}>{dataIdx + 1}</td>
              {attributes.map((attr, attrIdx) => (
                <td key={attrIdx} style={{ border: "1px solid black" }}>
                  <select
                    value={d[attr.label]}
                    onChange={e => onEditRow(e.target.value, dataIdx, attr.label)}
                  >
                    <option value="">Indefinido</option>
                    {attr.values.map((val, valueIdx) => (
                      <option key={valueIdx} value={val}>
                        {val}
                      </option>
                    ))}
                  </select>
                  {d[attr]}
                </td>
              ))}
              <td style={{ border: "1px solid black" }}>
                <button onClick={() => onDeleteRow(dataIdx)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button is-primary" onClick={onAddRow}>
        + Nuevo registro de datos
      </button>
      {/* <Tree /> */}
    </div>
  )
}

export default Data
