function dibujarMatriz() {
        // Obtener la referencia del elemento body
        var body = document.getElementsByTagName("body")[0];
      
        // Crea un elemento <table> y un elemento <tbody>
        var tabla   = document.createElement("table");
        var tblBody = document.createElement("tbody");
        var filas = document.getElementById("filas").value;
        var columnas = document.getElementById("columnas").value;
        // Crea las celdas
        for (var i = 0; i < filas; i++) {
          // Crea las hileras de la tabla
          var hilera = document.createElement("tr");
      
          for (var j = 0; j < columnas; j++) {
            // Crea un elemento <td> y un nodo de texto, haz que el nodo de
            // texto sea el contenido de <td>, ubica el elemento <td> al final
            // de la hilera de la tabla
            var celda = document.createElement("td");
            if (i===0){
                var textoCelda = document.createTextNode("inserte atributo/clase");
            }
            else{
                var textoCelda = document.createTextNode("inserte valor");
            }
            
            celda.setAttribute("contentEditable","true");
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
          }
      
          // agrega la hilera al final de la tabla (al final del elemento tblbody)
          tblBody.appendChild(hilera);
        }
      
        // posiciona el <tbody> debajo del elemento <table>
        tabla.appendChild(tblBody);
        // appends <table> into <body>
        body.appendChild(tabla);
        // modifica el atributo "border" de la tabla y lo fija a "2";
        tabla.setAttribute("border", "2");
}

    