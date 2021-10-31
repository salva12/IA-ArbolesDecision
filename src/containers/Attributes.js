import React from "react";
import Attribute from "../components/Attribute";
import { ATTRIBUTE_TEMPLATE } from "../utils/constants";
import { ReactComponent as Plus } from '../assets/plus-solid.svg';

const Attributes = ({ attributes, setAttributes, data, setData }) => {
  // function for adding an attribute
  const onAddAttribute = () => {
    setAttributes([...attributes, ATTRIBUTE_TEMPLATE]);
  };

  // function for editing an attribute
  const onEditName = (index, newName) => {
    // get the name of the attribute
    const oldAttributeName = attributes[index].label;
    // spread the attributes array to avoid mutating props
    const newAttributes = [...attributes];
    // replace the target attribute with a copy of it with the new name
    newAttributes.splice(index, 1, {
      ...attributes[index],
      label: newName,
    });
    // update the attributes state
    setAttributes(newAttributes);
    // in the data array, replace every old-named key with the new name
    setData(data.map(d => {
      const newD = {
        ...d,
        [newName]: d[oldAttributeName]
      };
      delete newD[oldAttributeName];
      return newD;
    }));
  };

  // function for editing an attribute's value
  const onEditValue = (index, valueIndex, newValue) => {
    // get the name of the attribute whose value will be changed
    const attributeWithChangedValue = attributes[index].label;
    // get the old name of the value to be changed
    const changedValue = attributes[index].values[valueIndex];
    // spread the attributes array to avoid mutating props
    const newAttributes = [...attributes];
    // spread the values array of the attribute
    const newValues = [...attributes[index].values];
    // remove the old value and replace it with the new one
    newValues.splice(valueIndex, 1, newValue);
    // replace the attribute with a copy of it with the updated values
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: newValues,
    });
    // update the attributes state
    setAttributes(newAttributes);
    // in the data array, replace the changed value with the new one
    setData(data.map(d => {
      const newD = { ...d };
      if (newD[attributeWithChangedValue] === changedValue) {
        newD[attributeWithChangedValue] = newValue;
      }
      return newD;
    }));
  };

  // function for adding a new value to an attribute
  const onAddValue = index => {
    // spread the attributes array to avoid mutating props
    const newAttributes = [...attributes];
    // replace the attribute with a copy of it with a new empty value
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: [...attributes[index].values, ''],
    });
    // update the attributes state
    setAttributes(newAttributes);
  };

  // function for deleting a value
  const onDeleteValue = (index, valueIndex) => {
    // get the label of the attribute
    const attributeWithDeletedValue = attributes[index].label;
    // get the value that will be deleted
    const deletedValue = attributes[index].values[valueIndex];
    // spread the attributes array to avoid mutating props
    const newAttributes = [...attributes];
    // replace the attribute with a copy of it without the deleted value
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: attributes[index].values.filter((_v, i) => i !== valueIndex),
    });
    // update the attributes state
    setAttributes(newAttributes);
    // in the data array, replace all the ocurrences of the deleted value with an empty string
    setData(data.map(d => {
      const newD = { ...d };
      if (newD[attributeWithDeletedValue] === deletedValue) {
        newD[attributeWithDeletedValue] = '';
      }
      return newD;
    }));
  };

  // function for deleting an attribute
  const onDeleteAttribute = index => {
    // get the name of the attribute that will be deleted
    const deletedAttributeName = attributes[index].label;
    // filter the attributes array excluding the deleted attribute
    const newAttributes = attributes.filter((_a, i) => i !== index);
    // update the attributes state
    setAttributes(newAttributes);
    // in the data array, delete all the properties of this attribute
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
