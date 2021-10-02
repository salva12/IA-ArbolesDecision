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

  return (
    <div>
      {attributes.map((attr, idx) => (
        <Attribute key={idx} attribute={attr} />
      ))}
      <button onClick={onAddAttribute}>
        + Nuevo atributo
      </button>
    </div>
  );
};

export default Attributes;