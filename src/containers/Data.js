import React from "react"
import { ReactComponent as Plus } from "../assets/plus-solid.svg"
import DataTable from "../components/DataTable";

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
        <DataTable
          attributes={attributes}
          data={data}
          onEditRow={onEditRow}
          onDeleteRow={onDeleteRow}
          hasDeleteAndUseInTest
        />
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
