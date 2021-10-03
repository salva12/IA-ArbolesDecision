import React, { useState } from 'react';
import Attributes from './containers/Attributes';
import Data from './containers/Data';

const App = props => {
  const [tabIndex, setTabIndex] = useState(0);

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

  return (
    <div className="App">
      {tabIndex === 0 && <Attributes />}
      {tabIndex === 1 && <Data />}
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <button onClick={onPrevious}>&#8592; Anterior</button>
        <button onClick={onNext}>&#8594; Siguiente</button>
      </div>
    </div>
  );
}

export default App;
