import React from 'react';

const PieChartLabel = ({ label, value, ...rest }) => (
  <text {...rest} style={{ fontSize: '6px' }}>
    <tspan dy=".6em">
      {label}
    </tspan>
    <tspan dy="1.2em">
      {value}
    </tspan>
  </text>
);

export default PieChartLabel;
