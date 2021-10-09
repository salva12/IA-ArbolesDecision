import React from "react"

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
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            {attributes.map((attr, idx) => (
              <th key={idx}>
                {attr.label}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((d, dataIdx) => (
            <tr key={dataIdx}>
              <td>{dataIdx + 1}</td>
              {attributes.map((attr, attrIdx) => (
                <td key={attrIdx}>
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
              <td>
                <button className="delete" onClick={() => onDeleteRow(dataIdx)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button is-primary" onClick={onAddRow}>
        + Nuevo registro de datos
      </button>
    </div>
  )
}

export default Data
