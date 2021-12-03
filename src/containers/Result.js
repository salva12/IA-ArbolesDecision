import React, { useState } from 'react';
import { v4 } from 'uuid';
import DataTable from '../components/DataTable.js';
import StepByStep from '../components/StepByStep.js';
import Tree from '../components/Tree';
import TreeContainer from '../components/TreeContainer';
import c45gain from '../utils/c45';
import classify from '../utils/classify';
import { EMPTY_TREE } from '../utils/constants';

const Results = ({ attributes, data }) => {
  // la funcion de impureza (gain o gainRatio, ganancia o tasa de ganancia)
  const [impurityFunction, setImpurityFunction] = useState('gain');
  // el metodo de expansion (complete o stepByStep, completo o paso a paso)
  const [expansion, setExpansion] = useState('complete');
  // el umbral (de 0 a 1)
  const [threshold, setThreshold] = useState(0);
  // los resultados obtenidos usando la ganancia
  const [gainResults, setGainResults] = useState(EMPTY_TREE);
  // los resultados obtenidos usando la tasa de ganancia
  const [gainRatioResults, setGainRatioResults] = useState(EMPTY_TREE);
  // los resultados obtenidos usando expansion paso a paso
  const [stepByStepResults, setStepByStepResults] = useState([]);
  // la key usada para evitar los errores 'duplicated key' en vis.js
  const [key, setKey] = useState(v4());
  // la nueva instancia que se quiere clasificar
  const [newInstance, setNewInstance] = useState({});
  // la clasificacion hecha usando ganancia
  const [gainClassification, setGainClassification] = useState('');
  // la clasificacion hecha usando tasa de ganancia
  const [gainRatioClassification, setGainRatioClassification] = useState('');

  // funcion para resetear los resultados
  // aca no creo que tenga que agregar un comentario por cada linea
  const emptyResults = () => {
    setGainResults(EMPTY_TREE);
    setGainRatioResults(EMPTY_TREE);
    setStepByStepResults([]);
  };

  // funcion para cambiar la funcion de impureza con el radio button
  const onImpurityFunctionChange = event => {
    setImpurityFunction(event.target.value);
    emptyResults();
  };

  // funcion para cambiar el metodo de expansion con el radio button
  const onExpansionChange = event => {;
    setExpansion(event.target.value);
    emptyResults();
  };

  // funcion para cambiar el umbral con el input
  const onThresholdChange = event => {
    const value = event.target.value;
    // si el usuario mete un valor > 1, guardar un 1
    // si el usuario mete un valor < 0, guardar un 0
    // porque el umbral no puede estar fuera de ese rango
    if (value > 1) {
      setThreshold(1);
    } else if (value < 0) {
      setThreshold(0);
    } else {
      setThreshold(value);
    }
  };

  // funcion para ejecutar el algoritmo c4.5
  const onRun = () => {
    // extraer los labels de cada atributo
    const atributos = attributes.map(a => a.label);
    // sacar la clase (el ultimo atributo) del array de atributos, y guardarla en otra constante
    const clase = atributos.pop();
    // crear objetos donde se van a almacenar los arboles
    const gainTree = { nodes: [], edges: [] };
    const gainRatioTree = { nodes: [], edges: [] };
    const gainTreeStepByStep = { nodes: [], edges: [] };
    const gainRatioTreeStepByStep = { nodes: [], edges: [] };
    // ejecutar el algoritmo y guardar los resultados en el estado
    if (impurityFunction === "gain" || impurityFunction === "both") {
      c45gain(data, atributos, gainTree, clase, threshold, "gain");
      setGainResults(gainTree);
    }
    if (impurityFunction === "gainRatio" || impurityFunction === "both") {
      c45gain(data, atributos, gainRatioTree, clase, threshold, "gainRatio");
      setGainRatioResults(gainRatioTree);
    }
    if (impurityFunction === "gain" && expansion === "stepByStep") {
      const steps = [];
      c45gain(data, atributos, gainTreeStepByStep, clase, threshold, "gain", steps);
      setStepByStepResults(steps);
    }
    if (impurityFunction === "gainRatio" && expansion === "stepByStep") {
      const steps = [];
      c45gain(
        data,
        atributos,
        gainRatioTreeStepByStep,
        clase,
        threshold,
        "gainRatio",
        steps
      );
      setStepByStepResults(steps);
    }
    // generar una nueva key para evitar errores de id duplicados en vis.js
    // ver https://github.com/crubier/react-graph-vis/issues/92
    setKey(v4());
  }

  // funcion para editar la nueva instancia
  const onEditNewInstance = (value, _index, attribute) => {
    setNewInstance({
      ...newInstance,
      [attribute]: value
    });
  };

  // funcion para clasificar la nueva instancia
  const onClassifyNewInstance = () => {
    switch (impurityFunction) {
      case 'gain':
        setGainClassification(classify(gainResults, newInstance));
        break;
      case 'gainRatio':
        setGainRatioClassification(classify(gainRatioResults, newInstance));
        break;
      case 'both':
        setGainClassification(classify(gainResults, newInstance));
        setGainRatioClassification(classify(gainRatioResults, newInstance));
        break;
      default:
    }
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
                checked={impurityFunction === "gain"}
                onChange={onImpurityFunctionChange}
              />
              Ganancia
            </label>
            <label className="radio">
              <input
                type="radio"
                name="impurityFunction"
                value="gainRatio"
                checked={impurityFunction === "gainRatio"}
                onChange={onImpurityFunctionChange}
              />
              Tasa de Ganancia
            </label>
            <label className="radio">
              <input
                type="radio"
                name="impurityFunction"
                value="both"
                checked={impurityFunction === "both"}
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
                checked={expansion === "complete"}
                onChange={onExpansionChange}
              />
              Completa
            </label>
            <label className="radio">
              <input
                type="radio"
                name="execution"
                value="stepByStep"
                checked={expansion === "stepByStep"}
                onChange={onExpansionChange}
                disabled={impurityFunction === "both"}
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent:
            impurityFunction === "both" ? "space-between" : "center",
          alignItems: "flex-start",
          marginTop: "20px",
          width: '90vw', // una solucion "quick and dirty" para hacer mas ancho el area del arbol
          transform: 'translateX(-220px)' // porque no tengo ganas de romper todo el layout por un solo div
        }}
      >
        {expansion === "complete" && (
          <>
            {impurityFunction !== "gainRatio" && (
              <TreeContainer
                impurityFunction="gain"
                wide={impurityFunction !== "both"}
              >
                <Tree tree={gainResults} keyForAvoidingErrors={key} />
              </TreeContainer>
            )}
            {impurityFunction !== "gain" && (
              <TreeContainer
                impurityFunction="gainRatio"
                wide={impurityFunction !== "both"}
              >
                <Tree tree={gainRatioResults} keyForAvoidingErrors={key} />
              </TreeContainer>
            )}
          </>
        )}
      </div>
      <div className="section">
        <h4 className="title is-4">Clasificar nueva instancia</h4>
        <div className="table-container">
          <DataTable attributes={attributes} data={[newInstance]} onEditRow={onEditNewInstance} />
        </div>
        <div className="center">
          <button className="button is-primary" onClick={onClassifyNewInstance}>
            Clasificar
          </button>
        </div>
        {gainClassification && (
          <div>
            Usando la ganancia, la nueva instancia es de clase {gainClassification}.
          </div>
        )}
        {gainRatioClassification && (
          <div>
            Usando la tasa de ganancia, la nueva instancia es de clase {gainRatioClassification}.
          </div>
        )}
      </div>
      {expansion === "stepByStep" && (
        <StepByStep
          steps={stepByStepResults}
          impurityFunction={impurityFunction}
          keyForAvoidingErrors={key}
        />
      )}
    </div>
  );
};

export default Results;
