<?php

include("connect.php");
$input = json_decode(file_get_contents("php://input"), true)
$schedule = $input["schedule"];
$password = $input["password"]

if ($password == "password" && isset($schedule["schedule"]) &&
	isset($schedule["people"]) &&
	isset($schedule["skills"]) &&
	isset($schedule["multiSkillRoles"]) &&
	isset($schedule["teamArchetypes"]) &&
	isset($schedule["teams"]) &&
	isset($schedule["days"])) {
	if(empty($collection->findOne(array("schedule" => $schedule["schedule"]))) {
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
		die(json_encode(array("error" => "Did Not Save: Try submitting again with a different name")));
	}
} else {
	die(json_encode(array("error" => "Did Not Save: Try submitting again with all the fields")));
}

?>
