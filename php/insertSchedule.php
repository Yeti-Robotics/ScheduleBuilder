<?php

include("connect.php");

$schedule = json_decode(file_get_contents("php://input"), true)["schedule"];

$document = array(
	"schedule" => $schedule["schedule"],
	"people" => $schedule["people"],
	"skills" => $schedule["skills"],
	"multiSkillRoles" => $schedule["multiSkillRoles"],
	"teamArchetypes" => $schedule["teamArchetypes"],
	"teams" => $schedule["teams"],
	"days" => $schedule["days"]
);

$collection->insert($document);

?>