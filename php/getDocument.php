<?php

include("connect.php");
include("functions.php");

$schedule = getSchedule($collection, "Guilford");
var_dump($schedule);

?>