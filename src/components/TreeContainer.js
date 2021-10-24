import React from 'react';

const TreeContainer = props => {
  return (
    <div style={{ maxWidth: '50%' }}>
      <h5 className="title is-5">
        {props.impurityFunction === 'gain'
          ? 'Utilizando ganancia de información'
          : props.impurityFunction === 'gainRatio'
          ? 'Utilizando tasa de ganancia de información'
          : ''
        }
      </h5>
      {props.children}
    </div>
  )
};

export default TreeContainer;
