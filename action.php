<?php
$opcion = $_POST['accion'];
$accion = (int)filter_input(INPUT_POST, 'opcion');

$conexion = new mysqli('localhost:3308', 'studium', 'studium__', 'studium_dwc_p3');
if (mysqli_connect_error()) {
    die('Error de Conexion (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}
$conexion->set_charset("utf8");

switch ($opcion) {
    // Insertar datos, primero compruebo con un select si el pokémon ya está en la base de datos, sino hago el insert
    case 1:
        $id = $_POST["idPokemon"];
        $nombre = $_POST["nombrePokemon"];
        $sqlSelect = 'SELECT * FROM pokemons WHERE id = ' . (int)$id;
        $rows = $conexion->query($sqlSelect);

        if ((int)$rows->num_rows) {
            echo '<div class="alert alert-danger mx-auto d-block">El pokémon ya está en la base de datos</div>';
        } else {
            $sqlInsert = 'INSERT INTO pokemons(id, nombre) VALUES ("' . $id . '","' . $nombre . '")';
            $conexion->query($sqlInsert);
            echo '<div class="alert alert-success mx-auto d-block">Pokémon insertado correctamente</div>';
        }
        break;
    // Muestra los pokémons que se encuentran guardados en la base de datos
    case 2:
        $select = "SELECT * FROM `pokemons`";
        $resultado = mysqli_query($conexion, $select);

        if (mysqli_num_rows($resultado) != 0) {
            echo "<table class='mb-4'><tr><th>Id</th><th>Nombre</th><th>Opciones</th></tr>";
            while ($row = mysqli_fetch_array($resultado)) {
                echo "<tr><td id='idPokemon'>" . $row["id"] . "</td><td id='nombrePokemon'>" . $row["nombre"]  . "<td><button type='button' class='btn btn-p2 mt-2 mb-2 btn-borrar' data-code=".$row["id"].">Borrar</button>" . "</td></tr>";
            }
            echo "</table>";
        } else {
            echo '<div class="alert alert-danger mx-auto d-block">No hay pokémons añadidos</div>';
        }
        break;
    // Borra
    case 3:
        $id = $_POST["idPokemon"];
        $delete = "DELETE FROM `pokemons` WHERE (`id` = $id)";

        if ($conexion->query($delete) == true) {
            echo '<div class="alert alert-success mx-auto d-block">Pokémon borrado correctamente</div>';
        } else {
            echo '<div class="alert alert-success mx-auto d-block">No se ha podido borrar los datos</div>';
        }
        break;
}
