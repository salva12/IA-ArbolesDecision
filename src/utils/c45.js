/**
 * Cuenta el numero de atributos diferentes que puede tener un atributo o clase
 * @param {*} attClase el atributo/clase
 * @param {*} dataset el dataset
 * @returns el numero de valores distintos del atributo o clase
 */
const valoresDistintos = (attClase, dataset) => {
  let valores = []
  for (let reg of dataset) {
    valores.push(reg[attClase])
  }
  return new Set(valores)
}

/**
 * Calcula el logaritmo base n de un numero
 * @param {Number} base la base
 * @param {Number} num el numero
 * @returns el logaritmo en base `base` de `num`
 */
const logBase = (base, num) => Math.log(num) / Math.log(base)

/**
 * Cuenta cuanteas veces aparece un valor de un atributo en el dataset
 * @param {String} valor el valor que queres contar
 * @param {Array} dataset el dataset
 * @param {String} attClase el atributo (o clase) al que pertenece el valor
 * @returns el numero de ocurrencias del valor
 */
const contarValores = (valor, dataset, attClase) => {
  let cont = 0
  for (let reg of dataset) {
    if (valor === reg[attClase]) {
      cont++
    }
  }
  return cont
}

/**
 * Cuenta el numero de datos que tienen un valor especifico de un atributo y de la clase
 * @param {String} valorAtt el valor del atributo
 * @param {String} valorClase el valor de la clase
 * @param {Array} dataset el dataset
 * @param {String} atributo el nombre del atributo
 * @param {String} clase el nombre de la clase
 * @returns el numero de datos con valor `valorAtt` de `atributo` y valor `valorClase` de `clase`
 */
const contarValores2 = (valorAtt, valorClase, dataset, atributo, clase) => {
  let cont = 0
  for (let reg of dataset) {
    if (valorAtt === reg[atributo] && valorClase === reg[clase]) {
      cont++
    }
  }
  return cont
}

/**
 * Obtiene el valor de clase mas frecuente en el dataset
 * @param {Array} dataset el dataset
 * @param {String} clase el nombre de la clase
 * @returns el valor de clase mas frecuente
 */
const valorClaseMasFrecuente = (dataset, clase) => {
  const valoresClase = valoresDistintos(clase, dataset)
  const cantClase = []
  for (let valor of valoresClase) {
    let c = contarValores(valor, dataset, clase)
    cantClase.push({ valorClase: valor, cant: c })
  }
  // obtener valorClase con mayor cantidad
  const valoresOrdenados = cantClase.sort((a, b) => b.cant - a.cant)
  return valoresOrdenados[0].valorClase
}

/**
 * Calcula la entropia de todo el dataset
 * @param {Array} dataset el dataset
 * @param {String} clase el nombre de la clase
 * @returns la entropia del datset
 */
const entropiaD = (dataset, clase) => {
  const valoresClase = valoresDistintos(clase, dataset)
  let entD = 0
  for (let valor of valoresClase) {
    let numerador = contarValores(valor, dataset, clase)
    entD =
      -(numerador / dataset.length) * logBase(2, numerador / dataset.length) +
      entD
  }
  return entD
}

/**
 * Calcula la entropia de un atributo
 * @param {Array} dataset el dataset
 * @param {String} atributo el nombre del atributo
 * @param {String} clase el nombre de la clase
 * @returns la entropia respecto de ese atributo
 */
const entropiaA = (dataset, atributo, clase) => {
  let valoresAtributo = valoresDistintos(atributo, dataset)
  let valoresClase = valoresDistintos(clase, dataset)
  let entA = 0
  for (let valor of valoresAtributo) {
    let denominador = contarValores(valor, dataset, atributo)
    let sumatoria1 = 0
    for (let valorclase of valoresClase) {
      let numerador = contarValores2(
        valor,
        valorclase,
        dataset,
        atributo,
        clase
      )
      if (numerador !== 0 && denominador !== 0) {
        // este control es porque no se puede calcular el log de 0
        sumatoria1 =
          -(numerador / denominador) * logBase(2, numerador / denominador) +
          sumatoria1
      } else if (denominador === 0) {
        // cuando el denominador es 0, no hay registros de un determinado valor de un atributo disponibles en el dataset actual, entonces la entropia es 0
        sumatoria1 = sumatoria1 + 0
      }
    }
    if (denominador !== 0) {
      entA = entA + sumatoria1 * (denominador / dataset.length)
    }
  }
  console.log("controlando entropias",atributo)
  console.log(entA)
  return entA
}

/**
 * Calcula la ganancia de un atributo
 * @param {Number} entropiaD la entropia del dataset
 * @param {Number} entropiaA
 * @returns la ganancia
 */
const gain = (entropiaD, entropiaA) => parseFloat(Number.parseFloat(entropiaD - entropiaA).toFixed(2))

/**
 * Calcula la tasa de ganancia de un atributo
 * @param {Number} gainA la ganancia del atributo
 * @param {Array} dataset el dataset
 * @param {String} atributo el atributo
 * @returns la tasa de ganancia
 */
const gainRatio = (gainA, dataset, atributo) => {
  const valoresAtributo = valoresDistintos(atributo, dataset)
  let denominador = 0
  for (let valor of valoresAtributo) {
    let c = contarValores(valor, dataset, atributo)
    denominador =
      (-c / dataset.length) * logBase(2, c / dataset.length) + denominador
  }
  // cuando una tasa de ganancia tiende a infinito hay que asignar un valor maximo
  return denominador !== 0 ? gainA/denominador : 10000000000
}
//parseFloat(Number.parseFloat(gainA/denominador).toFixed(2))

