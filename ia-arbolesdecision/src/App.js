import React, { useState } from "react"
import "bulma/css/bulma.min.css"
import Attributes from "./containers/Attributes"
import Data from "./containers/Data"
import { mockattrs, mockdata } from "./utils/datatest"
import Results from "./containers/Result"

const App = (props) => {
  const [tabIndex, setTabIndex] = useState(0)
  const [attributes, setAttributes] = useState([])
  const [data, setData] = useState([])

  const onPrevious = () => {
    if (tabIndex > 0) {
      setTabIndex(tabIndex - 1)
    }
  }

  const onNext = () => {
    if (tabIndex < 2) {
      setTabIndex(tabIndex + 1)
    }
  }

  const onLoadTestData = () => {
    setAttributes(mockattrs)
    setData(mockdata)
  }

  const isAttributesEmpty = attributes.length === 0;
  const areThereAttributesWithoutName = attributes.find(a => !a.label);
  const areThereAttributesWithEmptyValues = attributes.find(a => a.values.find(v => !v) === '');

  const isDataEmpty = data.length === 0;
  const isADataUndefined = data.find(d => {
    let isEmpty = true;
    Object.keys(d).forEach(key => {
      if (d[key]) {
        isEmpty = false;
      }
    });
    return isEmpty;
  });

  const isNextDisabled =
    (tabIndex === 0 && (isAttributesEmpty || areThereAttributesWithoutName || areThereAttributesWithEmptyValues)) ||
    (tabIndex === 1 && (isDataEmpty || isADataUndefined)) ||
    tabIndex === 2;

  return (
    <div
      className="App container is-fullhd block"
      style={{ padding: "1em 1.5em" }}
    >
      {tabIndex === 0 && (
        <Attributes attributes={attributes} setAttributes={setAttributes} />
      )}
      {tabIndex === 1 && (
        <Data attributes={attributes} data={data} setData={setData} />
      )}
      {tabIndex === 2 && (
        <Results />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <button className="button" disabled={tabIndex === 0} onClick={onPrevious}>
          &#8592; Anterior
        </button>
        <button className="button" disabled={isNextDisabled} onClick={onNext}>
          &#8594; Siguiente
        </button>
      </div>
      <button className="button is-primary is-light" onClick={onLoadTestData}>
        Cargar datos prueba
      </button>
    </div>
  )
}

export default App
