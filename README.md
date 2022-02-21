# P3_DWC_Pokedex

Realizar una página web que use la tecnología AJAX. La página dos campo de entrada input ("ID" y "Nombre") y dos botones ("Cargar JSON" y "Mostrar seleccionados").

Al pulsar el botón "Cargar JSON", se recorrerá un archivo json y se mostrarán en formato tabla.
La tabla no incluirá todos los campos, sólo el id, el campo english de name y el campo type como un string separados por comas y un botón de "Seleccionar".
El archivo JSON será el adjunto pokedex.json, que previamente tendremos en el servidor.
Al pulsar el botón, si hay algo escrito en el input "ID", sólo se mostrarán los objetos cuyo id sea menor o igual que el especificado. Si hay algo en el input "Nombre", ignorará el campo "ID" y mostrará solo los objetos cuyo nombre en inglés contenga la cadena indicada en dicho campo.
Utilizando AJAX y PHP:

Si pulsamos el botón "Seleccionar" de una fila, guardaremos el ID y el Nombre de ese registro en una base de datos MySQL. Tras guardarlo, mostraremos un mensaje de confirmación. Si ya está guardado, mostraremos un mensaje de aviso.
Si pulsamos el botón "Mostrar seleccionados", se mostrarán los registros guardados en la base de datos en una tabla de 3 columnas, con el ID, el Nombre y un botón de "Borrar".
Si pulsamos el botón de "Borrar", eliminaremos ese registro de la base de datos, de la tabla que muestra los seleccionados y nos mostrará un mensaje de confirmación.
