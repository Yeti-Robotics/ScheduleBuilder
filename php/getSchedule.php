<?php

include("connect.php");
include("functions.php");

$response = [];
$competitionName = $_GET["competition"];

echo(json_encode(getSchedule($collection, $competitionName)));

?>