<?php

include("connect.php");

$schedules = iterator_to_array($collection->find());
$scheduleNames = [];

foreach ($schedules as $id => $value) {
	$scheduleNames[] = $schedules[$id]["schedule"];
}

echo(json_encode($scheduleNames));

?>