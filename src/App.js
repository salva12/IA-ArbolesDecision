import React, { useEffect, useState } from "react"
import "bulma/css/bulma.min.css"
import Attributes from "./containers/Attributes"
import Data from "./containers/Data"
import Results from "./containers/Result"
import { ReactComponent as ArrowLeft } from "./assets/arrow-left-solid.svg"
import { ReactComponent as ArrowRight } from "./assets/arrow-right-solid.svg"
import { ReactComponent as FileCSV } from "./assets/file-csv-solid.svg"
import { ReactComponent as UTNLogo } from "./assets/utn-logo.svg"
import ReactTooltip from "react-tooltip"
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "./utils/constants"

const App = () => {
  // la pestaña actual
  const [tabIndex, setTabIndex] = useState(0)
  // el conjunto de atributos
  const [attributes, setAttributes] = useState([])
  // el conjunto de datos
  const [data, setData] = useState([])
  // el archivo que podes cargar
  const [file, setFile] = useState(null)

  // como los atributos se renderizan dinamicamente,
  // hay que hacer un rebuild de los tooltip cada vez que cambia el array de atributos
  useEffect(() => {
    ReactTooltip.rebuild()
  }, [attributes, data, tabIndex])

  // effect para ir al principio de la pagina al hacer clic en anteror/siguiente
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [tabIndex])

  // funcion para ir a la pagina anterior
  const onPrevious = () => {
    if (tabIndex > 0) {
      setTabIndex(tabIndex - 1)
    }
  }

  // funcion para ir a la pagina siguiente
  const onNext = () => {
    if (tabIndex < 2) {
      setTabIndex(tabIndex + 1)
    }
  }

  // funcion para ir a una pagina especifica
  // se usa en la barra de navegacion
  const goToPage = (page) => {
    setTabIndex(page)
  }

  // funcion para cargar un archivo
  const onFileChange = async (event) => {
    // sacar el archivo del evento
    const file = event.target.files[0]
    if (file) {
      // convertirlo a string, separarlo en un array de lineas, y separar cada linea en un array de celdas
      // en windows, hay caracteres carriage return al final de cada linea
      // por lo que las elimino con replaceAll
      const parsedFile = (await file.text())
        .replaceAll(/\r/g, "") // eliminar los CR
        .replaceAll(/;\s/g, ",") // reemplazar los punto y coma con comas (como un csv de toda la vida)
        .split("\n") // separar en un array de lineas
        .map((line) => line.split(",")) // separar cada linea en un array de celdas
      // separar los atributos (1er elemento) y los datos (todo lo demas) en dos constantes
      const [importedAttributes, ...importedData] = parsedFile
      // guardar los atributos en el estado
      setAttributes(
        importedAttributes.map((attr, idx) => ({
          label: attr.trim(),
          // aca estoy haciendo esto
          //// filtrar valores vacios
          //// extraer cada valor con map
          //// crear un set con eso (para eliminar duplicados)
          //// y hacer spread del set para convertirlo de vuelta en array
          values: [
            ...new Set(
              importedData.filter((d) => d[idx]).map((d) => d[idx].trim())
            ),
          ],
        }))
      )
      // guardar los datos en el estado, filtrando columnas vacias
      setData(
        importedData
          .filter((d) => (d.length === 1 ? d[0] !== "" : true))
          .map((d) => {
            const row = {}
            importedAttributes.forEach((attr, idx) => {
              row[attr.trim()] = d[idx].trim()
            })
            row.useInTestSet = false;
            return row
          })
      )
      // guardar el archivo en el estado para conservar su nombre
      setFile(file)
    }
  }

  // controla si el conjunto de atributos esta vacio
  const isAttributesEmpty = attributes.length === 0
  // controla si hay un atributo sin nombre
  const areThereAttributesWithoutName = attributes.find((a) => !a.label)
  // controla si hay un atributo con valores vacios
  const areThereAttributesWithEmptyValues = attributes.find(
    (a) => a.values.find((v) => !v) === ""
  )

  // controla si el conjunto de datos esta vacio
  const isDataEmpty = data.length === 0
  // controla si hay un dato con todos sus valores vacios
  const isADataUndefined = data.find((d) => {
    let isEmpty = true
    Object.keys(d).forEach((key) => {
      if (d[key]) {
        isEmpty = false
      }
    })
    return isEmpty
  })
  // controla si hay un dato con el valor de clase vacio
  const isThereADataWithoutClass = data.find((d) => {
    const className = attributes[attributes.length - 1].label
    return d[className] === ""
  })
  // controla si el conjunto de entrenamiento esta vacio
  // o sea, si se marcaron todos los datos para usarse en el conjunto de test
  const isTrainingSetEmpty = data.filter(d => !d.useInTestSet).length === 0;

  // controla si se puede acceder a cada una de las secciones
  const isDataDisabled =
    isAttributesEmpty ||
    areThereAttributesWithoutName ||
    areThereAttributesWithEmptyValues
  const isResultsDisabled =
    isDataEmpty || isADataUndefined || isThereADataWithoutClass || isTrainingSetEmpty
  // controla si el boton siguiente tiene que estar deshabilitado
  const isNextDisabled =
    (tabIndex === 0 && isDataDisabled) ||
    (tabIndex === 1 && isResultsDisabled) ||
    tabIndex === 2

  // el texto de los tooltip de la barra de navegacion
  const dataTooltip =
    (isAttributesEmpty && "El conjunto de atributos no puede estar vacío") ||
    (areThereAttributesWithoutName && "No puede haber atributos sin nombre") ||
    (areThereAttributesWithEmptyValues &&
      "No puede haber atributos con valores vacíos") ||
    ""
  const resultsTooltip =
    (isDataEmpty && "El conjunto de datos no puede estar vacío") ||
    (isADataUndefined && "No puede haber filas de datos sin ningún valor") ||
    (isThereADataWithoutClass &&
      "No puede haber filas de datos con un valor de clase vacío") ||
    (isTrainingSetEmpty && 'No puede usar todas las instancias en el conjunto de test') ||
    ""
  // el texto del tooltip del boton siguiente
  const nextTooltip =
    tabIndex === 0 ? dataTooltip : tabIndex === 1 ? resultsTooltip : ""

  return (
    <div style={{ height: "100%", minHeight: "100%" }}>
      <div className="hero is-primary" style={{ height: `${HEADER_HEIGHT}px` }}>
        <div className="hero-body">
          <p className="title">Árboles de decisión</p>
        </div>
      </div>
      <div
        className="App container is-fullhd block"
        style={{
          padding: "1em 1.5em",
          minHeight: `calc(100% - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
        }}
      >
        <div className="field has-addons mb-6">
          <p className="control">
            <button
              className={`button ${
                tabIndex === 0
                  ? "is-info is-light is-selected has-text-weight-medium"
                  : ""
              }`}
              onClick={() => goToPage(0)}
            >
              Atributos
            </button>
          </p>
          <p className="control" data-tip={dataTooltip}>
            <button
              className={`button ${
                tabIndex === 1
                  ? "is-info is-light is-selected has-text-weight-medium"
                  : ""
              }`}
              disabled={isDataDisabled}
              onClick={() => goToPage(1)}
            >
              Conjunto de Datos
            </button>
          </p>
          <p className="control" data-tip={resultsTooltip}>
            <button
              className={`button ${
                tabIndex === 2
                  ? "is-info is-light is-selected has-text-weight-medium"
                  : ""
              }`}
              disabled={isDataDisabled || isResultsDisabled}
              onClick={() => goToPage(2)}
            >
              Resultados
            </button>
          </p>
        </div>
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
                  <span className="file-label">Cargar archivo CSV</span>
                </span>
                <span className="file-name">
                  {file ? file.name : "No se seleccionó archivo"}
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
              <button
                className="button"
                disabled={isNextDisabled}
                onClick={onNext}
              >
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
            <h5 className="title is-5">Universidad Tecnológica Nacional</h5>
            <h6 className="title is-6">Facultad Regional Resistencia</h6>
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
            <h6 className="title is-6">Inteligencia Artificial</h6>
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
  )
}

export default App
