<?php
require_once "../../scripts/cutefetch.php";

$time = date('h:i:s a , j F y');
$cutefetch->script("
    document.getElementById('servertime').innerHTML += '$time<br/>';
");

$cutefetch->dispatch();
?>
<Script>
    
</Script>