<?php

function getSchedule($collection, $competitionName) {
	$query = array(
		"schedule" => $competitionName
	);
	$schedule = $collection->findOne($query);
	
	return $schedule;
}

?>