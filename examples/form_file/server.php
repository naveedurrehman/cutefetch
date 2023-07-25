<?php
require_once "../../scripts/cutefetch.php";

$file = json_encode($_FILES);
$cutefetch->script("
    document.getElementById('details').innerHTML = '$file';
");

$cutefetch->dispatch();
