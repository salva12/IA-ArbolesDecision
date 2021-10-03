import React, { useState } from 'react';
import Attribute from '../components/Attribute';
import { ATTRIBUTE_TEMPLATE } from '../utils/constants';

const Attributes = props => {
  const [attributes, setAttributes] = useState([]);

  const onAddAttribute = () => {
    setAttributes([
      ...attributes,
      ATTRIBUTE_TEMPLATE
    ]);
  };

  const onEditName = (index, newName) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1, {
      ...attributes[index],
      label: newName
    });
    setAttributes(newAttributes);
  };

  const onEditValue = (index, valueIndex, newValue) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1, {
      ...attributes[index],
      values: [...attributes[index].values].splice(valueIndex, 1, newValue)
    });
    setAttributes(newAttributes);
  };

  return (
    <div>
      {attributes.map((attr, idx) => (
        <Attribute
          key={idx}
          id={idx}
          attribute={attr}
          onEditName={onEditName}
          onEditValue={onEditValue}
        />
      ))}
      <button onClick={onAddAttribute}>
        + Nuevo atributo
      </button>
    </div>
  );
};

export default Attributes;