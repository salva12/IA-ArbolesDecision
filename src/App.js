import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import Attributes from "./containers/Attributes";
import Data from "./containers/Data";
import Results from "./containers/Result";
import { ReactComponent as ArrowLeft } from './assets/arrow-left-solid.svg';
import { ReactComponent as ArrowRight } from './assets/arrow-right-solid.svg';
import { ReactComponent as FileCSV } from './assets/file-csv-solid.svg';
import { ReactComponent as UTNLogo } from './assets/utn-logo.svg';
import ReactTooltip from "react-tooltip";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "./utils/constants";

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const [data, setData] = useState([]);
  const [file, setFile] = useState(null);

  // since the attributes are dynamically rendered,
  // we need to rebuild the tooltips when the attributes array changes
  useEffect(() => {
    ReactTooltip.rebuild();
  }, [attributes, data])

  // effect to scroll to the top of da page when clicking on prev/next
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tabIndex]);

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

  const onFileChange = async event => {
    // get the file from the event
    const file = event.target.files[0];
    // convert it to string, split it into an array of lines, and split each line into an array of fields
    const parsedFile = (await file.text()).split('\n').map(line => line.split(','));
    // separate the attributes (1st element) and data (the rest) into two constants
    const [importedAttributes, ...importedData] = parsedFile;
    // store the attributes in the state
    setAttributes(importedAttributes.map((attr, idx) => ({
      label: attr,
      // first filter the empty values, and then extract each value
      values: importedData.filter(d => d[idx]).map(d => d[idx])
    })));
    // store the data in the state, filtering the empty rows
    setData(importedData.filter(d => d.length === 1 ? d[0] !== '' : true).map(d => {
      const row = {};
      importedAttributes.forEach((attr, idx) => {
        row[attr] = d[idx];
      });
      return row;
    }));
    // store the file in the state for its name
    setFile(file);
  };

  // check if the attributes set is empty
  const isAttributesEmpty = attributes.length === 0;
  // check if there is an attribute without name
  const areThereAttributesWithoutName = attributes.find(a => !a.label);
  // check if there is an attribute with empty values
  const areThereAttributesWithEmptyValues = attributes.find(
    a => a.values.find((v) => !v) === ''
  );

  // check if the data set is empty
  const isDataEmpty = data.length === 0;
  // check if there is a data row with all of its values empty
  const isADataUndefined = data.find((d) => {
    let isEmpty = true
    Object.keys(d).forEach((key) => {
      if (d[key]) {
        isEmpty = false
      }
    })
    return isEmpty
  });

  // check if the next button should be disabled
  const isNextDisabled =
    (tabIndex === 0 &&
      (isAttributesEmpty ||
        areThereAttributesWithoutName ||
        areThereAttributesWithEmptyValues)) ||
    (tabIndex === 1 && (isDataEmpty || isADataUndefined)) ||
    tabIndex === 2;

  // the tooltip text for the next button
  const nextTooltip = tabIndex === 0
    ? (isAttributesEmpty && 'El conjunto de atributos no puede estar vacío')
      || (areThereAttributesWithoutName && 'No puede haber atributos sin nombre')
        || (areThereAttributesWithEmptyValues && 'No puede haber atributos con valores vacíos')
    : tabIndex === 1
    ? (isDataEmpty && 'El conjunto de datos no puede estar vacío')
      || (isADataUndefined && 'No puede haber filas de datos sin ningún valor')
    : '';

  return (
    <div style={{ height: '100%', minHeight: '100%' }}>
      <div className="hero is-primary" style={{ height: `${HEADER_HEIGHT}px` }}>
        <div className="hero-body">
          <p className="title">
            Árboles de decisión
          </p>
        </div>
      </div>
      <div
        className="App container is-fullhd block"
        style={{
          padding: "1em 1.5em",
          minHeight: `calc(100% - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`
        }}
      >
        {tabIndex === 0 && (
          <Attributes
            attributes={attributes}
            setAttributes={setAttributes}
            data={data}
            setData={setData}
          />
        )}
        {tabIndex === 1 && (
          <Data attributes={attributes} data={data} setData={setData} />
        )}
        {tabIndex === 2 && <Results attributes={attributes} data={data} />}

        {tabIndex === 0 && (
          <div className="center">
            <div
              className="file has-name"
              data-tip="¡Importar un archivo sobreescribirá TODOS los atributos y datos cargados!"
            >
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  onChange={onFileChange}
                  accept=".txt,.csv"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <FileCSV width={16} height={16} />
                  </span>
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
        )}

        <div className="section center">
          <div className="buttons">
            <button
              className="button"
              disabled={tabIndex === 0}
              onClick={onPrevious}
            >
              <span className="icon">
                <ArrowLeft width={16} height={16} />
              </span>
              <span>Anterior</span>
            </button>
            <span data-tip={nextTooltip}>
              <button className="button" disabled={isNextDisabled} onClick={onNext}>
                <span className="icon">
                  <ArrowRight width={16} height={16} />
                </span>
                <span>Siguiente</span>
              </button>
            </span>
          </div>
        </div>
      </div>

      <footer className="footer" style={{ height: `${FOOTER_HEIGHT}px` }}>
        <div className="columns">
          <div className="column">
            <div>
              <UTNLogo width={96} height={96} />
            </div>
            <h5 className="title is-5">
              Universidad Tecnológica Nacional
            </h5>
            <h6 className="title is-6">
              Facultad Regional Resistencia
            </h6>
          </div>
          <div className="column">
            <h5 className="title is-5">Grupo 5</h5>
            <ul>
              <li>Escalante Salvador</li>
              <li>Fierro Victoria</li>
              <li>García Emmanuel</li>
              <li>Maidana Lucas</li>
            </ul>
          </div>
          <div className="column">
            <h5 className="title is-5">
              Ingeniería en Sistemas de Información
            </h5>
            <h6 className="title is-6">
              Inteligencia Artificial
            </h6>
            Profesores:
            <ul>
              <li>Ing. Marcelo Karanik</li>
              <li>Ing. Jorge Roa</li>
            </ul>
          </div>
        </div>
      </footer>
      <ReactTooltip effect="solid" />
    </div>
  );
}

export default App;
