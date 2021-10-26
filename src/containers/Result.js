import React, { useState } from "react"
import { v4 } from "uuid"
import StepByStep from "../components/StepByStep.js"
import Tree from "../components/Tree"
import TreeContainer from "../components/TreeContainer"
import c45gain from "../utils/c45"
import { EMPTY_TREE } from "../utils/constants"

const Results = ({ attributes, data }) => {
  const [impurityFunction, setImpurityFunction] = useState("gain")
  const [expansion, setExpansion] = useState("complete")
  const [threshold, setThreshold] = useState(0)
  const [gainResults, setGainResults] = useState(EMPTY_TREE)
  const [gainRatioResults, setGainRatioResults] = useState(EMPTY_TREE)
  const [stepByStepResults, setStepByStepResults] = useState([])
  const [key, setKey] = useState(v4())

  const onImpurityFunctionChange = (event) => {
    setImpurityFunction(event.target.value)
  }

  const onExpansionChange = (event) => {
    setExpansion(event.target.value)
  }

  const onThresholdChange = (event) => {
    const value = event.target.value
    // if the user enters a value that is greater than 1, store a 1
    // if the user enters a value that is lesser than 0, store a 0
    // because the threshold can't be outside this range
    if (value > 1) {
      setThreshold(1)
    } else if (value < 0) {
      setThreshold(0)
    } else {
      setThreshold(value)
    }
  }

  const onRun = () => {
    // extract the labels of each attribute
    const atributos = attributes.map((a) => a.label)
    // remove the class (i.e the last attribute) from the attributes array, and store it in another const
    const clase = atributos.pop()
    // create an object where the tree will be stored
    const gainTree = { nodes: [], edges: [] }
    const gainRatioTree = { nodes: [], edges: [] }
    // run the c4.5 algorithm and store the results in the state
    if (impurityFunction === "gain" || impurityFunction === "both") {
      c45gain(data, atributos, gainTree, clase, threshold, "gain")
      setGainResults(gainTree)
    }
    if (impurityFunction === "gainRatio" || impurityFunction === "both") {
      c45gain(data, atributos, gainRatioTree, clase, threshold, "gainRatio")
      setGainRatioResults(gainRatioTree)
    }
    if (impurityFunction === "gain" && expansion === "stepByStep") {
      const steps = []
      c45gain(data, atributos, gainRatioTree, clase, threshold, "gain", steps)
      setStepByStepResults(steps)
    }
    // generate a new key to avoid duplicated id errors in vis.js
    // see https://github.com/crubier/react-graph-vis/issues/92
    setKey(v4())
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
        {expansion === "stepByStep" && <StepByStep steps={stepByStepResults} />}
      </div>
    </div>
  )
}

export default Results
