<?php

include('../db.php');

$info = $_POST['contatos'];

$data = json_decode($info);

$id = $data->id;

$query = "DELETE FROM contato WHERE id=$id";

$res = pg_query($query);

echo json_encode(array(
    'success' => pg_last_error() == 0        
));