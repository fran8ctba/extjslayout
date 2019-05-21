<?php
//chama o arquivo de conexão com o bd
include("../db.php");

$info = $_POST['contatos'];

$data = json_decode(stripslashes($info));
$nome = $data->nome;
$email = $data->email;

//consulta sql
$query = "INSERT INTO contato(nome, email) VALUES ('$nome','$email') RETURNING id";
$res = pg_query($query);

echo json_encode(array(
	"success" => pg_last_error() == 0,
	"contatos" => array(
		"id" => pg_last_oid($res),
		"nome" => $nome,
		"email" => $email
	)
));
