<?php

include("connect.php");
include("functions.php");

$response = [];
$competitionName = json_decode(file_get_contents("php://input"), true)["competition"];
$schedule = getSchedule($collection, $competitionName);

$response["competitionName"] = $schedule["schedule"];
$skills = $schedule["skills"];
foreach ($schedule["people"] as $name => $person) {
	for ($i = 0; $i < count($person["skills"]); $i++) {
		$response["people"][$name]["skills"][$i] = $skills[$person["skills"][$i]];
	}
}
$response["teams"] = $schedule["teams"];
$response["days"] = $schedule["days"];

echo(json_encode($response));

?>