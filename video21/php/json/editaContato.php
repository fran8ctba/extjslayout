<?php

include("../db.php");

$info = $_POST['contatos'];

$data = json_decode($info);
$id = $data->id;
$nome = $data->nome;
$email = $data->email;

$query = "UPDATE contato SET nome='$nome', email='$email' WHERE id=$id";

$res = pg_query($query);

echo json_encode(array(
    'success' => pg_last_error() == 0
        
));