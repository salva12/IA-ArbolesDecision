import React from 'react';

const Data = ({ attributes, data, setData }) => {
  const onAddRow = () => {
    const newRow = {};
    attributes.forEach(attr => {
      newRow[attr.label] = ''
    });
    setData([
      ...data,
      newRow
    ]);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {attributes.map((attr, idx) => <th key={idx}>{attr.label}</th>)}
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              {attributes.map((attr, idx) => (
                <td key={idx}>
                  <select value={d[attr]}>
                    <option value="">Indefinido</option>
                    {attr.values.map((val, idx) => (
                      <option key={idx} value={val}>{val}</option>
                    ))}
                  </select>
                  {d[attr]}
                </td>
              ))}
              <td>
                <button>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onAddRow}>+ Nuevo registro de datos</button>
    </div>
  )
};

export default Data;
