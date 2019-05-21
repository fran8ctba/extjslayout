<?php
//connect to db
include("db.php");;

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        listaContato();
        break;
    case 'POST':
        criaContato();
        break;
    case 'PUT':
        atualizaContato();
        break;
    case 'DELETE':
        deletaContato();
        break;
}





#GET
function listaContato()
{
    //sql query
    $query = pg_query("SELECT * FROM Contato") or die(pg_error());

    //interates the result and creates an array with each row
    $rows = array();
    while ($contact = pg_fetch_assoc($query)) {
        $rows[] = $contact;
    }
    //JSON
    echo json_encode($rows);
}

#POST
function criaContato()
{

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
}

#PUT 
function atualizaContato()
{
    parse_str(file_get_contents("php://input"), $post_var);

    $info = $post_var['contatos'];

    $data = json_decode($info);
    $id = $data->id;
    $nome = $data->nome;
    $email = $data->email;

    $query = "UPDATE contato SET nome='$nome', email='$email' WHERE id=$id";

    $res = pg_query($query);

    echo json_encode(array(
        'success' => pg_last_error() == 0

    ));
}

#DELETE
function deletaContato()
{
    parse_str(file_get_contents("php://input"), $post_var);

    $info = $post_var['contatos'];
    
    $data = json_decode($info);

    $id = $data->id;

    $query = "DELETE FROM contato WHERE id=$id";

    $res = pg_query($query);

    echo json_encode(array(
        'success' => pg_last_error() == 0
    ));
}
