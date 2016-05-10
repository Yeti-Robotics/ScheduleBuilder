<?php

include("connect.php");

$schedule = json_decode(file_get_contents("php://input"), true)["schedule"];

if (isset($schedule["schedule"]) &&
   isset($schedule["people"]) &&)
   isset($schedule["skills"]) &&)
   isset($schedule["multiSkillRoles"]) &&)
   isset($schedule["teamArchetypes"]) &&)
   isset($schedule["teams"]) &&)
   isset($schedule["days"])) {
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
} else {
	die(json_encode(array("error" => "Try submitting again with all the fields")));
}

?>