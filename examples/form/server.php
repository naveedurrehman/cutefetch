<?php
require_once "../../scripts/cutefetch.php";

$reversed = strrev($_POST["string"]);
$cutefetch->script("
    document.getElementById('reversed').innerHTML = '$reversed';
");

$cutefetch->dispatch();
