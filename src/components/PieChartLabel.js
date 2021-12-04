import React from "react"

const PieChartLabel = ({ label, value, ...rest }) => (
  <text {...rest} style={{ fontSize: "6px" }}>
    <tspan style={{ fontWeight: "bold" }}>{label}</tspan>
    <tspan dy="1.4em" dx="-8ch">
      {value}
    </tspan>
  </text>
)

export default PieChartLabel
