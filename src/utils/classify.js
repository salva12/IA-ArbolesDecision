function classify(tree, instance) {
  let nodo = tree.nodes.find((n) => n.id === tree.edges[0].from)
  while (nodo.group !== "hojas") {
    const atributo = nodo.label
    const valor = instance[atributo]
    const edge = tree.edges.find((e) => e.from === nodo.id && e.label === valor)
    nodo = tree.nodes.find((n) => n.id === edge.to)
  }
  console.log('coso', nodo.label)
  return nodo.label.split('\n')[0]
}

export default classify;
