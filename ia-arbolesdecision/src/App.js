import React, { useState } from 'react';
import Attributes from './containers/Attributes';
import Data from './containers/Data';
import { mockattrs, mockdata } from './utils/datatest';


const App = props => {
  const [tabIndex, setTabIndex] = useState(0);
  const [attributes, setAttributes] = useState([]);
  const [data, setData] = useState([]);

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

  return (
    <div className="App">
      {tabIndex === 0 && <Attributes attributes={attributes} setAttributes={setAttributes} />}
      {tabIndex === 1 && <Data attributes={attributes} data={data} setData={setData} />}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <button onClick={onPrevious}>&#8592; Anterior</button>
        <button onClick={onNext}>&#8594; Siguiente</button>
      </div>
      <button onClick={onLoadTestData}>Cargar datos prueba</button>
    </div>
  );
}

export default App;
