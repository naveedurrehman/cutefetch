<?php
require_once "../../scripts/cutefetch.php";

$cutefetch->script("
    document.getElementById('heading').innerHTML = 'AJAX is fun!';
    document.getElementById('heading').style.color = '#ff0000';
");

$cutefetch->dispatch();
?>
<Script>
    
</Script>