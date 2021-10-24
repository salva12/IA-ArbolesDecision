//esto es un dataset mockeado del ej2 de la guiaTP-AbDec para ir resolviendo con el algoritmo
// const mockdata = [
//   {
//     formsec: "tecnica",
//     programa: "si",
//     menos3inasis: "si",
//     condicioncurso: "regular",
//   },
//   {
//     formsec: "tecnica",
//     programa: "si",
//     menos3inasis: "si",
//     condicioncurso: "regular",
//   },
//   {
//     formsec: "no tecnica",
//     programa: "si",
//     menos3inasis: "si",
//     condicioncurso: "regular",
//   },
//   {
//     formsec: "no tecnica",
//     programa: "no",
//     menos3inasis: "no",
//     condicioncurso: "libre",
//   },
//   {
//     formsec: "tecnica",
//     programa: "si",
//     menos3inasis: "no",
//     condicioncurso: "regular",
//   },
//   {
//     formsec: "tecnica",
//     programa: "no",
//     menos3inasis: "no",
//     condicioncurso: "libre",
//   },
// ]

const mockdata2 = [
  {
      Hipertenso: "no",
      Colesterol: "bajo",
      Triglicéridos: "normal",
      Edad: "<40",
      Diabético: "si",
      Problemascardíacos: "no"
  },
  {
      Hipertenso: "si",
      Colesterol: "bajo",
      Triglicéridos: "elevado",
      Edad: "<40",
      Diabético: "si",
      Problemascardíacos: "no"
  },
  {
      Hipertenso: "si",
      Colesterol: "bajo",
      Triglicéridos: "elevado",
      Edad: ">60",
      Diabético: "si",
      Problemascardíacos: "si"
  },
  {
      Hipertenso: "si",
      Colesterol: "medio",
      Triglicéridos: "elevado",
      Edad: ">60",
      Diabético: "no",
      Problemascardíacos: "si"
  },
  {
      Hipertenso: "no",
      Colesterol: "medio",
      Triglicéridos: "elevado",
      Edad: "<40",
      Diabético: "no",
      Problemascardíacos: "si"
  },
  {
      Hipertenso: "no",
      Colesterol: "medio",
      Triglicéridos: "normal",
      Edad: "entre 40-60",
      Diabético: "si",
      Problemascardíacos: "no"
  },
  {
      Hipertenso: "si",
      Colesterol: "alto",
      Triglicéridos: "normal",
      Edad: "entre 40-60",
      Diabético: "si",
      Problemascardíacos: "si"
  },
  {
      Hipertenso: "si",
      Colesterol: "alto",
      Triglicéridos: "normal",
      Edad: "entre 40-60",
      Diabético: "si",
      Problemascardíacos: "si"
  },
  {
      Hipertenso: "si",
      Colesterol: "alto",
      Triglicéridos: "elevado",
      Edad: ">60",
      Diabético: "no",
      Problemascardíacos: "si"
  },
  {
      Hipertenso: "no",
      Colesterol: "alto",
      Triglicéridos: "normal",
      Edad: "<40",
      Diabético: "no",
      Problemascardíacos: "no"
  }
];


// A CONTINUACIÓN SOLUCION GENERAL

//el siguiente bloque sirve para saber la cantidad de valores diferentes que puede tomar un atributo o clase
const valoresDistintos = (attClase, dataset) => {
  let valores = []
  for (let reg of dataset) {
    valores.push(reg[attClase])
  }
  let valoresDistintos = new Set(valores)
  return valoresDistintos
}

// la siguiente funcion devuelve el logaritmo en base x de num
function logBase(x, num) {
  return Math.log(num) / Math.log(x)
}

// la siguiente funcion cuenta valores de una clase o atributo dado en el dataset
function contarValores(valor, dataset, attClase) {
  // attclase quiere decir atributo o clase
  let cont = 0
  for (let reg of dataset) {
    if (valor === reg[attClase]) {
      cont++
    }
  }
  return cont
}

// la siguiente funcion cuenta la cantidad de reg que pertenecen a un valor de clase y de atributo dado
function contarValores2(valorAtt, valorClase, dataset, atributo, clase) {
  let cont = 0
  for (let reg of dataset) {
    if (valorAtt === reg[atributo] && valorClase === reg[clase]) {
      cont++
    }
  }
  return cont
}

