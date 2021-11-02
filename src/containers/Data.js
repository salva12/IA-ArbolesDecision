import React from "react"
import { ReactComponent as Plus } from "../assets/plus-solid.svg"

const Data = ({ attributes, data, setData }) => {
  // funcion para agregar un nuevo dato
  const onAddRow = () => {
    // crear un objeto vacio
    const newRow = {};
    // para cada atributo, crear un campo vacio en el nuevo objeto
    attributes.forEach((attr) => {
      newRow[attr.label] = '';
    });
    // actualizar el estado de datos
    setData([...data, newRow]);
  };

  // funcion para editar un dato
  const onEditRow = (value, index, attribute) => {
    // hacer un spread del array de datos para no mutar un prop
    const newData = [...data];
    // reemplazar el dato objetivo con una copia suya con el nuevo valor
    newData.splice(index, 1, {
      ...data[index],
      [attribute]: value
    });
    // update the data state
    setData(newData);
  };

  // funcion para eliminar un dato
  const onDeleteRow = index => {
    // filtrar el array de datos excluyendo el dato a eliminar
    const newData = data.filter((_d, idx) => idx !== index);
    // actualizar el array de datos
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
