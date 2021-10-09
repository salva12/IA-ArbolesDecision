import React from "react";
import Tree from "../components/Tree";

const Results = ({ attributes, data }) => {
  return (
    <div>
      <h2 className="title is-2">Resultados</h2>
      <Tree attributes={attributes} data={data} />
    </div>
  );
};

export default Results;
