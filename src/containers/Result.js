import React, { useState } from 'react';
import Tree from '../components/Tree';
import c45gain from '../utils/c45Gain';
 
const Results = ({ attributes, data }) => {
  const [impurityFunction, setImpurityFunction] = useState('gain');
  const [expansion, setExpansion] = useState('complete');
  const [threshold, setThreshold] = useState(0);
  const [results, setResults] = useState({ nodes: [], edges: [] });

  const onImpurityFunctionChange = event => {
    setImpurityFunction(event.target.value);
  };

  const onExpansionChange = event => {
    setExpansion(event.target.value);
  };

  const onThresholdChange = event => {
    const value = event.target.value;
    if (value > 1) {
      setThreshold(1);
    } else if (value < 0) {
      setThreshold(0);
    } else {
      setThreshold(event.target.value);
    }
  };

  const onRun = () => {
    const atributos = attributes.map(a => a.label);
    const clase = atributos.pop();
    const tree = { nodes: [], edges: [] }
    console.log(atributos)
    console.log(clase)
    // ACA SEGUN QUE ELIJA EL USUARIO EN EL RADIO BUTTON HAY QUE LLAMAR A GAIN O GAINRATIO
    console.log(data)
    c45gain(data,atributos,tree,clase)
    setResults(tree)
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
        <div className="column">
          <h4 className="title is-4">Umbral</h4>
          <input
            type="number"
            className="input"
            min={0}
            max={1}
            step={0.01}
            value={threshold}
            onChange={onThresholdChange}
          />
        </div>
      </div>
      <div className="center">
        <button className="button is-primary" onClick={onRun}>
          Ejecutar
        </button>
      </div>
      {/* ACA TENEMOS QUE VER CON LUCAS QUE ONDA COMO DIBUJAR */}
      {/* <Tree tree={results} /> */}
    </div>
  );
};

export default Results;
