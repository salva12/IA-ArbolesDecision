import React from "react"
import { ReactComponent as Plus } from "../assets/plus-solid.svg"

const Data = ({ attributes, data, setData }) => {
  // function for adding a new data example
  const onAddRow = () => {
    // create an empty object
    const newRow = {};
    // for each attribute, create an empty field in the new row
    attributes.forEach((attr) => {
      newRow[attr.label] = '';
    });
    // update the data state
    setData([...data, newRow]);
  };

  // function for editing a data example
  const onEditRow = (value, index, attribute) => {
    // spread the data array to avoid mutating props
    const newData = [...data];
    // replace the target row with a copy with the updated value
    newData.splice(index, 1, {
      ...data[index],
      [attribute]: value
    });
    // update the data state
    setData(newData);
  };

  // function for deleting a data example
  const onDeleteRow = index => {
    // filter the data array excluding the row to be deleted
    const newData = data.filter((_d, idx) => idx !== index);
    // update the data array
    setData(newData);
  };

  return (
    <div>
      <h2 className="title is-2">Conjunto de datos</h2>
      <div className="table-container">
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
                  class="notification has-text-weight-semibold	"
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
  );
};

export default Data;