// funcion para obtener el valor de clase mas frecuente de un data set
function valorClaseMasFrecuente(dataset, clase) {
  let valoresClase = valoresDistintos(clase, dataset)
  let cantClase = []
  for (let valor of valoresClase) {
    let c = contarValores(valor, dataset, clase)
    cantClase.push({ valorClase: valor, cant: c })
  }
  // obtener valorClase con mayor cantidad
  const valoresOrdenados = cantClase.sort((a, b) => b.cant - a.cant)
  const masFrecuente = valoresOrdenados[0].valorClase
  return masFrecuente
}

// funcion para calcular la entropia global del set de datos D.
const entropiaD = (dataset, clase) => {
  let valoresClase = valoresDistintos(clase, dataset)
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

// funcion para calcular la ganancia
function gain(entropiaD, entropiaA) {
  return entropiaD - entropiaA
}

// funcion para calcular la tasa de ganancia
function gainRatio(gainA, dataset, atributo) {
  let valoresAtributo = valoresDistintos(atributo, dataset)
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

let id_nodes = 0
function c45gain(dataset, atributos, tree, clase, umbral, funcionImpureza) {

  if (valoresDistintos(clase, dataset).size === 1) {
    console.log("ya no hay mas valores distintos")
    id_nodes++
    if (tree.edges.length !== 0) {
      tree.edges[tree.edges.length - 1].to = id_nodes + dataset[0][clase]
    }
    tree.nodes.push({
      id: id_nodes + dataset[0][clase],
      label: `${dataset[0][clase]}\n${dataset.length}/${dataset.length}`,
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
        funcionImpureza === 'gain'
          ? gain(entD, entropiaA(dataset, atributo, clase))
          : gainRatio(gain(entD, entropiaA(dataset, atributo, clase)), dataset, atributo)
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
      const numeradorConfianza = contarValores(masFrecuente, dataset, clase);
      const denominadorConfianza = dataset.length - numeradorConfianza;
      tree.nodes.push({
        id: id_nodes + dataset[0][clase],
        label: `${masFrecuente}\n${numeradorConfianza}/${denominadorConfianza}`,
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
            funcionImpureza
          )
        }
      }
    }
  }
}

export default c45gain;

// Ver por consola los resultados parciales y pruebas de cada funcion
// entropiaD(dataset)

// console.log("Probando obtener valores distintos y contar valores de programa")
// console.log(valoresDistintos("programa", dataset))
// console.log(contarValores("no", dataset, "programa"))

// console.log("Probando entropia de D")
// console.log(entropiaD(dataset, "condicioncurso"))

// console.log("Probando entropia de programa")
// console.log(entropiaA(dataset, "programa", "condicioncurso"))

// console.log("Probando entropia de menos de 3 inasistencias")
// console.log(entropiaA(dataset, "menos3inasis", "condicioncurso"))

// console.log("Probando entropia de formacion secundaria")
// console.log(entropiaA(dataset, "formsec", "condicioncurso"))

// console.log("Probando la ganancia de la informacion para att programa")
// console.log(
//   gain(
//     entropiaD(dataset, "condicioncurso"),
//     entropiaA(dataset, "programa", "condicioncurso")
//   )
// )
// const gainprograma = gain(
//   entropiaD(dataset, "condicioncurso"),
//   entropiaA(dataset, "programa", "condicioncurso")
// )

// console.log("Probando la tasa de ganancia de la informacion para att programa")
// //console.log(gainRatio(gainprograma, dataset, "programa"))

// // Aux sirve para saber el num maximo en un array
// console.log(Math.max.apply(null, [2, 4, 5, 6, 7, 1, 2, 3]))

// //Probamos el algoritmo completo
//console.log(c45gain(dataset, atributos, tree))


//PRUEBA EJ3 15/10/2021
// console.log("ACA ARRANCA LA PRUEBA DEL 15/10/2021")
// const dataset=mockdata2
// const tree = { nodes: [], edges: [] }
// const atributos = Object.keys(dataset[0])
// const clase = atributos.pop()
// console.log(c45gain(dataset, atributos, tree,clase))
// console.log(tree)
