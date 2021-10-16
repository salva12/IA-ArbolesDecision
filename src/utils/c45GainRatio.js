// A CONTINUACIÓN SOLUCION GENERAL
const umbral = 0.1
let id_nodes = 0
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

  function c45gainRatio(dataset, atributos, tree,clase) {

    if (valoresDistintos(clase, dataset).size === 1) {
      console.log("ya no hay mas valores distintos")
      id_nodes++
      tree.edges.slice(-1)[0].to = id_nodes + dataset[0][clase]
      tree.nodes.push({
        id: id_nodes + dataset[0][clase],
        label: dataset[0][clase],
      }) //colocar nodos hojas
      return tree
    } else if (atributos.length === 0) {
      console.log("ya no hay mas atributos")
  
      const masFrecuente = valorClaseMasFrecuente(dataset, clase)
  
      // acá se saca el valor de clase mas frecuente
      id_nodes++
      tree.edges.slice(-1)[0].to = id_nodes + dataset[0][clase]
      tree.nodes.push({
        id: id_nodes + dataset[0][clase],
        label: masFrecuente,
      })
      return tree
    } else {
      console.log("entro al else")
      let entD = entropiaD(dataset, clase)
      let ganancias = []
      for (let atributo of atributos) {
        ganancias.push(gainRatio(entD, entropiaA(dataset, atributo, clase)))
      }
      const maxgain = Math.max.apply(null, ganancias)
      if (maxgain < umbral) {
        console.log("nodo hoja")
  
        const masFrecuente = valorClaseMasFrecuente(dataset, clase)
  
        id_nodes++
        tree.edges.slice(-1)[0].to = id_nodes + dataset[0][clase]
        tree.nodes.push({
          id: id_nodes + dataset[0][clase],
          label: masFrecuente,
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
        for (let particion of particiones) {
          console.log(particion)
          if (particion.length !== 0) {
            tree.edges.push({ from: idpadre, label: particion[0][ag] })
            c45gainRatio(
              particion,
              atributos.filter((a) => a !== ag),
              tree,
              clase
            )
          }
        }
      }
    }
  }
  
  export default c45gainRatio;
