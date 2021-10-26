import React, { useState } from "react"
import { v4 } from "uuid"
import Tree from "./Tree"
import TreeContainer from "./TreeContainer"

const StepByStep = (props) => {
  const [key, setKey] = useState(v4())
  const [currentStep, setCurrentStep] = useState({})

  const handleStepChange = (step) => {
    console.log(step.tree)
    setCurrentStep(step)
    setKey(v4())
  }
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
      <div
        className="card box"
        style={{ maxWidth: props.wide ? "75%" : "calc(50% - 8px)" }}
      >
        {props.steps.map((step, index) => (
          <button key={step.id} onClick={() => handleStepChange(step)}>
            Recursión {index + 1}
          </button>
        ))}
        {JSON.stringify(props.steps, null, 2)}
      </div>
      <TreeContainer impurityFunction="gainRatio" wide={false}>
        <Tree tree={currentStep?.tree || {}} keyForAvoidingErrors={key} />
      </TreeContainer>
    </div>
  )
}

export default StepByStep
