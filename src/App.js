import React, { useState } from "react";
import "bulma/css/bulma.min.css";
import Attributes from "./containers/Attributes";
import Data from "./containers/Data";
import { mockattrs, mockdata } from "./utils/datatest";
import Results from "./containers/Result";

const App = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  const onPrevious = () => {
    if (tabIndex > 0) {
      setTabIndex(tabIndex - 1);
    }
  };

  const onNext = () => {
    if (tabIndex < 2) {
      setTabIndex(tabIndex + 1);
    }
  };

  const onLoadTestData = () => {
    setAttributes(mockattrs);
    setData(mockdata);
  };

  const onFileChange = async event => {
    const file = event.target.files[0];
    const parsedFile = (await file.text()).split('\n').map(line => line.split(','));
    const [importedAttributes, ...importedData] = parsedFile;
    console.log(importedData);
    setAttributes(importedAttributes.map((attr, idx) => ({
      label: attr,
      values: importedData.filter(d => d[idx]).map(d => d[idx])
    })));
    setFile(file);
  };

  const isAttributesEmpty = attributes.length === 0;
  const areThereAttributesWithoutName = attributes.find((a) => !a.label);
  const areThereAttributesWithEmptyValues = attributes.find(
    (a) => a.values.find((v) => !v) === ""
  );

  const isDataEmpty = data.length === 0;
  const isADataUndefined = data.find((d) => {
    let isEmpty = true
    Object.keys(d).forEach((key) => {
      if (d[key]) {
        isEmpty = false
      }
    })
    return isEmpty
  });

  const isNextDisabled =
    (tabIndex === 0 &&
      (isAttributesEmpty ||
        areThereAttributesWithoutName ||
        areThereAttributesWithEmptyValues)) ||
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
      {tabIndex === 2 && <Results attributes={attributes} data={data} />}
      
      <button className="button is-primary is-light" onClick={onLoadTestData}>
        Cargar datos prueba
      </button>
      
      <div className="center">
        <div className="file has-name">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              onChange={onFileChange}
              accept=".txt,.csv"
            />
            <span className="file-cta">
              <span className="file-label">
                Cargar archivo CSV
              </span>
            </span>
            <span className="file-name">
              {file ? file.name : 'No se seleccionó archivo'}
            </span>
          </label>
        </div>
      </div>

      <div className="section center">
        <button
          className="button"
          disabled={tabIndex === 0}
          onClick={onPrevious}
        >
          &#8592; Anterior
        </button>
        <button className="button" disabled={isNextDisabled} onClick={onNext}>
          &#8594; Siguiente
        </button>
      </div>
    </div>
  );
}

export default App;
