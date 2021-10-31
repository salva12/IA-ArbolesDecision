import React, { useState, useRef, useEffect } from "react"
import { v4 } from "uuid"
import Tree from "./Tree"
import { ReactComponent as ArrowRight } from "../assets/arrow-right-solid.svg"
import TreeContainer from "./TreeContainer"

const StepByStep = (props) => {
  const [key, setKey] = useState(props.keyForAvoidingErrors)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const scrollableRef = useRef(null)
  const currentButtonRef = useRef([])

  useEffect(() => {
    setKey(v4())
    return setCurrentStepIndex(0)
  }, [props.steps])

  const handleStepChange = (index) => {
    const height = currentButtonRef.current[index - 1]?.offsetHeight + 40 || 40
    setCurrentStepIndex(index)
    const offset = currentButtonRef.current[index].offsetTop - height
    scrollableRef.current.scrollTop = offset
    setKey(v4())
  }

  const handleNextStep = () => {
    handleStepChange(currentStepIndex + 1)
  }

  const isNextStepDisabled = currentStepIndex === props.steps.length - 1

  return (
    props.steps.length > 0 && (
      <>
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
            className="card"
            style={{
              width: "calc(50% - 8px)",
              maxHeight: "586px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="center" style={{ padding: "1em 0" }}>
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
              ref={scrollableRef}
              style={{
                overflowY: "auto",
                scrollBehavior: "smooth",
                padding: "0.8em 1em",
              }}
            >
              {props.steps.map((step, index) => (
                <div
                  className="block"
                  ref={(el) => (currentButtonRef.current[index] = el)}
                >
                  <button
                    className={
                      `button is-fullwidth ` +
                      (index === currentStepIndex
                        ? "is-info is-outlined has-text-weight-semibold"
                        : "is-light")
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
                        <code>
                          {JSON.stringify(
                            props.steps[currentStepIndex].atributos,
                            null,
                            2
                          )}
                        </code>
                      </details>
                      <details>
                        <summary>Particiones</summary>
                        <code>
                          {JSON.stringify(
                            props.steps[currentStepIndex].particion,
                            null,
                            2
                          )}
                        </code>
                      </details>
                      {props.steps[currentStepIndex].ganancias && (
                        <details>
                          <summary>
                            Cálculos de{" "}
                            {props.impurityFunction === "gain"
                              ? "ganancias"
                              : "tasa de ganancia"}
                          </summary>
                          <div>
                            {props.steps[currentStepIndex].ganancias.map(
                              (ganancia, index) => (
                                <div key={index}>
                                  <dl>
                                    <dt>{ganancia[0]}: </dt>
                                    <dd>{ganancia[1].toFixed(6)}</dd>
                                  </dl>
                                </div>
                              )
                            )}
                          </div>
                        </details>
                      )}
                      {props.steps[currentStepIndex].mejorAtributo ? (
                        <div class="notification is-info is-light">
                          El atributo que más reduce la impureza es{" "}
                          <b>{props.steps[currentStepIndex].mejorAtributo}</b>
                        </div>
                      ) : (
                        <div class="notification is-warning is-light">
                          Se crea un nodo hoja con la clase{" "}
                          <b>{props.steps[currentStepIndex].masFrecuente}</b>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <TreeContainer impurityFunction={props.impurityFunction} wide={false}>
            <Tree
              tree={props.steps[currentStepIndex]?.tree || {}}
              keyForAvoidingErrors={key}
            />
          </TreeContainer>
        </div>
      </>
    )
  )
}

export default StepByStep
