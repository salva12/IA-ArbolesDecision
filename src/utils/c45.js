const mockdata2 = [
  {
    Hipertenso: "no",
    Colesterol: "bajo",
    Triglicéridos: "normal",
    Edad: "<40",
    Diabético: "si",
    Problemascardíacos: "no",
  },
  {
    Hipertenso: "si",
    Colesterol: "bajo",
    Triglicéridos: "elevado",
    Edad: "<40",
    Diabético: "si",
    Problemascardíacos: "no",
  },
  {
    Hipertenso: "si",
    Colesterol: "bajo",
    Triglicéridos: "elevado",
    Edad: ">60",
    Diabético: "si",
    Problemascardíacos: "si",
  },
  {
    Hipertenso: "si",
    Colesterol: "medio",
    Triglicéridos: "elevado",
    Edad: ">60",
    Diabético: "no",
    Problemascardíacos: "si",
  },
  {
    Hipertenso: "no",
    Colesterol: "medio",
    Triglicéridos: "elevado",
    Edad: "<40",
    Diabético: "no",
    Problemascardíacos: "si",
  },
  {
    Hipertenso: "no",
    Colesterol: "medio",
    Triglicéridos: "normal",
    Edad: "entre 40-60",
    Diabético: "si",
    Problemascardíacos: "no",
  },
  {
    Hipertenso: "si",
    Colesterol: "alto",
    Triglicéridos: "normal",
    Edad: "entre 40-60",
    Diabético: "si",
    Problemascardíacos: "si",
  },
  {
    Hipertenso: "si",
    Colesterol: "alto",
    Triglicéridos: "normal",
    Edad: "entre 40-60",
    Diabético: "si",
    Problemascardíacos: "si",
  },
  {
    Hipertenso: "si",
    Colesterol: "alto",
    Triglicéridos: "elevado",
    Edad: ">60",
    Diabético: "no",
    Problemascardíacos: "si",
  },
  {
    Hipertenso: "no",
    Colesterol: "alto",
    Triglicéridos: "normal",
    Edad: "<40",
    Diabético: "no",
    Problemascardíacos: "no",
  },
]

// A CONTINUACIÓN SOLUCION GENERAL

//el siguiente bloque sirve para saber la cantidad de valores diferentes que puede tomar un atributo o clase
/**
 * Counts the number of different values that an attribute could have
 * @param {*} attClase
 * @param {*} dataset
 * @returns
 */
const valoresDistintos = (attClase, dataset) => {
  let valores = []
  for (let reg of dataset) {
    valores.push(reg[attClase])
  }
  return new Set(valores)
}

// la siguiente funcion devuelve el logaritmo en base x de num
/**
 * Calculates the n-base logarithm of a number
 * @param {Number} base the base
 * @param {Number} num the number
 * @returns the `base`-base logarithm of `num`
 */
const logBase = (base, num) => Math.log(num) / Math.log(base)

/**
 * Counts how many times an attribute value appears in the dataset
 * @param {String} valor the value you want to count
 * @param {Array} dataset the dataset
 * @param {String} attClase the attribute (or class) where the value belongs
 * @returns the number of occurrences of the value
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
 * Counts the number of data examples which have a specific attribute and class value
 * @param {String} valorAtt the attribute value
 * @param {String} valorClase the class value
 * @param {Array} dataset the dataset
 * @param {String} atributo the name of the attribute
 * @param {String} clase the name of the class
 * @returns the number of data examples with `valorAtt` value for `atributo` attribute and `valorClase` value for `clase`
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
 * Gets the most frequent class value in the dataset
 * @param {Array} dataset the dataset
 * @param {String} clase the name of the class
 * @returns the most frequent class value
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
 * Calculates the entropy of the whole dataset
 * @param {Array} dataset the dataset
 * @param {String} clase the name of the class
 * @returns the entropy of the dataset
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

// funcion para calcular la entropia de un atributo respecto a D.
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
        //este control es porque no se calcula el log de 0, da math error, ni mucho menos de infinito
        sumatoria1 =
          -(numerador / denominador) * logBase(2, numerador / denominador) +
          sumatoria1
      } else if (denominador === 0) {
        //cuando el denominador es 0, no hay registros de un determinado valor de un atributo disponibles en el dataset actual, entonces la entropia es 0
        sumatoria1 = sumatoria1 + 0
      }
    }
    if (denominador !== 0) {
      entA = entA + sumatoria1 * (denominador / dataset.length)
    }
  }
  return entA
}

/**
 * Calculates the gain of an attribute
 * @param {Number} entropiaD the entropy of the dataset
 * @param {Number} entropiaA
 * @returns the gain
 */
const gain = (entropiaD, entropiaA) => entropiaD - entropiaA

/**
 * Calculates the gain ratio of an attribute
 * @param {Number} gainA the gain of the attribute
 * @param {Array} dataset the dataset
 * @param {String} atributo the attribute
 * @returns the gain ratio
 */
const gainRatio = (gainA, dataset, atributo) => {
  const valoresAtributo = valoresDistintos(atributo, dataset)
  let denominador = 0
  for (let valor of valoresAtributo) {
    let c = contarValores(valor, dataset, atributo)
    denominador =
      (-c / dataset.length) * logBase(2, c / dataset.length) + denominador
  }
  return gainA / denominador
}

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
  if (stepByStep) {
    stepByStep.push({
      id: id_recursion,
      tree: { nodes: [...tree.nodes], edges: [...tree.edges] },
      atributos: [...atributos],
      particion: [...dataset],
    })
    id_recursion++
  }
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
      ganancias.push(
        funcionImpureza === "gain"
          ? gain(entD, entropiaA(dataset, atributo, clase))
          : gainRatio(
              gain(entD, entropiaA(dataset, atributo, clase)),
              dataset,
              atributo
            )
      )
    }
    console.log(ganancias)
    const maxgain = Math.max.apply(null, ganancias)
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
      return tree
    } else {
      let ag = atributos[ganancias.indexOf(maxgain)] // estoy seleccionando al nodo que mejor clasifica o reduce mas la impureza
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
