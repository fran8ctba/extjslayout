<?php
//connect to db
include("db.php");
 
//sql query
$query = pg_query("SELECT * FROM Contato") or die(pg_error());
 
//interates the result and creates an array with each row
$rows = array();
while($contact = pg_fetch_assoc($query)) {
    $rows[] = $contact;
}
//JSON
echo json_encode($rows);
?>