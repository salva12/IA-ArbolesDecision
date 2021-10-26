import React, { useState } from "react"
import { v4 } from "uuid"
import Tree from "./Tree"
import TreeContainer from "./TreeContainer"

const StepByStep = (props) => {
  const [key, setKey] = useState(v4())
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const handleStepChange = (index) => {
    setCurrentStepIndex(index)
    setKey(v4())
  }

  const handleNextStep = () => {
    console.log("next")
    handleStepChange(currentStepIndex + 1)
  }

  const isNextStepDisabled =  currentStepIndex === props.steps.length - 1
  

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: "20px",
      }}
    >
      <div className="card box" style={{ maxWidth: "calc(50% - 8px)" }}>
        {props.steps.map((step, index) => (
          <button key={step.id} onClick={() => handleStepChange(index)}>
            Recursión {index + 1}
          </button>
        ))}
        <button
          onClick={() => handleStepChange(currentStepIndex + 1)}
          disabled={isNextStepDisabled}
        >
          Siguiente
        </button>
        {JSON.stringify(props.steps, null, 2)}
      </div>
      <TreeContainer impurityFunction="gainRatio" wide={false}>
        <Tree
          tree={props.steps[currentStepIndex]?.tree || {}}
          keyForAvoidingErrors={key}
        />
      </TreeContainer>
    </div>
  )
}

export default StepByStep
