// JSON - JAVASCRIPT //
window.addEventListener("load", function () {
    document.getElementById("btn-json").addEventListener("click", function (e) {
        e.preventDefault();
        let id = document.getElementById("id").value;
        let nombre = document.getElementById("nombre").value;
        // Creamos el objeto para la petición AJAX
        var xhr = new XMLHttpRequest();

        // Definimos el comportamiento de la respuesta
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                procesarRespuestaJSON(this.responseText, id, nombre);
            } else if (this.readyState == 4) {
                console.error('Error al hacer la petición: ' + this.status);
            }
        }
        // Preparamos la petición
        xhr.open('GET', 'data/pokedex.json', true);
        // Enviamos la petición
        xhr.send();
    });
});

function procesarRespuestaJSON(respuesta, id, nombre) {
    let respuestaObjeto = JSON.parse(respuesta);

    let tabla = document.createElement('table');
    tabla.classList.add('mb-4');
    tabla.innerHTML = "<thead><tr><th>Id</th><th>Nombre</th><th>Tipos</th><th>Opciones</th></tr></thead>"

    for (var i = 0; i < respuestaObjeto.length; i++) {
        // Si el campo id y el campo nombre está vacio, cargo todos los datos
        if ((id == "") && (nombre == "")) {
            var fila = tabla.insertRow();
            fila.insertCell().innerText = respuestaObjeto[i].id;
            fila.insertCell().innerText = respuestaObjeto[i].name.english;
            fila.insertCell().innerText = respuestaObjeto[i].type;
            fila.insertCell().innerHTML = `<button class="btn btn-p2 mt-2 mb-2 btn-opciones" data-code="${respuestaObjeto[i].id}" data-nombre="${respuestaObjeto[i].name.english}" data-operacion="insertar">Seleccionar</button>`;
            // Si el campo id está vacio y el campo nombre está relleno, busco por el nombre
        } else if ((id == "") && respuestaObjeto[i].name.english.toLowerCase() == nombre.toLowerCase()) {
            var fila = tabla.insertRow();
            fila.insertCell().innerText = respuestaObjeto[i].id;
            fila.insertCell().innerText = respuestaObjeto[i].name.english;
            fila.insertCell().innerText = respuestaObjeto[i].type;
            fila.insertCell().innerHTML = `<button class="btn btn-p2 mt-2 mb-2 btn-opciones" data-code="${respuestaObjeto[i].id}" data-nombre="${respuestaObjeto[i].name.english}" data-operacion="insertar">Seleccionar</button>`;
            // Si el nombre campo nombre está vacio y el campo id relleno, busco por el id menor/igual
        } else if ((nombre == "") && (respuestaObjeto[i].id <= id)) {
            var fila = tabla.insertRow();
            fila.insertCell().innerText = respuestaObjeto[i].id;
            fila.insertCell().innerText = respuestaObjeto[i].name.english;
            fila.insertCell().innerText = respuestaObjeto[i].type;
            fila.insertCell().innerHTML = `<button class="btn btn-p2 mt-2 mb-2 btn-opciones"  data-code="${respuestaObjeto[i].id}" data-nombre="${respuestaObjeto[i].name.english}" data-operacion="insertar">Seleccionar</button>`;
            // Si el campo id y el campo nombre estan rellenos, busco por el campo nombre
        } else if ((id) && (nombre)) {
            if (respuestaObjeto[i].name.english.toLowerCase() == nombre.toLowerCase()) {
                var fila = tabla.insertRow();
                fila.insertCell().innerText = respuestaObjeto[i].id;
                fila.insertCell().innerText = respuestaObjeto[i].name.english;
                fila.insertCell().innerText = respuestaObjeto[i].type;
                fila.insertCell().innerHTML = `<button class="btn btn-p2 mt-2 mb-2 btn-opciones" data-code="${respuestaObjeto[i].id}" data-nombre="${respuestaObjeto[i].name.english}" data-operacion="insertar">Seleccionar</button>`;
            }
        }
    }
    document.getElementById("contenedor").innerHTML = tabla.outerHTML;

    //Si pulso el botón opciones, mando al action.php la accion 1(insert), el id y el nombre
    $(".btn-opciones").on('click', function (event) { 
        event.preventDefault();
        let idPokemon = $(this).data('code');
        let nombrePokemon = $(this).data('nombre');
        // Envío los datos por post al archivo PHP
        $.post("action.php", { 
            accion: 1,
            idPokemon: idPokemon,
            nombrePokemon: nombrePokemon
        }, function (datos) {
            document.getElementById("contenedor").innerHTML = datos;
        });
    });
}
// Si pulso el boton 'Mostrar seleccionados', mando al action.php la accion 2(select) para mostrar la base de datos mediante una tabla
$("#btn-seleccionados").click(function (event)  {
    event.preventDefault();
    $.post("action.php", {
        accion: 2
    }, function (datos) {
        document.getElementById("contenedor").innerHTML = datos;
        // Si le doy click al botón borrar, mando a action.php la accion 3(delete) junto al id de pokemon
        $(".btn-borrar").on('click', function () {
            let idPokemon = $(this).data('code');
            // Envio los datos por post al archivo PHP
            $.post("action.php", {
                accion: 3,
                idPokemon: idPokemon
            }, function (datos) {
                document.getElementById("contenedor").innerHTML = datos;
            });
        });
    });
});