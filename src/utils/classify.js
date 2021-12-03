function classify(tree, instance) {
  let nodo = tree.nodes.find((n) => n.id === tree.edges[0].from)
  while (nodo.group !== "hojas") {
    const atributo = nodo.label
    const valor = instance[atributo]
    const edge = tree.edges.find((e) => e.from === nodo.id && e.label === valor)
    nodo = tree.nodes.find((n) => n.id === edge.to)
  }
  return nodo.label
}

const tree = {
  nodes: [
    {
      id: "43Edad",
      label: "Edad",
    },
    {
      id: "44Colesterol",
      label: "Colesterol",
    },
    {
      id: "45no",
      label: "no\n2/2",
      group: "hojas",
    },
    {
      id: "46si",
      label: "si\n1/1",
      group: "hojas",
    },
    {
      id: "47no",
      label: "no\n1/1",
      group: "hojas",
    },
    {
      id: "48si",
      label: "si\n3/3",
      group: "hojas",
    },
    {
      id: "49Hipertenso",
      label: "Hipertenso",
    },
    {
      id: "50no",
      label: "no\n1/1",
      group: "hojas",
    },
    {
      id: "51si",
      label: "si\n2/2",
      group: "hojas",
    },
  ],
  edges: [
    {
      from: "43Edad",
      label: "<40",
      to: "44Colesterol",
      id: "c158f122-a552-4bef-ac88-310a3d34cd4e",
    },
    {
      from: "44Colesterol",
      label: "bajo",
      to: "45no",
      id: "72862a5a-6f71-47eb-b12d-43cf463f0020",
    },
    {
      from: "44Colesterol",
      label: "medio",
      to: "46si",
      id: "d9e8ecff-4429-4365-97a4-04c87ce2e063",
    },
    {
      from: "44Colesterol",
      label: "alto",
      to: "47no",
      id: "76aa272e-7a9f-4b18-8ec0-7bdf6112ad1f",
    },
    {
      from: "43Edad",
      label: ">60",
      to: "48si",
      id: "9ed8cf19-14ab-4e1f-89da-adba76754138",
    },
    {
      from: "43Edad",
      label: "entre 40-60",
      to: "49Hipertenso",
      id: "7c7abc51-6d6c-41ea-856b-d3fc036a51a5",
    },
    {
      from: "49Hipertenso",
      label: "no",
      to: "50no",
      id: "bc2d33f9-9149-4a13-8843-4949816f3e18",
    },
    {
      from: "49Hipertenso",
      label: "si",
      to: "51si",
      id: "2ef489f0-83dd-4eb6-a58b-83a71911dc72",
    },
  ],
}

console.log(
  classify(tree, {
    Hipertenso: "si",
    Colesterol: "bajo",
    Triglicéridos: "elevado",
    Edad: "<40",
    Diabético: "si",
    "Problemas cardíacos": "no",
  })
) //no

console.log(
  classify(tree, {
    Hipertenso: "si",
    Colesterol: "bajo",
    Triglicéridos: "elevado",
    Edad: ">60",
    Diabético: "si",
    "Problemas cardíacos": "no",
  })
) //si

export default classify;
