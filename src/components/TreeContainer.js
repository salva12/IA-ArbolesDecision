import React from 'react';

const TreeContainer = props => {
  return (
    <div
      className="card box"
      style={{ width: props.wide ? '100%' : 'calc(50% - 8px)' }}
    >
      <h5 className="title is-5" style={{ textAlign: 'center' }}>
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
