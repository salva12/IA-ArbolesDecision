import React, { useState, useRef } from "react"
import { v4 } from "uuid"
import Tree from "./Tree"
import { ReactComponent as ArrowRight } from "../assets/arrow-right-solid.svg"
import TreeContainer from "./TreeContainer"

const StepByStep = (props) => {
  const [key, setKey] = useState(v4())
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const scrollableRef = useRef(null)
  const currentButtonRef = useRef([])

  const handleStepChange = (index) => {
    setCurrentStepIndex(index)
    const offset = currentButtonRef.current[index].offsetTop
    scrollableRef.current.scrollTop = offset
    setKey(v4())
  }

  const handleNextStep = () => {
    handleStepChange(currentStepIndex + 1)
  }

  const isNextStepDisabled = currentStepIndex === props.steps.length - 1

  return (
    <>
      <div className="block center">
        <button
          onClick={() => handleNextStep()}
          disabled={isNextStepDisabled}
          className="button"
        >
          <span className="icon">
            <ArrowRight width={16} height={16} />
          </span>
          <span>Siguiente recursión</span>
        </button>
      </div>
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
          ref={scrollableRef}
          style={{
            width: "calc(50% - 8px)",
            maxHeight: "586px",
            overflowY: "scroll",
          }}
        >
          {props.steps.map((step, index) => (
            <div className="block">
              <button
              ref={el => currentButtonRef.current[index] = el}
                className={
                  `button is-fullwidth ` +
                  (index === currentStepIndex ? "is-info is-outlined" : "")
                }
                key={step.id}
                onClick={() => handleStepChange(index)}
              >
                Recursión {index + 1}
              </button>
              {index === currentStepIndex && (
                <div>
                  <details>
                    <summary>Atributos</summary>
                    {JSON.stringify(
                      props.steps[currentStepIndex].atributos,
                      null,
                      2
                    )}
                  </details>
                  <details>
                    <summary>Particiones</summary>
                    {JSON.stringify(
                      props.steps[currentStepIndex].particion,
                      null,
                      2
                    )}
                  </details>
                </div>
              )}
            </div>
          ))}
        </div>
        <TreeContainer impurityFunction="gainRatio" wide={false}>
          <Tree
            tree={props.steps[currentStepIndex]?.tree || {}}
            keyForAvoidingErrors={key}
          />
        </TreeContainer>
      </div>
    </>
  )
}

export default StepByStep
