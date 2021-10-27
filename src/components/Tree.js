import React from "react"
import Graph from "react-vis-network-graph"
import ErrorBoundary from "./ErrorBoundary"

const Tree = ({ tree, keyForAvoidingErrors }) => {
  const graph = {
    nodes: tree.nodes,

    /* [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ], */
    edges: tree.edges,
  }

  const options = {
    layout: {
      improvedLayout: true,
      hierarchical: {
        enabled: true,
        levelSeparation: 200,
        nodeSpacing: 100,
        treeSpacing: 100,
        blockShifting: true,
        edgeMinimization: false,
        parentCentralization: true,
        direction: "UD", // UD, DU, LR, RL
        sortMethod: "directed", // hubsize, directed
      },
    },
    nodes: {
      shape: "box",
      font: { size: 16 },
      margin: {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10,
      },
    },
    edges: {
      color: "#000000",
      font: { size: 16 },
    },
    height: "500px",
    groups: {
      hojas: {
        color: { background: "white", border: "white" },
        font: { size: 20 },
      },
    },
  }

  const events = {
    select: function (event) {
      var { nodes, edges } = event
    },
  }
  console.log(graph)
  return (
    <ErrorBoundary>
      <Graph
        key={keyForAvoidingErrors}
        graph={graph}
        options={options}
        events={events}
      />
    </ErrorBoundary>
  )
}

export default Tree
