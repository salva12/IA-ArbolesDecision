import React, { useState } from 'react';
import Tree from '../components/Tree';

const Results = ({ attributes, data }) => {
  const [impurityFunction, setImpurityFunction] = useState('gain');
  const [expansion, setExpansion] = useState('complete');

  const onImpurityFunctionChange = event => {
    setImpurityFunction(event.target.value);
  };

  const onExpansionChange = event => {
    setExpansion(event.target.value);
  };

  return (
    <div>
      <h2 className="title is-2">Resultados</h2>
      <div className="columns">
        <div className="column">
          <h4 className="title is-4">Función de impureza</h4>
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="impurityFunction"
                value="gain"
                checked={impurityFunction === 'gain'}
                onChange={onImpurityFunctionChange}
              />
              Ganancia
            </label>
            <label className="radio">
              <input
                type="radio"
                name="impurityFunction"
                value="gainRatio"
                checked={impurityFunction === 'gainRatio'}
                onChange={onImpurityFunctionChange}
              />
              Tasa de Ganancia
            </label>
            <label className="radio">
              <input
                type="radio"
                name="impurityFunction"
                value="both"
                checked={impurityFunction === 'both'}
                onChange={onImpurityFunctionChange}
              />
              Ambos
            </label>
          </div>
        </div>
        <div className="column">
          <h4 className="title is-4">Expansión</h4>
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="expansion"
                value="complete"
                checked={expansion === 'complete'}
                onChange={onExpansionChange}
              />
              Completa
            </label>
            <label className="radio">
              <input
                type="radio"
                name="execution"
                value="stepByStep"
                checked={expansion === 'stepByStep'}
                onChange={onExpansionChange}
              />
              Paso a paso
            </label>
          </div>
        </div>
      </div>
      <Tree attributes={attributes} data={data} />
    </div>
  );
};

export default Results;