//particularizando la solucion y probando resultados --> ACA HAY QUE GENERALIZAR ASIGNANDO A DATASET OTRA LO QUE TOMEMOS DE LO INGRESADO POR EL USUARIO
// dataset = mockdata

// //el siguiente bloque sirve para saber cuales son los atributos y cual es la clase para decidir.
// const atributos = Object.keys(dataset[0])
// const clase = atributos.pop()
// console.log("los atts son " + atributos + "y la clase es:" + clase)

// C45 algoritmo recursivo, antes de arrancar, y que es utilizable en todas las recursiones es importante saber la clase
//y naturalmente para la primer llamada al algoritmo los atributos
//const tree = { nodes: [], edges: [] }

let id_recursion = 0
let id_nodes = 0
function c45gain(
  dataset,
  atributos,
  tree,
  clase,
  umbral,
  funcionImpureza,
  stepByStep = false
) {
  if (valoresDistintos(clase, dataset).size === 1) {
    console.log("ya no hay mas valores distintos")
    id_nodes++
    if (tree.edges.length !== 0) {
      tree.edges[tree.edges.length - 1].to = id_nodes + dataset[0][clase]
    }
    tree.nodes.push({
      id: id_nodes + dataset[0][clase],
      label: `${dataset[0][clase]}\n${dataset.length}/${dataset.length}`,
      group: "hojas",
    }) //colocar nodos hojas
    if (stepByStep) {
      stepByStep.push({
        id: id_recursion,
        tree: { nodes: [...tree.nodes], edges: [...tree.edges] },
        atributos: [...atributos],
        particion: [...dataset],
        masFrecuente: dataset[0][clase],
      })
      id_recursion++
    }
    return tree
  } else if (atributos.length === 0) {
    console.log("ya no hay mas atributos")

    const masFrecuente = valorClaseMasFrecuente(dataset, clase)

    // acá se saca el valor de clase mas frecuente
    id_nodes++
    tree.edges[tree.edges.length - 1].to = id_nodes + dataset[0][clase]
    tree.nodes.push({
      id: id_nodes + dataset[0][clase],
      label: masFrecuente,
    })
    return tree
  } else {
    console.log("entro al else")
    let entD = entropiaD(dataset, clase)
    console.log(entD)
    let ganancias = []
    for (let atributo of atributos) {
      ganancias.push([
        atributo,
        funcionImpureza === "gain"
          ? gain(entD, entropiaA(dataset, atributo, clase))
          : gainRatio(
              gain(entD, entropiaA(dataset, atributo, clase)),
              dataset,
              atributo
            )
          ]
      )
    }
    console.log(ganancias)
    console.log("cual es la maxima ganancia")
    const gainValores = ganancias.map(g => g[1])
    const maxgain = Math.max.apply(null,gainValores )
    console.log(maxgain)
    if (maxgain < umbral) {
      console.log("nodo hoja")

      const masFrecuente = valorClaseMasFrecuente(dataset, clase)

      id_nodes++
      if (tree.edges.length !== 0) {
        tree.edges[tree.edges.length - 1].to = id_nodes + dataset[0][clase]
      }
      const numeradorConfianza = contarValores(masFrecuente, dataset, clase)
      const denominadorConfianza = dataset.length - numeradorConfianza
      tree.nodes.push({
        id: id_nodes + dataset[0][clase],
        label: `${masFrecuente}\n${numeradorConfianza}/${denominadorConfianza}`,
        group: "hojas",
      }) //colocar nodos hojas
      if (stepByStep) {
        stepByStep.push({
          id: id_recursion,
          tree: { nodes: [...tree.nodes], edges: [...tree.edges] },
          atributos: [...atributos],
          particion: [...dataset],
          ganancias: [...ganancias],
          masFrecuente: masFrecuente,
        })
        id_recursion++
      }
      return tree
    } else {
      let ag = atributos[gainValores.indexOf(maxgain)] // estoy seleccionando al nodo que mejor clasifica o reduce mas la impureza
      console.log("el nodo que mas reduce impureza es:" + ag)
      const valdist = valoresDistintos(ag, dataset)
      console.log(valoresDistintos(ag, dataset))
      const particiones = []
      for (let valor of valdist) {
        const particion = dataset.filter((reg) => reg[ag] === valor)
        particiones.push(particion)
      }
      id_nodes++
      let idpadre = id_nodes + ag
      tree.nodes.push({ id: idpadre, label: ag })
      if (tree.edges.length > 0) {
        tree.edges[tree.edges.length - 1].to = idpadre
      }
      for (let particion of particiones) {
        console.log(particion)
        if (particion.length !== 0) {
          tree.edges.push({ from: idpadre, label: particion[0][ag] })
          if (stepByStep) {
            stepByStep.push({
              id: id_recursion,
              tree: { nodes: [...tree.nodes], edges: [...tree.edges] },
              atributos: [...atributos],
              particion: [...dataset],
              ganancias: [...ganancias],
              mejorAtributo: ag,
            })
            id_recursion++
          }
          c45gain(
            particion,
            atributos.filter((a) => a !== ag),
            tree,
            clase,
            umbral,
            funcionImpureza,
            stepByStep
          )
        }
      }
    }
  }
}

export default c45gain
