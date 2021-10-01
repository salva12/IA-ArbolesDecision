//esto es un dataset mockeado del ej2 de la guiaTP-AbDec para ir resolviendo con el algoritmo
const mockdata = [
    {
        formsec: "tecnica",
        programa: "si",
        menos3inasis:"si",
        condicioncurso:"regular"
    },
    {
        formsec: "tecnica",
        programa: "si",
        menos3inasis:"si",
        condicioncurso:"regular"
    },
    {
        formsec: "no tecnica",
        programa: "si",
        menos3inasis:"si",
        condicioncurso:"regular"
    },
    {
        formsec: "no tecnica",
        programa: "no",
        menos3inasis:"no",
        condicioncurso:"libre"
    },
    {
        formsec: "tecnica",
        programa: "si",
        menos3inasis:"no",
        condicioncurso:"regular"
    },
    {
        formsec: "tecnica",
        programa: "no",
        menos3inasis:"no",
        condicioncurso:"libre"
    }
    ];

//el siguiente bloque sirve para saber de que tamaño son los registros, el campo de la clase estará ubicado en tamReg-1.
const tamReg = Object.keys(mockdata[1]).length;
const indiceCampoClase = tamReg - 1;
console.log(indiceCampoClase);

//el siguiente bloque sirve para saber cuales son los atributos y cual es la clase para decidir.
const atributos = Object.keys(mockdata[1]);
const clase = atributos.pop();
console.log("los atts son " + atributos + "y la clase es:" + clase);

//el siguiente bloque sirve para saber la cantidad de valores diferentes que puede tomar un atributo o clase
const valoresDistintos = (attClase,dataset) => {
    let valores = [];
    for (reg of dataset){
        valores.push(reg[attClase]);
    };
    let valoresDistintos = new Set(valores);
    return valoresDistintos;
};

// la siguiente funcion devuelve el logaritmo en base x de num
function logBase(x, num) {
  return Math.log(num) / Math.log(x);
};

// la siguiente funcion cuenta valores de una clase o atributo dado en el dataset
function contarValores(valor,dataset,attClase){
    let cont = 0;
    for (reg of dataset){
        if (valor == reg[attClase]){
            cont++;
        };
    };
    return cont;
};
// funcion flecha para calcular la entropia global del set de datos D.
const entropiaD = (dataset) => {
    let valoresClase = valoresDistintos(clase,dataset);
    let entD = 0;
    for (valor of valoresClase){
        let numerador = contarValores(valor,dataset,clase);
        entD = -(numerador/dataset.length)*logBase(2,numerador/dataset.length) + entD;
    };
    return entD;
};

entropiaD(mockdata);
console.log(valoresDistintos(clase,mockdata));
console.log(contarValores("regular",mockdata,clase));
console.log(entropiaD(mockdata));
