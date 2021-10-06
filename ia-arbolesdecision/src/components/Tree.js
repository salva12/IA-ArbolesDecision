import React from "react"
import Graph from "react-vis-network-graph"

const Tree = ({ attributes, data }) => {
  const edgesFromRoot = () => {
    const root = attributes[0]
    const edges = root.values.map((value, index) => ({
      from: root.label,
      to: attributes[index + 1].label,
      label: value,
    }))
    return edges
  }

  const graph = {
    nodes: attributes.slice(0, -1).map((attribute, index) => ({
      id: attribute.label,
      label: attribute.label,
    })),

    /* [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ], */
    edges: [...edgesFromRoot()],
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
      margin: {
        top: 10,
        left: 20,
        right: 20,
        bottom: 10,
      },
    },
    edges: {
      color: "#000000",
    },
    height: "500px",
  }

  const events = {
    select: function (event) {
      var { nodes, edges } = event
    },
  }
  return (
    <>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </>
  )
}

export default Tree
