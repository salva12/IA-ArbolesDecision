import React from "react";
import Attribute from "../components/Attribute";
import { ATTRIBUTE_TEMPLATE } from "../utils/constants";
import { ReactComponent as Plus } from '../assets/plus-solid.svg';

const Attributes = ({ attributes, setAttributes, data, setData }) => {
  // funcion para agregar un atributo
  const onAddAttribute = () => {
    setAttributes([...attributes, ATTRIBUTE_TEMPLATE]);
  };

  // funcion para editar un atributo
  const onEditName = (index, newName) => {
    // obtener el nombre del atributo
    const oldAttributeName = attributes[index].label;
    // hacer un spread de los atributos para no mutar un prop
    const newAttributes = [...attributes];
    // reemplazar el atributo objetivo con una copia suya con el nuevo nombre
    newAttributes.splice(index, 1, {
      ...attributes[index],
      label: newName,
    });
    // actualizar el estado de atributos
    setAttributes(newAttributes);
    // en el array de datos, reemplazar todas las key con el nombre viejo por el nombre nuevo
    setData(data.map(d => {
      const newD = {
        ...d,
        [newName]: d[oldAttributeName]
      };
      delete newD[oldAttributeName];
      return newD;
    }));
  };

  // funcion para editar un valor de un atributo
  const onEditValue = (index, valueIndex, newValue) => {
    // obtener el nombre del atributo al que se le va a cambiar un valor
    const attributeWithChangedValue = attributes[index].label;
    // obtener el valor que se va a cambiar
    const changedValue = attributes[index].values[valueIndex];
    // hacer un spread de los atributos para no mutar un prop
    const newAttributes = [...attributes];
    // hacer un spread de los valores del atributo
    const newValues = [...attributes[index].values];
    // reemplazar el valor viejo con el nuevo
    newValues.splice(valueIndex, 1, newValue);
    // reemplazar el atributo con una cpia suya con el valor actualizado
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: newValues,
    });
    // actualizar el estado de atributos
    setAttributes(newAttributes);
    // en el array de datos, reemplazar el valor cambiado con el nuevo
    setData(data.map(d => {
      const newD = { ...d };
      if (newD[attributeWithChangedValue] === changedValue) {
        newD[attributeWithChangedValue] = newValue;
      }
      return newD;
    }));
  };

  // funcion para agregar un nuevo valor a un atributo
  const onAddValue = index => {
    // hacer un spread de los atributos para no mutar un prop
    const newAttributes = [...attributes];
    // reemplazar el atributo con una copia suya con un nuevo valor vacio
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: [...attributes[index].values, ''],
    });
    // actualizar el estado de atributos
    setAttributes(newAttributes);
  };

  // funcion para eliminar un valor
  const onDeleteValue = (index, valueIndex) => {
    // obtener el nombre del atributo
    const attributeWithDeletedValue = attributes[index].label;
    // obtener el valor que se va a borrar
    const deletedValue = attributes[index].values[valueIndex];
    // hacer un spread de los atributos para no mutar un prop
    const newAttributes = [...attributes];
    // reemplazar el atributo con una copia suya pero sin el valor a eliminar
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: attributes[index].values.filter((_v, i) => i !== valueIndex),
    });
    // actualizar el estado de atributos
    setAttributes(newAttributes);
    // en el array de datos, reemplazar todas las ocurrencias del vaor borrado por strings vacios
    setData(data.map(d => {
      const newD = { ...d };
      if (newD[attributeWithDeletedValue] === deletedValue) {
        newD[attributeWithDeletedValue] = '';
      }
      return newD;
    }));
  };

  // funcion para eliminar un atributo
  const onDeleteAttribute = index => {
    // obtener el nombre de l atributo que se va a borrar
    const deletedAttributeName = attributes[index].label;
    // filtrar el array de atributos filtrando el atributo a eliminar
    const newAttributes = attributes.filter((_a, i) => i !== index);
    // actualizar el estado de atributos
    setAttributes(newAttributes);
    // en el array de datos, borrar todas las propiedades de ese atributo
    setData(data.map(d=> {
      const newD = { ...d };
      delete newD[deletedAttributeName];
      return newD;
    }));
  };

  return (
    <div>
      <h2 className="title is-2">Atributos</h2>
      <div className="tile is-ancestor is-vertical">
        {attributes.length === 0 && (
          <div className="center notification has-text-weight-semibold">
            No hay atributos. Cárguelos manualmente o importe un archivo CSV
          </div>
        )}
        {attributes.map((attr, idx) => (
          <Attribute
            key={idx}
            id={idx}
            attribute={attr}
            onEditName={onEditName}
            onEditValue={onEditValue}
            onAddValue={onAddValue}
            onDeleteValue={onDeleteValue}
            onDeleteAttribute={onDeleteAttribute}
          />
        ))}
        <div className="section center">
          <button className="button is-primary level-item" onClick={onAddAttribute}>
            <span className="icon">
              <Plus width={16} height={16} />
            </span>
            <span>
              Nuevo atributo
            </span>
          </button>
        </div>
      </div>
    </div>
  )
};

export default Attributes;
