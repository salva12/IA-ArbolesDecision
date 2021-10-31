import React, { useState } from 'react';
import { v4 } from 'uuid';
import StepByStep from '../components/StepByStep.js';
import Tree from '../components/Tree';
import TreeContainer from '../components/TreeContainer';
import c45gain from '../utils/c45';
import { EMPTY_TREE } from '../utils/constants';

const Results = ({ attributes, data }) => {
  // the impurity function (gain or gainRatio)
  const [impurityFunction, setImpurityFunction] = useState('gain');
  // the expansion method (compete or stepByStep)
  const [expansion, setExpansion] = useState('complete');
  // the threshold (from 0 to 1)
  const [threshold, setThreshold] = useState(0);
  // the results obtained using the gain
  const [gainResults, setGainResults] = useState(EMPTY_TREE);
  // the results obtained using the gain ratio
  const [gainRatioResults, setGainRatioResults] = useState(EMPTY_TREE);
  // the results used with step by step expansion
  const [stepByStepResults, setStepByStepResults] = useState([]);
  // the key used to avoid 'duplicated key id' errors with vis.js
  const [key, setKey] = useState(v4());

  // function for resetting the results
  // i think that i don't need to add a comment for each line
  const emptyResults = () => {
    setGainResults(EMPTY_TREE);
    setGainRatioResults(EMPTY_TREE);
    setStepByStepResults([]);
  };

  // function for changing the impurity function with the radio
  const onImpurityFunctionChange = event => {
    setImpurityFunction(event.target.value);
    emptyResults();
  };

  // function for changing the expansion with the radio
  const onExpansionChange = event => {;
    setExpansion(event.target.value);
    emptyResults();
  };

  // function for changing the threshold with the input
  const onThresholdChange = event => {
    const value = event.target.value;
    // if the user enters a value that is greater than 1, store a 1
    // if the user enters a value that is lesser than 0, store a 0
    // because the threshold can't be outside this range
    if (value > 1) {
      setThreshold(1);
    } else if (value < 0) {
      setThreshold(0);
    } else {
      setThreshold(value);
    }
  };

  // function for running the c4.5 algorithm
  const onRun = () => {
    // extract the labels of each attribute
    const atributos = attributes.map(a => a.label);
    // remove the class (i.e the last attribute) from the attributes array, and store it in another const
    const clase = atributos.pop();
    // create an object where the tree will be stored
    const gainTree = { nodes: [], edges: [] };
    const gainRatioTree = { nodes: [], edges: [] }
    // run the c4.5 algorithm and store the results in the state
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
      c45gain(data, atributos, gainRatioTree, clase, threshold, "gain", steps);
      setStepByStepResults(steps);
    }
    if (impurityFunction === "gainRatio" && expansion === "stepByStep") {
      const steps = [];
      c45gain(
        data,
        atributos,
        gainRatioTree,
        clase,
        threshold,
        "gainRatio",
        steps
      );
      setStepByStepResults(steps);
    }
    // generate a new key to avoid duplicated id errors in vis.js
    // see https://github.com/crubier/react-graph-vis/issues/92
    setKey(v4());
  }

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
