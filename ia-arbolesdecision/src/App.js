import React, { useState } from 'react';
import Attributes from './containers/Attributes';
import Data from './containers/Data';

const App = props => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="App">
      {tabIndex === 0 && <Attributes />}
      {tabIndex === 1 && <Data />}
    </div>
  );
}

export default App;
