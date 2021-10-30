import React from "react";
import Attribute from "../components/Attribute";
import { ATTRIBUTE_TEMPLATE } from "../utils/constants";
import { ReactComponent as Plus } from '../assets/plus-solid.svg';

const Attributes = ({ attributes, setAttributes, data, setData }) => {
  const onAddAttribute = () => {
    setAttributes([...attributes, ATTRIBUTE_TEMPLATE]);
  };

  const onEditName = (index, newName) => {
    const oldAttributeName = attributes[index].label;
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1, {
      ...attributes[index],
      label: newName,
    });
    setAttributes(newAttributes);
    setData(data.map(d => {
      const newD = {
        ...d,
        [newName]: d[oldAttributeName]
      };
      delete newD[oldAttributeName];
      return newD;
    }));
  };

  const onEditValue = (index, valueIndex, newValue) => {
    const attributeWithChangedValue = attributes[index].label;
    const changedValue = attributes[index].values[valueIndex];
    const newAttributes = [...attributes];
    const newValues = [...attributes[index].values];
    newValues.splice(valueIndex, 1, newValue);
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: newValues,
    });
    setAttributes(newAttributes);
    setData(data.map(d => {
      const newD = { ...d };
      if (newD[attributeWithChangedValue] === changedValue) {
        newD[attributeWithChangedValue] = newValue;
      }
      return newD;
    }));
  };

  const onAddValue = index => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: [...attributes[index].values, ""],
    });
    setAttributes(newAttributes);
  };

  const onDeleteValue = (index, valueIndex) => {
    const attributeWithDeletedValue = attributes[index].label;
    const deletedValue = attributes[index].values[valueIndex];
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: attributes[index].values.filter((_v, i) => i !== valueIndex),
    });
    setAttributes(newAttributes);
    setData(data.map(d => {
      const newD = { ...d };
      if (newD[attributeWithDeletedValue] === deletedValue) {
        newD[attributeWithDeletedValue] = '';
      }
      return newD;
    }));
  };

  const onDeleteAttribute = index => {
    const deletedAttributeName = attributes[index].label;
    const newAttributes = attributes.filter((_a, i) => i !== index);
    setAttributes(newAttributes);
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
